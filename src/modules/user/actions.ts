import {createAction} from 'typesafe-actions';
import {Location} from 'src/types/location';
import { User } from "src/types/user";

export const registered = createAction('user/REGISTERED')();
export const setLocation = createAction('user/SET_LOCATION')<Location>();
export const setUser = createAction('user/SET_USER')<User>();
export const updateUser = createAction('user/UPDATE_USER')<Partial<User>>();
export const deleteUser = createAction('user/DELETE_USER')();
