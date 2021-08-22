import sheetrock from 'sheetrock';

type SheetrockCallback = (error, options, response) => void;

export const sheetrockHandler: (sheetUrl: string, callback: SheetrockCallback) => void = (
  sheetUrl: string,
  callback: SheetrockCallback
) => {
  sheetrock({
    url: sheetUrl,
    query: 'select A',
    reset: true,
    callback
  });
};
