import React, {memo} from 'react';
import {useTheme} from 'styled-components';
import {Spacer} from './Spacer';

interface Props {
  width?: number; // will be multiplied by Theme.gridUnit
  height?: number; //  will be multiplied by Theme.gridUnit
}

// Wrapper around Spacer
const SpaceComponent = ({width, height}: Props) => {
  const theme = useTheme();

  return <Spacer width={width && width * theme.gridUnit} height={height && height * theme.gridUnit} />;
};

export const Space = memo(SpaceComponent);
