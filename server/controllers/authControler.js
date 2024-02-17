require('dotenv').config();
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel.js');

const generateJWT = (email, password) => {
    return jwt.sign({ email, password }, process.env.SECRET_KEY, {expiresIn: '24h'});
}

class Autorization {
    async registrationUser (req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) return res.status(400).json({ message: 'Incorrect email or password' });

            const candidate = await User.findOne({ where: { email }});
            if (candidate) return res.status(400).json({ message: 'This user has been created' });

            const hashPassword = bycrypt.hashSync(password, 10);
            await User.create({ email, password: hashPassword });

            const token = generateJWT(email, hashPassword);
            return res.send({ token });
        }
        catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Registration error', error })
        }
    }

    async indentificationUser (req, res) {
        try {
            const { email, password } = req.body;
            
            const user = await User.findOne({ where: { email }});
            if (!user) return res.status(401).json({ message: 'User is not found' });

            const decodeHashPassword = bycrypt.compareSync(password, user.password);
            if (!decodeHashPassword) return res.status(401).json({ message: 'User is not found' });

            const token = generateJWT(user.emal, user.password);
            return res.json({token});
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Login error' });
        }
    }

    async getUsers (req, res) {
        const users = await User.findAll();
        const emails = users.map(email => email.email);

        return res.json(emails);
    }

    async deleteUsers (req, res) {
        const { email } = req.body;
        const user = await User.destroy({where: {email}});

        return res.send({ message: 'this user has been deleted' });
    }

    async autorizationUser (req, res) {
        try {
            const clientToken = req.body.token;

            jwt.verify(clientToken, process.env.SECRET_KEY, (error, decoded) => {
                if (!error) {
                    console.log(decoded);
                }
                else {
                    console.log(error);
                }
            })

            return res.send({ auth: true });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Auth error' })
        }
    }
}

module.exports = new Autorization();