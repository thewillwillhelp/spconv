import React from 'react';
import * as PropTypes from 'prop-types';

export function ToDoItem(props) {
    const onSizeChange = (event) => {
        props?.onSizeChange({
            id: props.id,
            size: parseInt(event.target.value),
        });
    };

    const onRemove = () => {
        props?.onRemove(props.id);
    };

    return (
        <li className="list-group-item container">
            <div className="row">
                <div className="col-md-8">{props.title}</div>
                <div className="col-md-2">
                    <input
                        className="col"
                        onChange={onSizeChange}
                        type="text"
                        value={props.size || 0} />
                </div>
                <div className="col-md-2">
                    <button type="button"
                        onClick={onRemove}
                        className="btn btn-primary btn-sm">x</button>
                </div>
            </div>
        </li>
    );
}

ToDoItem.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    size: PropTypes.number,
    onSizeChange: PropTypes.func,
    onRemove: PropTypes.func,
};
