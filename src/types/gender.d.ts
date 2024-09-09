export interface Gender {
  id: MainGenderId | SubGenderId;
  label: string;
}

export type MainGenderId = "m" | "f" | "nb";

export type SubGenderId = "m" | "m_intersexe" | "ftm" | "m_transmasculine"
  | "f" | "f_intersexe" | "mtf" | "f_transfeminine" | "nb_agender" |
  "nb_bigender" | "nb_gender_fluid" | "nb_gender_questioning" |
  "nb_genderqueer" | "nb_intersexe" | "nb" | "nb_pangender" |
  "nb_trans" | "nb_transfeminine" | "nb_transmasculine";
