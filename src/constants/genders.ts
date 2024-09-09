import { Gender, MainGenderAbbreviation } from "src/types/gender";

export const Genders: Gender[] = [
  {
    abbreviation: "m",
    label: "Homme"
  },
  {
    abbreviation: "f",
    label: "Femme"
  },
  {
    abbreviation: "nb",
    label: "Non binaire"
  },
]

export const SUB_GENDERS: Record<MainGenderAbbreviation, Gender[]> = {
  ['m']: [
    {
      abbreviation: "m",
      label: "Homme Cis",
    },
    {
      abbreviation: "m_intersexe",
      label: "Homme intersexe",
    },
    {
      abbreviation: "ftm",
      label: "Homme trans",
    },
    {
      abbreviation: "m_transmasculine",
      label: "Transmasculine",
    },
  ],
  ['f']: [
    {
      abbreviation: "f",
      label: "Femme cis",
    },
    {
      abbreviation: "f_intersexe",
      label: "Femme intersexe",
    },
    {
      abbreviation: "mtf",
      label: "Femme trans",
    },
    {
      abbreviation: "f_transfeminine",
      label: "Transfeminine",
    },
  ],
  ['nb']: [
    {
      abbreviation: "nb_agender",
      label: "Agender",
    },
    {
      abbreviation: "nb_bigender",
      label: "Bigender ",
    },
    {
      abbreviation: "nb_gender_fluid",
      label: "Gender Fluid",
    },
    {
      abbreviation: "nb_gender_questioning",
      label: "Gender Questioning",
    },
    {
      abbreviation: "nb_genderqueer",
      label: "Genderqueer",
    },
    {
      abbreviation: "nb_intersexe",
      label: "Personne intersexe",
    },
    {
      abbreviation: "nb",
      label: "Non binaire",
    },
    {
      abbreviation: "nb_pangender",
      label: "Pangender",
    },
    {
      abbreviation: "nb_trans",
      label: "Personne trans",
    },
    {
      abbreviation: "nb_transfeminine",
      label: "Transfeminine",
    },
    {
      abbreviation: "nb_transmasculine",
      label: "Transmasculine",
    },
  ],
};
