import { mauveDark, purpleDark, redDark } from '@radix-ui/colors';
import { createColors } from 'bepaint';
import { createTheme } from 'stitches.config';

const colorsDark = {
  ...createColors({ scale: mauveDark }),
  ...createColors({ scale: purpleDark, suffix: 'accent' }),
  ...createColors({ scale: redDark, suffix: 'danger' }),

  componentSolidBackground: mauveDark.mauve9, // TODO: add solid backgrounds
  componentSolidBackgroundHover: mauveDark.mauve10,
  componentSolidBackgroundActive: mauveDark.mauve11,

  componentSolidBackground_accent: purpleDark.purple9,
  componentSolidBackgroundHover_accent: purpleDark.purple10,
  componentSolidBackgroundActive_accent: purpleDark.purple11,

  componentSolidBackground_danger: redDark.red9,
  componentSolidBackgroundHover_danger: redDark.red10,
  componentSolidBackgroundActive_danger: redDark.red11,
};

const themeDark = createTheme('theme-dark', {
  colors: colorsDark,

  borderStyles: {
    componentNonInteractive: `${colorsDark.componentNonInteractiveBorder} solid 0.0625rem`,
    componentNonInteractiveHover: `${colorsDark.componentNonInteractiveBorderHover} solid 0.0625rem`,
    componentNonInteractiveActive: `${colorsDark.componentNonInteractiveBorderActive} solid 0.0625rem`,
    componentInteractive: `${colorsDark.componentInteractiveBorder} solid 0.0625rem`,
    componentInteractiveHover: `${colorsDark.componentInteractiveBorderHover} solid 0.0625rem`,
    componentInteractiveActive: `${colorsDark.componentInteractiveBorderActive} solid 0.0625rem`,

    componentNonInteractive_accent: `${colorsDark.componentNonInteractiveBorder_accent} solid 0.0625rem`,
    componentNonInteractiveHover_accent: `${colorsDark.componentNonInteractiveBorderHover_accent} solid 0.0625rem`,
    componentNonInteractiveActive_accent: `${colorsDark.componentNonInteractiveBorderActive_accent} solid 0.0625rem`,
    componentInteractive_accent: `${colorsDark.componentInteractiveBorder_accent} solid 0.0625rem`,
    componentInteractiveHover_accent: `${colorsDark.componentInteractiveBorderHover_accent} solid 0.0625rem`,
    componentInteractiveActive_accent: `${colorsDark.componentInteractiveBorderActive_accent} solid 0.0625rem`,

    componentNonInteractive_danger: `${colorsDark.componentNonInteractiveBorder_danger} solid 0.0625rem`,
    componentNonInteractiveHover_danger: `${colorsDark.componentNonInteractiveBorderHover_danger} solid 0.0625rem`,
    componentNonInteractiveActive_danger: `${colorsDark.componentNonInteractiveBorderActive_danger} solid 0.0625rem`,
    componentInteractive_danger: `${colorsDark.componentInteractiveBorder_danger} solid 0.0625rem`,
    componentInteractiveHover_danger: `${colorsDark.componentInteractiveBorderHover_danger} solid 0.0625rem`,
    componentInteractiveActive_danger: `${colorsDark.componentInteractiveBorderActive_danger} solid 0.0625rem`,
  },
});
export default themeDark;
