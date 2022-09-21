// @ts-check

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // res.cookie('이름', true) {
  //  expires(언제)
  //  httpOnly: true, -> http 통신이 발생할 때 읽힘
  // }
  res.render('index', { popup: req.cookies.popup });
});

router.post('/cookie', (req, res) => {
  res.cookie('popup', 'hide', {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true,
  });
  res.render('index');
});

module.exports = router;
