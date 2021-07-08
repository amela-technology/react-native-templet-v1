import React, { useEffect, useState } from 'react';
import { BackHandler, View } from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import ModalComponent from './ModalComponent';

const DESTROY_TIMEOUT = 100;

interface UseModalProps {
    getTopModalElementId?(modalId?: number): void;
    currentModal?(modalId?: number): void;
    add?(props: ModalProps, callback: (() => void) | undefined, modalId: number): void;
    destroy?(modalId?: number): void;
    onDialogDismissed?(onDismissed: any, modalId?: number): void;
    update?(callback: (modalId: number) => void, modalId: number): void;
    show?(props: ModalProps, callback?: (() => void) | undefined, modalId?: number): void;
    dismiss?(modalId?: number, callback?: (id: number | undefined) => void): void;
    dismissAll?(callback: () => void): void;
}

interface ModalProps {
    children?: any;
    modalWrapperWidth?: string | number;
    modalWrapperHeight?: string | number;
    isFromBottom?: boolean;
    onBackdropPress?(): void;
}
interface ModalElement {
    id: number;
    element: RootSiblings;
    props: ModalProps;
}

const useModal = (): UseModalProps => {
    const [modalElements, setModalElements] = useState<ModalElement[]>([]);

    const getTopModalElementId = (modalId?: number): number => {
        let returnId = modalId;
        if (returnId !== 0) {
            returnId = modalId || modalElements.length - 1;
        }
        return returnId;
    };

    const currentModal = (modalId?: number): ModalElement | undefined => {
        return modalElements.find((e: ModalElement) => e.id === modalId);
    };

    const add = (props: ModalProps, callback: (() => void) | undefined, modalId: number): void => {
        const dialog = new RootSiblings(
            (
                <ModalComponent
                    {...props}
                    modalId={modalId}
                    onBackdropPressed={props.onBackdropPress}
                    isFromBottom={props.isFromBottom}
                    modalWrapperWidth={props.modalWrapperWidth}
                    modalWrapperHeight={props.modalWrapperHeight}
                />
            ),
            callback,
        );
        const modalElement: ModalElement = {
            id: modalId,
            element: dialog,
            props,
        };
        setModalElements([...modalElements, modalElement]);
    };

    const destroy = (modalId?: number): void => {
        const modal = modalElements.find((e: ModalElement) => e.id === modalId);
        setTimeout(() => {
            modal?.element.destroy();
            const arrFilter = modalElements.filter((e: ModalElement) => e.id !== modalId);
            setModalElements(arrFilter);
        }, DESTROY_TIMEOUT);
    };

    const onDialogDismissed = (onDismissed: any, modalId?: number) => {
        onDismissed?.();
        destroy(modalId);
    };

    const update = (callback: (modalId: number) => void, modalId: number): void => {
        currentModal(modalId)?.element?.update(<View />, () => {
            callback?.(modalId);
        });
    };

    const show = (props: ModalProps, callback?: (() => void) | undefined, modalId?: number): void => {
        const id = modalId || modalElements.length;
        add(
            {
                ...props,
            },
            callback,
            id,
        );
    };

    const dismiss = (modalId?: number, callback?: (id: number | undefined) => void): void => {
        const id = modalId || getTopModalElementId(modalId);
        currentModal(id)?.element?.update(<View />, () => {
            callback?.(id);
        });
        if (modalElements.indexOf(currentModal(id) as ModalElement) > -1) {
            const cloneModalElements = [...modalElements];
            cloneModalElements.splice(modalElements.indexOf(currentModal(id) as ModalElement), 1);
            setModalElements(cloneModalElements);
        }
    };

    const dismissAll = (callback: () => void) => {
        modalElements.forEach((modal) => {
            dismiss(modal.id, callback);
        });
    };

    const backAction = () => {
        if (!modalElements.length) {
            return false;
        }
        dismiss();
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, [modalElements.length]);

    return {
        getTopModalElementId,
        currentModal,
        add,
        destroy,
        onDialogDismissed,
        update,
        show,
        dismiss,
        dismissAll,
    };
};

export default useModal;
