# bingo

A simple bingo app that uses Google sheets to back its data.

## Environment Format

At least one pairing is required. Up to 10 are supported. All sheets used must be publicly available to view.

```
GOOGLE_SHEET_URL_1=https://docs.google.com/spreadsheets/d/.../edit#gid=0
GOOGLE_SHEET_LABEL_1=Sheet Label
```

## Spreadsheet Format

- Header row must consist of 4 columns - MAIN, VARIANT1, VARIANT2, VARIANT3
- At least 24 rows of data must be provided to fill out a full board
- Main column is required
  - If variant(s) are provided they have a chance to be used in place of the main option if the row is selected for the board

| MAIN     | VARIANT1    | VARIANT2    | VARIANT3    |
| -------- | ----------- | ----------- | ----------- |
| Option 1 | V1 Option 1 | V2 Option 1 | V3 Option 1 |
| Option 2 | V1 Option 2 | V2 Option 2 |             |
| Option 3 | V1 Option 3 |             |             |
| Option 4 |             |             |             |
| Option 5 | V1 Option 5 | V2 Option 5 |             |
