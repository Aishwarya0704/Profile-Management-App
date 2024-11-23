export const apiUrl: string | undefined = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : undefined;

export interface ProfileI {
  id?: string;
  name?: string;
  email?: string;
  age?: number;
}
