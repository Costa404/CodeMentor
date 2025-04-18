export interface UserProfile {
  displayName: string;
  email: string;
  avatar_url: string;
  [key: string]: any;
}

export interface UserInfo {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
}
