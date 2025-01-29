import { Sequelize } from 'sequelize';
import User from './User';
import ActivityLog from './activityLog';
import GiftCard from './giftCards';
import Transaction from './transactions';
import Role from './role';
import Admin from './admin';
import Permission from './permissions';
import RolePermission from './rolePermissions'; // Asegúrate de crear este archivo

const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'mysql',
});

const models = {
    User: User(sequelize),
    ActivityLog: ActivityLog(sequelize),
    GiftCard: GiftCard(sequelize),
    Transaction: Transaction(sequelize),
    Role: Role(sequelize),
    Admin: Admin(sequelize),
    Permission: Permission(sequelize),
    RolePermission: RolePermission(sequelize),
};

Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

const db = {
    ...models,
    sequelize,
};

export default db;
