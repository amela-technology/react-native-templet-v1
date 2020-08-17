import ImagePicker from 'react-native-image-crop-picker'
import { awsApi } from 'services/upload/awsApi'
// import {openSettings} from 'react-native-permissions'
const MAX_WIDTH = 800
const MAX_HEIGHT = 800
class ImageUploader {
    async chooseImageFromCamera() {
        return new Promise(async (resolve, reject) => {
            await ImagePicker.openCamera({
                width: MAX_WIDTH,
                height: MAX_HEIGHT,
                compressImageMaxWidth: MAX_WIDTH,
                compressImageMaxHeight: MAX_HEIGHT,
                waitAnimationEnd: true,
                // includeBase64: true,
                forceJpg: true,
                cropping: true,
            })
                .then((res) => {
                    console.log(res)
                    return resolve(res)
                })
                .catch((err) => {
                    if (err.code === 'E_PERMISSION_MISSING') {
                        // showAlertDialog({
                        //     message: 'common.permissionsRequest.camera',
                        //     rightText: 'OK',
                        //     leftText: 'alert.defaultCancelText',
                        //     onRightPress: () => {
                        //         dismissAlertDialog(() => {
                        //             openSettings()
                        //         })
                        //     },
                        //     onLeftPress: () => {
                        //         dismissAlertDialog()
                        //     },
                        // })
                    }
                    if (err.code === 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR') {
                        // dismissAlertDialog(() => {
                        //     showAPIAlertDialog(err)
                        // })
                    }
                    return reject(err)
                })
        })
    }

    async chooseImageFromGallery() {
        return new Promise(async (resolve, reject) => {
            await ImagePicker.openPicker({
                width: MAX_WIDTH,
                height: MAX_HEIGHT,
                compressImageMaxWidth: MAX_WIDTH,
                compressImageMaxHeight: MAX_HEIGHT,
                // compressImageQuality: 100,
                waitAnimationEnd: true,
                // includeBase64: true,
                forceJpg: true,
                cropping: true,
            })
                .then((res) => {
                    console.log(res)
                    return resolve(res)
                })
                .catch((err) => {
                    if (err.code === 'E_PERMISSION_MISSING') {
                        // showAlertDialog({
                        //     message: 'common.permissionsRequest.photos',
                        //     rightText: 'OK',
                        //     leftText: 'alert.defaultCancelText',
                        //     onRightPress: () => {
                        //         dismissAlertDialog(() => {
                        //             openSettings()
                        //         })
                        //     },
                        //     onLeftPress: () => {
                        //         dismissAlertDialog()
                        //     },
                        // })
                    }
                    return reject(err)
                })
        })
    }

    async uploadImage(localImage: any): Promise<string> {
        return new Promise(async function (resolve, reject) {
            try {
                console.log('uploading an image....')
                const remoteImage = await awsApi.upload(localImage?.path || localImage)
                console.log(`upload finished ....${JSON.stringify(remoteImage)}`)
                // @ts-ignore
                resolve(remoteImage?.body?.postResponse.location)
            } catch (e) {
                reject(e)
            }
        })
    }
}
export default new ImageUploader()
