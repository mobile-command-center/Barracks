import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import * as fs from 'fs';
import RegisterService from './services/RegisterService';
import RegisterDTO from './model/RegisterDTO';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const app = express();
const upload = multer();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/barracks/v1/register', upload.none(), function(req, res) {
  const registerDTO = new RegisterDTO(req.body);
  const registerService = RegisterService.getInstance(pkg.mailInfo);
  registerService.setRegisterDTO(registerDTO);
  registerService.sendEmail(pkg.mailInfo).then((info) => {
    console.log(info);
    res.send('가입 신청서가 성공적으로 전송되었습니다.');
  }).catch((error) => {
    console.error(error);
    res.send('신청서 작성에 실패 하였습니다.');
  })
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});