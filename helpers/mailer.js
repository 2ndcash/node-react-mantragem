var nodemailer = require('nodemailer');
var config = require('config')
const MailLogModal = require('../models/mail_log')

var transporter = nodemailer.createTransport({
    host: config.get('email').host, // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers: 'SSLv3'
    },
    // service: "hotmail",
    auth: {
        user: config.get('email').username,
        pass: config.get('email').password
    }
});

exports.sendVerifyMail = async (req, receiver, token) => {
    try {
        const baseUrl = config.get('baseUrl')
        const link = `${baseUrl}/verify?token=${token}&uuid=${new Date().getTime()}`
        const body = getVerifyMailTemplate(receiver, baseUrl, link)

        const mailOptions = {
            from: `"2ndCash" <${config.get('email').username}>`, // sender address
            to: receiver, // list of receivers
            subject: 'Please verify your email address', // Subject line
            html: body// plain text body
        };

        transporter.sendMail(mailOptions, async function (err, info) {
            if (err) throw err

            console.log('done!', info)

            await MailLogModal.create({ message: 'done!', error: false, receiver: receiver, info: info })
        })
    }
    catch (err) {
        console.log('error', err)

        await MailLogModal.create({ message: 'error', error: true, receiver: receiver, info: err })
    }
}

// exports.sendResetMail = async (req, receiver, token) => {
//     try {
//         const link = `${config.get('baseUrl')}/auth/reset?token=${token}&uuid=${new Date().getTime()}`
//         const baseUrl = config.get('baseUrl')
//         const body = getRestMailTemplete(baseUrl, link)

//         const mailOptions = {
//             from: `"RadarOS" <${config.get('gmail').username}>`, // sender address
//             to: receiver, // list of receivers
//             subject: 'Reset your password', // Subject line
//             html: body// plain text body
//         };

//         transporter.sendMail(mailOptions, function (err, info) {
//             if (err) throw err

//             console.log('done!', info)
//         })
//     }
//     catch (err) {
//         console.log('error', err)
//     }
// }

// exports.sendConfirmDealMail = async (receiver, productName) => {
//     try {
//         const link = `${config.get('baseUrl')}/user/deal-status?tab=int`
//         const body = getConfirmDealMailTemplate(productName, link)

//         const mailOptions = {
//             from: `"RadarOS" <${config.get('gmail').username}>`, // sender address
//             to: receiver, // list of receivers
//             subject: 'แจ้งเตือนจาก RADARos.co: กำลังมีผู้เสนอสินค้าให้กับท่าน', // Subject line
//             html: body// plain text body
//         };

//         transporter.sendMail(mailOptions, function (err, info) {
//             if (err) throw err

//             console.log('done!', info)
//         })
//     }
//     catch (err) {
//         console.log('error', err)
//     }
// }

// exports.sendGotoInvMail = async (receiver) => {
//     try {
//         const link = `${config.get('baseUrl')}/user/order-sum`
//         const body = getGotoInvMailTemplate(link)

//         const mailOptions = {
//             from: `"RadarOS" <${config.get('gmail').username}>`, // sender address
//             to: receiver, // list of receivers
//             subject: 'แจ้งเตือนจาก RADARos.co: คำร้องของท่านถูกอนุมติแล้ว', // Subject line
//             html: body// plain text body
//         };

//         transporter.sendMail(mailOptions, function (err, info) {
//             if (err) throw err

//             console.log('done!', info)
//         })
//     }
//     catch (err) {
//         console.log('error', err)
//     }
// }

// exports.sendAddToDealMail = async (receiver, countryName) => {
//     try {
//         const link = `${config.get('baseUrl')}/user/deal-status`
//         let body = "";

//         if(countryName) body = getBuyerInterestMailTemplate(countryName, link)
//         else body = getBuyerInterestMailTemplate(link)

//         const mailOptions = {
//             from: `"RadarOS" <${config.get('gmail').username}>`, // sender address
//             to: receiver, // list of receivers
//             subject: 'แจ้งเตือนจาก RADARos.co: มีผู้สนใจสินค้าของท่าน', // Subject line
//             html: body// plain text body
//         };

//         transporter.sendMail(mailOptions, function (err, info) {
//             if (err) throw err

