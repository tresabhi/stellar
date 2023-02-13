import { mauveDark, purpleDark, redDark } from '@radix-ui/colors';
import { createBorderStyles, createColors } from 'bepaint';
import { createTheme } from 'stitches.config';

const themeDark = createTheme('theme-dark', {
  colors: {
    ...createColors(mauveDark),
    ...createColors(purpleDark, 'accent'),
    ...createColors(redDark, 'danger'),
  },
  borderStyles: {
    ...createBorderStyles(mauveDark),
    ...createBorderStyles(purpleDark, undefined, 'accent'),
    ...createBorderStyles(redDark, undefined, 'danger'),
  },
});
export default themeDark;
