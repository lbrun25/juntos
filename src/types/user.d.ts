import { Gender } from "src/types/gender";

export interface User {
  firstName: string;
  age: number | undefined;
  gender: Gender | undefined;
  birthday: Date | undefined;
}
