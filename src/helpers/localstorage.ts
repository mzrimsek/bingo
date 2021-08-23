import { BingoBoardOption, BingoSquareData } from 'models';

import { getBoardUrlFromName } from 'helpers';

export const persistBingoBoard: (
  boardName: string,
  boardRows: Array<Array<BingoSquareData>>
) => void = (boardName, nextBingoData) => {
  const stringifiedData = JSON.stringify(nextBingoData);
  window.localStorage.setItem(boardName, stringifiedData);
};

export const retrieveBingoBoard: (boardName: string) => Array<Array<BingoSquareData>> | null =
  boardName => {
    const boardData = window.localStorage.getItem(boardName);
    return boardData ? JSON.parse(boardData) : null;
  };

const selectedBoardNameKey = 'selectedBoardName';
export const persistSelectedBingoBoardName: (boardName: string) => void = boardName => {
  if (boardName) {
    window.localStorage.setItem(selectedBoardNameKey, boardName);
  }
};

export const retrieveSelectedBingoBoardOption: () => BingoBoardOption = () => {
  const selectedBoardName = window.localStorage.getItem(selectedBoardNameKey);
  if (!selectedBoardName) {
    return { url: '', label: '' };
  }

  const boardUrl = getBoardUrlFromName(selectedBoardName);
  if (!boardUrl) {
    return { url: '', label: '' };
  }

  return {
    url: boardUrl,
    label: selectedBoardName
  };
};
