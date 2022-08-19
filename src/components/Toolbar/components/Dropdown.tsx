import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons';
import {
  FC,
  MouseEvent,
  PointerEvent,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import { styled, theme } from 'stitches.config';

export interface DropdownProps {
  icon: ReactNode;
  children: ReactNode;
  disabled?: boolean;
}

const PADDING_FROM_EDGE = 8;

const Wrapper = styled('details', {
  position: 'relative',

  variants: {
    disabled: {
      true: {
        pointerEvents: 'none',
      },
    },
  },

  defaultVariants: {
    disabled: false,
  },
});

const Trigger = styled('summary', {
  listStyle: 'none',
  width: theme.sizes[40],
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.sizes[4],

  '& > svg': {
    width: theme.sizes[16],
    height: theme.sizes[16],
  },

  variants: {
    disabled: {
      true: {
        color: theme.colors.textLowContrast,
      },

      false: {
        cursor: 'pointer',
        color: theme.colors.textHighContrast,

        '&:hover': {
          backgroundColor: theme.colors.componentBackgroundHover,
        },
        '&:active': {
          backgroundColor: theme.colors.componentBackgroundActive,
        },
        '&:focus': {
          outline: theme.borderStyles.componentInteractiveActive,
        },
      },
    },
  },

  defaultVariants: {
    disabled: false,
  },
});

const CaretUp = styled(CaretUpIcon, {
  width: `${theme.sizes[8]} !important`,
  height: `${theme.sizes[8]} !important`,

  [`${Wrapper}:not([open]) &`]: {
    display: 'none',
  },
});

const CaretDown = styled(CaretDownIcon, {
  width: `${theme.sizes[8]} !important`,
  height: `${theme.sizes[8]} !important`,

  [`${Wrapper}[open] &`]: {
    display: 'none',
  },
});

const Children = styled('div', {
  position: 'absolute',
  zIndex: 2,
  width: theme.sizes.dropdownWidth,
  display: 'flex',
  top: `calc(100% + ${theme.space.padding})`,
  flexDirection: 'column',
  padding: theme.sizes[8],
  gap: theme.sizes[8],
  borderRadius: theme.radii[4],
  border: theme.borderStyles.componentInteractive,
  backgroundColor: theme.colors.componentBackground,
});

export const Dropdown: FC<DropdownProps> = ({ icon, children, disabled }) => {
  const wrapper = useRef<HTMLDetailsElement>(null!);
  const childrenElement = useRef<HTMLDivElement>(null!);

  const handleToggle = () => {
    const boundingClientRect = childrenElement.current.getBoundingClientRect();
    const otherWrappers = document.querySelectorAll(`${Wrapper}`);

    if (
      boundingClientRect.x + boundingClientRect.width + PADDING_FROM_EDGE >
      document.body.clientWidth
    ) {
      childrenElement.current.style.transform = `translate(${
        (document.body.clientWidth -
          (boundingClientRect.x + boundingClientRect.width) -
          PADDING_FROM_EDGE) /
        16
      }rem)`;
    } else if (boundingClientRect.x - PADDING_FROM_EDGE < 0) {
      childrenElement.current.style.transform = `translate(${
        (-boundingClientRect.x + PADDING_FROM_EDGE) / 16
      }rem)`;
    }

    if (wrapper.current.open) {
      otherWrappers.forEach((otherWrapper) => {
        if (otherWrapper !== wrapper.current) {
          (otherWrapper as HTMLDetailsElement).open = false;
        }
      });
    }
  };

  const handleClick = (event: MouseEvent) => {
    if (disabled) event.preventDefault();
  };

  const handlePointerDown = (event: PointerEvent<HTMLDetailsElement>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const handleWindowPointerDown = () => (wrapper.current.open = false);

    window.addEventListener('pointerdown', handleWindowPointerDown);

    return () => {
      window.removeEventListener('pointerdown', handleWindowPointerDown);
    };
  }, []);

  return (
    <Wrapper
      disabled={disabled}
      onToggle={handleToggle}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      ref={wrapper}
    >
      <Trigger disabled={disabled}>
        {icon}
        <CaretUp />
        <CaretDown />
      </Trigger>

      <Children ref={childrenElement}>{children}</Children>
    </Wrapper>
  );
};
