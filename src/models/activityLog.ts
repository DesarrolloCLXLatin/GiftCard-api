import { DataTypes, Model, Sequelize } from 'sequelize';

class ActivityLog extends Model {
    public id!: number;
    public userId!: number;
    public action!: string;
    public timestamp!: Date;

    static associate(models: any) {
        this.belongsTo(models.User, { foreignKey: 'userId' });
    }
}

export default (sequelize: Sequelize) => {
    ActivityLog.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: 'ActivityLog',
    });

    return ActivityLog;
};
