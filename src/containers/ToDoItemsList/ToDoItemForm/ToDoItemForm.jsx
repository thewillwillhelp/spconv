import React, {useState} from 'react';
import * as PropTypes from 'prop-types';

export function ToDoItemForm(props) {
    const [title, setTitle] = useState('');
    const [size, setSize] = useState(0);

    const onTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const onSizeChange = (event) => {
        setSize(parseInt(event.target.value) || 0);
    };

    const onAddItem = () => {
        props?.onAddItem({title, size});
    };

    return (
        <li className="list-group-item container">
            <div className="row">
                <div className="col-md-8">
                    <input
                        className="col"
                        placeholder="Enter task name"
                        onChange={onTitleChange}
                        type="text"
                        value={title} />
                </div>
                <div className="col-md-2">
                    <input
                        className="col"
                        onChange={onSizeChange}
                        type="text"
                        value={size} />
                </div>
                <div className="col-md-2">
                    <button type="button"
                        onClick={onAddItem}
                        className="btn btn-primary btn-sm">+</button>
                </div>
            </div>
        </li>
    );
}

ToDoItemForm.propTypes = {
    onAddItem: PropTypes.func,
};
