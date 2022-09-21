// @ts-check

const express = require('express');

const router = express.Router();

const POST = [
  {
    title: 'title1',
    content: 'content1',
  },
  {
    title: 'title2',
    content: 'content2',
  },
];

router.get('/', (req, res) => {
  const postsLen = POST.length;
  res.render('posts', { POST, postCounts: postsLen, imgName: 'my.png' });
});

router.get('/:title', (req, res) => {
  const postData = POST.find((post) => post.title === req.params.title);
  // const userData = USER.find(function (user) {
  //   return user.id === req.params.id;
  if (postData) {
    res.send(postData);
  } else {
    const err = new Error('해당 글이 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

router.post('/', (req, res) => {
  if (Object.keys(req.query).length >= 1) {
    if (req.query.title && req.query.content) {
      const newPost = {
        title: req.query.title,
        content: req.query.content,
      };
      POST.push(newPost);
      res.send('새 글 등록완료');
    } else {
      const err = new Error('잘못된 쿼리 입니다');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body.title && req.body.content) {
      const newPost = {
        title: req.body.title,
        content: req.body.content,
      };
      POST.push(newPost);
      res.redirect('/posts');
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

router.put('/:title', (req, res) => {
  if (req.query.title && req.query.content) {
    const postData = POST.find((post) => post.title === req.params.title);
    if (postData) {
      const arrIndex = POST.findIndex(
        (post) => post.title === req.params.title
      );
      const modifyPost = {
        title: req.query.title,
        content: req.query.content,
      };
      POST[arrIndex] = modifyPost;
      res.send('글수정완료');
    } else {
      const err = new Error('해당 글이 없습니다');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('잘못된 쿼리 입니다');
    err.statusCode = 404;
    throw err;
  }
});

router.delete('/:title', (req, res) => {
  const arrIndex = POST.findIndex((post) => post.title === req.params.title);

  if (arrIndex !== -1) {
    POST.splice(arrIndex, 1);
    res.send('글 삭제완료');
  } else {
    const err = new Error('해당 글이 없습니다');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
