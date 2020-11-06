import {applyMiddleware, createStore} from 'redux';
import {
    REDUX_ACTION_ADD_TODO_ITEM,
    REDUX_ACTION_ADD_SP_CONFIG_ITEM,
    REDUX_ACTION_REMOVE_SP_CONFIG_ITEM,
    REDUX_ACTION_REMOVE_TODO_ITEM,
    REDUX_ACTION_UPDATE_SP_CONFIG_ITEM,
    REDUX_ACTION_UPDATE_TODO_ITEM,
} from './actions';
import {storyPointsConfigsList, todoItems} from './defaultData';

const cachedApplicationData = getCachedApplicationData();

function getCachedApplicationData() {
    try {
        const cachedApplicationData = JSON.parse(localStorage.getItem('spconv'));
        return cachedApplicationData || {};
    } catch (error) {
        return {};
    }
}

const defaultReduxStore = {
    todoItems: cachedApplicationData.todoItems || todoItems,
    storyPointsConfigs: {
        ...cachedApplicationData.storyPointsConfigs,
        list: cachedApplicationData?.storyPointsConfigs?.list || storyPointsConfigsList,
    },
};

function mainReducer(reduxStore = defaultReduxStore, action) {
    switch (action.type) {
    case REDUX_ACTION_ADD_TODO_ITEM:
        return {
            ...reduxStore,
            todoItems: [...reduxStore.todoItems, action.payload.item],
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

    case REDUX_ACTION_ADD_SP_CONFIG_ITEM:
        return {
            ...reduxStore,
            storyPointsConfigs: {
                ...reduxStore?.storyPointsConfigs,
                list: [...reduxStore?.storyPointsConfigs?.list, action.payload.item],
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
        storyPointsConfig: currentStateOfReduxStore.storyPointsConfigs,
    };

    localStorage.setItem('spconv', JSON.stringify(applicationData));

    return result;
};

export const store = createStore(mainReducer, applyMiddleware(saveToLocalStorage));
