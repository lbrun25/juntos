import React, {memo, ReactNode} from 'react';
import {useTheme} from 'styled-components';
import {Button} from 'src/components/Button';
import {Space} from 'src/components/Space';
import {View} from 'src/components/ui/View';
import {Text} from 'src/components/ui/Text';
import {KeyboardAvoidingView} from 'react-native';
import {IS_IOS} from 'src/constants/platform';
import {useHeaderHeight} from '@react-navigation/elements';

interface FocusKeyboardSubmitPageProps {
  title?: string;
  description?: string | ReactNode;
  buttonLabel: string;
  isSubmittable: boolean;
  onNext: () => void;
  inputComponent: ReactNode;
  isLoading?: boolean;
  loadingLabel?: string;
}

const FocusKeyboardSubmitPageComponent = (
  props: FocusKeyboardSubmitPageProps,
) => {
  const theme = useTheme();
  const headerHeight = useHeaderHeight();

  // TODO: Fix this issue: the child component's (Button) state doesn't update
  //  when using a parent component's state to manage the child's disabled state.
  const MemoizedButton = React.memo(Button, (prevProps, nextProps) => {
    return prevProps.disabled === nextProps.disabled;
  });

  const renderDescription = () => {
    if (!props) return null;
    if (typeof props.description === 'string') {
      return (
        <Text onPrimary callout center>
          {props.description}
        </Text>
      );
    } else {
      return props.description;
    }
  };

  return (
    <View bg-primary flex paddingH-6>
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : undefined}
        style={{flex: 1}}
        keyboardVerticalOffset={headerHeight}
      >
        <View flex center>
          {props.title && (
            <>
              <Text onPrimary h3 bold center>
                {props.title}
              </Text>
              <Space height={4} />
            </>
          )}
          <View padding-4 bg-white br40 width={"100%"}>
            {props.inputComponent}
          </View>
          {props.description && (
            <>
              <Space height={4} />
              {renderDescription()}
            </>
          )}
        </View>
        <MemoizedButton
          disabled={!props.isSubmittable}
          onPress={props.onNext}
          color={theme.colors.onPrimary}
          labelColor={theme.colors.contentOnPrimary}
          labelProps={{demiBold: true}}
          label={props.buttonLabel}
          br100
          loadingLabel={props.loadingLabel || ""}
          isLoading={props.isLoading || false}
          loadingColor={theme.colors.contentOnPrimary}
        />
        <Space height={4} />
      </KeyboardAvoidingView>
    </View>
  );
};

export const FocusKeyboardSubmitPage = memo(FocusKeyboardSubmitPageComponent);
