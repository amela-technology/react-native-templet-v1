/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { ModalProps } from 'react-native-modals';
import RootSiblings from 'react-native-root-siblings';
import DialogComponent from './DialogComponent';

const DESTROY_TIMEOUT = 100;
interface ModalElement {
    id: number;
    element: RootSiblings;
    props: any;
}

class DialogManager {
    modalElements: ModalElement[] = [];

    constructor() {
        this.modalElements = [];
    }

    getTopModalElementId = (modalId?: number): number => {
        let returnId = modalId;
        if (returnId !== 0) {
            returnId = modalId || this.modalElements.length - 1;
        }
        return returnId;
    };

    currentModal = (modalId?: number): ModalElement | undefined => {
        let returnId = modalId;
        returnId = modalId || this.getTopModalElementId(modalId);
        return this.modalElements.find((e: ModalElement) => e.id === modalId);
    };

    add = (props: any, callback: (() => void) | undefined, modalId: number): void => {
        const dialog = new RootSiblings(
            (
                <DialogComponent
                    {...props}
                    modalId={modalId}
                    onDismissed={(id: number) => {
                        this.onDialogDismissed(props.onDismissed, id);
                    }}
                />
            ),
            callback,
        );
        const modalElement: ModalElement = {
            id: modalId,
            element: dialog,
            props,
        };
        this.modalElements.push(modalElement);
    };

    destroy = (modalId?: number): void => {
        let id = modalId;
        id = modalId || this.getTopModalElementId(modalId);
        const modal = this.modalElements.find((e: ModalElement) => e.id === modalId);
        setTimeout(() => {
            modal?.element.destroy();
            const arrFilter = this.modalElements.filter((e: ModalElement) => e.id !== modalId);
            this.modalElements = [...arrFilter];
        }, DESTROY_TIMEOUT);
    };

    onDialogDismissed = (onDismissed: any, modalId?: number) => {
        onDismissed?.();
        this.destroy(modalId);
    };

    update = (props: any, callback: (modalId: number) => void, modalId: number): void => {
        this.currentModal(modalId)?.element?.update(
            <DialogComponent
                {...this.currentModal(modalId)?.props}
                {...props}
                onDismiss={() => {
                    this.onDialogDismissed(props.onDismissed);
                }}
            />,
            () => {
                callback?.(modalId);
            },
        );
    };

    show = (props: any, callback?: (() => void) | undefined, modalId?: number): void => {
        const id = modalId || this.modalElements.length;
        this.add(
            {
                ...props,
                visible: true,
            },
            callback,
            id,
        );
    };

    dismiss = (modalId?: number, callback?: (id: number | undefined) => void): void => {
        const id = modalId || this.getTopModalElementId(modalId);
        const props = this.currentModal(modalId)?.props;
        this.currentModal(modalId)?.element?.update(
            <DialogComponent
                {...props}
                visible={false}
                onDismiss={() => {
                    this.onDialogDismissed(props.onDismissed);
                }}
            />,
            () => {
                callback?.(id);
            },
        );
    };

    dismissAll = (callback: () => void) => {
        this.modalElements.forEach((modal) => {
            this.dismiss(modal.id, callback);
        });
    };
}

export default DialogManager;
