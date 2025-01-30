import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

export class User extends Model {
    public id!: number;
    public name!: string;
    public lastname!: string;
    public username!: string;
    public email!: string;
    public password!: string;
    public token?: string;
    public token_update?: Date;
    public roleId!: number;
    public department!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    lastname: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    username: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
    email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
    password: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    token: {
        type: new DataTypes.STRING(128),
        allowNull: true,
    },
    token_update: {
        type: new DataTypes.DATE(),
        allowNull: true,
    },
    roleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    department: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'Users',
    sequelize,
    modelName: 'User',
    timestamps: true,
});

export default User;
