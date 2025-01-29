import { DataTypes, Model, Sequelize } from 'sequelize';

class Transaction extends Model {
    public id!: number;
    public userId!: number;
    public amount!: number;
    public type!: string;
    public timestamp!: Date;

    static associate(models: any) {
        this.belongsTo(models.User, { foreignKey: 'userId' });
        this.belongsTo(models.Admin, { foreignKey: 'adminId' });
    }
}

export default (sequelize: Sequelize) => {
    Transaction.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        type: {
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
        modelName: 'Transaction',
    });

    return Transaction;
};
