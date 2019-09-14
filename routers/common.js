const KoaRouter = require('koa-router');
const fs = require('fs');
const path = require('path');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const Models = require('../models');
const Sequelize = require('sequelize');

const getRandomPwd = require('./../utils/public');



const router = new KoaRouter();



/* 查询 视频列表 */
router.post('/videos', async ctx => {
  // console.log(ctx.query)
  // console.log(ctx.request.body)
  let type = ctx.request.body.type;
  let pageSize = Number(ctx.request.body.pageSize) || 10;
  let pageNum = Number(ctx.request.body.pageNum) || 1;
  let offset = (pageNum - 1) * pageSize;
  let rs;
  if (type == null) {
    return ctx.body = {
      code: 200002,
      data: 'type不存在'
    }
  }
  if (type == '') {
    rs = await Models.Videos.findAndCountAll({
      limit: pageSize,
      offset
    });
  } else {
    rs = await Models.Videos.findAndCountAll({
      where: {
        type
      },
      limit: pageSize,
      offset
    });
  }

  if (!rs) {
    return ctx.body = {
      code: 200001,
      data: '没有数据'
    }
  }

  ctx.body = {
    code: 200,
    count: rs.count,
    data: rs.rows
  }
})




/* 用户 注册 */
router.post('/register', async ctx => {

  let phone = String(ctx.request.body.phone).trim();

  if (phone == '' || phone == null) {
    return ctx.body = {
      code: 200004,
      data: '注册手机号不能为空'
    }
  }

  let user = await Models.Users.findOne({
    where: {
      phone: phone
    }
  })

  if (user !== null) {
    return ctx.body = {
      code: 3,
      data: '当前手机号已经被注册了'
    }
  }

  let password = '123456';
  // let password = getRandomPwd(6);
  let times = new Date().getTime();
  let newUser = await Models.Users.build({
    username: phone,
    phone,
    password: md5(password),
    email: '',
    regTime: times,
    logTime: times

  }).save();
  const token = jwt.sign({
    phone,
    id: newUser.get('id')
  }, 'my_token', { expiresIn: 60 * 60 * 100 })
  ctx.body = {
    code: 200,
    data: {
      id: newUser.get('id'),
      phone,
      password,
      token
    }
  }

})

/* 用户 登录 */
router.post('/login', async ctx => {
  let phone = String(ctx.request.body.phone).trim();
  let password = String(ctx.request.body.password).trim();

  if (!phone || !password) {
    return ctx.body = {
      code: 200005,
      data: "手机号或密码不能为空"
    }
  }

  let user = await Models.Users.findOne({
    where: {
      phone
    }
  })

  if (user == null) {
    return ctx.body = {
      code: 200006,
      data: '不存在该用户'
    }
  }

  if (user.get('password') != md5(password)) {
    return ctx.body = {
      code: 200007,
      data: '密码错误'
    }
  }
  // ctx.session.uid = user.get('id');
  ctx.body = {
    code: 200,
    data: {
      id: user.get('id'),
      username: user.get('username'),
      phone: user.get('phone')
    }
  }
})







module.exports = router;