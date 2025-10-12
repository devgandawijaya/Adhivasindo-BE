const sequelize = require('../config/database');
const User = require('./User');
const Content = require('./Content');

// Associations
User.hasMany(Content, { foreignKey: 'userId' });
Content.belongsTo(User, { foreignKey: 'userId' });

// Sync database
sequelize.sync({ alter: true }).then(() => console.log('Database synced'));

module.exports = { User, Content };