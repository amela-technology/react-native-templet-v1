import * as React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import ModalManager from '../../../shared/components/modal/ModalManager'
import {Themes} from '../../../assets/themes'
import StyledText from '../../../shared/components/base/StyledText'

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
                            <StyledText text={'Helllooo'} />
                            <TouchableOpacity style={styles.btnClose} onPress={() => modal.dissmiss('modal-input-1')}>
                                <StyledText text={'Close'} customStyle={{color: Themes.COLORS.white}} />
                            </TouchableOpacity>
                        </View>,
                    )
                }>
                <StyledText text={'Display input modal 1'} />
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
