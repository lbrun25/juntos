import {createReducer} from 'typesafe-actions';
import {
  sessionExpired,
} from 'src/modules/auth/actions';
import {AuthAction} from 'src/types/actions';

export interface AuthState {
  isSessionExpired: boolean;
}

const initialState: AuthState = {
  isSessionExpired: false,
};

export const authReducer = createReducer<AuthState, AuthAction>(initialState)
  .handleAction(sessionExpired, state => ({
    ...state,
    sessionExpired: true,
  }));
