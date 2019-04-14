import * as nodemailer from 'nodemailer';
import RegisterDTO from '../model/RegisterDTO';
import originFormData from '../model/originFormData';
import * as fs from 'fs';

const EmailTemplate = fs.readFileSync('src/resources/email.html', 'utf8');

export default class RegisterService {
    private static _instance: RegisterService;
    private _options: RegisterServiceOptions;
    private _transporter: nodemailer.Transporter;
    private _registerDTO: RegisterDTO;

    public static getInstance(options: RegisterServiceOptions): RegisterService {
        if(!this._instance) {
            this._instance = new RegisterService(options);
        }

        return this._instance;
    }

    private constructor(options: RegisterServiceOptions) {
        this._options = options;

        this._transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: options.user,
                pass: options.pass
            }
        });
    }

    public setReuqestBody(reqBody: object) {
        this._registerDTO = new RegisterDTO(reqBody as originFormData);
    }

    public async verifyConnection() {
        return new Promise((resolve, reject) => {
            this._transporter.verify(function(error, success) {
                if (error) {
                    console.log(error);
                    reject();
                } else {
                    resolve(success);
                }
            });
        })
    }

    public async sendEmail(): Promise<any> {
        if(!this._transporter) return;

        const mailOptions = {
            from: this._options.from,
            to: this._options.to,
            subject: '[모바일 고객센터] 가입신청서',
            // text: '가입신청서',
            // html: '<html><head></head><body>' +
            // '가입신청서 인데 왜 안되는 거지?'+
            // '</body></html>'
            html: EmailTemplate
        };

        return new Promise((resolve, reject) => {
            this._transporter.sendMail(mailOptions, (error: any, info: any) => {
                if(error) {
                    return reject(error);
                }
                return resolve(info);
            });

        });
    }
}

export interface RegisterServiceOptions {
    user: string;
    pass: string;
    from: string;
    to: string;
}