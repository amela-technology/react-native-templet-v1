// eslint-disable-next-line import/no-unresolved,@typescript-eslint/ban-ts-ignore
// @ts-ignore
import {RNS3} from 'react-native-aws3'

const options = {
    secretKey: 'xxx',
    accessKey: 'xxx',
    region: 'xxx',
    bucket: 'xxx',
}

export const awsApi = {
    upload: (url: string, mine = 'image/jpeg') => {
        const timeStamp = new Date().getTime()
        const bodyFormData = {
            uri: url,
            name: `xxx/${timeStamp}.${mine.split('/')[1]}`,
            type: mine,
        }
        return RNS3.put(bodyFormData, options)
    },
}
