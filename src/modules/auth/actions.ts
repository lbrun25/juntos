import {createAction} from "typesafe-actions";

export const sessionExpired = createAction('auth/REFRESH_TOKEN_EXPIRED')();
