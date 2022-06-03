import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Svg, { Line, Rect, Text as SvgText } from 'react-native-svg';
import Metrics from 'assets/metrics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LINE_HEIGHT, RECTANGLE_WIDTH, RECTANGLE_HEIGHT } from 'utilities/staticData';
import DivisionItem from './components/DivisionItem';
import Item from './components/Item';

const genStaticData = (arrLength: number) => {
    return Array(arrLength)
        .fill('')
        .map((arrItem, arrIndex) => {
            const randomSubDivNumber = Math.floor(Math.random() * 11);
            const arrSubDiv =
                randomSubDivNumber > 0
                    ? Array(randomSubDivNumber)
                          .fill('')
                          .map((_, arrSubIndex) => {
                              return `Sub ${arrIndex + 1}.${arrSubIndex}`;
                          })
                    : [];
            return {
                name: `Div ${arrIndex + 1} (${arrSubDiv?.length})`,
                children: arrSubDiv,
                showChildren: false,
            };
        });
};

const divisionData = genStaticData(20);

const TestSvgSreen = () => {
    const [currentDivData, setCurrentDivData] = useState(divisionData);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <Item />
                </View>
                <Svg height={`${LINE_HEIGHT + LINE_HEIGHT / 3}`} width={`${Metrics.screenWidth}`}>
                    <Line
                        x1={`${Metrics.screenWidth / 2}`}
                        y1="0"
                        x2={`${Metrics.screenWidth / 2}`}
                        y2={`${LINE_HEIGHT}`}
                        stroke="red"
                        strokeWidth="2"
                    />
                    <Rect
                        x={`${Metrics.screenWidth / 2 - RECTANGLE_WIDTH / 2}`}
                        y={`${LINE_HEIGHT / 2 - RECTANGLE_HEIGHT / 2}`}
                        width={`${RECTANGLE_WIDTH}`}
                        height={`${RECTANGLE_HEIGHT}`}
                        fill="rgb(255,255,255)"
                        strokeWidth="2"
                        stroke={'black'}
                    />
                    <SvgText
                        fill="black"
                        fontSize="15"
                        x={`${Metrics.screenWidth / 2}`}
                        y={`${LINE_HEIGHT / 2 + RECTANGLE_HEIGHT / 5}`}
                        textAnchor="middle"
                        fontWeight={'bold'}
                    >
                        2
                    </SvgText>
                    <Line
                        x1={`${Metrics.screenWidth / 4}`}
                        y1="60"
                        x2={`${(3 * Metrics.screenWidth) / 4}`}
                        y2="60"
                        stroke="red"
                        strokeWidth="2"
                    />
                    <Line
                        x1={`${Metrics.screenWidth / 4}`}
                        y1={`${LINE_HEIGHT}`}
                        x2={`${Metrics.screenWidth / 4}`}
                        y2={`${LINE_HEIGHT + LINE_HEIGHT / 3}`}
                        stroke="red"
                        strokeWidth="2"
                    />
                    <Line
                        x1={`${(3 * Metrics.screenWidth) / 4}`}
                        y1={`${LINE_HEIGHT}`}
                        x2={`${(3 * Metrics.screenWidth) / 4}`}
                        y2={`${LINE_HEIGHT + LINE_HEIGHT / 3}`}
                        stroke="red"
                        strokeWidth="2"
                    />
                </Svg>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: Metrics.screenWidth * 0.88,
                        alignSelf: 'center',
                    }}
                >
                    <Item />
                    <Item />
                </View>
                <Svg height={`${LINE_HEIGHT}`} width={`${Metrics.screenWidth}`}>
                    <Line
                        x1={`${Metrics.screenWidth / 4}`}
                        y1={`${0}`}
                        x2={`${Metrics.screenWidth / 4}`}
                        y2={`${LINE_HEIGHT}`}
                        stroke="red"
                        strokeWidth="2"
                    />
                    <Rect
                        x={`${Metrics.screenWidth / 4 - RECTANGLE_WIDTH / 2}`}
                        y={`${LINE_HEIGHT / 2 - RECTANGLE_HEIGHT / 2}`}
                        width={`${RECTANGLE_WIDTH}`}
                        height={`${RECTANGLE_HEIGHT}`}
                        fill="rgb(255,255,255)"
                        strokeWidth="2"
                        stroke={'black'}
                    />
                    <SvgText
                        fill="black"
                        fontSize="15"
                        x={`${Metrics.screenWidth / 4}`}
                        y={`${LINE_HEIGHT / 2 + RECTANGLE_HEIGHT / 5}`}
                        textAnchor="middle"
                        fontWeight={'bold'}
                    >
                        {currentDivData?.length}
                    </SvgText>
                    <Line
                        x1={`${Metrics.screenWidth / 4}`}
                        y1={`${LINE_HEIGHT}`}
                        x2={`${Metrics.screenWidth / 12}`}
                        y2={`${LINE_HEIGHT}`}
                        stroke="red"
                        strokeWidth="2"
                    />
                </Svg>
                {/* List all item */}
                {currentDivData?.map((divItem, divIndex) => {
                    return (
                        <DivisionItem
                            name={divItem?.name}
                            index={divIndex + 1}
                            subDivData={divItem?.children}
                            key={divIndex}
                            onPress={() => {
                                const newDivData = currentDivData?.map((curDivItem, curDivIndex) => {
                                    if (curDivIndex === divIndex) {
                                        return {
                                            ...curDivItem,
                                            showChildren: !curDivItem.showChildren,
                                        };
                                    }
                                    return curDivItem;
                                });
                                setCurrentDivData(newDivData);
                            }}
                            showChildren={divItem?.showChildren}
                            showTailPath={divIndex !== divisionData?.length - 1}
                        />
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

export default TestSvgSreen;

const styles = StyleSheet.create({});
