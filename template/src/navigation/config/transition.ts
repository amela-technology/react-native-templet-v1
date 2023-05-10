// eslint-disable-next-line import/no-unresolved
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';

const transition: TransitionSpec = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 100,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};

export default transition;
