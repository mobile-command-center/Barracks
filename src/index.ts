import * as express from 'express';
import * as morgan from 'morgan';

const app = express();

app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api', function(req, res) {
  res.send('Hellow World2');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});