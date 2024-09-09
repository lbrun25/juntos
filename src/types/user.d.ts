import { MainGenderId, SubGenderId } from "src/types/gender";

export interface User {
  firstName: string;
  age: number | undefined;
  genderId: MainGenderId | undefined;
  subGenderId: SubGenderId | undefined;
  canDisplayGender: boolean;
  birthday: Date | undefined;
}
