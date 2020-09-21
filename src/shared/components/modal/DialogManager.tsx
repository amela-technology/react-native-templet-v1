import React from 'react'
import RootSiblings from 'react-native-root-siblings'
import DialogComponent from './DialogComponent'

const DESTROY_TIMEOUT = 100
interface ModalElement {
    id: number
    element: RootSiblings
    props: any
}

class DialogManager {
    modalElements: ModalElement[] = []
    constructor() {
        this.modalElements = []
    }
    getTopModalElementId = (modalId?: number) => {
        if (modalId !== 0) {
            modalId = modalId || this.modalElements.length - 1
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
                    {...props}
                    modalId={modalId}
                    onDismissed={(modalId: number) => {
                        this.onDialogDismissed(props.onDismissed, modalId)
                    }}
                />
            ),
            callback,
        )
        const modalElement: ModalElement = {
            id: modalId,
            element: dialog,
            props,
        }
        this.modalElements.push(modalElement)
    }

    destroy = (modalId?: number) => {
        modalId = modalId || this.getTopModalElementId(modalId)
        const modal = this.modalElements.find((e: ModalElement) => e.id === modalId)
        setTimeout(() => {
            modal?.element.destroy()
            const arr_filter = this.modalElements.filter((e: ModalElement) => e.id !== modalId)
            this.modalElements = [...arr_filter]
        }, DESTROY_TIMEOUT)
    }

    onDialogDismissed = (onDismissed: any, modalId?: number) => {
        // onDismissed?.()
        // this.destroy(modalId)
    }

    update = (props: any, callback: any, modalId: number) => {
        this.currentModal(modalId)?.element?.update(
            <DialogComponent
                {...this.currentModal(modalId)?.props}
                {...props}
                onDismiss={() => {
                    this.onDialogDismissed(props.onDismissed)
                }}
            />,
            () => {
                callback?.(modalId)
            },
        )
    }

    show = (props: any, callback?: any, modalId?: number) => {
        modalId = modalId || this.modalElements.length
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
        const props = this.currentModal(modalId)?.props
        this.currentModal(modalId)?.element?.update(
            <DialogComponent
                {...props}
                visible={false}
                onDismiss={() => {
                    this.onDialogDismissed(props.onDismissed)
                }}
            />,
            () => {
                callback?.(modalId)
            },
        )
    }

    dismissAll = (callback: any) => {
        this.modalElements.forEach((modal) => {
            this.dismiss(modal.id, callback)
        })
    }
}

export default DialogManager
