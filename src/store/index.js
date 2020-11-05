import {createStore} from 'redux';
import {
    REDUX_ACTION_ADD_TODO_ITEM,
    REDUX_ACTION_ADD_SP_CONFIG_ITEM,
    REDUX_ACTION_REMOVE_SP_CONFIG_ITEM,
    REDUX_ACTION_REMOVE_TODO_ITEM,
    REDUX_ACTION_UPDATE_SP_CONFIG_ITEM,
    REDUX_ACTION_UPDATE_TODO_ITEM,
} from './actions';
import {storyPointsConfigsList, todoItems} from './defaultData';

const defaultReduxStore = {
    todoItems,
    storyPointsConfigs: {
        list: storyPointsConfigsList,
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

export const store = createStore(mainReducer);
