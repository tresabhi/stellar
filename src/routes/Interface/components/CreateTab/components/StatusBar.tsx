import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';
import * as StatusBarComponent from 'components/StatusBar';
import { useTranslator } from 'hooks/useTranslator';
import { useEffect, useState } from 'react';
import { parse } from 'semver';
import { styled, theme } from 'stitches.config';
import getStellarContext from 'utilities/getStellarContext';
import { prettifyVersion } from 'utilities/prettifyVersion';
import packageJSON from '../../../../../../package.json';

export const GITHUB_REPO = 'tresabhi/stellar';
const { Icon, codeName } = getStellarContext();

const StellarIcon = styled(Icon, {
  width: theme.sizes[16],
  height: theme.sizes[16],
});

export const StatusBar = () => {
  const { t } = useTranslator();
  const date = new Date();
  const year = date.getUTCFullYear();
  const [license, setLicense] = useState('LICENSE');
  const prettyVersion = prettifyVersion(packageJSON.version);
  const parsedVersion = parse(packageJSON.version);
  const splitRepo = GITHUB_REPO.split('/');
  const user = splitRepo[0];
  const repo = splitRepo[1];
  const releaseNotes = parsedVersion
    ? codeName !== 'alpha' && codeName !== 'dev'
      ? undefined
      : `${parsedVersion.major}.${parsedVersion.minor}${
          parsedVersion.patch === 0 ? '' : parsedVersion.patch
        }${
          parsedVersion.prerelease.length === 0
            ? ''
            : `-${parsedVersion.prerelease[0]}.${parsedVersion.prerelease[1]}`
        }/`
    : undefined;

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
    <StatusBarComponent.Container>
      <StatusBarComponent.Group unrelated>
        <StatusBarComponent.Anchor
          target="_blank"
          href="https://discord.gg/nDt7AjGJQH"
        >
          <DiscordLogoIcon />
        </StatusBarComponent.Anchor>

        <StatusBarComponent.Anchor
          target="_blank"
          href="https://twitter.com/tresabhi_"
        >
          <TwitterLogoIcon />
        </StatusBarComponent.Anchor>

        <StatusBarComponent.Anchor
          target="_blank"
          href={`https://github.com/${GITHUB_REPO}`}
        >
          <GitHubLogoIcon />
        </StatusBarComponent.Anchor>

        <StatusBarComponent.Group>
          <StatusBarComponent.Anchor
            target="_blank"
            href="https://tresabhi.github.io/"
          >
            TrèsAbhi
          </StatusBarComponent.Anchor>

          <StatusBarComponent.Dot />

          <StatusBarComponent.Anchor
            target="_blank"
            href={`https://github.com/${GITHUB_REPO}/commits/`}
          >
            &copy; {year}
          </StatusBarComponent.Anchor>

          <StatusBarComponent.Dot />

          <StatusBarComponent.Anchor
            target="_blank"
            href={`https://github.com/${GITHUB_REPO}/blob/main/LICENSE`}
          >
            {license}
          </StatusBarComponent.Anchor>
        </StatusBarComponent.Group>
      </StatusBarComponent.Group>

      <StatusBarComponent.Group unrelated>
        <StellarIcon />

        <StatusBarComponent.Group>
          <StatusBarComponent.Anchor
            target="_blank"
            href={`https://tresabhi.github.io/stellar/changelogs/${releaseNotes}`}
          >
            Stellar {prettyVersion}
          </StatusBarComponent.Anchor>

          <StatusBarComponent.Dot />

          <StatusBarComponent.Anchor
            target="_blank"
            href={`https://${user}.github.io/${repo}/`}
          >
            {t`tabs.create.status_bar.docs`}
          </StatusBarComponent.Anchor>
        </StatusBarComponent.Group>
      </StatusBarComponent.Group>
    </StatusBarComponent.Container>
  );
};
