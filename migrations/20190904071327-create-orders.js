'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      videoId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      linkBuy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pwdBuy: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      buyTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      overTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
        tableName: 'ordes',
        collate: 'utf8mb4_bin'
      }).then(() => {
        queryInterface.addIndex('orders', {
          name: 'videoId',
          fields: ['videoId']
        });
      }).then(() => {
        queryInterface.addIndex('orders', {
          name: 'userId',
          fields: ['userId']
        });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders');
  }
};