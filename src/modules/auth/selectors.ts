import {RootState} from 'src/store';

export const isSessionExpiredSelector = (state: RootState): boolean =>
  state.auth.isSessionExpired;
