import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addToDoItem, removeToDoItem, updateToDoItem} from '../../store/actions';

import {ToDoItem} from './ToDoItem/ToDoItem';
import {ToDoItemForm} from './ToDoItemForm/ToDoItemForm';

export function ToDoItemsList() {
    const dispatch = useDispatch();
    const todoItems = useSelector((reduxStore) => reduxStore.todoItems);

    const onSizeChange = (itemDiff) => {
        dispatch(updateToDoItem(itemDiff));
    };

    const onAddToDoItem = (item) => {
        dispatch(addToDoItem(item));
    };

    const onRemoveToDoItem = (id) => {
        dispatch(removeToDoItem(id));
    };

    return (
        <div className="tasks col-md-8">
            <ul className="tasks-list list-group">
                <li className="list-group-item list-group-item-dark container">
                    <div className="row">
                        <div className="col-md-8">Title</div>
                        <div className="col-md-2">Size</div>
                    </div>
                </li>
                <ToDoItemForm onAddItem={onAddToDoItem}/>
                {
                    todoItems.map((item) => (
                        <ToDoItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            onSizeChange={onSizeChange}
                            onRemove={onRemoveToDoItem}
                            size={item.size} />
                    ))
                }
            </ul>
        </div>
    );
}
