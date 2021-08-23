import { BoardOptionCallback, BoardOptionQueryResult } from 'models';

import sheetrock from 'sheetrock';

interface SheetrockRow {
  labels: Array<string>;
  cellsArray: Array<string>;
}

export const sheetrockHandler: (sheetUrl: string, callback: BoardOptionCallback) => void = (
  sheetUrl: string,
  callback: BoardOptionCallback
) => {
  sheetrock({
    url: sheetUrl,
    query: 'select A, B, C, D',
    callback: (_error, _options, response) => {
      if (response && response.rows) {
        const { rows } = response;
        const rowsMinusHeader = rows.filter(row => row.num !== 0);

        const boardOptions: Array<BoardOptionQueryResult> = rowsMinusHeader.map(
          (row: SheetrockRow) => {
            const labels = row.labels.map(label => label.toLowerCase());
            return row.cellsArray.reduce((queryResult, cell, index) => {
              if (cell) {
                const prop = labels[index];
                return {
                  ...queryResult,
                  [prop]: cell
                };
              }
              return queryResult;
            }, {});
          }
        );
        callback(sheetUrl, boardOptions);
      }
    },
    reset: true
  });
};
