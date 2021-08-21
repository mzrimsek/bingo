import { BingoBoardOption } from 'models';
import env from 'react-dotenv';

export const getBingoBoardOptions: () => Array<BingoBoardOption> = () => {
  const urlKeys = Object.keys(env).filter(key => key.match(/GOOGLE_SHEET_URL_\d/g));
  const urls = urlKeys.map(key => env[key]);

  const labelKeys = Object.keys(env).filter(key => key.match(/GOOGLE_SHEET_LABEL_\d/g));
  const labels = labelKeys.map(key => env[key]);

  return urls.map((url, index) => {
    const label = labels[index];
    return {
      url,
      label
    };
  }).filter(option => option.url !== '' && option.label !== '');
};
