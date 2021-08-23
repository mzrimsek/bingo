export interface BoardOptionQueryResult {
  main: string;
  variant1?: string;
  variant2?: string;
  variant3?: string;
}

export type BoardOptionCallback = (
  sheetUrl: string,
  boardOptions: Array<BoardOptionQueryResult>
) => void;

export interface BingoBoardOption {
  url: string;
  label: string;
}

export interface BingoSquareData {
  display: string;
  toggled: boolean;
}
