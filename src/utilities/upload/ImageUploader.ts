import { uploadImage } from 'api/modules/api-app/general';
import ImagePicker from 'react-native-image-crop-picker';
import { logger } from 'utilities/helper';
import { checkCamera, checkPhoto } from 'utilities/permissions';

const MAX_WIDTH = 800;
const MAX_HEIGHT = 800;

const ImageUploaded = {
    pickImage: async (index: number) => {
        try {
            let localPath: any = '';
            if (index === 1) {
                await checkPhoto();
                localPath = await ImageUploaded.chooseImageFromGallery();
            } else if (index === 2) {
                await checkCamera();
                localPath = await ImageUploaded.chooseImageFromCamera();
            }
            const uri = await ImageUploaded.uploader(localPath);
            return uri;
        } catch (err) {
            logger(err);
            return null;
        }
    },

    chooseImageFromCamera: () =>
        ImagePicker.openCamera({
            // width: MAX_WIDTH,
            // height: MAX_HEIGHT,
            compressImageMaxWidth: MAX_WIDTH,
            compressImageMaxHeight: MAX_HEIGHT,
            waitAnimationEnd: true,
            // includeBase64: true,
            // forceJpg: true,
            cropping: true,
        }),

    chooseImageFromGallery: () =>
        ImagePicker.openPicker({
            // width: MAX_WIDTH,
            // height: MAX_HEIGHT,
            compressImageMaxWidth: MAX_WIDTH,
            compressImageMaxHeight: MAX_HEIGHT,
            // compressImageQuality: 100,
            waitAnimationEnd: true,
            // includeBase64: true,
            // forceJpg: true,
            cropping: true,
        }),

    uploader: async (localPath: any) => {
        const timeStamp = new Date().getTime();
        const formatImage: any = {
            uri: localPath.path,
            name: `${timeStamp}.${'image/jpeg'}`,
            type: 'image/jpeg',
        };
        const formData = new FormData();
        formData.append('files', formatImage);
        const uri = await uploadImage(formData);
        if (uri?.length > 0) {
            return uri[0];
        }
        return null;
    },
};
export default ImageUploaded;
