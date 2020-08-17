import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { StyledText, StyledTouchable } from 'shared/components/base'

import StyledDivider from 'shared/components/common/StyledDivider'
import { Themes } from 'assets/themes'
import DialogManager from '../index'

interface AlertComponentProps {
    title?: string
    message?: string
    buttons: Array<any>
    buttonDirection?: 'row' | 'column'
    onButtonPress?(button: any): void
}

const AlertComponent = (props: AlertComponentProps) => {
    const { title, message, buttons, buttonDirection, onButtonPress } = props
    function handleOkPress(item: any) {
        DialogManager.dismiss(undefined, () => {
            onButtonPress?.(item)
        })
    }
    function renderHorizontalButtons() {
        const elements: any = []
        buttons.map((item: any, index: number) => {
            elements.push(
                <View
                    key={item.id}
                    style={{
                        height: 42,
                        flex: 1,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderTopColor: Themes.COLORS.divider,
                        borderTopWidth: 1,
                    }}
                >
                    <StyledTouchable
                        customStyle={{
                            padding: 10,
                            flex: 1,
                            height: 42,
                            alignItems: 'center',
                        }}
                        onPress={() => handleOkPress(item)}
                    >
                        <StyledText i18Key={item.title} customStyle={[styles.textButton, item.customStyle]} />
                    </StyledTouchable>
                    {index !== buttons.length - 1 && (
                        <StyledDivider
                            customStyle={{ width: 1, height: '100%', backgroundColor: Themes.COLORS.divider }}
                        />
                    )}
                </View>,
            )
        })
        return elements
    }
    function renderVerticalButtons() {
        const elements: any = []
        buttons.map((item: any) => {
            elements.push(
                <StyledTouchable
                    key={item.id}
                    onPress={() => handleOkPress(item)}
                    customStyle={{
                        height: 48,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <StyledDivider customStyle={{ height: 1, backgroundColor: Themes.COLORS.divider }} />
                    <StyledTouchable
                        customStyle={{
                            padding: 13,
                            flex: 1,
                            height: 48,
                            alignItems: 'center',
                        }}
                        onPress={() => handleOkPress(item)}
                    >
                        <StyledText i18Key={item.title} customStyle={[styles.textButton, item.customStyle]} />
                    </StyledTouchable>
                </StyledTouchable>,
            )
        })
        return elements
    }
    return (
        <View style={styles.container}>
            <View
                style={{
                    padding: 18,
                    justifyContent: 'center',

                    alignItems: 'center',
                }}
            >
                {props.title && <StyledText i18Key={props.title} customStyle={styles.textTitle} />}
                <StyledText i18Key={props.message} customStyle={styles.textMessage} />
            </View>
            <View style={{ flexDirection: props.buttonDirection, width: '100%' }}>
                {props.buttonDirection === 'row' ? renderHorizontalButtons() : renderVerticalButtons()}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.95)',
        width: 268,
        borderRadius: 10,
    },
    textTitle: {
        fontSize: 17,
        color: '#000000',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    textMessage: {
        fontSize: 13,
        color: '#000000',
        lineHeight: 18,
        textAlign: 'center',
        // marginBottom: 8,
    },
    textButton: {
        flex: 1,
        color: '#007AFF',
        fontSize: 17,
        // backgroundColor: 'red',
        // fontWeight: 'bold',
    },
})

export default AlertComponent
