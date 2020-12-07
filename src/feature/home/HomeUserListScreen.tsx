import * as React from 'react';
import { View } from 'react-native';
import StyledHeader from 'components/common/StyledHeader';
import { StyledList, StyledText } from 'components/base';
import usePaging from 'hooks/usePaging';

const HomeUserListScreen: React.FunctionComponent = () => {
    return (
        <View style={{ flex: 1 }}>
            <StyledHeader title={'Home User List'} />
        </View>
    );
};
export default HomeUserListScreen;
