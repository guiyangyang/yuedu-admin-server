
exports.getRandomCharacter = (len) => { //生成随机 时间戳+多位字符
  return Date.now() + '_' + Math.random().toString(36).substr(3, len);
}
exports.getRandomPwd = (len) => { //生成随机密码
  return Math.random().toString(36).substr(3, len);
}