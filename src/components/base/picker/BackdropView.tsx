import React from 'react';
import { StyleSheet, View } from 'react-native';
import { handleUpdateModalList } from 'utilities/helper';

const BackdropView = () => {
    return <View style={styles.cont} onLayout={handleUpdateModalList} />;
};

const styles = StyleSheet.create({
    cont: {
        width: 0,
        height: 0,
    },
});

export default BackdropView;
