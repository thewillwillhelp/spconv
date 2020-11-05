import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {addSpConfigItem, removeConfigItem, updateConfigItem} from '../../store/actions';
import {StoryPointsConfigListItem} from './StoryPointsConfigListitem/StoryPointsConfigListItem';
import {StoryPointsConfigItemForm} from './StoryPointsConfigItemForm/StoryPointsConfigItemForm';

export function StoryPointsConfigList() {
    const dispatch = useDispatch();
    const storyPointsConfigsList = useSelector((reduxStore) => reduxStore?.storyPointsConfigs?.list);

    const onMinChange = (id, value) => {
        dispatch(updateConfigItem({
            id: id,
            minTime: value,
        }));
    };

    const onMaxChange = (id, value) => {
        dispatch(updateConfigItem({
            id: id,
            maxTime: value,
        }));
    };

    const onRemoveItem = (id) => {
        dispatch(removeConfigItem(id));
    };

    const onAddNewItem = (item) => {
        dispatch(addSpConfigItem(item));
    };

    return (
        <div className="configuration col-md-4">
            <ul className="config-list list-group">
                <li className="list-group-item list-group-item-dark container">
                    <div className="row">
                        <div className="col-md-4">SP</div>
                        <div className="col-md-3">Min Time</div>
                        <div className="col-md-3">Max Time</div>
                    </div>
                </li>
                <StoryPointsConfigItemForm onAddNewItem={onAddNewItem}/>
                {
                    storyPointsConfigsList.map((configItem) => (
                        <StoryPointsConfigListItem
                            id={configItem.id}
                            key={configItem.id}
                            min={configItem.minTime}
                            onMinChange={onMinChange}
                            max={configItem.maxTime}
                            onMaxChange={onMaxChange}
                            onRemove={onRemoveItem}
                            size={configItem.size} />
                    ))
                }
            </ul>
        </div>
    );
}
