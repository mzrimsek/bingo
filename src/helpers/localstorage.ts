import { getBoardNameFromUrl, getBoardUrlFromName } from './bingoBoard';

import { BingoSquareData } from 'models';

export const persistBingoBoard: (
  targetBoard: string,
  boardRows: Array<Array<BingoSquareData>>
) => void = (targetBoard, nextBingoData) => {
  const stringifiedData = JSON.stringify(nextBingoData);
  window.localStorage.setItem(targetBoard, stringifiedData);
};

export const retrieveBingoBoard: (targetBoard: string) => Array<Array<BingoSquareData>> | null =
  targetBoard => {
    const boardData = window.localStorage.getItem(targetBoard);
    return boardData ? JSON.parse(boardData) : null;
  };

export const persistSelectedBingoBoardUrl: (selectedBingoBoard: string) => void =
  selectedBingoBoard => {
    const boardName = getBoardNameFromUrl(selectedBingoBoard);
    if (boardName) {
      window.localStorage.setItem('selectedBingoBoardUrl', boardName);
    }
  };

export const retrieveSelectedBingoBoardUrl: () => string | null = () => {
  const selectedBoard = window.localStorage.getItem('selectedBingoBoardUrl');
  if (!selectedBoard) {
    return null;
  }

  const boardUrl = getBoardUrlFromName(selectedBoard);
  if (!boardUrl) {
    return null;
  }

  return boardUrl;
};
