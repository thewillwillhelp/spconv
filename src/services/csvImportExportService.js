import csvParser from 'neat-csv';
import {Parser} from 'json2csv';
import {calculateEstimations} from './calculateEstimations';

const getCSVDataRows = async (file) => {
    const url = window.URL.createObjectURL(file);
    const csvText = await (await fetch(url)).text();
    const csvTableDataRows = await csvParser(csvText, {headers: false});

    return csvTableDataRows;
};

export const getTodoItemsFromCSV = async (file) => {
    const csvTableDataRows = await getCSVDataRows(file);

    const todoItems = csvTableDataRows.reduce((result, dataRow, index) => {
        if (index === 0) {
            return result;
        }

        if (!dataRow[0]) {
            return result;
        }

        return result.concat({title: dataRow[0], size: parseInt(dataRow[1])});
    }, []);

    return todoItems;
};

export const getSPConfigItemsFromCSV = async (file) => {
    const csvTableDataRows = await getCSVDataRows(file);

    const spConfigItems = csvTableDataRows.reduce((result, dataRow, index) => {
        if (index === 0) {
            return result;
        }

        if (!dataRow[3]) {
            return result;
        }

        return result.concat({
            size: parseFloat(dataRow[3]),
            minTime: parseInt(dataRow[4]),
            maxTime: parseInt(dataRow[5]),
        });
    }, []);

    return spConfigItems;
};

export const prepareDataForExport = (todoItems, spConfigItems) => {
    const headerRow = {
        0: 'task',
        1: 'size',
        2: '',
        3: 'size',
        4: 'min',
        5: 'max',
        6: '',
        7: 'Estimations:',
        8: 'min',
        9: 'max',
        10: 'average',
    };

    const csvTableRows = [headerRow];

    const calculatedEstimations = calculateEstimations(todoItems, spConfigItems);

    let maxLength = 0;
    if (todoItems?.length > spConfigItems?.length) {
        maxLength = todoItems?.length;
    } else {
        maxLength = spConfigItems?.length;
    }

    for (let i = 0; i < maxLength; i++) {
        const row = {};
        if (todoItems[i]) {
            row[0] = todoItems[i].title;
            row[1] = todoItems[i].size;
        }

        if (spConfigItems[i]) {
            row[3] = spConfigItems[i].size;
            row[4] = spConfigItems[i].minTime;
            row[5] = spConfigItems[i].maxTime;
        }

        if (i === 0) {
            row[8] = calculatedEstimations.min;
            row[9] = calculatedEstimations.max;
            row[10] = calculatedEstimations.average;
        }

        csvTableRows.push(row);
    }

    return csvTableRows;
};

export const exportAllAsCSV = (dataRows) => {
    const json2csvParser = new Parser({header: false});
    const csv = json2csvParser.parse(dataRows);

    const blob = new Blob([csv], {type: 'text/csv'});
    const dataUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'results.csv';
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(dataUrl);
    }, 0);
};
