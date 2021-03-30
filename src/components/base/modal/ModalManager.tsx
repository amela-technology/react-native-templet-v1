import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import { resetModalList } from 'app-redux/modalRedux/actions';
import { View } from 'react-native';
import { store } from 'app-redux/store';
import ModalComponent from './ModalComponent';

interface ModalProps {
    children?: any;
    isFromBottom?: boolean;
    onBackdropPress?(): void;
}

interface ModalElement {
    id: number;
    element: RootSiblings;
    props: ModalProps;
}

class ModalManager {
    static show(props: ModalProps, callback?: (() => void) | undefined, modalId?: number) {
        throw new Error('Method not implemented.');
    }

    static dismiss() {
        throw new Error('Method not implemented.');
    }

    modalElements: ModalElement[] = [];

    constructor() {
        this.modalElements = [];
    }

    getTopModalElementId = (modalId?: number) => {
        if (modalId !== 0) {
            modalId = modalId || this.modalElements?.[this.modalElements.length - 1]?.id;
        }
        return modalId;
    };

    currentModal = (modalId?: number) => {
        modalId = modalId || this.getTopModalElementId(modalId);
        return this.modalElements.find((e: ModalElement) => e.id === modalId);
    };

    add = (props: any, callback: any, modalId: number) => {
        const dialog = new RootSiblings(
            (
                <ModalComponent
                    {...props}
                    modalId={modalId}
                    onBackdropPressed={props.onBackdropPress}
                    isFromBottom={props.isFromBottom}
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

    destroy = (modalId?: number, callback?: any) => {
        modalId = modalId || this.getTopModalElementId(modalId);
        const modal = this.modalElements.find((e: ModalElement) => e.id === modalId);
        const arrFilter = this.modalElements.filter((e: ModalElement) => e.id !== modalId);
        this.modalElements = [...arrFilter];
        modal?.element.destroy();
        callback?.();
    };

    onDialogDismissed = (modalId?: number, callback?: any) => {
        this.destroy(modalId, callback);
    };

    update = (callback: (modalId: number) => void, modalId: number) => {
        this.currentModal(modalId)?.element?.update(<View />, () => {
            callback?.(modalId);
        });
    };

    show = (props: ModalProps, callback?: (() => void) | undefined, modalId?: number) => {
        modalId = modalId || this.modalElements.length;
        this.add(
            {
                ...props,
                visible: true,
            },
            callback,
            modalId,
        );
    };

    dismiss = (modalId?: number, callback?: (id: number | undefined) => void) => {
        const id = modalId || this.getTopModalElementId(modalId);
        this.currentModal(id)?.element?.update(<View />, () => {
            callback?.(id);
        });
        if (this.modalElements.indexOf(this.currentModal(id) as ModalElement) > -1) {
            this.modalElements.splice(this.modalElements.indexOf(this.currentModal(id) as ModalElement), 1);
        }
        if (this.modalElements.length === 0) {
            store.dispatch(resetModalList());
        }
    };

    dismissAll = (callback: () => void) => {
        this.modalElements.forEach((modal) => {
            this.dismiss(modal.id, callback);
        });
    };
}

const modal = new ModalManager();

export default modal;
