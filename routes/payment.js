const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");




function encryptData(data) {
    let absolutePath = path.resolve('./publicKey');
    let publicKey = fs.readFileSync(absolutePath, "utf8");
    var buffer = Buffer.from(data);
    var encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
}


var d = new Date();
var n = d.getUTCDate();

console.log(n);


let a = encryptData("d");
console.log(a.toString());





let merchant_reference_temp = '123213131441341';
let amount_temp = '1.000';
let callback_url_temp = 'https://thawani.oncloud.om/ecommerce/paymentCallback.php';
let remark_temp = 'nothing';
let payment_expiry_date_temp = '';
let merchant_fields_temp = {};
let email_temp = "test@gmail.com";
let return_url_temp = "https://thawani.oncloud.om/ecommerce/paymentReturn.php";
let next_url_temp = "https://thawani.oncloud.om/ecommerce/paymentReturn.php";
let language_temp = "en";
let guestuser_url_temp = "http://uat.thawani.om:7501/ECommerce/GuestUser.aspx?REFID=";
let sucess_url_temp = "https://thawani.oncloud.om/ecommerce/paymentReturn.php"



let merchant_reference = JSON.parse(crypt.encrypt(privatekey, merchant_reference_temp));
let amount = JSON.parse(crypt.encrypt(privatekey, amount_temp));
let callback_url = JSON.parse(crypt.encrypt(privatekey, callback_url_temp));

let remark = JSON.parse(crypt.encrypt(privatekey, remark_temp));
let payment_expiry_date = JSON.parse(crypt.encrypt(privatekey, payment_expiry_date_temp));
let merchant_fields = JSON.parse(crypt.encrypt(privatekey, merchant_fields_temp));

let email = JSON.parse(crypt.encrypt(privatekey, email_temp));
let return_url = JSON.parse(crypt.encrypt(privatekey, return_url_temp));
let next_url = JSON.parse(crypt.encrypt(privatekey, next_url_temp));

let language = JSON.parse(crypt.encrypt(privatekey, language_temp));
let guestuser_url = JSON.parse(crypt.encrypt(privatekey, guestuser_url_temp));
let sucess_url = JSON.parse(crypt.encrypt(privatekey, sucess_url_temp));


router.post('/payment', (req, res) => {
    let rp = {
        amount: amount.cipher,
        merchant_reference: merchant_reference.cipher,
        remark: remark.cipher,
        email: email.cipher,
        language: language.cipher,
        payment_expiry_date: payment_expiry_date.cipher,
        return_url: return_url.cipher,
        callback_url: callback_url.cipher,
        merchant_fields: merchant_fields.cipher,
        next_url: next_url.cipher,
        guestuser_url: guestuser_url.cipher,
        sucess_url: sucess_url.cipher
    }
    res.json(rp);
});



module.exports = router;

