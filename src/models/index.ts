export type BoardOptionCallback = (boardOptions: Array<string>) => void;

export interface BingoBoardOption {
  url: string;
  label: string;
}

export interface BingoSquareData {
  display: string;
  toggled: boolean;
}
