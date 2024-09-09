import React, {memo} from 'react';
import styled from 'styled-components';
import {View} from 'src/components/ui/View';

interface Props {
  width?: number;
  height?: number;
}

const SpacerView = styled(View)<Props>`
  ${({width, height}) => (!width && !height ? `flex: 1` : '')};
  ${({width}) => (width ? `${width}px` : '')};
  ${({height}) => (height ? `${height}px` : '')};
`;

const SpacerComponent = (props: Props) => <SpacerView {...props} />;

export const Spacer = memo(SpacerComponent);
