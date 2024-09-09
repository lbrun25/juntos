import { Gender, MainGenderId } from "src/types/gender";

export const Genders: Gender[] = [
  {
    id: "m",
    label: "Homme"
  },
  {
    id: "f",
    label: "Femme"
  },
  {
    id: "nb",
    label: "Non binaire"
  },
]

export const SUB_GENDERS: Record<MainGenderId, Gender[]> = {
  ['m']: [
    {
      id: "m",
      label: "Homme Cis",
    },
    {
      id: "m_intersexe",
      label: "Homme intersexe",
    },
    {
      id: "ftm",
      label: "Homme trans",
    },
    {
      id: "m_transmasculine",
      label: "Transmasculine",
    },
  ],
  ['f']: [
    {
      id: "f",
      label: "Femme cis",
    },
    {
      id: "f_intersexe",
      label: "Femme intersexe",
    },
    {
      id: "mtf",
      label: "Femme trans",
    },
    {
      id: "f_transfeminine",
      label: "Transfeminine",
    },
  ],
  ['nb']: [
    {
      id: "nb_agender",
      label: "Agender",
    },
    {
      id: "nb_bigender",
      label: "Bigender ",
    },
    {
      id: "nb_gender_fluid",
      label: "Gender Fluid",
    },
    {
      id: "nb_gender_questioning",
      label: "Gender Questioning",
    },
    {
      id: "nb_genderqueer",
      label: "Genderqueer",
    },
    {
      id: "nb_intersexe",
      label: "Personne intersexe",
    },
    {
      id: "nb",
      label: "Non binaire",
    },
    {
      id: "nb_pangender",
      label: "Pangender",
    },
    {
      id: "nb_trans",
      label: "Personne trans",
    },
    {
      id: "nb_transfeminine",
      label: "Transfeminine",
    },
    {
      id: "nb_transmasculine",
      label: "Transmasculine",
    },
  ],
};