//             console.log('done!', info)
//         })
//     }
//     catch (err) {
//         console.log('error', err)
//     }
// }

const getConfirmDealMailTemplate = (productName, link) => {
    return `
    <p>เรียน ท่านสมาชิก<br /><br /></p>
<p>ตอนนี้มีผู้สนใจนำเสนอสินค้า<strong> ${productName} </strong> ให้กับท่าน กรุณาทำการอนุมัติภายใน 7 วัน ต้องการดูรายละเอียดอื่นๆได้ที่&nbsp;<a tabindex="0" role="link" href="${link}" target="_blank" rel="nofollow noopener">${link}</a></p>
<p><br />ขอแสดงความนับถือ<br />RADARos.co</p>
<p><br />อีเมลฉบับนี้เป็นการแจ้งข้อมูลจากระบบโดยอัตโนมัติ กรุณาอย่าตอบกลับ</p>`
}

const getGotoInvMailTemplate = (link) => {
    return `
    <p>เรียน ท่านสมาชิก<br /><br /></p>
<p>ตอนนี้คำร้องของท่านได้รับการอนุมัติเรียบร้อยแล้ว กรุณาดำเนินต่อที่ขั้นตอนการชำระเงิน ต้องการดูรายละเอียดอื่นๆได้ที่&nbsp;<a tabindex="0" role="link" href="${link}" target="_blank" rel="nofollow noopener">${link}</a></p>
<p><br />ขอแสดงความนับถือ<br />RADARos.co</p>
<p><br />อีเมลฉบับนี้เป็นการแจ้งข้อมูลจากระบบโดยอัตโนมัติ กรุณาอย่าตอบกลับ</p>`
}

const getBuyerInterestMailTemplate = (countryName, link) => {
    return `
    <p>เรียน ท่านสมาชิก<br /><br /></p>
<p>ตอนนี้มีผู้สนใจสินค้าของท่านจากประเทศ<strong> ${countryName} </strong> ต้องการดูรายละเอียดอื่นๆได้ที่&nbsp;<a tabindex="0" role="link" href="${link}" target="_blank" rel="nofollow noopener">${link}/user/deal-status</a></p>
<p><br />ขอแสดงความนับถือ<br />RADARos.co</p>
<p><br />อีเมลฉบับนี้เป็นการแจ้งข้อมูลจากระบบโดยอัตโนมัติ กรุณาอย่าตอบกลับ</p>`
}

const getBuyerInterest2MailTemplate = (countryName, link) => {
    return `
    <p>เรียน ท่านสมาชิก<br /><br /></p>
<p>ตอนนี้มีผู้สนใจสินค้าของท่าน </strong> ต้องการดูรายละเอียดอื่นๆได้ที่&nbsp;<a tabindex="0" role="link" href="${link}" target="_blank" rel="nofollow noopener">${link}/user/deal-status</a></p>
<p><br />ขอแสดงความนับถือ<br />RADARos.co</p>
<p><br />อีเมลฉบับนี้เป็นการแจ้งข้อมูลจากระบบโดยอัตโนมัติ กรุณาอย่าตอบกลับ</p>`
}

const getVerifyMailTemplate = (receiver, baseUrl, link) => {
    return `Thanks for creating an account with the verification demo app. Please follow the link below to verify your email address <a href="${link}">Click here to verify</a>`
}

