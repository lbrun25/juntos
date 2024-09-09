import {useTheme} from 'styled-components';
import {View} from 'src/components/ui/View';
import {Text} from 'src/components/ui/Text';
import {Space} from 'src/components/Space';
import {Badge} from 'react-native-ui-lib';
import React, {memo} from 'react';

interface HeaderTitleProps {
  title: string;
  notificationCount?: number;
}

const HeaderTitleComponent = (
  {title, notificationCount}: HeaderTitleProps
): React.JSX.Element => {
  const theme = useTheme();

  return (
    <View row center>
      <Text body bold>{title}</Text>
      {notificationCount && (
        <>
          <Space width={2} />
          <Badge
            label={notificationCount.toString()}
            size={24}
            borderRadius={theme.borderRadius.l}
            backgroundColor={theme.colors.secondary}
          />
        </>
      )}
    </View>
  );
};

export const HeaderTitle = memo(HeaderTitleComponent);
