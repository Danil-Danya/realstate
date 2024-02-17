const Requests = require('../models/requestModel');
const sequelize = require('../../dbconfig.js');
const sendEmail = require('../middlewares/email/sendEmail.js');
const filterRequests = require('../middlewares/email/filterEmail.js');
const { where } = require('sequelize');

class Request {
    async createRequest (req, res) {
        try {
            const { name, email, phone, question, from, isNew, fromPage, connectionType } = req.body;

            if (!name || !from || !connectionType) {
                return res.status(400).json({ message: 'You send a empty inpunt' });
            }

            sendEmail(name, email, phone, question);

            const createdRequest = await Requests.create({ name, email, phone, question, isNew, from, fromPage, connectionType });
            return res.send({ createdRequest });
        }
        catch (error) {
            console.log(error);
            return res.status(503).json({message: 'Error composing request' });
        }
    }

    async getAllRequest (req, res) {
        try {
            const filters = req.query;
            const allRequsts = await filterRequests(filters);

            res.status(200).json(allRequsts);
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: `failed to receive messages (error: ${error})` })
        }
    }

    async updateRequest (req, res) {
        try {
            const { isNew, id } = req.body;

            const updatedRequests = await Requests.update({ isNew }, { where: { id: id } });
            return res.status(200).json(updatedRequests);
        }
        catch (error) {
            console.log(error);
            res.status(503).json({message: `filed to create message (error: ${error})`});
        }
    }

    async getOneRequest (req, res) {
        try {
            const { id, name } = req.query;

            if (!id || !name) {
                return res.status(400).json({ message: 'name or message not found' });
            }

            const request = await Requests.findOne({ where: { name, id } });
            return res.send({ request });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: `failed to receive messages (error: ${error})` })
        }
    }

    async requestDelete (req, res) {
        try {
            const { id, name } = req.body;

            if (!id || !name) {
                return res.send(400).json({ message: 'name or message not found' });
            }

            const request = await Requests.destroy({ where: { name, id } });
            return res.send({ message: 'this request has been deleted' });
        }
        catch  (error) {
            console.log(error);
            res.status(400).json({ message: `failed to receive messages (error: ${error})` })
        }
    }
}

module.exports = new Request();