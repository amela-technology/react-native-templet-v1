import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { StyledText, StyledTouchable } from 'shared/components/base'

import DialogManager from '../index'

interface NoticeComponentProps {
    title?: string
    message?: string
    messageParams?: string
    buttonSubmitText?: string
    onSubmit?(): void
}

const NoticeComponent = (props: NoticeComponentProps) => {
    function handleOkPress() {
        DialogManager.dismiss(undefined, () => {
            props.onSubmit?.()
        })
    }
    return (
        <View style={styles.container}>
            <View
                style={{
                    padding: 13,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {props.title && <StyledText i18Key={props.title} customStyle={styles.textTitle} />}
                <StyledText i18Key={props.message} i18Params={props.messageParams} customStyle={styles.textMessage} />
            </View>
            {/* <StyledDivider customStyle={{height: 1, backgroundColor: '#DFDFDF', width: 280}} /> */}
            <StyledTouchable
                customStyle={{
                    padding: 10,
                    width: 320,
                    alignItems: 'center',
                    borderTopColor: '#DFDFDF',
                    borderTopWidth: 1,
                }}
                onPress={handleOkPress}
            >
                <StyledText i18Key={props.buttonSubmitText || 'OK'} customStyle={styles.textButton} />
            </StyledTouchable>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 10,
        width: 320,
    },
    textTitle: {
        fontSize: 17,
        color: '#000000',
        fontWeight: 'bold',
        marginBottom: 16,
    },
    textMessage: {
        fontSize: 13,
        color: '#000000',

        lineHeight: 18,
        textAlign: 'center',
    },
    textButton: {
        color: '#007AFF',
        fontSize: 17,
        fontWeight: 'bold',
    },
})

export default NoticeComponent
