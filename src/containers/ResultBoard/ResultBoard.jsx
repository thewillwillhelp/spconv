import React from 'react';
import {useSelector} from 'react-redux';

export function ResultBoard() {
    const spConfigItems = useSelector((reduxStore) => reduxStore?.storyPointsConfigs?.list);
    const todoItems = useSelector((reduxStore) => reduxStore?.todoItems);

    const groupedTodoItems = todoItems.reduce((groups, todoItem) => {
        if (groups[todoItem.size]) {
            groups[todoItem.size].items.push(todoItem);
        } else {
            groups[todoItem.size] = {items: [todoItem]};
        }

        return groups;
    }, {});

    const groupedResults = spConfigItems.map((spConfigItem) => {
        const itemsInGroup = groupedTodoItems[spConfigItem.size]?.items.length || 0;
        const minTime = itemsInGroup * spConfigItem.minTime;
        const maxTime = itemsInGroup * spConfigItem.maxTime;
        const averageTime = itemsInGroup * (spConfigItem.maxTime - spConfigItem.minTime) / 2;

        return {
            min: minTime,
            max: maxTime,
            average: averageTime,
        };
    });

    const fullResults = groupedResults
        .reduce((fullResults, groupResult) => {
            return {
                min: fullResults.min + groupResult.min,
                max: fullResults.max + groupResult.max,
                average: fullResults.average + groupResult.average,
            };
        }, {min: 0, max: 0, average: 0});

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-10">
                    <div className="row">
                        Max: {fullResults.max}
                    </div>
                    <div className="row">
                        Min: {fullResults.min}
                    </div>
                    <div className="row">
                        Average: {fullResults.average}
                    </div>
                </div>
            </div>
        </div>
    );
}
