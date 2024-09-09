import React, {memo} from 'react';
import styled, {useTheme} from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import {View} from 'src/components/ui/View';
import {Text} from 'src/components/ui/Text';
import {Space} from 'src/components/Space';
import {IS_IOS} from 'src/constants/platform';
import {ToastConfig} from 'react-native-toast-message/lib/src/types';

interface ToastProps {
  title?: string;
  message?: string;
  icon: string;
  status: 'success' | 'failure' | 'info' | 'warning',
}

const ToastComponent = (
  {
    title,
    message,
    icon,
    status,
  }: ToastProps
) => {
  const theme = useTheme();

  const getBackgroundColor = (): string => {
    if (status === 'success') return theme.colors.success;
    if (status === 'failure') return theme.colors.error;
    if (status === 'info') return theme.colors.info;
    if (status === 'warning') return theme.colors.warning;
    else return theme.colors.onBackground;
  };

  const getContentColor = (): string => {
    if (status === 'success') return theme.colors.onSuccess;
    if (status === 'failure') return theme.colors.onError;
    if (status === 'info') return theme.colors.onInfo;
    if (status === 'warning') return theme.colors.onWarning;
    else return theme.colors.white;
  };

  return (
    <ToastContainer
      backgroundColor={getBackgroundColor()}
      flex
      row
      marginH-4
    >
      <View flex padding-4 center row>
        <Icon
          name={icon}
          color={getContentColor()}
          size={theme.iconSizes.xl}
        />
        <Space width={8} />
        <View left flex>
          {title &&
            <Text color={getContentColor()} h4 bold>
              {title}
            </Text>
          }
          {title && message &&
            <Space height={1} />
          }
          {message &&
            <Text color={getContentColor()} body demiBold>
              {message}
            </Text>
          }
        </View>
      </View>
    </ToastContainer>
  );
};

const ToastContainer = styled(View)`
  border-radius: ${({theme}) => `${theme.borderRadius.l}px`};
`;

const Toast = memo(ToastComponent);

export const toastConfig: ToastConfig = {
  success: ({ text1, text2 }) => (
    <Toast
      title={text1}
      message={text2}
      icon={IS_IOS ? 'ios-information-circle' : 'information-circle'}
      status="success"
    />
  ),
  error: ({ text1, text2 }) => (
    <Toast
      title={text1}
      message={text2}
      icon={IS_IOS ? 'ios-information-circle' : 'information-circle'}
      status="failure"
    />
  ),
  info: ({ text1, text2 }) => (
    <Toast
      title={text1}
      message={text2}
      icon={IS_IOS ? 'ios-information-circle' : 'information-circle'}
      status="info"
    />
  ),
  warning: ({ text1, text2 }) => (
    <Toast
      title={text1}
      message={text2}
      icon={IS_IOS ? 'ios-information-circle' : 'information-circle'}
      status="warning"
    />
  ),
};
