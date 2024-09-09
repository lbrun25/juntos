import { Genders, SUB_GENDERS } from "src/constants/genders";
import { Gender } from "src/types/gender";

export const getGenderById = (id: string): Gender | undefined => {
  return Genders.find(gender => gender.id === id);
};

// Method to retrieve a Gender by id from SUB_GENDERS
export const getSubGenderById = (id: string): Gender | undefined => {
  for (const genderArray of Object.values(SUB_GENDERS)) {
    const foundGender = genderArray.find(gender => gender.id === id);
    if (foundGender) {
      return foundGender;
    }
  }
  return undefined;
}
