export interface ISignup { 
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  datebirth: string;
}

export interface IUsers { 
  id: number;
  name: string;
  password: string;
  email: string;
  datebirth: Date;
  profile: number;
}
