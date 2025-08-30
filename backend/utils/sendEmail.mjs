import nodemailer from 'nodemailer';

function sendEmail(urlChangePass, userEmail) {
    
    const EMAIL_PASSWORD = 'rewn obog lilk zdur';  // Based on users acc change this password

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'wahajahmedabbas@gmail.com',
            pass: EMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: 'wahajahmedabbas@gmail.com',
        to: userEmail,
        subject: 'E-STORE: USER ACCOUNT PASSWORD RECOVERY',
        text: `Click the link below to change your account's password:\n\n${urlChangePass}\n\nThe link will work for 15 minutes only.\n\n\n\nIf you have not requested this email, kindly ignore it!`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Reset link sent.\n' + info.response);
        }
    });
}

export { sendEmail };
