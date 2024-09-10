export type SexualOrientationId =
  "bi" |
  "pansexual" |
  "queer" |
  "lesbian" |
  "gay" |
  "demisexual" |
  "asexual" |
  "hetero" |
  "in_question" |
  "omnisexual" |
  "other";


export interface SexualOrientation {
  id: SexualOrientationId;
  label: string;
}
