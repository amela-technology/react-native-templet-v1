/* eslint-disable no-underscore-dangle */
import { getProfile } from 'api/modules/api-app/authenticate';
import { getMessage } from 'api/modules/api-app/chat';
import Images from 'assets/images';
import React, { useCallback, useEffect, useState } from 'react';
import Config from 'react-native-config';
import { GiftedChat } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import socketIO from 'socket.io-client';
import { logger } from './helper';

export const socket = socketIO(`${Config.API_URL}?role=owner`, { timeout: 3000 });
export const SocketProvider = ({ children }: any) => {
    const userInfo = useSelector((state: any) => state.userInfo);
    async function handleOnConnect() {
        socket.emit('authenticate', { token: userInfo?.token });
        // neu khong authen duoc het han token thi goi lại api de lay refresh token va authen lai
        socket.on('unauthorized', async () => {
            await getProfile();
            socket.emit('authenticate', { token: userInfo?.token });
        });
    }

    function startSocket() {
        socket.on('connect', () => {
            handleOnConnect();
        });
        socket.on('authenticated', () => {
            logger('connected');
        });
        socket.connect();
    }
    function stopSocket() {
        socket?.off('connect');
        socket?.off('reconnect');
        socket?.off('authenticated');
        socket?.off('server-send-message');
        socket?.disconnect();
    }
    useEffect(() => {
        if (userInfo?.token) {
            startSocket();
        }
        return () => {
            stopSocket();
        };
    }, [userInfo?.token]);

    return <>{children}</>;
};

export const useSocket = (id?: string) => {
    const [conversationId, setConversationId] = useState(id);
    const userInfo = useSelector((state: any) => state?.userInfo);
    const [messages, setMessages] = useState<any>([]);
    // tuy vao tung api detail user User Data se khac nhau
    const [dataUser, setUser] = useState({
        _id: Number(`1${userInfo?.honbuId}`),
        name: userInfo?.honbuName,
    });
    const [image, setImage] = useState<any>('');
    const listStaff = useSelector((state: any) => state?.addStaff);
    const leaveRoom = () => {
        socket.emit('leave-room', { conversationId });
    };
    // neu id sau khac id truoc thì rời room
    if (id !== conversationId) {
        leaveRoom();
        setMessages([]);
        setConversationId(id);
    }
    useEffect(() => {
        setTimeout(() => {
            joinRoom();
        }, 100);
    }, [conversationId]);
    useEffect(() => {
        if (image) {
            onSend(
                [
                    {
                        createdAt: new Date().getTime(),
                        _id: Math.random().toString(),
                    },
                ],
                1,
            );
            setImage('');
        }
    }, [image, conversationId]);
    const formatMessage = (item: any) => {
        return {
            _id: item?.createdAt || item?._id,
            text: item?.messageType === 0 && item?.body,
            createdAt: item?.createdAt,
            user: {
                _id: Number(`${item?.memberType}${item?.memberId}`),
                avatar:
                    listStaff?.find(
                        (staff: any) => Number(`2${staff?.staffId}`) === Number(`${item?.memberType}${item?.memberId}`),
                    )?.photo?.[0] || Images.icons?.avatar,
                name:
                    listStaff?.find(
                        (staff: any) => Number(`2${staff?.staffId}`) === Number(`${item?.memberType}${item?.memberId}`),
                    )?.nickname || dataUser?.name,
            },
            image: item?.messageType === 1 && item?.body,
        };
    };
    const getListMessage = async (time?: any) => {
        const params = {
            conversationId,
            lastTime: time || new Date().getTime(),
            pageSize: 10,
        };
        const responseMessage = await getMessage(params);
        const messagesNew = responseMessage?.data?.data.map((item: any) => {
            return formatMessage(item);
        });
        setMessages((previousMessages: any) => {
            return GiftedChat.append(messagesNew, previousMessages);
        });
    };
    const onSend = useCallback(
        (mess: any = [], messageType = 0) => {
            sendMessage({
                conversationId,
                messageType,
                body: messageType === 0 ? mess?.[0]?.text : image,
            });
            const newMess = {
                ...mess[0],
                user: dataUser,
                image,
            };
            setMessages((previousMessages: any) => GiftedChat.append(previousMessages, newMess));
        },
        [conversationId, image],
    );

    const emitJoinRoom = (cb?: any) => {
        socket.emit(
            'join-room',
            {
                conversationId,
                lastTime: new Date().getTime(),
            },
            (res: any) => {
                cb?.();
            },
        );
    };
    const joinRoom = () => {
        emitJoinRoom(getListMessage);
        socket.off('server-send-message');
        socket.on('server-send-message', (data: any) => {
            setMessages((previousMessages: any) => {
                return GiftedChat.append(previousMessages, [formatMessage(data)]);
            });
        });
        socket.off('reconnect');
        socket.on('reconnect', (attempt: any) => {
            emitJoinRoom(getListMessage);
        });
    };
    const sendMessage = (obj: any) => {
        socket.emit('client-send-message', obj, (res: any) => {
            logger('client-send-message', false, res);
        });
    };

    return { leaveRoom, messages, onSend, getListMessage, setImage };
};
