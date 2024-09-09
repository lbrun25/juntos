import {useHeaderHeight} from '@react-navigation/elements';
import {useTheme} from 'styled-components';

export const useToastTopOffset = () => {
  const headerHeight = useHeaderHeight();
  const theme = useTheme();

  return headerHeight + theme.gridUnit * 4;
};
