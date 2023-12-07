export interface IUser {
  id: number;
  attributes: {
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    phoneNumber: null | string;
    firstName: null | string;
    lastName: null | string;
  };
}
