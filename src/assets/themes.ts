const common = {
    white: '#fff',
    transparent: 'transparent',
    black: '#000',
    blue: 'blue',
};

const Light = {
    COLORS: {
        ...common,
        primary: '#ffffff',
        secondary: '#E9ECEF',
        textPrimary: '#000000',
        textSecondary: '#607d8b',
    },
    FONTS: {
        defaultFont: 'Montserrat-Regular',
        boldFont: 'Montserrat-SemiBold',
        thinFont: 'Montserrat-Light',
    },
};

const Dark = {
    colors: {
        ...common,
        primary: '#607d8b',
        secondary: '#607d8b',
        textPrimary: '#607d8b',
        textSecondary: '#607d8b',
    },
    fonts: {
        defaultFont: 'Montserrat-Regular',
        boldFont: 'Montserrat-SemiBold',
        thinFont: 'Montserrat-Light',
    },
};

export const Themes = Light;

export const ThemesDark = Dark;
