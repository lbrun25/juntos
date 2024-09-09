import {ActionType} from 'typesafe-actions';
import * as authActions from '../modules/auth/actions';
import * as userActions from '../modules/user/actions';

export type AuthAction = ActionType<typeof authActions>;

export type UserAction = ActionType<typeof userActions>;

export type RootAction = AuthAction & UserAction;
