// @ts-check
const express = require('express');

const router = express.Router();

const mongoClient = require('./mongo');

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', async (req, res) => {
  const client = await mongoClient.connect();
  const userCursor = client.db('kdt1').collection('users');
  const duplicated = await userCursor.findOne({ id: req.body.id });

  // 중복이 아닌경우
  if (duplicated === null) {
    const result = await userCursor.insertOne({
      id: req.body.id,
      name: req.body.name,
      pw: req.body.pw,
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

module.exports = router;
