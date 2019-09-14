'use strict';
module.exports = (sequelize, Sequelize) => {
  const Videos = sequelize.define('Videos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    imgSrc: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    linkSee: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pwdSee: {
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
    labels: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    }
  }, {
      tableName: 'videos'
    });
  Videos.associate = function (models) {
    // associations can be defined here
    Videos.hasMany(models.Orders, {
      foreignKey: 'videoId'
    })

  };
  return Videos;
};