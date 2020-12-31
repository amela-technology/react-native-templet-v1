import React from 'react';
import Modal, { ModalProps } from 'react-native-modal';

const DialogComponent: React.FunctionComponent<ModalProps> = (props: ModalProps) => {
    const { children } = props;
    return (
        <Modal {...props} backdropTransitionOutTiming={10}>
            {children}
        </Modal>
    );
};

export default DialogComponent;
