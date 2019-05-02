import * as nodemailer from 'nodemailer';
import RegisterService from './RegisterService';
import originFormData from '../model/originFormData';
import * as fs from 'fs';
import RegisterDTO from '../model/RegisterDTO';
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

const LGSampleData: originFormData = {
    vendor: 'LG',
    telephone_carrier_move_chk: 'true',
    c_name: '김진구',
    c_tel2_type: 'SK',
    c_tel21: '010',
    c_tel22: '0323',
    c_tel23: '3564',
    g_auth: 'true',
    c_tel11: '070',
    c_tel12: '4123',
    c_tel13: '6321',
    c_email1: 'myraous',
    c_email2: 'msn.com',
    emailCheck: 'msn.com',
    c_zipcode1: '463',
    c_zipcode2: '894',
    c_address: '경기 성남시 분당구 동판교로',
    c_jumin1: '880512',
    c_jumin2: '1674326',
    g_payment_method: '카드',
    g_bank_cd: '3',
    g_bank_no: '620-209007-853',
    g_bank_holder: '김진구',
    g_card_cd: '14',
    g_card_no: '123123',
    g_card_gigan: '11',
    g_card_gigan1: '2',
    g_card_holder: '김진구',
    content_copy: 'Y',
    g_sp_method: '상품권',
    g_sp_bank_code: '3',
    g_sp_bank_acount: '620-2023307-853',
    g_sp_bank_holder: '김진구',
    g_sp_giftcard_code: '1',
    board_internet: '와이파이기본_광랜안심(100M)',
    board_tv: 'TV베이직 - 183채널',
    board_tel: 'WiFi(무선)전화 - 번호이동Y',
    board_settop: 'UHD셋탑',
    board_wifi: '신청',
    g_code_promise: '3년약정',
    g_move_company: 'LG',
    g_move_tel1: '010-4073-2101',
    g_move_auth: '지로납부 뒤 네자리',
    g_move_no: '2323',
    g_bigo: '비고란이다 ㅎㅎㅎ',
    w_agree: 'true'
}

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
            from: 'support@ajungweb.co.kr',
            to: 'myraous@naver.com',
        };

        registerService.setRegisterDTO(new RegisterDTO(LGSampleData));
        registerService.sendEmail(mailOptions).then((info) => {
            console.log(info);
            done();
        });
    }).timeout(5000);
})