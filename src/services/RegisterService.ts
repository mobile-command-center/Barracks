import * as nodemailer from 'nodemailer';

export default class RegisterService {
    private _user: string;
    private _pass: string;
    private _transporter: nodemailer.Transporter;
    private static _instance: RegisterService;

    public static getInstance(options: {user: string, pass: string}): RegisterService {
        if(!this._instance) {
            this._instance = new RegisterService(options);
        }

        return this._instance;
    }

    private constructor(options: {user: string, pass: string}) {
        this._user = options.user;
        this._pass = options.pass;

        this._transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: options.user,
                pass: options.pass
            }
        });
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
    public async sendMail(mailOptions: {from: string, to: string, subject: string, text: string}): Promise<any> {
        if(!this._transporter) return;

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