const nodemailer = require('nodemailer');
const User = require('../../models/userModel');

const sendEmail = async (name, email, tel, qusetion) => {
    const users = await User.findAll(); 

    console.log(users);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'danil.snip@gmail.com',
            pass: 'idyg ullx ynnc hqxi'
        }
    });

    await users.forEach(user => {
        const sendMail = transporter.sendMail({
            from: 'LuxuryOne.realestate',
            to: user.dataValues.email,
            
            html: `
                <h1>A new message has arrived on the site:</h1>
                <a href="https://test/${name}.com">Open link</a>
            `
        })
    });
}

module.exports = sendEmail;

