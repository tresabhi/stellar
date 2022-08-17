import {
    DiscordLogoIcon,
    GitHubLogoIcon,
    TwitterLogoIcon,
  } from '@radix-ui/react-icons';
  import * as StatusbarComponent from 'components/Statusbar';
  import getStellarContext from 'utilities/getStellarContext';
  import { useEffect, useState } from 'react';
  import { parse } from 'semver';
  import packageJSON from '../../../../../../../package.json';
  import { styled, theme } from 'stitches.config';
  
  export const GITHUB_REPO = 'tresabhi/stellar';
  const { Icon, codeName } = getStellarContext();
  
  const StellarIcon = styled(Icon, {
    width: theme.sizes[16],
    height: theme.sizes[16],
  });
  
  export const Statusbar = () => {
    const date = new Date();
    const year = date.getUTCFullYear();
    const [license, setLicense] = useState('LICENSE');
    const parsedVersion = parse(packageJSON.version)!;
    const splitRepo = GITHUB_REPO.split('/');
    const user = splitRepo[0];
    const repo = splitRepo[1];
    const releaseNotes =
      codeName !== 'alpha' || codeName === 'dev'
        ? undefined
        : `${parsedVersion.major}.${parsedVersion.minor}${
            parsedVersion.patch === 0 ? '' : parsedVersion.patch
          }${
            parsedVersion.prerelease.length === 0
              ? ''
              : `-${parsedVersion.prerelease[0]}.${parsedVersion.prerelease[1]}`
          }/`;
    const version = `${parsedVersion.major}.${parsedVersion.minor}${
      parsedVersion.patch !== 0 ? `.${parsedVersion.patch}` : ''
    }`;
    const prerelease =
      parsedVersion.prerelease.length === 0
        ? ''
        : `${(parsedVersion
            .prerelease[0] as string)[0].toUpperCase()}${(parsedVersion
            .prerelease[0] as string).slice(1)} ${parsedVersion.prerelease[1]}`;
  
    useEffect(() => {
      (async () => {
        const response = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}`,
        );
        const json = await response.json();
  
        setLicense(json.license.spdx_id);
      })();
    }, []);
  
    return (
      <StatusbarComponent.Container>
        <StatusbarComponent.Group unrelated>
          <StatusbarComponent.Anchor
            target="_blank"
            href="https://discord.gg/nDt7AjGJQH"
          >
            <DiscordLogoIcon />
          </StatusbarComponent.Anchor>
  
          <StatusbarComponent.Anchor
            target="_blank"
            href="https://twitter.com/tresabhi_"
          >
            <TwitterLogoIcon />
          </StatusbarComponent.Anchor>
  
          <StatusbarComponent.Anchor
            target="_blank"
            href={`https://github.com/${GITHUB_REPO}`}
          >
            <GitHubLogoIcon />
          </StatusbarComponent.Anchor>
  
          <StatusbarComponent.Group>
            <StatusbarComponent.Anchor
              target="_blank"
              href="https://tresabhi.github.io/"
            >
              TrèsAbhi
            </StatusbarComponent.Anchor>
  
            <StatusbarComponent.Dot />
  
            <StatusbarComponent.Anchor
              target="_blank"
              href={`https://github.com/${GITHUB_REPO}/commits/`}
            >
              &copy; {year}
            </StatusbarComponent.Anchor>
  
            <StatusbarComponent.Dot />
  
            <StatusbarComponent.Anchor
              target="_blank"
              href={`https://github.com/${GITHUB_REPO}/blob/main/LICENSE`}
            >
              {license}
            </StatusbarComponent.Anchor>
          </StatusbarComponent.Group>
        </StatusbarComponent.Group>
  
        <StatusbarComponent.Group unrelated>
          <StellarIcon />
  
          <StatusbarComponent.Group>
            <StatusbarComponent.Anchor target="_blank" href={releaseNotes}>
              Stellar {version} {prerelease}
            </StatusbarComponent.Anchor>
  
            <StatusbarComponent.Dot />
  
            <StatusbarComponent.Anchor
              target="_blank"
              href={`https://${user}.github.io/${repo}/`}
            >
              Docs
            </StatusbarComponent.Anchor>
          </StatusbarComponent.Group>
        </StatusbarComponent.Group>
      </StatusbarComponent.Container>
    );
  };
  