import * as React from 'react'
import { StyleProp, Image, ImageProperties, ImageStyle } from 'react-native'
import { scale } from 'react-native-size-matters'

interface Props extends ImageProperties {
    size: number
    customStyle?: StyleProp<ImageStyle>
}
const StyledIcon = (props: Props) => {
    return (
        <Image
            style={[props.customStyle, { width: scale(props.size), height: scale(props.size) }]}
            resizeMode={'contain'}
            {...props}
        />
    )
}
export default React.memo(StyledIcon)
