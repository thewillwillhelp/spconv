export const REDUX_ACTION_ADD_TODO_ITEM = 'ADD_TODO_ITEM';
export const REDUX_ACTION_ADD_MULTIPLE_TODO_ITEMS = 'ADD_MULTIPLE_TODO_ITEMS';
export const REDUX_ACTION_UPDATE_TODO_ITEM = 'UPDATE_TODO_ITEM';
export const REDUX_ACTION_REMOVE_TODO_ITEM = 'REMOVE_TODO_ITEM';
export const REDUX_ACTION_REMOVE_ALL_TODO_ITEMS = 'REMOVE_ALL_TODO_ITEMS';

export const REDUX_ACTION_ADD_SP_CONFIG_ITEM = 'ADD_SP_CONFIG_ITEM';
export const REDUX_ACTION_ADD_MULTIPLE_SP_CONFIG_ITEMS = 'ADD_MULTIPLE_SP_CONFIG_ITEMS';
export const REDUX_ACTION_REMOVE_SP_CONFIG_ITEM = 'REMOVE_SP_CONFIG_ITEM';
export const REDUX_ACTION_REMOVE_ALL_SP_CONFIG_ITEMS = 'REMOVE_ALL_SP_CONFIG_ITEMS';
export const REDUX_ACTION_UPDATE_SP_CONFIG_ITEM = 'UPDATE_SP_CONFIG_ITEM';

export const COUNTER_NAME_SP_CONFIG_ITEMS = 'sp-config-items';
export const COUNTER_NAME_TODO_ITEMS = 'todo-items';

const counters = {};
export function getCounter(counterName) {
    const nextNumber = typeof(counters[counterName]) === 'number' ? counters[counterName] + 1 : 0;
    counters[counterName] = nextNumber;
    return nextNumber;
}

export function setCounter(counterName, value) {
    counters[counterName] = value;
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

export function addMultipleSpConfigItems(items) {
    return {
        type: REDUX_ACTION_ADD_MULTIPLE_SP_CONFIG_ITEMS,
        payload: {
            items: items.map((item) => ({
                id: getCounter(COUNTER_NAME_SP_CONFIG_ITEMS),
                ...item,
            })),
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

export function removeAllConfigItems(id) {
    return {type: REDUX_ACTION_REMOVE_ALL_SP_CONFIG_ITEMS};
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

export function addMultipleToDoItems(items) {
    return {
        type: REDUX_ACTION_ADD_MULTIPLE_TODO_ITEMS,
        payload: {
            items: items.map((item) => ({
                id: getCounter(COUNTER_NAME_TODO_ITEMS),
                ...item,
            })),
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

export function removeAllToDoItems() {
    return {type: REDUX_ACTION_REMOVE_ALL_TODO_ITEMS};
}

