import * as React from 'react';
import RootSiblings from 'react-native-root-siblings';
import { Modalize, ModalizeProps } from 'react-native-modalize';
import { wait } from 'utilities/helper';
import { Themes } from 'assets/themes';
import { StyleProp, ViewStyle } from 'react-native';
import ModalizeCenterComponent from './ModalizeCenterComponent';

let modalControl: any[] = [];

interface CustomModalizeProps extends ModalizeProps {
    isCenter?: boolean;
    containerStyleCenter?: StyleProp<ViewStyle>;
}

const ModalizeManager = () => {
    const modalRef = React.createRef<any>();

    const show = (id: any, element: any, props: CustomModalizeProps) => {
        if (!modalControl.find((e) => e.id === id)) {
            const sibling = new RootSiblings(
                (
                    <Modalize
                        ref={modalRef}
                        onClosed={() => dismiss(id)}
                        withHandle={false}
                        scrollViewProps={{
                            scrollEnabled: false,
                            keyboardShouldPersistTaps: 'handled',
                        }}
                        {...props}
                        modalStyle={{
                            minHeight: props?.isCenter ? '100%' : 0,
                            backgroundColor: props?.isCenter ? 'transparent' : Themes.COLORS.white,
                        }}
                    >
                        {props?.isCenter ? (
                            <ModalizeCenterComponent
                                customContainerStyle={props?.containerStyleCenter}
                                handleDismiss={() => dismiss(id)}
                            >
                                {element}
                            </ModalizeCenterComponent>
                        ) : (
                            element
                        )}
                    </Modalize>
                ),
                () => {
                    modalRef?.current?.open();
                    const newRef = { ...modalRef };
                    modalControl.push({
                        id,
                        ref: newRef,
                        element: sibling,
                        props,
                    });
                },
            );
        } else {
            wait(200).then(() => {
                modalRef?.current?.open();
            });
        }
    };

    const dismiss = (id: any) => {
        const item = modalControl.find((e) => e.id === id);
        if (item) {
            const { ref, element } = item;
            ref?.current?.close();
            // destroy id
            const arrFilter = modalControl.filter((e) => e.id !== id);
            modalControl = [...arrFilter];
            wait(200).then(() => {
                element.destroy();
            });
        }
    };

    const update = (id: any, component: any, props: any) => {
        const item = modalControl.find((e) => e.id === id);
        if (item) {
            item.element.update(
                <Modalize ref={modalRef} onClosed={() => dismiss(id)} withHandle={false} {...item.props} {...props}>
                    {component}
                </Modalize>,
            );
        }
    };

    const dismissAll = () => {
        modalControl.forEach((item) => {
            const { element } = item;
            element?.destroy();
        });
    };

    const destroySpecificId = (id: any) => {
        const item = modalControl.find((e) => e.id === id);
        if (item) {
            const { element } = item;
            element?.destroy();
            // destroy id
            const arrFilter = modalControl.filter((e) => e.id !== id);
            modalControl = [...arrFilter];
        }
    };
    return { show, dismissAll, dismiss, update, destroySpecificId };
};

export default ModalizeManager;
