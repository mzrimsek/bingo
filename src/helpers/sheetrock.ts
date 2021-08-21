import sheetrock from 'sheetrock';

import env from 'react-dotenv';

type SheetrockCallback = (error, options, response) => void;

export const sheetrockHandler = (callback: SheetrockCallback) => {
  sheetrock({
    url: env.GOOGLE_SHEET_URL,
    query: 'select A',
    callback
  });
};