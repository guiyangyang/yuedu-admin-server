'use strict';
module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    phone: {
      type: Sequelize.STRING,
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
      type: Sequelize.STRING,
      allowNull: false
    },
    regTime: {
      type: Sequelize.STRING,
      allowNull: false
    },
    logTime: {
      type: Sequelize.STRING,
      allowNull: false
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
      tableName: 'users'
    });
  Users.associate = function (models) {
    // associations can be defined here
    Users.hasMany(models.Orders, {
      foreignKey: 'userId'
    })

  };
  return Users;
};