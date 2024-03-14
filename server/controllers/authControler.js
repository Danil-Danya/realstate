require('dotenv').config();
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel.js');

const generateJWT = (email, password, role) => {
    return jwt.sign({ email, password, role }, process.env.SECRET_KEY, {expiresIn: '24h'});
}

class Autorization {
    async registrationUser (req, res) {
        try {
            const { email, password, role } = req.body;
            if (!email || !password || !role) return res.status(400).json({ message: 'Incorrect email or password' });

            const candidate = await User.findOne({ where: { email }});
            if (candidate) return res.status(400).json({ message: 'This user has been created' });

            const hashPassword = bycrypt.hashSync(password, 10);
            await User.create({ email, password: hashPassword, role });

            const token = generateJWT(email, hashPassword, role);
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

            const token = generateJWT(user.email, user.password, user.role);
            return res.json({token});
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Login error' });
        }
    }

    async getUsers (req, res) {
        const users = await User.findAll();
        return res.json(users);
    }

    async deleteUsers (req, res) {
        try {
            const { email } = req.body;
    
            if (!email) return res.status(400).json({ message: 'You send a empty email' });

            console.log(email);
    
            const user = await User.destroy({ where: { email } });
    
            return res.send({ message: 'this user has been deleted' });
        }
        catch (err) {
            console.log(err);
            return res.status(501).json('error');
        }
    }

    async editRoleUser (req, res) {
        try {
            const { email, role } = req.body;
    
            if (!email || !role) return res.status(400).json({ message: 'You send a empty email or role' });
    
            const editedUser = await User.update({ role }, { where: { email } });
    
            return res.send({ message: 'this user has been updated' });
        }
        catch {
            console.log(err);
            return res.status(501).json('error');
        }
    }

    async autorizationUser(req, res) {
        try {
            const clientToken = req.body.token;

            const decoded = await new Promise((resolve, reject) => {
                jwt.verify(clientToken, process.env.SECRET_KEY, (error, decoded) => {
                    error ? reject(error) : resolve(decoded);
                });
            });

            const role = decoded.role;
            res.send({ auth: true, role });
        } 
        catch (error) {
            console.log(error);
            res.send({ auth: false });
        }
    }
}

module.exports = new Autorization();