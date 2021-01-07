/* eslint-disable no-underscore-dangle */
import React, { useState, useCallback, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { getMessage } from 'api/modules/api-app/chat';
import Images from 'assets/images';
import { StyledIcon } from 'components/base';
import ImagePicker from 'components/common/ImagePicker';
import StyledHeader from 'components/common/StyledHeader';
import { View, ActivityIndicator, Text } from 'react-native';
import { GiftedChat, Composer, Send, Bubble } from 'react-native-gifted-chat';
import { ScaledSheet, verticalScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { useSocket } from 'utilities/SocketProvider';

const ChatScreen = ({ route }: any) => {
    const { conversationId: id, name } = route?.params;
    const userInfo = useSelector((state: any) => state?.userInfo);
    // tuy vao tung api detail user User Data se khac nhau
    const [dataUser, setUser] = useState({
        _id: Number(`1${userInfo?.honbuId}`),
        name: userInfo?.honbuName,
    });
    const isFocus = useIsFocused();
    const { leaveRoom, getListMessage, messages, onSend, setImage } = useSocket(id);
    const [callOnScrollEnd, setCallOnScrollEnd] = React.useState(false);
    useEffect(() => {
        if (!isFocus) {
            leaveRoom();
        }
    }, [isFocus]);
    const renderName = (props: any) => {
        const self = dataUser;
        const { user = {} } = props.currentMessage;
        const { user: pUser = {} } = props.previousMessage;
        const isSameUser = pUser._id === user._id;
        const isSelf = user._id === self._id;
        const shouldNotRenderName = isSameUser || isSelf;

        return shouldNotRenderName ? <View /> : <Text style={[!isSelf && styles.otherUser]}>{user.name}</Text>;
    };
    const renderBubble = (props: any) => {
        return (
            <View>
                {renderName(props)}
                <Bubble {...props} />
            </View>
        );
    };

    const onLoadEarlier = async () => {
        try {
            const fromTime = messages.length > 0 ? messages[messages.length - 1].createdAt : new Date().getTime();
            getListMessage(fromTime);
        } catch (error) {
            console.log();
        }
    };
    const renderSend = (props: any) => {
        return (
            <Send {...props} containerStyle={{ alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
                <StyledIcon source={Images.icons.icSendMess} size={20} />
            </Send>
        );
    };
    const renderComposer = (props: any) => {
        return (
            <View style={styles.composer}>
                <ImagePicker setImage={setImage}>
                    <StyledIcon customStyle={{ marginLeft: 3 }} source={Images.icons.icPickImage} size={30} />
                </ImagePicker>

                <Composer {...props} multiline textInputStyle={styles.input} placeholderTextColor={'#D2D2D2'} />
            </View>
        );
    };
    return (
        <View style={{ flex: 1 }}>
            <StyledHeader />
            <GiftedChat
                messages={messages}
                bottomOffset={verticalScale(60)}
                placeholder={'メッセージを入力'}
                timeFormat={'HH:mm'}
                listViewProps={{
                    showsVerticalScrollIndicator: false,
                    style: { marginBottom: 10 },
                    onEndReachedThreshold: 0.01,
                    onEndReached: () => {
                        if (messages.length >= 10) {
                            setCallOnScrollEnd(true);
                        }
                    },
                    onMomentumScrollEnd: () => {
                        onLoadEarlier();
                    },
                    ListFooterComponent: () => {
                        return callOnScrollEnd ? <ActivityIndicator /> : null;
                    },
                    initialNumToRender: 20,
                }}
                user={{
                    _id: Number(`1${userInfo?.honbuId}`),
                    name: userInfo?.honbuName,
                }}
                renderSend={renderSend}
                renderBubble={renderBubble}
                renderAvatarOnTop={true}
                dateFormat={'YYYY年MM月DD日 HH:mm'}
                renderComposer={renderComposer}
                onSend={(mess: any) => {
                    onSend(mess);
                }}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    composer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: Themes.COLORS.primary,
    },
    input: {
        // flex: 1,
        fontSize: 16,
        backgroundColor: 'white',
        paddingVertical: 4,
        paddingRight: '10@s',
        borderRadius: 20,
        paddingLeft: '15@s',
        marginRight: '10@s',
    },
    otherUser: {
        fontSize: 13,
        marginVertical: 2,
    },
});
export default ChatScreen;
