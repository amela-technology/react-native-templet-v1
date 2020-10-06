import React, { createContext, useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';

interface LoadingContext {
    status: boolean;
}

const LoadingContext = createContext<LoadingContext>({
    status: false,
});

export const useLoading = () => useContext<LoadingContext>(LoadingContext);

export const LoadingProvider = ({ children }: any) => {
    const [visible, setVisible] = React.useState(false);
    return (
        <LoadingContext.Provider value={{ status: visible }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute' }}>
                    <ActivityIndicator />
                </View>
                {children}
            </View>
        </LoadingContext.Provider>
    );
};

export default LoadingProvider;
