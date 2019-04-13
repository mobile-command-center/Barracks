import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import * as fs from 'fs';
import RegisterService from './services/RegisterService';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const app = express();
const upload = multer();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/command-center/v1/register', upload.none(), function(req, res) {
  const registerService = RegisterService.getInstance(pkg.mailInfo);

  console.log(req.body);
  registerService.sendMail({
    from: pkg.mailInfo.from,
    to: pkg.mailInfo.to,
    subject: `${req.body.c_name}가입 신청서`,
    text: '가입 신청서 샘플이요'
  });
  res.send('가입 신청서가 성공적으로 전송되었습니다.');
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});