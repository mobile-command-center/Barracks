import * as nodemailer from 'nodemailer';
import RegisterService, { RegisterServiceOptions } from './RegisterService';
import * as fs from 'fs';
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

describe('Register Service', () => {
    let registerService: RegisterService;

    before(function(done) {
        this.timeout(0); //before일때만 timeout 제한이 없음

        nodemailer.createTestAccount((err, account) => {
            if(err) {
                done(err);
            }
            registerService = RegisterService.getInstance({
                user: pkg.mailInfo.user,
                pass: pkg.mailInfo.pass,
                from: pkg.mailInfo.from,
                to: pkg.mailInfo.to
            });
            done();
        });
    });

    it('verify SMTP connection', done => {
        registerService.verifyConnection().then(()=> {
            done();
        });
    }).timeout(5000);

    it('send email', done => {
        const mailOptions = {
            from: 'rladlsrl89@gmail.com',
            to: 'myraous@gmail.com',
            subject: '가입신청서',
            text: '테스트'
        };

        registerService.sendEmail().then((info) => {
            console.log(info);
            done();
        });
    }).timeout(5000);
})