import originFormData from './originFormData';
import { getBankNameByBankCode, getCardNameByCardCode, getGiftCardNameByCode } from '../util/FinancialUtil';

export default class RegisterDTO {
    private formData: originFormData;

    constructor(formData: originFormData) {
        this.formData = formData;
    }

    //가입 통신사
    get vendor(): string {
        return this.formData.vendor;
    }

    /** 
     * 고객 정보
     */
    public get CustomerInfo(): CustomerInfo {
        return {
            name: this.formData.c_name,
            mobileCarrier: this.formData.c_tel2_type,
            mobileNumber: `${this.formData.c_tel21}-${this.formData.c_tel22}-${this.formData.c_tel23}`,
            mobileAuth: Boolean(this.formData.g_auth),
            emgencyNumber: `${this.formData.c_tel11}-${this.formData.c_tel12}-${this.formData.c_tel13}`,
            email: `${this.formData.c_email1}@${this.formData.c_email2}`,
            zipCode: `${this.formData.c_zipcode1}-${this.formData.c_zipcode2}`,
            address: this.formData.c_address,
            address2: this.formData.c_address2,
            securityNumber: `${this.formData.c_jumin1}${this.formData.c_jumin2}`
        }
    }

    /**
     * 상품 정보
     */
    public get ProductInfo(): ProductInfo {
        return {
            internet: this.formData.board_internet,
            tv: this.formData.board_tv,
            telephone: this.formData.board_tel,
            settoppBox: this.formData.board_settop,
            wireless: this.formData.board_wifi,
            countractDue: this.formData.g_code_promise
        }
    }

    //유선 전화 이전계약 정보
    public get PrevTelephoneContractInfo(): TelephoneContractInfo {
        return {
            carrierMoveCheck: Boolean(this.formData.telephone_carrier_move_chk),
            carrier: this.formData.g_move_company,
            phoneNumber: this.formData.g_move_tel1,
            authMethod: this.formData.g_move_auth,
            authCode: Number(this.formData.g_move_no)
        }
    }

    /**
     * 사은품 정보
     */
    public get PaybackInfo(): PaybackInfo {
        return {
            bankName : getBankNameByBankCode(Number(this.formData.g_sp_bank_code)),
            accountNumber : this.formData.g_sp_bank_acount,
            accountHolder : this.formData.g_sp_bank_holder,
            giftCardName: getGiftCardNameByCode(Number(this.formData.g_sp_giftcard_code))
        }
    }

    /**
     * 납부 정보
     */
     public get PaymentInfo(): PaymentInfo {
        return {
            paymentMethod: this.formData.g_payment_method,
            bankName: getBankNameByBankCode(Number(this.formData.g_bank_cd)),
            accountNumber: this.formData.g_bank_no,
            accountHoler: this.formData.g_bank_holder,
            cardName: getCardNameByCardCode(Number(this.formData.g_card_cd)),
            cardNumber: this.formData.g_card_no,
            cardExpirationDate: `${this.formData.g_card_gigan}년${this.formData.g_card_gigan1}월`,
            cardHolder: this.formData.g_card_holder
        };
    }

    //비고란
    public get Remarks(): string {
        return this.formData.g_bigo;
    }

    //약관 동의 여부
    public get AgreeContrat(): boolean {
        return Boolean(this.formData.w_agree);
    }

}

export interface CustomerInfo {
    name: string; //이름
    mobileCarrier: string; //통신사
    mobileNumber: string; //핸드폰 번호
    mobileAuth: boolean; //본인 여부
    emgencyNumber: string; //비상연락처
    email: string; //이메일 주소
    zipCode: string; //우편번호
    address: string; //주소
    address2: string; //상세 주소
    securityNumber: string //주민번호
}

export interface ProductInfo {
    internet: string; //인터넷 가입 상품
    tv: string; //TV가입 상품
    telephone: string; //전화 상품
    settoppBox: string; //셋텁박스
    wireless: string; //와이파이
    countractDue: string; //약정 기간
}

export interface PaybackInfo {
    bankName: string; // 사은품 지급 은행
    accountNumber: string; //사은품 지급 계좌
    accountHolder: string; //사은품 지급 계좌 예금주
    giftCardName: string; //사은품 상품권 이름
}

export interface PaymentInfo {
    paymentMethod: string; //지불 방법?? 변수명 다른걸로
    bankName: string; //은행
    accountNumber: string; //계좌번호
    accountHoler: string; //예금주
    cardName: string; //카드 이름
    cardNumber: string; //카드 번호
    cardExpirationDate: string; //카드 유효기간
    cardHolder: string; //카드주
}

export interface TelephoneContractInfo {
    carrierMoveCheck: boolean; //유선전화 통신사 변경 여부
    carrier: string; //기존 유선전화 통신사
    phoneNumber: string; //기존 유선전화 번호
    authMethod: string; //기존 유선전화 변경 인증방식
    authCode: number; //기존 유선전화 변경 인증번호
}