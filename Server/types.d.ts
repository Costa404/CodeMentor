declare global {
  namespace Express {
    interface User {
      accessToken: string;
      profile: {
        id: string;
        username: string;
        displayName: string;
        avatarUrl: string;
        profileUrl: string;
        photos?: { value: string }[];
      };
    }

    interface Request {
      user?: User;
    }
  }
}
export {}; // Isso é importante para garantir que o arquivo seja tratado como módulo.
