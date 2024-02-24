import { instance } from 'src/services/Interceptor/interceptor';
import { environment } from '../environment/environment';
import { Register } from 'src/types/interfaces/IUser';

export function GetUserAutenticado() {
  return instance.get(`${environment.baseUrl}/usuario/autenticado`);
}

export function GetUserFoto() {
  return instance.get(`${environment.baseUrl}/usuario/foto`);
}

export function CadastroUser(data: Register) {
  return instance.post(`${environment.baseUrl}/register`, data);
}
