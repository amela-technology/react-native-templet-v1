import * as React from "react"
import FastImage, {FastImageProperties} from "react-native-fast-image"

interface AMImageProps extends FastImageProperties {
    customStyle: any
}

const AMImage = (props: AMImageProps) => {
    const {customStyle, source, resizeMode} = props
    return (
        <FastImage
            style={customStyle}
            source={source}
            resizeMode={resizeMode}
            {...props}
        />
    )
}
export default AMImage
