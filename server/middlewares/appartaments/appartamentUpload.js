const path = require('path');
const fs = require('fs');

const appartamentUpload = (images, unicalKey) => {
    let imgPaths = [];
    let imagesMemory;

    console.log(unicalKey, images);

    if (images && unicalKey) {
        for (let key in images) {
            const fileName = `${unicalKey}_${key}.png`;
            const filePath = path.resolve(__dirname, '..', '..', 'static', 'upload', 'apartaments', fileName);

            const directoryPath = path.dirname(filePath);

            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath, { recursive: true });
            }

            imagesMemory = images[key].size / 1024 + 'mb';

            images[key].mv(filePath);
            imgPaths.push(fileName);
        }
    }

    return { imgPaths, imagesMemory };
}

module.exports = appartamentUpload;