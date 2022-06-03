import { StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import Metrics from 'assets/metrics';
import Svg, { Line, Circle } from 'react-native-svg';
import { LINE_HEIGHT, RECTANGLE_WIDTH, CIRCLE_SIZE } from 'utilities/staticData';
import Item from './Item';

interface ISubDivisionItem {
    name?: string;
    showTailPath?: boolean;
}

const SubDivisionItem = (props: ISubDivisionItem) => {
    const { name = '', showTailPath = true } = props;

    return (
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
            <Svg height={`${LINE_HEIGHT}`} width={`${RECTANGLE_WIDTH * 1.5}`}>
                <Line
                    x1={`${Metrics.screenWidth / 12}`}
                    y1={`${-LINE_HEIGHT / 2}`}
                    x2={`${Metrics.screenWidth / 12}`}
                    y2={`${LINE_HEIGHT / 2}`}
                    stroke="blue"
                    strokeWidth="2"
                />
                <Line
                    x1={`${Metrics.screenWidth / 12}`}
                    y1={`${LINE_HEIGHT / 2}`}
                    x2={`${Metrics.screenWidth / 12 + RECTANGLE_WIDTH}`}
                    y2={`${LINE_HEIGHT / 2}`}
                    stroke="blue"
                    strokeWidth="2"
                />
                {/* This one for colorize matching with next sub item */}
                {showTailPath && (
                    <Line
                        x1={`${Metrics.screenWidth / 12}`}
                        y1={`${LINE_HEIGHT / 2}`}
                        x2={`${Metrics.screenWidth / 12}`}
                        y2={`${LINE_HEIGHT}`}
                        stroke="blue"
                        strokeWidth="2"
                    />
                )}
                {/*  */}
                <Circle
                    cx={`${Metrics.screenWidth / 12}`}
                    cy={`${LINE_HEIGHT / 2}`}
                    r={`${CIRCLE_SIZE}`}
                    stroke={'black'}
                    fill={'white'}
                />
            </Svg>
            <Item name={name} />
        </View>
    );
};

export default memo(SubDivisionItem);

const styles = StyleSheet.create({});
