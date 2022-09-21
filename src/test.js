// @ts-check

const arr = [1, 2, 3, 4, 5, 6];

console.log(arr);
console.log(...arr);

const junuData = {
  name: '복준우',
  gender: 'M',
};
const junuInfo = {
  nickName: '시치미',
  email: 'bokjunwoo@gmail.com',
};

const junu = {
  junuData,
  junuInfo,
};
console.log(junu);

// 전개 구문 – 객체 합치기
const junus = {
  ...junuData,
  ...junuInfo,
};
console.log(junus);

const junuss = {
  ...junuData,
  junuInfo,
};
console.log(junuss);

const arr1 = [1, 2, 3];
const arr2 = ['4', '5', '6'];

const merge1 = [arr1, arr2];
console.log(merge1);
console.log(merge1[1][2]);

// 전개 구문 – 배열 합치기
const merge2 = [...arr1, ...arr2];
console.log(merge2);

// 전개 구문 – 나머지 연산자, 객체
const jun = {
  name: '복준우',
  gender: 'M',
  nickName: '시치미',
  email: 'bokjunwoo@gmail.com',
};

// const { name, gender, nickName, email } = jun;
// console.log(name, gender, nickName, email);
const { name, ...rest } = jun;
console.log(name, rest);

const arr3 = [1, 2, 3, 4, 5, 6];
const [first, second, third, fourth, fifth, sicth] = arr3;
console.log(first, second, third, fourth, fifth, sicth);

// 전개 구문 – 나머지 연산자, 배열
const arr4 = [1, 2, 3, 4, 5, 6];
const [fir, sec, ...rest1] = arr4;
console.log(fir, sec, rest1);

function spread(first, ...rest) {
  console.log(first);
  console.log(rest);
}

spread(1, 2, 3, 4, 5, 6, 7);

console.log('__dirname', __dirname);
console.log('__filename', __filename);

// app.use('/', async (req, res, next) => {
//   console.log('미들웨어 1번');

//   req.reqTime = new Date();
//   req.fileContent = await fs.promises.readFile('package.json', 'utf-8');
//   next();
// });

// app.use((req, res, next) => {
//   console.log(req.reqTime);
//   console.log(req.fileContent);
//   next();
// });

// app.use((req, res) => {
//   console.log('미들웨어 3번');
//   res.send('통신 종료');
// });
