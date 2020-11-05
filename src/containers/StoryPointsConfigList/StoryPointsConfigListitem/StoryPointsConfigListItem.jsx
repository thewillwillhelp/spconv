import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './StoryPointsConfigListItem.css';

export function StoryPointsConfigListItem(props) {
    const min = props.min ? props.min : 0;
    const max = props.max ? props.max : 0;

    const onMinChange = (event) => {
        props?.onMinChange(props.id, parseFloat(event.target.value) || 0);
    };

    const onMaxChange = (event) => {
        props?.onMaxChange(props.id, parseFloat(event.target.value) || 0);
    };

    const onRemove = () => {
        props?.onRemove(props.id);
    };

    return (
        <li className="list-group-item container">
            <div className="row">
                <div className="col-md-4">{props.size} SP</div>
                <div className="col-md-3">
                    <input
                        className={`${styles['hours-conv-value']} col-md`}
                        type="text"
                        onChange={onMinChange}
                        value={min} />
                </div>
                <div className="col-md-3">
                    <input
                        className={`${styles['hours-conv-value']} col-md`}
                        type="text"
                        onChange={onMaxChange}
                        value={max} />
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

StoryPointsConfigListItem.propTypes = {
    id: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    min: PropTypes.number,
    onMinChange: PropTypes.func,
    max: PropTypes.number,
    onMaxChange: PropTypes.func,
    onRemove: PropTypes.func,
};
