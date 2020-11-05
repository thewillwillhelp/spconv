import {getCounter, COUNTER_NAME_SP_CONFIG_ITEMS, COUNTER_NAME_TODO_ITEMS} from './actions';

export const todoItems = [
    {
        id: getCounter(COUNTER_NAME_TODO_ITEMS),
        title: 'do something',
        size: 1,
    },
    {
        id: getCounter(COUNTER_NAME_TODO_ITEMS),
        title: 'do something else',
        size: 2,
    },
];

export const storyPointsConfigsList =[
    {
        id: getCounter(COUNTER_NAME_SP_CONFIG_ITEMS),
        size: 0.5,
        minTime: 1,
        maxTime: 4,
    },
    {
        id: getCounter(COUNTER_NAME_SP_CONFIG_ITEMS),
        size: 1,
        minTime: 4,
        maxTime: 8,
    },
    {
        id: getCounter(COUNTER_NAME_SP_CONFIG_ITEMS),
        size: 2,
        minTime: 8,
        maxTime: 16,
    },
    {
        id: getCounter(COUNTER_NAME_SP_CONFIG_ITEMS),
        size: 3,
        minTime: 16,
        maxTime: 32,
    },
];
