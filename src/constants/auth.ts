export const PASSWORD_MIN_LENGTH = 8;

export const passwordRegex = new RegExp(
  `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{${PASSWORD_MIN_LENGTH},}$`
);

export const emailRegex = new RegExp(
  `^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$`
);
