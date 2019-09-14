'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('videos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imgSrc: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      price: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '0'
      },
      linkSee: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '123'
      },
      pwdSee: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      labels: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      linkBuy: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '12'
      },
      pwdBuy: {
        type: Sequelize.STRING,
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
        tableName: 'videos',
        collate: 'utf8mb4_bin'
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('videos');
  }
};