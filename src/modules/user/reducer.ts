import {
  deleteUser,
  registered,
  setLocation, setUser, updateUser
} from "src/modules/user/actions";
import {UserAction} from 'src/types/actions';
import {createReducer} from 'typesafe-actions';
import {Location} from 'src/types/location';
import { User } from "src/types/user";

export interface UserState {
  hasRegistered: boolean;
  location: Location | undefined;
  user: User;
}

const initialState: UserState = {
  hasRegistered: false,
  location: undefined,
  user: {
    firstName: "",
    age: undefined,
    birthday: undefined,
    genderId: undefined,
    subGenderId: undefined,
    canDisplayGender: false,
    sexualOrientation: undefined,
    canDisplaySexualOrientation: false,
  }
};

export const userReducer = createReducer<UserState, UserAction>(initialState)
  .handleAction(setUser, (state, {payload: user}) => ({
    ...state,
    user: {...user},
  }))
  .handleAction(updateUser, (state, {payload: user}) => ({
    ...state,
    user: {
      ...state.user,
      ...user,
    },
  }))
  .handleAction(deleteUser, () => ({
    ...initialState,
  }))
  .handleAction(registered, state => ({
    ...state,
    hasRegistered: true,
  }))
  .handleAction(setLocation, (state, {payload: location}) => ({
    ...state,
    location: {...location},
  }));
