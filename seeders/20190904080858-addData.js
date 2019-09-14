'use strict';

const md5 = require('md5');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('users', [
      {
        username: 'xiaoyang001',
        phone: '15510370701',
        password: md5('123456'),
        email: '155@qq.com',
        regTime: '123452',
        logTime: '123213'
      },
      {
        username: 'xiaoyang002',
        phone: '15510370702',
        password: md5('123456'),
        email: '151@qq.com',
        regTime: '1234511',
        logTime: '1232131'
      }
    ], {}).then(data => {
      return queryInterface.bulkInsert('videos', [
        {
          imgSrc: 'https://www.baidu.com/img/bd_logo1.png?where=super',
          type: 'html/css',
          title: 'html/css入门',
          price: '0',
          linkSee: 'https://www.baidu.com',
          linkBuy: 'https://www.baidu.com',
          pwdSee: 'see',
          pwdBuy: 'buy',
          labels: 'HTML/CSS'
        },
        {
          imgSrc: 'https://www.baidu.com/img/bd_logo1.png?where=super',
          type: 'html/css2',
          title: 'html/css2入门',
          price: '0',
          linkSee: 'https://www.baidu.com',
          linkBuy: 'https://www.baidu.com',
          pwdSee: 'see',
          pwdBuy: 'buy',
          labels: 'HTML/CSS'
        },

      ], {}).then(data => {
        return queryInterface.bulkInsert('orders', [
          {
            videoId: 1,
            userId: 1,
            title: 'html/css入门',
            price: '0',
            linkBuy: 'http://www.baidu.com',
            pwdBuy: 'buy',
            buyTime: 111,
            overTime: 112
          },
          {
            videoId: 1,
            userId: 2,
            title: 'html/css入门',
            price: '0',
            linkBuy: 'http://www.baidu.com',
            pwdBuy: 'buy',
            buyTime: 123,
            overTime: 1234
          },
          {
            videoId: 2,
            userId: 1,
            title: 'html/css入门',
            price: '0',
            linkBuy: 'http://www.baidu.com',
            pwdBuy: 'buy',
            buyTime: 1232,
            overTime: 3212
          }
        ]);
      })
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('users', null, {});
  }
};
