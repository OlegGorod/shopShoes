export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  password: string;
  passwordConfirmation: string;
  code: string;
}

export interface ISignInUser extends IForgotPassword {
  password: string;
}

export interface ISignUpUser extends ISignInUser {
  name: string;
  passwordConfirmation: string;
}
