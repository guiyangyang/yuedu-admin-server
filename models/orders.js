'use strict';
module.exports = (sequelize, Sequelize) => {
  const Orders = sequelize.define('Orders', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: 'id'
      }
    },
    videoId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Videos",
        key: 'id'
      }
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
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {
      tableName: 'orders'
    });
  Orders.associate = function (models) {
    // associations can be defined here
    Orders.belongsTo(models.Videos, {
      foreignKey: 'videoId'
    });

    Orders.belongsTo(models.Users, {
      foreignKey: 'userId'
    });
  };
  return Orders;
};