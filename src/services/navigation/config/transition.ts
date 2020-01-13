import {Animated, Easing} from 'react-native'

const opacityTransition = (index: any, position: any) => {
    const opacity = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0, 1, 0],
    })

    return {
        opacity,
    }
}

const translateXTransition = (index: any, position: any, layout: any) => {
    const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [layout.initWidth, 0, -(layout.initWidth / 4)],
    })

    const opacity = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0, 1, 0],
    })

    return {opacity, transform: [{translateX}]}
}

const translateYTransition = (index: any, position: any, layout: any) => {
    const height = layout.initHeight
    const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [height, 0, 0],
    })

    const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
    })

    return {opacity, transform: [{translateY}]}
}

export const transition = (): any => {
    return {
        transitionSpec: {
            duration: 250,
            easing: Easing.linear,
            // easing: Easing.bezier(0.19, 1, 0.22, 1),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: (sceneProps: any) => {
            const {layout, position, scene} = sceneProps
            const {index, route} = scene
            const params = route.params || {}
            const transition = params.transition || 'translateX'

            const trans: any = {
                opacity: opacityTransition(index, position),
                translateY: translateYTransition(index, position, layout),
                translateX: translateXTransition(index, position, layout),
            }

            return trans[transition]
        },
        containerStyle: {
            backgroundColor: 'fff',
        },
    }
}
