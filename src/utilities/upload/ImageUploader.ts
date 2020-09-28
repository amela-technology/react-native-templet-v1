import ImagePicker from 'react-native-image-crop-picker';
import awsApi from './awsApi';

const MAX_WIDTH = 800;
const MAX_HEIGHT = 800;

class ImageUploaded {
    chooseImageFromCamera = () => {
        return ImagePicker.openCamera({
            width: MAX_WIDTH,
            height: MAX_HEIGHT,
            compressImageMaxWidth: MAX_WIDTH,
            compressImageMaxHeight: MAX_HEIGHT,
            waitAnimationEnd: true,
            // includeBase64: true,
            forceJpg: true,
            cropping: true,
        });
    };

    chooseImageFromGallery = () => {
        return ImagePicker.openPicker({
            width: MAX_WIDTH,
            height: MAX_HEIGHT,
            compressImageMaxWidth: MAX_WIDTH,
            compressImageMaxHeight: MAX_HEIGHT,
            // compressImageQuality: 100,
            waitAnimationEnd: true,
            // includeBase64: true,
            forceJpg: true,
            cropping: true,
        });
    };

    uploadImage = (localImage: any) => {
        return awsApi.upload(localImage?.path || localImage);
    };
}
export default new ImageUploaded();
