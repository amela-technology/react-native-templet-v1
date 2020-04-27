import * as React from 'react'
import {
    View,
    Animated,
    Keyboard,
    TouchableWithoutFeedback,
    Modal,
    StyleSheet,
    Dimensions,
    Platform,
    KeyboardEvent,
} from 'react-native'
import RootSiblings from 'react-native-root-siblings'

interface ModalCotrol {
    id: string
    element: RootSiblings
}

let modalControl: ModalCotrol[] = []
let isKeyBoradShow = false

const { height } = Dimensions.get('window')

const ModalManager = () => {
    const [slideMargin] = React.useState(new Animated.Value(0))
    const [sildeModal] = React.useState(new Animated.Value(-height))
    React.useEffect(() => {
        Keyboard.addListener('keyboardWillShow', _keyboardWillShow)
        Keyboard.addListener('keyboardWillHide', _keyboardWillHide)
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide)
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow)

        // cleanup function
        return () => {
            Keyboard.removeListener('keyboardWillShow', _keyboardWillShow)
            Keyboard.removeListener('keyboardWillHide', _keyboardWillHide)
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide)
            Keyboard.removeListener('keyboardDidShow', _keyboardDidShow)
        }
    }, [])
    const _keyboardWillShow = (e: KeyboardEvent) => {
        if (Platform.OS === 'ios') {
            Animated.parallel([
                Animated.timing(slideMargin, {
                    toValue: e.endCoordinates.height,
                    duration: 200,
                    useNativeDriver: false,
                }),
            ]).start()
            isKeyBoradShow = true
        }
    }

    const _keyboardWillHide = () => {
        if (Platform.OS === 'ios') {
            Animated.parallel([
                Animated.timing(slideMargin, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false,
                }),
            ]).start()
            isKeyBoradShow = false
        }
    }

    const _keyboardDidHide = () => {
        if (Platform.OS === 'android') {
            Animated.parallel([
                Animated.timing(slideMargin, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false,
                }),
            ]).start()
            isKeyBoradShow = false
        }
    }

    const _keyboardDidShow = () => {
        if (Platform.OS === 'android') {
            isKeyBoradShow = true
        }
    }

    const hideModal = (id: string) => {
        if (isKeyBoradShow) {
            Keyboard.dismiss()
        } else {
            dissmiss(id)
        }
    }

    const show = (id: string, element: React.ReactNode) => {
        if (modalControl.find((e: ModalCotrol) => e.id === id)) {
            throw new Error(`id of must be unique: ${id} is exist, try different id`)
        }
        const sibling = new RootSiblings(
            (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={true}
                    onRequestClose={() => {
                        // Alert.alert('Modal has been closed.')
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => hideModal(id)} accessible={false}>
                        <View style={styles.offSetStyle} />
                    </TouchableWithoutFeedback>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            bottom: sildeModal,
                            marginBottom: slideMargin,
                            width: '100%',
                        }}
                    >
                        <View style={styles.modalView}>{element}</View>
                    </Animated.View>
                </Modal>
            ),
            () => {
                Animated.timing(sildeModal, {
                    toValue: 10,
                    duration: 300,
                    useNativeDriver: false,
                }).start(() => {
                    modalControl.push({ id, element: sibling })
                })
            },
        )
    }

    const dissmiss = (id: string) => {
        Animated.timing(sildeModal, {
            toValue: -height,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            const item = modalControl.find((e: ModalCotrol) => e.id === id)
            // console.log(item)
            item?.element.destroy()
            // destroy id
            const arr_filter = modalControl.filter((e: ModalCotrol) => e.id !== id)
            modalControl = [...arr_filter]
        })
    }

    return { show, dissmiss }
}

export default ModalManager

const styles = StyleSheet.create({
    centeredView: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    modalView: {
        marginHorizontal: 20,
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    offSetStyle: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.55)',
    },
})
