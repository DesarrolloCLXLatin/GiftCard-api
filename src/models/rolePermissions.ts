import { DataTypes, Model, Sequelize } from 'sequelize';

class RolePermission extends Model {
    public roleId!: number;
    public permissionId!: number;
}

export default (sequelize: Sequelize) => {
    RolePermission.init({
        roleId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        permissionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    }, {
        sequelize,
        modelName: 'RolePermission',
        tableName: 'RolePermissions',
        timestamps: false,
    });

    return RolePermission;
};
