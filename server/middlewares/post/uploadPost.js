const path = require('path');
const fs = require('fs');

const postUpload = (images, id, title) => {
    let imgPaths = [];
    let imagesMemory;

    if (images && id && title) {
        for (let key in images) {
            const fileName = `${title.replace(/[,\s]+/g, "_")}_${id}.png`;
            const filePath = path.resolve(__dirname, '..', '..', 'static', 'upload', 'posts', fileName);

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

module.exports = postUpload;