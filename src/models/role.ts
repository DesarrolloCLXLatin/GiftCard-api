import { DataTypes, Model, Sequelize } from 'sequelize';

class Role extends Model {
    public id!: number;
    public name!: string;

    static associate(models: any) {
        this.hasMany(models.User, { foreignKey: 'roleId' });
        this.belongsToMany(models.Permission, {
            through: 'RolePermissions',
            foreignKey: 'roleId',
            otherKey: 'permissionId',
        });
    }
}

export default (sequelize: Sequelize) => {
    Role.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        sequelize,
        modelName: 'Role',
    });

    return Role;
};
