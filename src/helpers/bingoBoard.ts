import { BingoBoardOption, BingoSquareData, BoardOptionQueryResult } from 'models';

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

const getRandomOptionText: (boardOptions: Array<BoardOptionQueryResult>) => string =
  boardOptions => {
    const option = getRandomElement(boardOptions);
    const keys = Object.keys(option);
    const key = getRandomElement(keys);
    return option[key];
  };

export const generateBingoBoard: (
  boardOptions: Array<BoardOptionQueryResult>
) => Array<Array<BingoSquareData>> = boardOptions => {
  const boardOptionCopy = [...boardOptions];
  const row1: Array<string> = [
    getRandomOptionText(boardOptionCopy),
    getRandomOptionText(boardOptionCopy),
    getRandomOptionText(boardOptionCopy),
    getRandomOptionText(boardOptionCopy),
    getRandomOptionText(boardOptionCopy)
  ];
  const row2: Array<string> = [
    getRandomOptionText(boardOptionCopy),
    getRandomOptionText(boardOptionCopy),
    getRandomOptionText(boardOptionCopy),
    getRandomOptionText(boardOptionCopy),
    getRandomOptionText(boardOptionCopy)
  ];
  const row3: Array<string> = [
    getRandomOptionText(boardOptionCopy),
    getRandomOptionText(boardOptionCopy),
    'FREE',
    getRandomOptionText(boardOptionCopy),
    getRandomOptionText(boardOptionCopy)
  ];
  const row4: Array<string> = [
    getRandomOptionText(boardOptionCopy),
    getRandomOptionText(boardOptionCopy),
    getRandomOptionText(boardOptionCopy),
    getRandomOptionText(boardOptionCopy),
    getRandomOptionText(boardOptionCopy)
  ];
  const row5: Array<string> = [
    getRandomOptionText(boardOptionCopy),
    getRandomOptionText(boardOptionCopy),
    getRandomOptionText(boardOptionCopy),
    getRandomOptionText(boardOptionCopy),
    getRandomOptionText(boardOptionCopy)
  ];
  const rows = [row1, row2, row3, row4, row5];

  return rows.map(row => {
    return row.map(boardOption => ({
      display: boardOption,
      toggled: false
    }));
  });
};

export const getBoardNameFromUrl: (sheetUrl: string) => string | undefined = sheetUrl => {
  return getBingoBoards().find(board => board.url === sheetUrl)?.label;
};

export const getBoardUrlFromName: (name: string) => string | undefined = name => {
  return getBingoBoards().find(board => board.label === name)?.url;
};
