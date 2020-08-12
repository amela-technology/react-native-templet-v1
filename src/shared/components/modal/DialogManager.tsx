import React from 'react'
import RootSiblings from 'react-native-root-siblings'
import DialogComponent from './DialogComponent'

const DESTROY_TIMEOUT = 0
interface ModalElement {
    id: number
    element: RootSiblings
}

class DialogManager {
    static show(arg0: { children: JSX.Element; modalStyle: { backgroundColor: string } }, arg1: () => void) {
        throw new Error('Method not implemented.')
    }
    static dismiss() {
        throw new Error('Method not implemented.')
    }
    modalElements: ModalElement[] = []
    constructor() {
        this.modalElements = []
    }
    getTopModalElementId = (modalId?: number) => {
        if (modalId !== 0) {
            modalId = modalId || this.modalElements?.[this.modalElements.length - 1]?.id
        }
        return modalId
    }

    currentModal = (modalId?: number) => {
        modalId = modalId || this.getTopModalElementId(modalId)
        return this.modalElements.find((e: ModalElement) => e.id === modalId)
    }

    add = (props: any, callback: any, modalId: number) => {
        const dialog = new RootSiblings(
            (
                <DialogComponent
                    onHardwareBackPress={() => {
                        this.dismiss()
                        return true
                    }}
                    {...props}
                    modalId={modalId}
                    onDismissed={(modalId: number) => {
                        this.onDialogDismissed(modalId, props.onDismissed)
                    }}
                />
            ),
            callback,
        )
        const modalElement: ModalElement = {
            id: modalId,
            element: dialog,
        }
        this.modalElements.push(modalElement)
    }

    destroy = (modalId?: number, callback?: any) => {
        modalId = modalId || this.getTopModalElementId(modalId)
        const modal = this.modalElements.find((e: ModalElement) => e.id === modalId)
        const arr_filter = this.modalElements.filter((e: ModalElement) => e.id !== modalId)
        this.modalElements = [...arr_filter]
        modal?.element.destroy()
        callback?.()
    }

    onDialogDismissed = (modalId?: number, callback?: any) => {
        this.destroy(modalId, callback)
    }

    update = (props: any, callback: any, modalId: number) => {
        this.currentModal(modalId)?.element?.update(
            <DialogComponent
                {...props}
                onDismiss={() => {
                    this.destroy(modalId, callback)
                }}
            />,
            () => {
                // callback?.(modalId)
            },
        )
    }

    show = (props: any, callback: any, modalId?: number) => {
        modalId = modalId || this.modalElements.length
        // console.log(modalId, this.modalElements)
        this.add(
            {
                ...props,
                visible: true,
            },
            callback,
            modalId,
        )
    }

    dismiss = (modalId?: number, callback?: any) => {
        modalId = modalId || this.getTopModalElementId(modalId)
        // console.log(modalId, this.modalElements)
        this.update(
            {
                visible: false,
            },
            callback,
            modalId,
        )
    }

    dismissAll = (callback?: any) => {
        this.modalElements.forEach((modal) => {
            this.dismiss(modal.id, callback)
        })
    }
}

export default DialogManager
