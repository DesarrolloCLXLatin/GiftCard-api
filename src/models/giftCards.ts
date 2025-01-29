import { DataTypes, Model, Sequelize } from 'sequelize';

class GiftCard extends Model {
    public id!: number;
    public code!: string;
    public amount!: number;
    public userId!: number;
    public status!: string;
    public serial!: number;
    public credit_limit!: number;
    public create_at!: Date;
    public update_at!: Date;

    static associate(models: any) {
        this.belongsTo(models.User, { foreignKey: 'userId' });
        this.belongsTo(models.Admin, { foreignKey: 'adminId' });
        this.belongsToMany(models.Role, {
            through: 'RolePermissions',
            foreignKey: 'permissionId',
            otherKey: 'roleId',
        });
    }
}

export default (sequelize: Sequelize) => {
    GiftCard.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        serial: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        credit_limit: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        create_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        update_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'GiftCard',
    });

    return GiftCard;
};
