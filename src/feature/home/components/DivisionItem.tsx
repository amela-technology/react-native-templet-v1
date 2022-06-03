import { StyleSheet } from 'react-native';
import React, { memo } from 'react';
import Metrics from 'assets/metrics';
import { StyledTouchable } from 'components/base';
import Svg, { Line, Rect, Polygon, Text as SvgText } from 'react-native-svg';
import { LINE_HEIGHT, RECTANGLE_WIDTH, RECTANGLE_HEIGHT, HEXAGON_SIZE } from 'utilities/staticData';
import SubDivisionItem from './SubDivisionItem';
import Item from './Item';

interface IDivisionItem {
    name: string;
    index: number;
    subDivData: Array<any>;
    showChildren?: boolean;
    showTailPath?: boolean;
    lastSubItemHasTail?: boolean;
    onPress(): void;
}

const DivisionItem = (props: IDivisionItem) => {
    const {
        name = '',
        index = 0,
        subDivData = [],
        showChildren = false,
        showTailPath = true,
        lastSubItemHasTail = true,
        onPress,
    } = props;
    const getHexagonPoints = (currentX: number, currentY: number) => {
        const p1 = `${currentX + 10}, ${currentY + 0}`;
        const p2 = `${currentX + 20}, ${currentY + 5}`;
        const p3 = `${currentX + 20}, ${currentY + 15}`;
        const p4 = `${currentX + 10}, ${currentY + 20}`;
        const p5 = `${currentX + 0}, ${currentY + 15}`;
        const p6 = `${currentX + 0}, ${currentY + 5}`;
        return `${p1} ${p2} ${p3} ${p4} ${p5} ${p6}`;
    };

    console.log('showChildren, subDivData', showChildren, subDivData);

    return (
        <>
            <StyledTouchable
                onPress={onPress}
                customStyle={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}
            >
                <Svg height={`${LINE_HEIGHT}`} width={`${RECTANGLE_WIDTH}`}>
                    <Line
                        x1={`${Metrics.screenWidth / 12}`}
                        y1={`${0}`}
                        x2={`${Metrics.screenWidth / 12}`}
                        y2={`${LINE_HEIGHT / 2}`}
                        stroke="red"
                        strokeWidth="2"
                    />
                    {/* This one is for the linking line to next line of next item */}
                    {(showChildren || showTailPath) && (
                        <Line
                            x1={`${Metrics.screenWidth / 12}`}
                            y1={`${LINE_HEIGHT / 2}`}
                            x2={`${Metrics.screenWidth / 12}`}
                            y2={`${LINE_HEIGHT}`}
                            stroke="red"
                            strokeWidth="2"
                        />
                    )}
                    {/*  */}
                    <Rect
                        x={`${Metrics.screenWidth / 2 - RECTANGLE_WIDTH / 2}`}
                        y={`${LINE_HEIGHT / 2 - RECTANGLE_HEIGHT / 2}`}
                        width={`${RECTANGLE_WIDTH}`}
                        height={`${RECTANGLE_HEIGHT}`}
                        fill="rgb(255,255,255)"
                        strokeWidth="2"
                        stroke={'black'}
                    />
                    <Polygon
                        points={getHexagonPoints(
                            Metrics.screenWidth / 12 - HEXAGON_SIZE / 2,
                            LINE_HEIGHT / 2 - HEXAGON_SIZE / 2,
                        )}
                        fill="rgb(255,255,255)"
                        strokeWidth="2"
                        stroke={'black'}
                    />
                    <SvgText
                        fill="black"
                        fontSize="12"
                        x={`${Metrics.screenWidth / 12}`}
                        y={`${LINE_HEIGHT / 2 + HEXAGON_SIZE / 5}`}
                        textAnchor="middle"
                        fontWeight={'bold'}
                    >
                        {index}
                    </SvgText>
                </Svg>
                <Item name={name} />
            </StyledTouchable>
            {showChildren
                ? subDivData?.map((subItem, subIndex) => {
                      console.log('subItem', subItem);
                      if (subIndex === subDivData?.length - 1) {
                          return (
                              <SubDivisionItem
                                  key={`Sub-${subIndex}`}
                                  name={subItem}
                                  showTailPath={lastSubItemHasTail}
                              />
                          );
                      }
                      return <SubDivisionItem key={`Sub-${subIndex}`} name={subItem} />;
                  })
                : null}
        </>
    );
};

export default memo(DivisionItem);

const styles = StyleSheet.create({});
