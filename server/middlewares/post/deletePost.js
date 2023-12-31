const fs = require('fs').promises;
const path = require('path');

const deleteFiles = async (filePaths) => {
    const fileArray = filePaths;
    
    for (const filePath of fileArray) {
        try {
            const joinPath = path.join(__dirname, '..', '..', 'static', 'upload', 'posts', filePath);
            const fullPath = path.resolve(__dirname, '..', '..', 'static', 'upload', 'posts', filePath);

            await fs.access(joinPath, fs.constants.F_OK);
            await fs.unlink(fullPath);

            return true;
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.error(`Error deleting file: ${filePath} - file does not exist`);
                return false;
            } else {
                console.error(`Error deleting file: ${filePath}`, err);
                return false;
            }
        }
    }
};

module.exports = deleteFiles;

