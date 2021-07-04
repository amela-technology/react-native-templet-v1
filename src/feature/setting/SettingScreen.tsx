import React, { FunctionComponent } from 'react';
import StyledText from 'components/base/StyledText';
import { StyledButton } from 'components/base';
import AuthenticateService from 'utilities/authenticate/AuthenticateService';
import StyledView from 'components/base/StyledView';
import { Themes } from 'assets/themes';

const SettingView: FunctionComponent = () => {
    return (
        <StyledView flex={1} color={Themes.COLORS.white} middle justifyContent={'center'}>
            <StyledText originValue={'Setting'} />
            <StyledButton onPress={AuthenticateService.logOut} title={'Log out'} />
        </StyledView>
    );
};

export default SettingView;
