import * as React from 'react';
import { ProgressiveImage, StyledText } from 'components/base';
import { StyleSheet, View } from 'react-native';
import { User } from 'api/modules/api-app/general';
import { Themes } from 'assets/themes';

interface UserCardProps {
    data?: User;
    loading: boolean;
}

const UserCard: React.FunctionComponent<UserCardProps> = (props: UserCardProps) => {
    const { data, loading } = props;

    if (loading) {
        return (
            <View style={styles.container}>
                <View style={[styles.image, { backgroundColor: Themes.COLORS.placeHolderGray }]} />
                <View style={[styles.name, styles.loadingStyle, { width: '30%' }]} />
                <View style={styles.info}>
                    <View style={styles.infoContainer}>
                        <View style={loadingStyles.labelLoading} />
                        <View style={loadingStyles.textLoading} />
                    </View>
                    <View style={styles.infoContainerMargin}>
                        <View style={loadingStyles.labelLoading} />
                        <View style={loadingStyles.textLoading} />
                    </View>
                </View>
            </View>
        );
    }

    if (!data) {
        return (
            <View style={styles.container}>
                <View style={[styles.image, { backgroundColor: Themes.COLORS.placeHolderGray }]} />
                <StyledText style={styles.name}>{'Error, User not exits'}</StyledText>
                <View style={styles.info}>
                    <View style={styles.infoContainer}>
                        <StyledText style={{ flex: 1 }}>{'Phone: '}</StyledText>
                        <StyledText style={{ flex: 3 }}>{'Error, User not exits'}</StyledText>
                    </View>
                    <View style={styles.infoContainerMargin}>
                        <StyledText style={{ flex: 1 }}>{'Email: '}</StyledText>
                        <StyledText style={{ flex: 3 }}>{'Error, User not exits'}</StyledText>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ProgressiveImage source={{ uri: data.avatar }} style={styles.image} />
            <StyledText style={styles.name}>{data.name}</StyledText>
            <View style={styles.info}>
                <View style={styles.infoContainer}>
                    <StyledText style={{ flex: 1 }}>{'Phone: '}</StyledText>
                    <StyledText style={{ flex: 3 }}>{data.phone}</StyledText>
                </View>
                <View style={styles.infoContainerMargin}>
                    <StyledText style={{ flex: 1 }}>{'Email: '}</StyledText>
                    <StyledText style={{ flex: 3 }}>{data.email}</StyledText>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Themes.COLORS.primary,
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 15,
        borderRadius: 10,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        alignSelf: 'center',
    },
    name: {
        alignSelf: 'center',
        marginTop: 20,
    },
    info: {
        marginTop: 15,
        paddingLeft: 25,
    },
    infoContainer: {
        flexDirection: 'row',
    },
    infoContainerMargin: {
        flexDirection: 'row',
        marginTop: 10,
    },
    loadingStyle: {
        height: 14,
        backgroundColor: Themes.COLORS.placeHolderGray,
        borderRadius: 6,
    },
});

const loadingStyles = StyleSheet.create({
    labelLoading: {
        width: '20%',
        marginRight: 20,
        ...styles.loadingStyle,
    },
    textLoading: {
        width: '60%',
        ...styles.loadingStyle,
    },
});

export default UserCard;
