export const REDUX_ACTION_ADD_TODO_ITEM = 'ADD_TODO_ITEM';
export const REDUX_ACTION_UPDATE_TODO_ITEM = 'UPDATE_TODO_ITEM';
export const REDUX_ACTION_REMOVE_TODO_ITEM = 'REMOVE_TODO_ITEM';

export const REDUX_ACTION_ADD_SP_CONFIG_ITEM = 'ADD_SP_CONFIG_ITEM';
export const REDUX_ACTION_REMOVE_SP_CONFIG_ITEM = 'REMOVE_SP_CONFIG_ITEM';
export const REDUX_ACTION_UPDATE_SP_CONFIG_ITEM = 'UPDATE_SP_CONFIG_ITEM';

export const COUNTER_NAME_SP_CONFIG_ITEMS = 'sp-config-items';
export const COUNTER_NAME_TODO_ITEMS = 'todo-items';

const counters = {};
export function getCounter(counterName) {
    const nextNumber = typeof(counters[counterName]) === 'number' ? counters[counterName] + 1 : 0;
    counters[counterName] = nextNumber;
    return nextNumber;
}

export function addSpConfigItem(item) {
    return {
        type: REDUX_ACTION_ADD_SP_CONFIG_ITEM,
        payload: {
            item: {
                id: getCounter(COUNTER_NAME_SP_CONFIG_ITEMS),
                ...item,
            },
        },
    };
}

export function updateConfigItem(configItemDiff) {
    return {
        type: REDUX_ACTION_UPDATE_SP_CONFIG_ITEM,
        payload: {
            itemDiff: configItemDiff,
        },
    };
}

export function removeConfigItem(id) {
    return {
        type: REDUX_ACTION_REMOVE_SP_CONFIG_ITEM,
        payload: {
            id,
        },
    };
}

export function addToDoItem(item) {
    return {
        type: REDUX_ACTION_ADD_TODO_ITEM,
        payload: {
            item: {
                id: getCounter(COUNTER_NAME_TODO_ITEMS),
                ...item,
            },
        },
    };
}

export function updateToDoItem(configItemDiff) {
    return {
        type: REDUX_ACTION_UPDATE_TODO_ITEM,
        payload: {
            itemDiff: {
                ...configItemDiff,
            },
        },
    };
}

export function removeToDoItem(id) {
    return {
        type: REDUX_ACTION_REMOVE_TODO_ITEM,
        payload: {
            id,
        },
    };
}


