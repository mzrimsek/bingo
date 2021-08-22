import { SheetrockCallback } from 'models';
import sheetrock from 'sheetrock';

export const sheetrockHandler: (sheetUrl: string, callback: SheetrockCallback) => void = (
  sheetUrl: string,
  callback: SheetrockCallback
) => {
  sheetrock({
    url: sheetUrl,
    query: 'select A',
    callback,
    reset: true
  });
};
