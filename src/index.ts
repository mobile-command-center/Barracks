import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';

const app = express();
const upload = multer();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/command-center/v1/register', upload.none(), function(req, res) {
  console.log(req.body);
  res.send('가입 신청서가 성공적으로 전송되었습니다.');
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});