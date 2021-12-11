import { AuthResponse } from '../../ressources/model'

export abstract class AbstractAuthService {

    public abstract login(userName: string, password: string): Promise<AuthResponse> 

    public abstract refresh() :Promise<void>
    
    public abstract logout(): Promise<void>
  }
  