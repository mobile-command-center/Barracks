import * as nodemailer from 'nodemailer';
import RegisterService from './RegisterService';

describe('Register Service', () => {
    let registerService: RegisterService;

    before(function(done) {
        this.timeout(0); //before일때만 timeout 제한이 없음

        nodemailer.createTestAccount((err, account) => {
            if(err) {
                done(err);
            }
            registerService = new RegisterService(account);
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
            from: 'mobile-command-center@gmail.com',
            to: 'myraous@gmail.com',
            subject: '가입신청서',
            text: '테스트'
        };

        registerService.sendMail(mailOptions).then(() => {
            done();
        });
    }).timeout(5000);
})