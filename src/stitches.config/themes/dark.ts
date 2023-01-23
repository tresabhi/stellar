import { mauveDark, purpleDark, redDark } from '@radix-ui/colors';
import { createBordersStyles, createColors } from 'bepaint';
import { createTheme } from 'stitches.config';

const themeDark = createTheme('theme-dark', {
  colors: {
    ...createColors(mauveDark),
    ...createColors(purpleDark, 'accent'),
    ...createColors(redDark, 'danger'),
  },
  borderStyles: {
    ...createBordersStyles(mauveDark),
    ...createBordersStyles(purpleDark, 'accent'),
    ...createBordersStyles(redDark, 'danger'),
  },
});
export default themeDark;
