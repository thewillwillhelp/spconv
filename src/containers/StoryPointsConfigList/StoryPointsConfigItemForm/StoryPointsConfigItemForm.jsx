import React, {useState} from 'react';
import * as PropTypes from 'prop-types';
import styles from './StoryPointsConfigItemForm.css';

export function StoryPointsConfigItemForm(props) {
    const [spValue, setSPValue] = useState(0);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);

    const onAddNewItem = (event) => {
        props?.onAddNewItem({
            size: spValue,
            minTime: minValue,
            maxTime: maxValue,
        });
    };

    return (
        <li className="list-group-item container">
            <div className="row">
                <div className="col-md-4">
                    <input
                        className={`${styles['input']} col-md`}
                        type="text"
                        onChange={(event) => setSPValue(parseFloat(event.target.value) || 0)}
                        value={spValue} />
                </div>
                <div className={`${styles['input-column']} col-md-3`}>
                    <input
                        className={`${styles['input']} col-md`}
                        type="text"
                        onChange={(event) => setMinValue(parseFloat(event.target.value) || 0)}
                        value={minValue} />
                </div>
                <div className={`${styles['input-column']} col-md-3`}>
                    <input
                        className={`${styles['input']} col-md`}
                        type="text"
                        onChange={(event) => setMaxValue(parseFloat(event.target.value) || 0)}
                        value={maxValue} />
                </div>
                <div className={`${styles['input-column']} col-md-2`}>
                    <button type="button"
                        onClick={onAddNewItem}
                        className="btn btn-primary btn-sm">
                        +
                    </button>
                </div>
            </div>
        </li>
    );
}

StoryPointsConfigItemForm.propTypes = {
    onAddNewItem: PropTypes.func,
};
