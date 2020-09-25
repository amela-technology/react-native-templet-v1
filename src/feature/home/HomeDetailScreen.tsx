import * as React from 'react';
import { View, Button } from 'react-native';
import StyledText from 'components/base/StyledText';
import { useNavigation } from '@react-navigation/native';
import useModal from 'components/base/modal/useModal';
import Images from 'assets/images';
import StyledModalPicker from 'components/base/picker/StyledModalPicker';
import StyledHeader from 'components/common/StyledHeader';
import StyledWebView from 'components/base/StyledWebView';

const HomeDetailScreen: React.FunctionComponent = () => {
    return (
        <View style={{ flex: 1 }}>
            <StyledHeader title={'Home Detail'} />
            <View style={{ flex: 1 }}>
                <StyledWebView source={{ uri: 'https://reactnative.dev/docs/scrollview' }} style={{ flex: 1 }} />
            </View>
        </View>
    );
};
export default HomeDetailScreen;
