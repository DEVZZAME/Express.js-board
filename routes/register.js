// @ts-check
const express = require('express');

const crypto = require('crypto');

const router = express.Router();

const mongoClient = require('./mongo');

// let salt;

const createHashedPassword = (password) => {
  const salt = crypto.randomBytes(64).toString('base64');
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 10, 64, 'sha512')
    .toString('base64');
  // console.log(hashedPassword);
  // console.log(salt);
  return { hashedPassword, salt };
};

const verifyPassword = (password, salt, userPassword) => {
  const hashed = crypto
    .pbkdf2Sync(password, salt, 10, 64, 'sha512')
    .toString('base64');
  // console.log('hashed', hashed);
  // console.log('user pw', userPassword);
  if (hashed === userPassword) return true;
  return false;
};

router.get('/', (req, res) => {
  // const any = createHashedPassword('1234');
  // const some = verifyPassword('1234', salt, any);
  // console.log(some);
  res.render('register');
});

router.post('/', async (req, res) => {
  const client = await mongoClient.connect();
  const userCursor = client.db('kdt1').collection('users');
  const duplicated = await userCursor.findOne({ id: req.body.id });

  const passwordResult = createHashedPassword(req.body.pw);

  // 중복이 아닌경우
  if (duplicated === null) {
    const result = await userCursor.insertOne({
      id: req.body.id,
      name: req.body.name,
      pw: passwordResult.hashedPassword,
      salt: passwordResult.salt,
    });
    if (result.acknowledged) {
      res.status(200);
      res.send('회원 가입 성공!<br><a href="/login">로그인 페이지로 이동</a>');
    } else {
      res.status(500);
      res.send(
        '회원 가입 문제 발생!<br><a href="/register">회원가입 페이지로 이동</a>'
      );
    }
    // 중복된 경우
  } else {
    res.status(300);
    res.send(
      '중복된 id가 존재합니다!<br><a href="/register">회원가입 페이지로 이동</a>'
    );
  }
});

module.exports = { router, verifyPassword };
