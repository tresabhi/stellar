# Stellar [<img src="https://user-images.githubusercontent.com/43380238/148424581-843be3a2-10a4-4503-a2d4-099a987c5ff4.png" alt="PostCSS Logo" width="90" height="90" align="right">](https://github.com/TresAbhi/Stellar)

[![build](https://img.shields.io/github/workflow/status/TresAbhi/Stellar/Alpha%20CD)](https://github.com/TresAbhi/Stellar/actions/workflows/alpha-cd.yml)
[![version](https://img.shields.io/github/package-json/v/TresAbhi/Stellar)](https://github.com/TresAbhi/Stellar/blob/main/package.json)

<br>

![image](https://user-images.githubusercontent.com/43380238/148424321-199a10a1-78ac-41ee-8726-827a1b79d366.png)

## 🤔 About

Stellar allows anyone to make custom blueprints with extensive customization without having any knowledge of blueprint editing. Beauty, performance, agility, it's all here.

Spaceflight Simulator, the game, is available for both PC and mobile on [Steam](https://store.steampowered.com/app/1718870/), [Play Store](https://play.google.com/store/apps/details?id=com.StefMorojna.SpaceflightSimulator), and [App Store](https://apps.apple.com/us/app/id1308057272).

## 🛣️ Road Map

_❕ Road maps are removed once completed; there is no backlog._

_❕ Higher the index of the road map, the lesser detailed it is._

1. Property editing
   1. [x] Basic part based property editing
   2. [x] Part with transformations editing
   3. [x] Part translations through canvas
   4. [ ] Missing property type UIs
   5. [ ] Number value input box redo
   6. [ ] Part-type specific canvas editing
2. Explorer quick actions
   1. [ ] Visibility
   2. [ ] Deletion
3. Part rendering tech
   1. [ ] Shape and color texture layering
   2. [ ] Height independent texture slicing
4. Canvas part selection optimizations

## 🔌 Compatibility

_❕ If it [runs Chrome](https://support.google.com/chrome/a/answer/7100626), it runs Stellar._

### 🕹️ Minimum Operating System

- [Windows](https://www.microsoft.com/windows) 7+
- [OS X/macOS](https://www.apple.com/macos/) 10.11+
- [Linux](https://www.linux.org/)
  - [Ubuntu](https://ubuntu.com/) 18.04
  - [Debian](https://www.debian.org/) 10+
  - [openSUSE](https://www.opensuse.org/) 15.2+
  - [Fedora](https://getfedora.org/) 32+
  - [Android](https://www.android.com/) 5+
- [iOS](https://www.apple.com/ios/) 12+ (Chrome PWA)
- [iOS](https://www.apple.com/ios/) 11+ (Safari PWA)

### 💻 Minimum Hardware

- CPU: Intel Pentium 4+
- RAM: 1GB+
- Storage: 25MB+

## 👨‍💻 Tech Inside

- **Framework**: [React](https://reactjs.org/) ([create-react-app](https://create-react-app.dev/))
- **Languages:**
  - Functionality: [Typescript](https://www.typescriptlang.org/) ([XML](https://www.typescriptlang.org/docs/handbook/jsx.html))
  - Styling: [SASS](https://sass-lang.com/) ([scss](https://sass-lang.com/documentation/syntax#scss))

## 👉 Main Built-in commands

| Command         | Use                                            |
| --------------- | ---------------------------------------------- |
| `yarn start`    | Start hosting dev. build on local host         |
| `yarn build`    | Compiles code into optimized development build |
| `yarn test`     | Runs all `*.test.ts` / `*.test.tsx` files      |
| `yarn format`   | Beautifies all intended files in workspace     |
| `yarn depcheck` | Finds all unused dependencies                  |
| `yarn host`     | Hosts the production build                     |
| `yarn host:new` | Hosts a new compiled production build          |
