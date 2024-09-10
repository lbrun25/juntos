import { MainGenderId, SubGenderId } from "src/types/gender";
import { SexualOrientationId } from "src/types/sexual-orientation";

export interface User {
  firstName: string;
  age: number | undefined;
  genderId: MainGenderId | undefined;
  subGenderId: SubGenderId | undefined;
  canDisplayGender: boolean;
  birthday: Date | undefined;
  sexualOrientation: SexualOrientationId | undefined;
  canDisplaySexualOrientation: boolean;
}
