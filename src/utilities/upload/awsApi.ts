import { RNS3 } from 'react-native-aws3';

const options = {
    secretKey: 'xxx',
    accessKey: 'xxx',
    region: 'xxx',
    bucket: 'xxx',
};

const awsApi = {
    upload: (url: string, mine = 'image/jpeg'): any => {
        const timeStamp = new Date().getTime();
        const bodyFormData = {
            uri: url,
            name: `xxx/${timeStamp}.${mine.split('/')[1]}`,
            type: mine,
        };
        return RNS3.put(bodyFormData, options);
    },
};

export default awsApi;
