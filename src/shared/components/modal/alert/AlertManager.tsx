import React from 'react'
import DialogManager from '../index'
import NoticeComponent from './NoticeComponent'
import AlertComponent from './AlertComponent'
import i18next from 'shared/utilities/i18next'

interface NoticeDialogProps {
    title?: string
    message?: string
    messageParams?: any
    buttonSubmitText?: string
    onSubmit?(): void
    cantTouchOutside?: boolean
}

export function showNoticeDialog(props: NoticeDialogProps, callbackShow?: any) {
    DialogManager.show(
        {
            children: <NoticeComponent {...props} />,
            modalStyle: {
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
            },
            onTouchOutside: () => {
                if (!props.cantTouchOutside) {
                    DialogManager.dismiss()
                }
            },
        },
        () => callbackShow?.(),
    )
}
export function showAPIMessage(result: any, params?: NoticeDialogProps) {
    if (result === null) return
    let msg = result?.message
        ? i18next.t(`${'SERVER.ja.' + result.message}`, {
              defaultValue: result.message,
          })
        : result.message

    if (!msg) {
        msg = 'common.errorMessage.requestFailed'
    }
    showNoticeDialog({
        message: msg,
        ...params,
    })
}
interface AlertDialogProps {
    title?: string
    message?: string
    buttons: Array<any>
    buttonDirection?: 'row' | 'column'
    onButtonPress?(button: any): void
}
// const buttons = [
//     {id: 1, title: 'Button1'},
//     {id: 2, title: 'Button1'},
//     {id: 3, title: 'Button1'},
// ]
// showAlertDialog({
//     title: '画像が提出されました',
//     message: '本人確認書類の提出を受け付けました。確認が完了次第、変更されます。',
//     buttons: buttons,
//     // buttonDirection: 'row',
// })
export function showAlertDialog(props: AlertDialogProps, callbackShow?: any) {
    DialogManager.show(
        {
            children: <AlertComponent {...props} />,
            modalStyle: {
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
            },
            onTouchOutside: () => {
                DialogManager.dismiss()
            },
        },
        () => callbackShow?.(),
    )
}
