const uid = require('uid');
const sequelize = require('../../dbconfig.js');
const Appartaments = require('../models/appartamentModel.js');
const filterAppartaments = require('../middlewares/appartaments/appartamentsFilter.js');
const appartamentUpload = require('../middlewares/appartaments/appartamentUpload.js');
const appartamentsDelete = require('../middlewares/appartaments/appartamentsDelete.js');

class Appartament {
    async createAppartament(req, res) {
        try {
            const appartamentRequest = req.body;
            const imagesRequest = req.files;

            const imagesData = appartamentUpload(imagesRequest, appartamentRequest.unitReferense);

            appartamentRequest.imgPaths = `${imagesData.imgPaths}`;
            appartamentRequest.imagesMemory = '2mb';

            for (let key in appartamentRequest) {
                if (appartamentRequest[key] === undefined) {
                    return res.status(400).json({ message: `You send an empty key: ${key}` });
                }
            }

            const createdAppartament = await Appartaments.create(appartamentRequest);
            return res.status(201).json(createdAppartament);
        }
        catch (error) {
            console.error('Error creating appartament:', error);
            res.status(400).json({ message: 'Server error' });
        }
    }


    async getAllAppartament(req, res) {
        const filters = req.query;
        const allAppartaments = await filterAppartaments(filters);

        res.status(200).json(allAppartaments);
    }

    async getOneAppartament(req, res) {
        const { id, name } = req.query;

        if (!id && !name) {
            return res.status(400).json({ message: 'You send an apmty id or unit name' });
        }

        const findedAppartament = await Appartaments.findOne({ where: { name } });

        return res.status(200).json(findedAppartament);
    }


    async editAppartament(req, res) {
        try {
            const appartamentRequest = req.body;
            const { imgPaths, id, unitReferense } = req.body;
            const imagesRequest = req.files;

            const apartamentFileId = uid.uid();

            const deleted = appartamentsDelete(imgPaths);
            const imagesData = appartamentUpload(imagesRequest, unitReferense, apartamentFileId);

            if (deleted) {
                const uploadPath = imagesData.imgPaths;

                if (uploadPath && imgPaths) {
                    appartamentRequest.imgPaths = `${uploadPath},${imgPaths}`;
                }
                else if (uploadPath) {
                    appartamentRequest.imgPaths = `${uploadPath}`;
                }
                else {
                    appartamentRequest.imgPaths = `${imgPaths}`;
                }

                appartamentRequest.imagesMemory = '2mb';

                for (let key in appartamentRequest) {
                    if (appartamentRequest[key] === undefined) {
                        return res.status(400).json({ message: `You send an empty key: ${key}` });
                    }
                }

                const createdAppartament = await Appartaments.update(appartamentRequest, { where: { id } });
                return res.status(201).json(createdAppartament);
            }
            else {
                res.status(400).json({ message: 'Server error' });
            }
        }
        catch (error) {
            console.error('Error creating appartament:', error);
            res.status(400).json({ message: 'Server error' });
        }
    }


    async deleteAppartament(req, res) {
        try {
            const { id, name, imgPaths } = req.body;
            if (!id || !name || !imgPaths) return res.status(503).json("You send an ampty id");

            const deleted = appartamentsDelete(imgPaths);

            if (deleted) {
                await Appartaments.destroy({ where: { id } })
                    .then(() => res.status(200).json({ message: `${name} has been deleted successfully` }))
                    .catch((error) => {
                        console.error(error);
                        res.status(503).json({ message: `${name} failed to delete` });
                    });
            }
            else {
                return res.status(503).json({ message: 'Failed to remove file' });
            }
        }
        catch (error) {
            console.log(error);
            return res.status(503).json({ message: 'Failed to remove Appartament' });
        }
    }
}

module.exports = new Appartament();