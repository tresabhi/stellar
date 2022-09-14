import { globalCss, theme } from 'stitches.config';

export const globalStyles = globalCss({
  '@import': [
    'https://fonts.googleapis.com/css?family=Roboto+Flex&display=swap',
    'https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap',
    'https://cdn.jsdelivr.net/npm/normalize.css/normalize.css', // TODO: remove this when bepaint supports this
  ],

  html: {
    // don't blow their eyes out on reload
    backgroundColor: theme.colors.appBackground1,
  },

  '*': {
    fontFamily: theme.fonts.default,
  },

  'button, input, details, summary': {
    padding: 'unset',
    background: 'unset',
    border: 'unset',
  },

  '*:focus, *:focus-within': { outline: 'unset' },

  '::-webkit-scrollbar': {
    width: theme.sizes.scrollbarWidth,
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: theme.colors.componentInteractiveBorder, // TODO: add scrollbar colors
    borderRadius: 16, // chrome doesn't like rem (●__●)
    border: `calc((${theme.sizes.scrollbarWidth} - ${theme.sizes.scrollbarThumbWidth}) / 2) solid transparent`,
    backgroundClip: 'content-box',
  },
  '::-webkit-scrollbar-thumb:hover': {
    border: `calc((${theme.sizes.scrollbarWidth} - ${theme.sizes.scrollbarThumbWidthHover}) / 2) solid transparent`,
    backgroundColor: theme.colors.componentInteractiveBorderHover,
  },
  '::-webkit-scrollbar-thumb:active': {
    border: `calc((${theme.sizes.scrollbarWidth} - ${theme.sizes.scrollbarThumbWidthHover}) / 2) solid transparent`,
    backgroundColor: theme.colors.componentInteractiveBorderActive,
  },
  '::-webkit-scrollbar-corner': {
    backgroundColor: 'transparent',
  },
});
