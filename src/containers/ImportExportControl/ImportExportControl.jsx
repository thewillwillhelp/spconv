import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    addMultipleSpConfigItems,
    addMultipleToDoItems,
    removeAllConfigItems,
    removeAllToDoItems,
} from './../../store/actions';
import {
    exportAllAsCSV,
    getSPConfigItemsFromCSV,
    getTodoItemsFromCSV,
    prepareDataForExport,
} from './../../services/csvImportExportService';

export function ImportExportControl() {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const todoItems = useSelector((reduxStore) => reduxStore?.todoItems);
    const spConfigItems = useSelector((reduxStore) => reduxStore?.storyPointsConfigs?.list);

    const onFileChanged = async (event) => {
        const files = event.target.files;
        setFile(files[0]);
    };

    const onAddFromCsv = async () => {
        const todoItems = await getTodoItemsFromCSV(file);

        dispatch(addMultipleToDoItems(todoItems));
    };

    const onReplaceFromCsv = async () => {
        const todoItems = await getTodoItemsFromCSV(file);
        const spConfigItems = await getSPConfigItemsFromCSV(file);

        dispatch(removeAllToDoItems());
        dispatch(removeAllConfigItems());
        dispatch(addMultipleSpConfigItems(spConfigItems));
        dispatch(addMultipleToDoItems(todoItems));
    };

    const onExportToCSV = async () => {
        exportAllAsCSV(prepareDataForExport(todoItems, spConfigItems));
    };

    return (
        <div className="col-md import-export-controls">
            <div className="row">
                <div className="col-md-6">
                    <input type="file" placeholder="Browse CSV" onChange={onFileChanged} />
                </div>
                <div className="col-md-3">
                    <button className="btn btn-primary btn-sm" onClick={onAddFromCsv}>Add from CSV</button>
                </div>
                <div className="col-md-3">
                    <button className="btn btn-primary btn-sm" onClick={onReplaceFromCsv}>Replace from CSV</button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-9"></div>
                <div className="col-md-3">
                    <button className="btn btn-primary btn-sm" onClick={onExportToCSV}>Export as CSV</button>
                </div>
            </div>
        </div>
    );
}
