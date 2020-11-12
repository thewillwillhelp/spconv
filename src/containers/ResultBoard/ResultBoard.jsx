import React from 'react';
import {useSelector} from 'react-redux';
import {calculateEstimations} from './../../services/calculateEstimations';

export function ResultBoard() {
    const spConfigItems = useSelector((reduxStore) => reduxStore?.storyPointsConfigs?.list);
    const todoItems = useSelector((reduxStore) => reduxStore?.todoItems);
    const fullResults = calculateEstimations(todoItems, spConfigItems);

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
