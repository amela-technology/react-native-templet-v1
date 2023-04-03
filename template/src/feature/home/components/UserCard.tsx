import * as React from 'react';
import { ProgressiveImage, StyledText } from 'components/base';
import { StyleSheet, View } from 'react-native';
import { Themes } from 'assets/themes';

const UserCard = (props: any) => {
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
                <StyledText customStyle={styles.name} i18nText={'Error, User not exits'} />
                <View style={styles.info}>
                    <View style={styles.infoContainer}>
                        <StyledText customStyle={styles.flex1} i18nText={'Phone: '} />
                        <StyledText customStyle={styles.flex3} i18nText={'Error, User not exits'} />
                    </View>
                    <View style={styles.infoContainerMargin}>
                        <StyledText customStyle={styles.flex1} i18nText={'Email: '} />
                        <StyledText customStyle={styles.flex3} i18nText={'Error, User not exits'} />
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ProgressiveImage source={{ uri: data.avatar }} style={styles.image} />
            <StyledText customStyle={styles.name} originValue={data.name} />
            <View style={styles.info}>
                <View style={styles.infoContainer}>
                    <StyledText customStyle={styles.flex1} i18nText={'Phone: '} />
                    <StyledText customStyle={styles.flex3} originValue={data.phone} />
                </View>
                <View style={styles.infoContainerMargin}>
                    <StyledText customStyle={styles.flex1} i18nText={'Email: '} />
                    <StyledText customStyle={styles.flex3} originValue={data.email} />
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
    flex1: {
        flex: 1,
    },
    flex3: {
        flex: 3,
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
