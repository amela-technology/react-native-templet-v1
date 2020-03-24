import * as React from 'react'
import FastImage, {FastImageProperties} from 'react-native-fast-image'

interface StyledImageProps extends FastImageProperties {
    customStyle: any
}

const StyledImage = (props: StyledImageProps) => {
    const {customStyle, source, resizeMode} = props
    return <FastImage style={customStyle} source={source} resizeMode={resizeMode} {...props} />
}
export default StyledImage