import { BoardOptionCallback } from 'models';
import sheetrock from 'sheetrock';

export const sheetrockHandler: (sheetUrl: string, callback: BoardOptionCallback) => void = (
  sheetUrl: string,
  callback: BoardOptionCallback
) => {
  sheetrock({
    url: sheetUrl,
    query: 'select A',
    callback: (_error, _options, response) => {
      if (response && response.rows) {
        const { rows } = response;
        const rowsMinusHeader = rows.filter(row => row.num !== 0);

        const boardOptions: Array<string> = rowsMinusHeader.flatMap(row => row.cellsArray);
        callback(sheetUrl, boardOptions);
      }
    },
    reset: true
  });
};
