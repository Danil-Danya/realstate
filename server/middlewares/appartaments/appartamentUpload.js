const path = require('path');
const fs = require('fs');

const appartamentUpload = (images, unicalKey, fileId) => {
    let imgPaths = [];
    let imagesMemory;

    if (images && unicalKey) {
        for (let key in images) {
            const fileName = `${unicalKey}_${key}_${fileId}.png`;
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

    return { imgPaths: imgPaths.length > 1 ? imgPaths : imgPaths[0], imagesMemory };
}

module.exports = appartamentUpload;
