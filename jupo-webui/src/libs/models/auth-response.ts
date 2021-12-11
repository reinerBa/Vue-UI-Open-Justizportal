export class AuthResponse {
  returnCode: string
  
  authInfo: {
    token: string
    expiresIn: number
  };

  errorInfo: {
    unlockedIn: number
  };
}