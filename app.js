// @ts-check

const express = require('express');

// const bodyParser = require('body-parser'); 기본기능
const cookieParser = require('cookie-parser');
// 세션모듈 추가
const session = require('express-session');
// passport
const passport = require('passport');
// dotenv
require('dotenv').config();

// 분리
// const LocalStrategy = require('passport-local').Strategy;
// const mongoClient = require('./routes/mongo');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); // 공식화
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// 기본기능이여서 express 사용
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookieParser 사용
app.use(cookieParser('zzame'));

// 세션모듈 추가
app.use(
  session({
    secret: 'zzame', // 암호화
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

// passport 는 session아래에 적어야 사용이 가능
app.use(passport.initialize());
app.use(passport.session());

const router = require('./routes/index');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
// 과제리뷰
const boardRouter = require('./routes/board');
// 회원가입
const registerRouter = require('./routes/register');
// 로그인
const loginRouter = require('./routes/login');
// localStrategy
const passportRouter = require('./routes/passport');
const chatRouter = require('./routes/chat');

// passport 사용
passportRouter();

app.use('/', router);
app.use('/users', userRouter);
app.use('/posts', postRouter);
// 과제리뷰
app.use('/board', boardRouter);
// 회원가입
app.use('/register', registerRouter.router);
// 로그인
app.use('/login', loginRouter.router);
app.use('/chat', chatRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500);
  res.send(err.message);
});

app.listen(process.env.PORT, () => {
  console.log(`서버가 ${process.env.PORT}번 포트에서 작동중입니다.`);
});

// app.get('/:id/:name/:gender', (req, res) => {
//   console.log(req.params);
//   res.send(req.params);
// });

// app.get('/', (req, res) => {
//   // console.log(req.query);
//   console.log(req.query.title);
//   console.log(req.query.content);
//   res.send(req.query);
// });

// 실습
// app.get('/:email/:passward/:name/:gender', (req, res) => {
//   console.log(req.params);
//   res.send(req.params);
// });
