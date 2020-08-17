import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import Modal from 'react-native-modals'
import { SlideAnimation } from '.'

const { width: screenWidth } = Dimensions.get('window')

const ANIMATION_DURATION = 50
const DEFAULT_WIDTH = screenWidth
const DEFAULT_HEIGHT = null

class DialogComponent extends Component<any, any> {
    static defaultProps = {
        animationDuration: ANIMATION_DURATION,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    }

    render() {
        const { children } = this.props
        return (
            <Modal
                modalAnimation={
                    new SlideAnimation({
                        slideFrom: 'bottom',
                        animationDuration: ANIMATION_DURATION,
                    })
                }
                {...this.props}
            >
                {children}
            </Modal>
        )
    }
}

export default DialogComponent
