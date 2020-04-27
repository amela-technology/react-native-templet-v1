import * as React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import ModalManager from 'shared/components/modal/ModalManager'
import { Themes } from 'assets/themes'
import StyledText from 'shared/components/base/StyledText'

const ModalInputView = () => {
    const modal = ModalManager()
    return (
        <View style={styles.constainer}>
            <TouchableOpacity
                style={styles.btnDisplayModal}
                onPress={() =>
                    modal.show(
                        'modal-input-1',
                        <View style={styles.modalContainer}>
                            <StyledText>{'12:00 Hello'}</StyledText>
                            <TouchableOpacity style={styles.btnClose} onPress={() => modal.dissmiss('modal-input-1')}>
                                <StyledText customStyle={{ color: Themes.COLORS.white }}>Close</StyledText>
                            </TouchableOpacity>
                        </View>,
                    )
                }
            >
                <StyledText>{'modalInput.button'}</StyledText>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    btnDisplayModal: {
        width: 200,
        height: 50,
        borderWidth: 1,
        borderColor: Themes.COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnClose: {
        width: 100,
        height: 20,
        backgroundColor: Themes.COLORS.primary,
        alignItems: 'center',
        marginTop: 10,
    },
    modalContainer: {
        width: '100%',
        alignItems: 'center',
    },
})

export default ModalInputView
