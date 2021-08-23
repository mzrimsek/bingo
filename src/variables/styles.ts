import { primary, secondary } from 'variables';

import { CSSProperties } from '@material-ui/core/styles/withStyles';

export const gradientButtonStyles: CSSProperties = {
  background: `linear-gradient(45deg, ${primary.main} 30%, ${secondary.main} 90%)`,
  color: primary.contrastText,
  boxShadow: `0 3px 5px 2px ${secondary.mainShadow}`
};
