'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10)
      },
      phone: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      password: {
        type: Sequelize.CHAR(32),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      regTime: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      logTime: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(0)
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(0)
      }
    }, {
        timestamps: false,
        charset: 'utf8mb4',
        tableName: 'users',
        collate: 'utf8mb4_bin'
      }).then(() => {
        return queryInterface.addIndex('users', {
          name: 'phone',
          unique: true,
          fields: ['phone']
        })
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};