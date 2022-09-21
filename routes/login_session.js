// @ts-check
const express = require('express');

const router = express.Router();

const mongoClient = require('./mongo');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const client = await mongoClient.connect();
  const userCursor = client.db('kdt1').collection('users');
  const idResult = await userCursor.findOne({ id: req.body.id });

  if (idResult !== null) {
    if (idResult.pw === req.body.pw) {
      req.session.login = true;
      req.session.userId = req.body.id;
      res.redirect('/board');
    } else {
      res.status(300);
      res.send(
        '비밀번호가 틀렸습니다.<br><a href="/login"> 로그인 페이지로 이동</a>'
      );
    }
  } else {
    res.status(300);
    res.send(
      '아이디가 존재하지 않습니다.<br><a href="/login"> 로그인 페이지로 이동</a>'
    );
  }
});

router.get('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      throw err;
    }
    res.redirect('/');
  });
});
module.exports = router;
