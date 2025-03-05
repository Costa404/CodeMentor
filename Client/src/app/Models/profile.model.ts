// src/app/Models/profile.model.ts
export interface UserProfile {
  displayName: string;
  email: string;
  avatar_url: string;
  [key: string]: any;
}

// Definindo a interface User com apenas as propriedades necessárias
export interface User {
  displayName: string;
  photos: { value: string }[];
}
