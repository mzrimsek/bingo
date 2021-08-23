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
    return boardData ? JSON.parse(boardData) : [];
  };
