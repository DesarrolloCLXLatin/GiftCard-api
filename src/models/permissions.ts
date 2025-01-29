import { DataTypes, Model, Sequelize } from 'sequelize';

class Permission extends Model {
    public id!: number;
    public name!: string;
    public description!: string;

    static associate(models: any) {
        this.belongsToMany(models.Role, {
            through: 'RolePermissions',
            foreignKey: 'permissionId',
            otherKey: 'roleId',
        });
        this.belongsTo(models.Admin, { foreignKey: 'adminId' });
    }
}

export default (sequelize: Sequelize) => {
    Permission.init({
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
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Permission',
    });

    return Permission;
};
