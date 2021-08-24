import { BingoBoardOption, BingoSquareData } from 'models';
import { getBoardUrlFromName, retrieveBingoBoard, retrieveSelectedBingoBoardOption } from 'helpers';

import { useSearchParam } from 'react-use';

export const getInitialSelectedBingoBoardOption: () => BingoBoardOption = () => {
  const boardQueryParam = useSearchParam('board');
  if (boardQueryParam) {
    const url = getBoardUrlFromName(boardQueryParam);
    if (url) {
      return {
        label: boardQueryParam,
        url
      };
    }
  }
  return retrieveSelectedBingoBoardOption();
};

export const getInitialBingoBoardRows: (boardName: string) => Array<Array<BingoSquareData>> =
  boardName => {
    const persistedBoard = retrieveBingoBoard(boardName);
    return persistedBoard ?? [];
  };
