import { Request, Response } from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { env } from '../env';
import { registerError } from '../errors/registerError';

// Función para cifrar la contraseña
const cryptPassword = async (password: string): Promise<string> => {
    return await argon2.hash(password);
};

// Función para generar el token JWT
export const getJWTToken = (user: any): string => {
    return jwt.sign({ id: user.id, email: user.email }, env.JWT_KEY, { expiresIn: '1h' });
};

// Función para validar los campos de registro
const validateRegistrationFields = async (req: Request) => {
    const { name, lastname, username, email, password, confirmPassword, department } = req.body;

    console.log('Received data:', { name, lastname, username, email, password, confirmPassword, department });

    if (!name || !lastname || !username || !email || !password || !confirmPassword || !department) {
        throw new registerError('All fields are required', 'general');
    }

    const trimmedName = name.trim();
    const trimmedLastName = lastname.trim();
    const trimmedUsername = username.trim().toLowerCase();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedDepartment = department.trim();

    console.log('Trimmed data:', { trimmedName, trimmedLastName, trimmedUsername, trimmedEmail, trimmedDepartment });

    if (password.length < 6) throw new registerError('Password must be at least 6 characters', 'password');
    if (password !== confirmPassword) throw new registerError('Passwords do not match', 'confirmPassword');

    if (trimmedUsername.length < 2) throw new registerError('Username must be at least 2 characters', 'username');
    if (!trimmedUsername.match(/^[a-zA-Z0-9]+$/)) throw new registerError('Invalid Username, only letters and numbers are allowed', 'username');

    if (!trimmedEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) throw new registerError('Invalid Email', 'email');
    if (trimmedName.length < 2) throw new registerError('Name must be at least 2 characters', 'name');
    if (trimmedLastName.length < 2) throw new registerError('Last Name must be at least 2 characters', 'lastName');
    if (trimmedDepartment.length < 2) throw new registerError('Department must be at least 2 characters', 'department');

    const userNameFound = await User.findOne({
        where: { username: trimmedUsername },
    });
    if (userNameFound) throw new registerError('The username is already in use', 'username');

    const emailFound = await User.findOne({
        where: { email: trimmedEmail }
    });
    if (emailFound) throw new registerError('The email is already in use', 'email');

    return { email: trimmedEmail, name: trimmedName, lastname: trimmedLastName, username: trimmedUsername, password, department: trimmedDepartment };
};

// Función para registrar un nuevo usuario
export const register = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, name, lastname, username, password, department } = await validateRegistrationFields(req);

        const hashedPassword = await cryptPassword(password);

        const user = await User.create({
            email,
            name,
            lastname,
            username,
            password: hashedPassword,
            roleId: 3,
            department,
        });

        const token = getJWTToken(user);

        // Actualizar el usuario con el token generado
        user.token = token;
        await user.save();

        console.log('Generated token:', token); // Verifica que el token se esté generando

        return res.status(200).json({ token });
    } catch (error) {
        if (error instanceof registerError) {
            return res.status(400).json({
                success: false,
                message: error.message,
                field: error.field
            });
        }
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Función para actualizar la contraseña
export const updatePassword = async (req: Request, res: Response): Promise<Response> => {
    const { userId, newPassword } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const hashedPassword = await argon2.hash(newPassword);
        user.password = hashedPassword;

        // Sequelize manejará automáticamente la actualización de updatedAt
        await user.save();

        return res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Función para el login
export const login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        const isPasswordValid = await argon2.verify(user.password, password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }

        const token = getJWTToken(user);

        user.token = token;
        await user.save();

        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Función para el logout
export const logout = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Invalidar el token (por ejemplo, eliminando el token del usuario)
        user.token = undefined;
        await user.save();

        return res.status(200).json({ success: true, message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
