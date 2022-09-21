// @ts-check

const express = require('express');

const router = express.Router();

const USER = [
  {
    id: 'a',
    name: 'junu',
    email: 'junu@gg',
  },
  {
    id: 'b',
    name: 'test',
    email: 'test@gg',
  },
];

router.get('/', (req, res) => {
  const userLen = USER.length;
  res.render('users', { USER, userCounts: userLen, imgName: 'my.png' });
});

router.get('/:id', (req, res) => {
  const userData = USER.find((user) => user.id === req.params.id);
  // const userData = USER.find(function (user) {
  //   return user.id === req.params.id;
  if (userData) {
    res.send(userData);
  } else {
    const err = new Error('해당 아이디를 가진 회원이 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

router.post('/', (req, res) => {
  if (Object.keys(req.query).length >= 1) {
    if (req.query.id && req.query.name && req.query.email) {
      const newUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER.push(newUser);
      res.send('회원등록완료');
    } else {
      const err = new Error('잘못된 쿼리 입니다');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body.id && req.body.name && req.body.email) {
      const newUser = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
      };
      USER.push(newUser);
      res.redirect('/users');
    } else {
      const err = new Error('잘못된 쿼리 입니다');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('데이터가 없습니다');
    err.statusCode = 404;
    throw err;
  }
});

// postRouter.put('/', (req, res) => {
//   if (req.query.id && req.query.name) {
//     const changeUser = {
//       id: req.query.id,
//       name: req.query.name,
//     };
//     USER.push(changeUser);
//     res.send('회원수정완료');
//   } else {
//     res.end('잘못된 쿼리 입니다');
//   }
// });

router.put('/:id', (req, res) => {
  if (req.query.id && req.query.name) {
    const userData = USER.find((user) => user.id === req.params.id);
    if (userData) {
      const arrIndex = USER.findIndex((user) => user.id === req.params.id);
      const modifyUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      USER[arrIndex] = modifyUser;
      res.send('회원수정완료');
    } else {
      const err = new Error('해당 ID를 가진 회원이 없습니다');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('잘못된 쿼리 입니다');
    err.statusCode = 404;
    throw err;
  }
});

router.delete('/:id', (req, res) => {
  const arrIndex = USER.findIndex((user) => user.id === req.params.id);

  // if (arrIndex) {
  //   res.send('회원삭제완료');
  // } else {
  //   res.end('잘못된 쿼리 입니다');
  // }
  if (arrIndex !== -1) {
    USER.splice(arrIndex, 1);
    res.send('회원삭제완료');
  } else {
    const err = new Error('해당 ID를 가진 회원이 없습니다');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
