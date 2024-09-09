import {
  Text as UIText,
  TextProps as UITextProps,
} from 'react-native-ui-lib';
import React, {memo} from 'react';
import styled from 'styled-components';

const EllipsisText = styled(UIText)`
  flex: 1;
  flex-wrap: wrap;
`;

const DEFAULT_TEXT_PROPS: UITextProps = {
  $textDefault: true,
  regular: true,
};

type TextProps = UITextProps & {
  useEllipsis?: boolean;
};

const TextComponent = (props: TextProps): React.JSX.Element => {
  if (props.useEllipsis) {
    return (
      <EllipsisText
        maxFontSizeMultiplier={1.2}
        ellipsizeMode="tail"
        {...props}
      />
    );
  }

  return (
    <UIText maxFontSizeMultiplier={1.2} {...DEFAULT_TEXT_PROPS} {...props} />
  );
};

export const Text = memo(TextComponent);