const getRestMailTemplete = (baseUrl, link) => {
    return `<!DOCTYPE html>
    <html style="-webkit-box-sizing: border-box;box-sizing: border-box;font-family: -apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif;line-height: 1.5;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-weight: normal;color: rgba(0,0,0,0.87);">
    
    <head style="-webkit-box-sizing: inherit;box-sizing: inherit;font-family: 'Prompt', sans-serif;">
        <!--Import Google Icon Font-->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" style="-webkit-box-sizing: inherit;box-sizing: inherit;font-family: 'Prompt', sans-serif;">
        <!-- Compiled and minified CSS -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" style="-webkit-box-sizing: inherit;box-sizing: inherit;font-family: 'Prompt', sans-serif;">
    
        <!--Let browser know website is optimized for mobile-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0" style="-webkit-box-sizing: inherit;box-sizing: inherit;font-family: 'Prompt', sans-serif;">
        <style type="text/css" style="-webkit-box-sizing: inherit;box-sizing: inherit;font-family: 'Prompt', sans-serif;">
            * {
                font-family: 'Prompt', sans-serif;
            }
    
            .site-logo {
                width: 100%;
                padding: 0 25vw;
            }
    
            .radar-color {
                color: #283e75;
            }
    
            .title-h1 {
                font-weight: 600;
                font-size: 3em;
            }
    
            .welcome {
                font-size: 1.5em;
                margin: 0.7rem 0;
            }
    
            .radar-style {
                background-color: #283e75;
            }
    
            .radar-style:hover {
                background-color: #19284b;
            }
    
            h1 {
                margin: 1.6rem 0;
            }
    
            h2 {
                margin: 1.3rem 0;
            }
    
            .btn-verify {
                margin-top: 1em;
            }
    
            .container {
                margin-top: 2em;
            }
        </style>
    </head>
    
    <body style="-webkit-box-sizing: inherit;box-sizing: inherit;font-family: 'Prompt', sans-serif;margin: 0;">
    <div class="container radar-color" style="box-sizing: inherit; font-family: Prompt, sans-serif; margin: 2em auto 0px; max-width: 1280px; width: 90%; color: #283e75; text-align: center;"><img src="${baseUrl}/public/images/verify.png" alt="" width="185" height="240" /><br />
    <h1 class="center title-h1" style="-webkit-box-sizing: inherit; box-sizing: inherit; font-family: 'Prompt', sans-serif; font-size: 3em; margin: 1.6rem 0; line-height: 1.3; font-weight: 600; text-align: center;">Reset your password</h1>
    <h2 class="center welcome" style="-webkit-box-sizing: inherit; box-sizing: inherit; font-family: 'Prompt', sans-serif; font-weight: 400; line-height: 110%; font-size: 1.5em; margin: 0.7rem 0; text-align: center;">You told us you forgot your password.</h2>
    <h2 class="center welcome" style="-webkit-box-sizing: inherit; box-sizing: inherit; font-family: 'Prompt', sans-serif; font-weight: 400; line-height: 110%; font-size: 1.5em; margin: 0.7rem 0; text-align: center;">If you really did, click here to choose a new one:</h2>
    <div class="center" style="-webkit-box-sizing: inherit; box-sizing: inherit; font-family: 'Prompt', sans-serif; text-align: center;"><a class="waves-effect waves-light btn-large radar-style btn-verify" style="-webkit-box-sizing: inherit; box-sizing: inherit; font-family: 'Prompt', sans-serif; background-color: #283e75; -webkit-text-decoration-skip: objects; color: #fff; text-decoration: none; -webkit-tap-highlight-color: transparent; -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2); box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2); border: none; border-radius: 2px; display: inline-block; height: 54px; line-height: 54px; padding: 0 28px; text-transform: uppercase; vertical-align: middle; font-size: 15px; outline: 0; text-align: center; letter-spacing: .5px; -webkit-transition: .3s ease-out; transition: .3s ease-out; cursor: pointer; position: relative; overflow: hidden; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; z-index: 1; margin-top: 1em;" href="${link}">Choose a New Password</a></div>
    </div>
    <div class="container" style="-webkit-box-sizing: inherit; box-sizing: inherit; font-family: 'Prompt', sans-serif; margin: 0 auto; max-width: 1280px; width: 90%; margin-top: 2em;">
    <h2 class="center welcome grey-text" style="-webkit-box-sizing: inherit; box-sizing: inherit; font-family: 'Prompt', sans-serif; font-weight: 400; line-height: 110%; font-size: 1.5em; margin: 0.7rem 0; text-align: center; color: #9e9e9e !important;">If you didn’t mean to reset your password, then you can just ignore this</h2>
    <h2 class="center welcome grey-text" style="-webkit-box-sizing: inherit; box-sizing: inherit; font-family: 'Prompt', sans-serif; font-weight: 400; line-height: 110%; font-size: 1.5em; margin: 0.7rem 0; text-align: center; color: #9e9e9e !important;">email; your password will not change.</h2>
    </div>
    <!--JavaScript at end of body for optimized loading-->
    <p>&nbsp;</p>
    </body>
    
    </html>`
}