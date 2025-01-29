import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', // o el dialecto que estés usando
});

sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
});

export default sequelize;
