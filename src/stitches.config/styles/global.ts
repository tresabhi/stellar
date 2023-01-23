import { globalCss, theme } from 'stitches.config';

const globalStyles = globalCss({
  '@import': [
    'https://fonts.googleapis.com/css?family=Roboto+Flex&display=swap',
    'https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap',
    'https://cdn.jsdelivr.net/npm/normalize.css/normalize.css',
  ],

  'html, body': {
    // don't blow their eyes out on reload
    backgroundColor: theme.colors.appBackground1,
  },

  '*': {
    fontFamily: theme.fonts.default,
  },

  '::-webkit-scrollbar': {
    width: theme.sizes.scrollbarWidth,
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: theme.colors.borderInteractive, // TODO: add scrollbar colors
    borderRadius: 16, // chrome doesn't like rem
    border: `calc((${theme.sizes.scrollbarWidth} - ${theme.sizes.scrollbarThumbWidth}) / 2) solid transparent`,
    backgroundClip: 'content-box',
  },
  '::-webkit-scrollbar-thumb:hover': {
    border: `calc((${theme.sizes.scrollbarWidth} - ${theme.sizes.scrollbarThumbWidthHovered}) / 2) solid transparent`,
    backgroundColor: theme.colors.borderInteractiveHovered,
  },
  '::-webkit-scrollbar-thumb:active': {
    border: `calc((${theme.sizes.scrollbarWidth} - ${theme.sizes.scrollbarThumbWidthHovered}) / 2) solid transparent`,
    backgroundColor: theme.colors.borderInteractivePressed,
  },
  '::-webkit-scrollbar-corner': {
    backgroundColor: 'transparent',
  },
});
export default globalStyles;
