const path = require('path');
const multer = require('multer');

const tmpFolder = path.resolve(__dirname, "..", '..','uploads');
console.log(tmpFolder)
module.exports = {
    directory: tmpFolder,
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(request, file, callback) {
            const { id } = request.params;
            const filename = `${id}.jpeg`;
            return callback(null, filename);
        }
    })
}