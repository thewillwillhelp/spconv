import {applyMiddleware, createStore} from 'redux';
import {
    setCounter,
    COUNTER_NAME_TODO_ITEMS,
    REDUX_ACTION_ADD_TODO_ITEM,
    REDUX_ACTION_ADD_SP_CONFIG_ITEM,
    REDUX_ACTION_REMOVE_SP_CONFIG_ITEM,
    REDUX_ACTION_REMOVE_TODO_ITEM,
    REDUX_ACTION_UPDATE_SP_CONFIG_ITEM,
    REDUX_ACTION_UPDATE_TODO_ITEM,
    REDUX_ACTION_ADD_MULTIPLE_TODO_ITEMS,
    REDUX_ACTION_REMOVE_ALL_TODO_ITEMS,
    REDUX_ACTION_REMOVE_ALL_SP_CONFIG_ITEMS,
    REDUX_ACTION_ADD_MULTIPLE_SP_CONFIG_ITEMS,
    COUNTER_NAME_SP_CONFIG_ITEMS,
} from './actions';
import {storyPointsConfigsList, todoItems} from './defaultData';

const defaultReduxStore = getDefaultReduxStore();

function getCachedApplicationData() {
    try {
        const cachedApplicationData = JSON.parse(localStorage.getItem('spconv'));
        return cachedApplicationData || {};
    } catch (error) {
        return {};
    }
}

function getDefaultReduxStore() {
    const cachedApplicationData = getCachedApplicationData();

    if (cachedApplicationData?.todoItems?.length > 0) {
        let lastTodoIndex = 0;
        cachedApplicationData?.todoItems.forEach((todoItem) => {
            const itemIndex = parseInt(todoItem.id);
            if (itemIndex > lastTodoIndex) {
                lastTodoIndex = parseInt(todoItem.id);
            }
        });

        setCounter(COUNTER_NAME_TODO_ITEMS, lastTodoIndex);
    }

    const cachedConfigItemsList = cachedApplicationData?.storyPointsConfigs?.list;
    if (cachedConfigItemsList?.length > 0) {
        let lastSpConfigIndex = 0;
        cachedConfigItemsList.forEach((todoItem) => {
            const itemIndex = parseInt(todoItem.id);
            if (itemIndex > lastSpConfigIndex) {
                lastSpConfigIndex = parseInt(todoItem.id);
            }
        });

        setCounter(COUNTER_NAME_SP_CONFIG_ITEMS, lastSpConfigIndex);
    }

    return {
        todoItems: cachedApplicationData.todoItems || todoItems,
        storyPointsConfigs: {
            ...cachedApplicationData.storyPointsConfigs,
            list: cachedConfigItemsList || storyPointsConfigsList,
        },
    };
}

function mainReducer(reduxStore = defaultReduxStore, action) {
    switch (action.type) {
    case REDUX_ACTION_ADD_TODO_ITEM:
        return {
            ...reduxStore,
            todoItems: [...reduxStore.todoItems, action.payload.item],
        };

    case REDUX_ACTION_ADD_MULTIPLE_TODO_ITEMS:
        return {
            ...reduxStore,
            todoItems: [...reduxStore.todoItems, ...action.payload.items],
        };

    case REDUX_ACTION_UPDATE_TODO_ITEM:
        return {
            ...reduxStore,
            todoItems: reduxStore.todoItems.map((todoItem) => {
                if (todoItem.id !== action.payload.itemDiff.id) {
                    return todoItem;
                }

                return {
                    ...todoItem,
                    ...action.payload.itemDiff,
                };
            }),
        };

    case REDUX_ACTION_REMOVE_TODO_ITEM:
        return {
            ...reduxStore,
            todoItems: reduxStore?.todoItems
                ?.filter((todoItem) => todoItem.id !== action.payload.id),
        };

    case REDUX_ACTION_REMOVE_ALL_TODO_ITEMS:
        return {
            ...reduxStore,
            todoItems: [],
        };

    case REDUX_ACTION_ADD_SP_CONFIG_ITEM:
        return {
            ...reduxStore,
            storyPointsConfigs: {
                ...reduxStore?.storyPointsConfigs,
                list: [...reduxStore?.storyPointsConfigs?.list, action.payload.item],
            },
        };

    case REDUX_ACTION_ADD_MULTIPLE_SP_CONFIG_ITEMS:
        return {
            ...reduxStore,
            storyPointsConfigs: {
                ...reduxStore?.storyPointsConfigs,
                list: [...reduxStore?.storyPointsConfigs?.list, ...action.payload.items],
            },
        };

    case REDUX_ACTION_REMOVE_SP_CONFIG_ITEM:
        return {
            ...reduxStore,
            storyPointsConfigs: {
                ...reduxStore?.storyPointsConfigs,
                list: reduxStore?.storyPointsConfigs?.list
                    .filter((configItem) => configItem.id !== action.payload.id),
            },
        };

    case REDUX_ACTION_REMOVE_ALL_SP_CONFIG_ITEMS:
        return {
            ...reduxStore,
            storyPointsConfigs: {
                ...reduxStore?.storyPointsConfigs,
                list: [],
            },
        };

    case REDUX_ACTION_UPDATE_SP_CONFIG_ITEM:
        return {
            ...reduxStore,
            storyPointsConfigs: {
                ...reduxStore?.storyPointsConfigs,
                list: reduxStore?.storyPointsConfigs?.list
                    .map((configItem) => {
                        if (configItem.id !== action.payload.itemDiff.id) {
                            return configItem;
                        }

                        return {
                            ...configItem,
                            ...action.payload.itemDiff,
                        };
                    }),
            },
        };

    default:
        return reduxStore;
    }
}


const saveToLocalStorage = (reduxStore) => (next) => (action) => {
    const result = next(action);
    const currentStateOfReduxStore = reduxStore.getState();

    const applicationData = {
        todoItems: currentStateOfReduxStore.todoItems,
        storyPointsConfigs: currentStateOfReduxStore.storyPointsConfigs,
    };

    localStorage.setItem('spconv', JSON.stringify(applicationData));

    return result;
};

export const store = createStore(mainReducer, applyMiddleware(saveToLocalStorage));
