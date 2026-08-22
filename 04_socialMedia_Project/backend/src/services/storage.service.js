const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    privateKey: process.env.PRIVATE_IMAGEKIT
});

async function uploadFile(buffer){
    const result = await imagekit.files.upload({
        file:buffer.toString("base64"),
        fileName: "image.jpg"
    })

    return result;
}

module.exports = uploadFile;