export interface NoteBookInterface {
  _id: string;
  owner: string;
  name: string;
  code: string;
  langId: number;
  isPrivate: boolean;
}

export interface UserInterface {
  _id: string;
  email: string;
  password: string;
}
