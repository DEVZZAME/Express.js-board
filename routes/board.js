// @ts-check

const express = require('express');

const multer = require('multer');

const fs = require('fs');

const router = express.Router();

const mongoClient = require('./mongo');

const login = require('./login');

const dir = './uploads';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now());
  },
});
const limits = {
  fileSize: 1024 * 1028 * 2,
};

const upload = multer({ storage, limits });

router.get('/', login.isLogin, async (req, res) => {
  // 글 전체 목록 보여주기
  console.log(req.user);
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('board');
  const ARTICLE = await cursor.find({}).toArray();
  const articleLen = ARTICLE.length;
  res.render('board', {
    ARTICLE,
    articleCounts: articleLen,
    userId: req.session.userId
      ? req.session.userId
      : req.user?.id
      ? req.user?.id
      : req.signedCookies.user,
  });
});

router.get('/write', login.isLogin, (req, res) => {
  // 글 쓰기 모드로 이동
  res.render('board_write');
});

router.post('/write', login.isLogin, upload.single('img'), async (req, res) => {
  // 글 추가 모드로 이동
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  console.log(req.file);
  if (req.body.title && req.body.content) {
    const newArticle = {
      id: req.session.userId ? req.session.userId : req.user.id,
      userName: req.user?.name ? req.user.name : req.user?.id,
      title: req.body.title,
      content: req.body.content,
      img: req.file ? req.file.filename : null,
    };
    const client = await mongoClient.connect();
    const cursor = client.db('kdt1').collection('board');
    await cursor.insertOne(newArticle);
    res.redirect('/board');
  }
});

router.get('/modify/title/:title', login.isLogin, async (req, res) => {
  // 글 수정 모드로 이동
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('board');
  const selectedArticle = await cursor.findOne({ title: req.params.title });
  res.render('board_modify', { selectedArticle });
});

router.post('/modify/title/:title', login.isLogin, async (req, res) => {
  // 글 수정 기능 수행
  if (req.body.title && req.body.content) {
    const client = await mongoClient.connect();
    const cursor = client.db('kdt1').collection('board');
    await cursor.updateOne(
      { title: req.params.title },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
        },
      }
    );
    res.redirect('/board');
  }
});

router.delete('/delete/title/:title', login.isLogin, async (req, res) => {
  // 글 삭제 기능 수행
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('board');
  // 예외처리
  const result = await cursor.deleteOne({ title: req.params.title });
  if (result.acknowledged) {
    res.send('삭제완료');
  } else {
    const err = new Error('삭제 실패');
    err.statusCode = 404;
    throw err;
  }
});
router.get('/detail/:title', async (req, res) => {
  const client = await mongoClient.connect();
  const cursor = client.db('kdt1').collection('board');
  const ARTICLE = await cursor.findOne({ title: req.params.title });
  res.render('board_detail', { ARTICLE });
  // res.render('board_detail.ejs', { ARTICLE });
});

module.exports = router;
