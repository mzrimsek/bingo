import { BingoBoardOption, BingoSquareData } from 'models';

import env from 'react-dotenv';
import { getRandomElement } from 'helpers';

export const getBingoBoards: () => Array<BingoBoardOption> = () => {
  const urlKeys = Object.keys(env).filter(key => key.match(/GOOGLE_SHEET_URL_\d/g));
  const urls = urlKeys.map(key => env[key]);

  const labelKeys = Object.keys(env).filter(key => key.match(/GOOGLE_SHEET_LABEL_\d/g));
  const labels = labelKeys.map(key => env[key]);

  return urls
    .map((url, index) => {
      const label = labels[index];
      return {
        url,
        label
      };
    })
    .filter(option => option.url !== '' || option.label !== '');
};

export const generateBingoBoard: (boardOptions: Array<string>) => Array<Array<BingoSquareData>> =
  boardOptions => {
    const boardOptionCopy = [...boardOptions];
    const row1 = [
      getRandomElement(boardOptionCopy),
      getRandomElement(boardOptionCopy),
      getRandomElement(boardOptionCopy),
      getRandomElement(boardOptionCopy),
      getRandomElement(boardOptionCopy)
    ];
    const row2 = [
      getRandomElement(boardOptionCopy),
      getRandomElement(boardOptionCopy),
      getRandomElement(boardOptionCopy),
      getRandomElement(boardOptionCopy),
      getRandomElement(boardOptionCopy)
    ];
    const row3 = [
      getRandomElement(boardOptionCopy),
      getRandomElement(boardOptionCopy),
      'FREE',
      getRandomElement(boardOptionCopy),
      getRandomElement(boardOptionCopy)
    ];
    const row4 = [
      getRandomElement(boardOptionCopy),
      getRandomElement(boardOptionCopy),
      getRandomElement(boardOptionCopy),
      getRandomElement(boardOptionCopy),
      getRandomElement(boardOptionCopy)
    ];
    const row5 = [
      getRandomElement(boardOptionCopy),
      getRandomElement(boardOptionCopy),
      getRandomElement(boardOptionCopy),
      getRandomElement(boardOptionCopy),
      getRandomElement(boardOptionCopy)
    ];
    const rows = [row1, row2, row3, row4, row5];

    return rows.map(row => {
      return row.map(boardOption => ({
        display: boardOption,
        toggled: false
      }));
    });
  };
