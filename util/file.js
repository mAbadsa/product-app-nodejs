const fs = require('fs');

const deleteFile = (filePath) => {
    fs.unlink(filePath, err => {
        if(err) {
            throw new Error('File not found');
        }
    })
}

exports.deleteFile = deleteFile;