import { mauve, mauveDark, purple, purpleDark } from '@radix-ui/colors';
import { createStitches } from '@stitches/react';
import { createColors } from 'bepaint';

const colorsLight = {
  ...createColors({ scale: mauve }),
  ...createColors({ scale: purple, suffix: 'accent' }),
};
const colorsDark = {
  ...createColors({ scale: mauveDark }),
  ...createColors({ scale: purpleDark, suffix: 'accent' }),
};

export const { config, createTheme, css, getCssText, globalCss, keyframes, prefix, reset, styled, theme } =
  createStitches({
    theme: {
      colors: colorsLight,

      fontSizes: {
        10: '0.625rem',
        12: '0.75rem',
        14: '0.875rem',
        16: '1rem',
      },

      sizes: {
        1: '0.0625rem',
        2: '0.125rem',
        4: '0.25rem',
        8: '0.5rem',
        16: '1rem',
        18: '1.125rem',
        24: '1.5rem',
        32: '2rem',
        40: '2.5rem',

        dropdownWidth: '15rem',
      },

      radii: {
        1: '0.0625rem',
        2: '0.125rem',
        4: '0.25rem',
        8: '0.5rem',
      },

      fonts: {
        // TODO: add fallback fonts
        base: 'Roboto Flex',
        mono: 'Roboto Mono',
      },

      borderStyles: {
        componentNonInteractive: `${colorsLight.componentNonInteractiveBorder} solid 0.0625rem`,
        componentNonInteractiveHover: `${colorsLight.componentNonInteractiveBorderHover} solid 0.0625rem`,
        componentNonInteractiveActive: `${colorsLight.componentNonInteractiveBorderActive} solid 0.0625rem`,
        componentInteractive: `${colorsLight.componentInteractiveBorder} solid 0.0625rem`,
        componentInteractiveHover: `${colorsLight.componentInteractiveBorderHover} solid 0.0625rem`,
        componentInteractiveActive: `${colorsLight.componentInteractiveBorderActive} solid 0.0625rem`,

        componentNonInteractive_accent: `${colorsLight.componentNonInteractiveBorder_accent} solid 0.0625rem`,
        componentNonInteractiveHover_accent: `${colorsLight.componentNonInteractiveBorderHover_accent} solid 0.0625rem`,
        componentNonInteractiveActive_accent: `${colorsLight.componentNonInteractiveBorderActive_accent} solid 0.0625rem`,
        componentInteractive_accent: `${colorsLight.componentInteractiveBorder_accent} solid 0.0625rem`,
        componentInteractiveHover_accent: `${colorsLight.componentInteractiveBorderHover_accent} solid 0.0625rem`,
        componentInteractiveActive_accent: `${colorsLight.componentInteractiveBorderActive_accent} solid 0.0625rem`,
      },
    },
  });

export const themeDark = createTheme('theme-dark', {
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
  },
});

export const globalStyles = globalCss({
  '@import': [
    'https://fonts.googleapis.com/css?family=Roboto+Flex&display=swap',
    'https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap',
  ],
});
