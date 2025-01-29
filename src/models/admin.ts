import { DataTypes, Model, Sequelize } from 'sequelize';

class Admin extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;

    static associate(models: any) {
        this.hasMany(models.User, { foreignKey: 'adminId' });
        this.hasMany(models.Permission, { foreignKey: 'adminId' });
        this.hasMany(models.Transaction, { foreignKey: 'adminId' });
        this.hasMany(models.GiftCard, { foreignKey: 'adminId' });
    }
}

export default (sequelize: Sequelize) => {
    Admin.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'admin',
    });

    return Admin;
};
