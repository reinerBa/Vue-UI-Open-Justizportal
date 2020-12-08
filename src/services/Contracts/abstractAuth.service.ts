import { AuthResponse } from '../../ressources/model'

export abstract class AbstractAuthService {

    public abstract async login(userName: string, password: string): Promise<AuthResponse> 

    public abstract async refresh() :Promise<void>
    
    public abstract async logout(): Promise<void>
  }
  