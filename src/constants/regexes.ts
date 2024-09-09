import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "src/constants/name";

export const nameRegex = new RegExp(
  `^(?=.{${NAME_MIN_LENGTH},${NAME_MAX_LENGTH}}$)[a-zA-Z\u00c0-\u01ffa][a-z\u00e0-\u01ff]*(?:[-' ][a-zA-Z\u00c0-\u01ffa][a-z\u00e0-\u01ff]*)*$`
);
