import React from 'react'
import { StyleSheet, View, Modal, ActivityIndicator, Keyboard } from 'react-native'
import { Themes } from '../../../assets/themes'

const transparent = 'transparent'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: transparent,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    background: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'white',
    },
    textContainer: {
        flex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    textContent: {
        top: 80,
        height: 50,
        fontSize: 20,
        fontWeight: 'bold',
    },
    activityIndicator: {
        flex: 1,
    },
})

interface Props {
    visible: boolean
    textContent?: boolean
    onRequestClose?(): void
}
export default class StyledOverlayLoading extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props)
    }

    close() {
        this.setState({ visible: false })
    }

    renderDefaultContent() {
        return (
            <View style={styles.background}>
                <View style={styles.circle}>
                    <ActivityIndicator color={Themes.COLORS.primary} size={42} style={[styles.activityIndicator]} />
                </View>
            </View>
        )
    }

    renderSpinner() {
        if (!this.props.visible) {
            return null
        }
        Keyboard.dismiss()
        const spinner = (
            <View style={[styles.container]} key={`spinner_${Date.now()}`}>
                {this.props.children ? this.props.children : this.renderDefaultContent()}
            </View>
        )

        return (
            <Modal
                // animationType={this.props.animation}
                onRequestClose={this.props.onRequestClose}
                supportedOrientations={['portrait']}
                transparent
                visible={this.props.visible}
            >
                {spinner}
            </Modal>
        )
    }

    render() {
        return this.renderSpinner()
    }
}
