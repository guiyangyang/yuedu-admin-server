const KoaRouter = require('koa-router');
const fs = require('fs');
const path = require('path');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const Models = require('../models');
const Sequelize = require('sequelize');

const { getRandomCharacter } = require('./../utils/public');
const { getRandomPwd } = require('./../utils/public');

const router = new KoaRouter();

/* 查询 视频buyPwd(所有信息) */
router.post('/yuedu/videoInfos', async ctx => {
  let id = ctx.request.body.id;
  if (!id) {
    return ctx.boy = {
      code: 200010,
      data: '不能为空'
    }
  };

  let rs = await Models.Videos.findOne({
    where: {
      id
    }
  });

  if (!rs) {
    return ctx.body = {
      code: 200001,
      data: '没有数据'
    }
  };
  ctx.body = {
    code: 200,
    data: rs.dataValues
  }
})

/* 查询 用户列表 */
router.post('/users', async ctx => {
  let pageSize = Number(ctx.request.body.pageSize) || 10;
  let pageNum = Number(ctx.request.body.pageNum) || 1;
  let offset = (pageNum - 1) * pageSize;

  let rs = await Models.Users.findAndCountAll({
    limit: pageSize,
    offset
  });

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
/* 条件查询 视频 */

/* 查询 视频列表 */
router.post('/yuedu/videos', async ctx => {
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
      order: [['updatedAt', 'DESC']],
      limit: pageSize,
      offset,
      attributes: { exclude: ['pwdBuy', 'linkBuy'] }
    });
  } else {
    rs = await Models.Videos.findAndCountAll({
      where: {
        type
      },
      order: [['updatedAt', 'DESC']],
      limit: pageSize,
      offset,
      attributes: { exclude: ['pwdBuy', 'linkBuy'] }
    });
  }

  if (!rs) {
    return ctx.body = {
      code: 200001,
      data: '没有数据'
    }
  }
  let nRs = rs.rows.map(item => {
    if (item.labels) {
      item.labels = item.labels.split(',')
    }
    return item;

  })
  ctx.body = {
    code: 200,
    count: rs.count,
    data: rs.rows
  }
})

/* 查询 订单列表 */
router.post('/orders', async ctx => {
  let userId = ctx.request.body.userId;
  let pageSize = Number(ctx.request.body.pageSize) || 10;
  let pageNum = Number(ctx.request.body.pageNum) || 1;
  let offset = (pageNum - 1) * pageSize;
  let rs;

  if (userId == null || userId == '') {
    rs = await Models.Orders.findAndCountAll({
      limit: pageSize,
      offset
    })
  } else {
    rs = await Models.Orders.findAndCountAll({
      where: {
        userId
      },
      limit: pageSize,
      offset
    })
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

/* 上传 视频资源 */
router.post('/uploadForm', async ctx => {
  // console.log(ctx.request.body)
  let coverimg = ctx.request.body.coverimg.trim();
  let type = ctx.request.body.type;
  let labels = ctx.request.body.labels.join(',');
  let linkBuy = ctx.request.body.linkBuy.trim();
  let linkSee = ctx.request.body.linkSee.trim();
  let price = String(ctx.request.body.price).trim();
  let pwdBuy = ctx.request.body.pwdBuy.trim();
  let pwdSee = ctx.request.body.pwdSee.trim();
  let title = ctx.request.body.title.trim();

  if (coverimg == '' || coverimg == null) {
    return ctx.body = {
      code: 200002,
      data: '上传图片不存在'
    }
  }
  let xPath = '/static/images/videos/' + getRandomCharacter(4) + '.jpg';
  let imgPath = path.join(__dirname, '../', xPath);
  let img64 = coverimg.replace(/^data:image\/\w+;base64,/, '');
  let dataBuffer = Buffer.from(img64, 'base64');
  fs.writeFile(imgPath, dataBuffer, function (err) {
    if (err) {
      console.log('图片写入失败!')
    } else {
      console.log('图片写入成功!')
    }
  })

  let newVideo = await Models.Videos.build({
    imgSrc: xPath,
    labels,
    linkBuy,
    linkSee,
    price,
    pwdBuy,
    pwdSee,
    title,
    type
  }).save();

  ctx.body = {
    code: 200,
    data: '上传成功'
  }

})

/* 用户 注册 */
router.post('/yuedu/register', async ctx => {

  let phone = String(ctx.request.body.phone).trim();
  let password = String(ctx.request.body.password).trim();

  if (!phone || !password) {
    return ctx.body = {
      code: 200004,
      data: {
        message: '注册手机号或密码不能为空！'
      }
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
      data: {
        message: '当前手机号已经被注册了！'
      }
    }
  }

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
  }, 'DQESJLGLEOCFFLCJAHBLJMHMJVDMEJIHEBHZFEBU', { expiresIn: 60 * 60 * 24 })
  ctx.body = {
    code: 200,
    token,
    data: {
      id: newUser.get('id'),
      phone,
      password,
    }
  }

})

/* 用户 登录 */
router.post('/yuedu/loginByAccount', async ctx => {
  let phone = String(ctx.request.body.phone).trim();
  let password = String(ctx.request.body.password).trim();

  if (!phone || !password) {
    return ctx.body = {
      code: 200005,
      data: {
        message: "手机号或密码不能为空"
      }
    }
  }

  let user = await Models.Users.findOne({
    where: {
      phone
    }
  })

  if (!user) {
    return ctx.body = {
      code: 200006,
      data: {
        message: '不存在该用户'
      }
    }
  };

  const token = jwt.sign({
    phone,
    id: user.get('id')
  }, 'DQESJLGLEOCFFLCJAHBLJMHMJVDMEJIHEBHZFEBU', { expiresIn: 60 * 60 * 24 })

  if (user.get('password') != md5(password)) {
    return ctx.body = {
      code: 200007,
      data: {
        message: '密码错误'
      }
    }
  }
  // ctx.session.uid = user.get('id');
  ctx.body = {
    code: 200,
    token,
    data: {
      id: user.get('id'),
      username: user.get('username'),
      phone: user.get('phone')
    }
  }
})

/* 用户 退出 */
router.post('/logout', async ctx => {
  let phone = String(ctx.request.body.phone).trim();
  let id = Number(ctx.request.body.id);

  if (!phone || !id) {
    return ctx.body = {
      code: 200005,
      data: {
        message: "不能为空"
      }
    }
  }

  let user = await Models.Users.findOne({
    where: {
      phone,
      id
    }
  })

  if (!user) {
    return ctx.body = {
      code: 200006,
      data: {
        message: '不存在该用户'
      }
    }
  };

  const token = jwt.sign({
    phone,
    id: user.get('id')
  }, 'DQESJLGLEOCFFLCJAHBLJMHMJVDMEJIHEBHZFEBU', { expiresIn: 60 * 60 * 24 })

  ctx.body = {
    code: 200,
    data: {
      message: '退出成功！'
    }
  }

})

module.exports = router;