export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface Post {
  id?: string;
  title: string;
  text: string;
  author: string;
  date: Date;
}

export interface FbCreateResponse {
  name: string;
}

export interface FirebaseAuthResponse {
  idToken: string;
  expiresIn: string;
  email:	string;
  refreshToken:	string;
  localId:	string;
  registered:	boolean;
}
