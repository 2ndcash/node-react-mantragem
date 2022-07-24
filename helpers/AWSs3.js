const fs = require('fs'),
    sharp = require('sharp'),
    path = require('path'),
    AWS = require('aws-sdk'),
    config = require('config').get('AWSs3'),
    stream = require('stream')
ImageModel = require('../models/image')

const s3 = new AWS.S3({
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY
});

exports.uploadFile = (file, user) => {
    return new Promise((resolve, reject) => {
        const { filename, path, originalname } = file;

        // const buffer = fs.createReadStream(path)

        const key = `${user.id}/pictures/${filename}`

        sharp(path).rotate().webp().toBuffer()
            .then(function (dataBuffer) {
                const params = {
                    Bucket: config.BUCKET_NAME, // pass your bucket name
                    Body: dataBuffer,
                    Key: key
                };

                s3.upload(params, function (s3Err, data) {
                    if (s3Err) return reject(s3Err)
                    const locationUrl = data.Location;
                    console.log(`File uploaded successfully at ${locationUrl}`)

                    const img = new ImageModel({
                        filename: key,
                        originalName: originalname,
                        locationUrl: locationUrl,
                        user: user.id
                    })

                    img.save()

                    fs.unlinkSync(path)

                    resolve(img)
                });
            })
    });
};

exports.uploadFileShare = (file, ref, user) => {
    return new Promise((resolve, reject) => {

        const key = `${user._id}/pictures/${file.originalname}`

        const params = {
            Bucket: config.BUCKET_NAME_PUBLIC, // pass your bucket name
            Body: fs.createReadStream(file.path),
            Key: key
        };

        s3.upload(params, async function (s3Err, data) {
            if (s3Err) return reject(s3Err)
            const locationUrl = data.Location;
            console.log(`File uploaded successfully at ${locationUrl}`)

            const img = new ImageModel({
                ref: ref,
                filename: key,
                originalName: key,
                locationUrl: locationUrl,
                user: user._id
            })

            img.save()

            fs.unlinkSync(file.path)

            resolve(locationUrl)
        });
    });
};

exports.s3download = (res, name, key) => {
    return new Promise((resolve, reject) => {

        const params = {
            Bucket: config.BUCKET_NAME,
            Key: key
        };

        res.attachment(name);
        s3.getObject(params).createReadStream().pipe(res);
    });
};

exports.s3downloadAndResize = (key, width, height) => {
    const params = {
        Bucket: config.BUCKET_NAME,
        Key: key
    };

    const readStream = s3.getObject(params).createReadStream()

    let transform = sharp()

    if (format) {
        transform = transform.toFormat(format)
    }

    if (width || height) {
        transform = transform.resize(width, height)
    }

    return readStream.pipe(transform)
};

exports.download = async (req, res) => {
    try {
        const { userId, name } = req.params

        await this.s3download(res, name, `${userId}/pictures/${name}`)

    } catch (error) {
        res.send('error!' + error)
    }
}

const getFileFromS3 = async (key) => {
    return await s3.getObject({ Bucket: config.BUCKET_NAME, Key: key }).createReadStream()
}

const writeStreamToS3 = (Key) => {
    const pass = new stream.PassThrough();

    return {
        writeStream: pass,
        upload: s3.upload({
            Key,
            Bucket: config.BUCKET_NAME,
            Body: pass,
        }).promise(),
    };
}

exports.setCropImageS3 = async (user_id, data) => {
    try {
        const file = await ImageModel.findOne({ _id: data.imgId, user: user_id })

        const readStream = await getFileFromS3(file.filename)

        console.log('pre resize', data)

        const { width, height } = data.resize
        const crop = data.crop

        // const resizeStream = sharp().extract({ top: Math.round(crop.x), left: Math.round(crop.y), width: Math.round(crop.width), height: Math.round(crop.height) }).resize(width, height)
        const resizeStream = sharp().extract({ top: Math.round(crop.x), left: Math.round(crop.y), width: Math.round(crop.width), height: Math.round(crop.height) }).resize(width, height)

        var arrName = file.filename.split('/')

        console.log('write stream')

        const { writeStream, upload } = writeStreamToS3(`${user_id}/${arrName[1]}/thumbnail/${arrName[2]}`)

        // Trigger the streams
        readStream.pipe(resizeStream).pipe(writeStream);

        // Wait for the file to upload
        await upload;

    } catch (error) {
        console.log('aws s3', error)
    }
}

exports.uploadClientFile = (file, user) => {
    return new Promise((resolve, reject) => {
        const { filename, path, originalname } = file;

        // const buffer = fs.createReadStream(path)

        const key = `client/pictures/${filename}`

        sharp(path).rotate().webp().toBuffer()
            .then(function (dataBuffer) {
                const params = {
                    Bucket: config.BUCKET_NAME, // pass your bucket name
                    Body: dataBuffer,
                    Key: key
                };

                s3.upload(params, function (s3Err, data) {
                    if (s3Err) return reject(s3Err)
                    const locationUrl = data.Location;
                    console.log(`File uploaded successfully at ${locationUrl}`)

                    const img = new ImageClientModel({
                        filename: key,
                        originalName: originalname,
                        locationUrl: locationUrl
                    })

                    img.save()

                    fs.unlinkSync(path)

                    resolve(img)
                });
            })
    });
};