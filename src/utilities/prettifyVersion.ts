import { parse } from 'semver';

// don't ask me how any of this works because I do not remember
export const prettifyVersion = (version: string) => {
  const parsedVersion = parse(version);

  if (parsedVersion) {
    const version = `${parsedVersion.major}.${parsedVersion.minor}${
      parsedVersion.patch !== 0 ? `.${parsedVersion.patch}` : ''
    }`;
    const prerelease =
      parsedVersion &&
      (parsedVersion.prerelease.length === 0
        ? ''
        : `${(parsedVersion.prerelease[0] as string)[0].toUpperCase()}${(
            parsedVersion.prerelease[0] as string
          ).slice(1)} ${parsedVersion.prerelease[1]}`);

    return `${version} ${prerelease}`;
  }
};
