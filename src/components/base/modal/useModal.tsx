/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import DialogComponent from './DialogComponent';

const DESTROY_TIMEOUT = 100;
interface ModalElement {
    id: number;
    element: RootSiblings;
    props: any;
}

const useModal = () => {
    let modalElements: ModalElement[] = [];

    const getTopModalElementId = (modalId?: number): number => {
        let returnId = modalId;
        if (returnId !== 0) {
            returnId = modalId || modalElements.length - 1;
        }
        return returnId;
    };

    const currentModal = (modalId?: number): ModalElement | undefined => {
        let returnId = modalId;
        returnId = modalId || getTopModalElementId(modalId);
        return modalElements.find((e: ModalElement) => e.id === modalId);
    };

    const add = (props: any, callback: (() => void) | undefined, modalId: number): void => {
        const dialog = new RootSiblings(
            (
                <DialogComponent
                    {...props}
                    modalId={modalId}
                    onModalHide={(id: number) => {
                        onDialogDismissed(props.onDismissed, id);
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
        modalElements.push(modalElement);
    };

    const destroy = (modalId?: number): void => {
        let id = modalId;
        id = modalId || getTopModalElementId(modalId);
        const modal = modalElements.find((e: ModalElement) => e.id === modalId);
        setTimeout(() => {
            modal?.element.destroy();
            const arrFilter = modalElements.filter((e: ModalElement) => e.id !== modalId);
            modalElements = [...arrFilter];
        }, DESTROY_TIMEOUT);
    };

    const onDialogDismissed = (onDismissed: any, modalId?: number) => {
        onDismissed?.();
        destroy(modalId);
    };

    const update = (props: any, callback: (modalId: number) => void, modalId: number): void => {
        currentModal(modalId)?.element?.update(
            <DialogComponent
                {...currentModal(modalId)?.props}
                {...props}
                onDismiss={() => {
                    onDialogDismissed(props.onDismissed);
                }}
            />,
            () => {
                callback?.(modalId);
            },
        );
    };

    const show = (props: any, callback?: (() => void) | undefined, modalId?: number): void => {
        const id = modalId || modalElements.length;
        add(
            {
                ...props,
                isVisible: true,
            },
            callback,
            id,
        );
    };

    const dismiss = (modalId?: number, callback?: (id: number | undefined) => void): void => {
        const id = modalId || getTopModalElementId(modalId);
        const props = currentModal(id)?.props;
        currentModal(id)?.element?.update(
            <DialogComponent
                {...props}
                isVisible={false}
                onModalHide={() => {
                    onDialogDismissed(props.onDismissed);
                }}
            />,
            () => {
                callback?.(id);
            },
        );
    };

    const dismissAll = (callback: () => void) => {
        modalElements.forEach((modal) => {
            dismiss(modal.id, callback);
        });
    };

    return { getTopModalElementId, currentModal, add, destroy, onDialogDismissed, update, show, dismiss, dismissAll };
};

export default useModal;
