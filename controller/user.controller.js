const fs = require('fs-extra').promises;
const {userService, emailService} = require('../service');
const {passwordsHasher, filePathBuider} = require('../helper');
const {errorMessages, ErrorHendler} = require('../error');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const {
                body: {
                    password, email, name, secret_word
                }, photos, docs, videos
            } = req;

            const hashSecretWord = await passwordsHasher.hash(secret_word);

            const hashPassword = await passwordsHasher.hash(password);

            const createdUser = await userService.createUser({
                ...req.body,
                password: hashPassword,
                secret_word: hashSecretWord
            });

            console.log(photos)

            if (photos) {
                for (const photo of photos) {
                    const {
                        finalFilePath,
                        uploadPath,
                        fileDir
                    } = filePathBuider.fileBuilderPath(photo.name, 'photos', createdUser._id);

                    await fs.mkdir(fileDir, {recursive: true});

                    await photo.mv(finalFilePath);

                    await userService.updateUser(createdUser._id, {photos: uploadPath});
                }
            }

            if (docs) {
                // eslint-disable-next-line max-len
                for (const doc of docs) {
                    const {
                        finalFilePath,
                        uploadPath,
                        fileDir
                    } = filePathBuider.fileBuilderPath(doc.name, 'documents', createdUser._id);

                    await fs.mkdir(fileDir, {recursive: true});

                    await doc.mv(finalFilePath);

                    await userService.updateUser(createdUser._id, {docs: uploadPath});
                }
            }

            if (videos) {
                // eslint-disable-next-line max-len
                for (const video of videos) {
                    const {
                        finalFilePath,
                        uploadPath,
                        fileDir
                    } = filePathBuider.fileBuilderPath(video.name, 'videos', createdUser._id);

                    await fs.mkdir(fileDir, {recursive: true});

                    await video.mv(finalFilePath);

                    await userService.updateUser(createdUser._id, {videos: uploadPath});
                }
            }

            // await emailService.sendMail(email, emailActions.WELCOME, { userName: name });

            res.json(errorMessages.USER_IS_CREATED);
        } catch (e) {
            next(e);
        }
    },

    updateUserData: async (req, res, next) => {
        try {
            const {
                body: { password, email, name },
                files: { photos }
            } = req;

            if (!email || !password) {
                throw new ErrorHendler(errorMessages.SOME_FIELD_IS_EMPTY.status, errorMessages.SOME_FIELD_IS_EMPTY.customCode);
            }
            const user = await userService.findEmail(email);

            await passwordsHasher.compare(password, user.password);

            if (photos) {
                const {
                    finalFilePath,
                    uploadPath,
                    fileDir
                } = filePathBuider.fileBuilderPath(photos.name, 'photos', user._id);

                await fs.mkdir(fileDir, { recursive: true });

                await photos.mv(finalFilePath);

                await userService.updateUser(user._id, { photos: uploadPath });
            }

            if (name) {
                await userService.updateUserName(user._id, name);
            }
            res.json(errorMessages.USER_WAS_UPDATED);
        } catch (e) {
            next(e);
        }
    },

    deleteSingleUser: async (req, res) => {
        try {
            const {email, password} = req.body;

            if (!email || !password) {
                throw new ErrorHendler(errorMessages.SOME_FIELD_IS_EMPTY.status, errorMessages.SOME_FIELD_IS_EMPTY.customCode);
            }

            const user = await userService.findEmail(email);

            await passwordsHasher.compare(password, user.password);

            await userService.deleteSingleUser(user._id);

            // await emailService.sendMail(email, emailActions.USER_DELETED, { userName: name });

            res.json(`${user.name} was deleted`);
        } catch (e) {
            res.json(e.message);
        }
    }
};
