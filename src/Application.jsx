import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';

import {store} from './store';

import {ToDoItemsList} from './containers/ToDoItemsList/ToDoItemsList';
import {StoryPointsConfigList}
    from './containers/StoryPointsConfigList/StoryPointsConfigList';
import {ResultBoard} from './containers/ResultBoard/ResultBoard';

export function Application() {
    return (
        <Provider store={store}>
            <div className="container">
                <div className="row">
                    <div className="col-md">
                        <ResultBoard />
                    </div>
                </div>
                <div className="row">
                    <ToDoItemsList />
                    <StoryPointsConfigList />
                </div>
            </div>
        </Provider>
    );
}

const appNode = document.querySelector('#app');
render(<Application />, appNode);

