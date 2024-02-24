import { instance } from 'src/services/Interceptor/interceptor';
import { environment } from '../environment/environment';
import {
  Login,
  EsqueciMinhaSenha,
  ResetarSenha,
  AtualizarToken,
} from '../types/interfaces/IAuth';
import { useAuthStore } from 'src/stores/auth';
import { useUserStore } from 'src/stores/user';
import { useTourStore } from 'src/stores/tour';

export function Login(data: Login) {
  return instance.post(`${environment.baseUrl}/login`, data);
}

export function ResetarSenha(data: ResetarSenha) {
  return instance.post(`${environment.baseUrl}/password-reset`, data);
}

export function EsqueciMinhaSenha(data: EsqueciMinhaSenha) {
  return instance.post(`${environment.baseUrl}/password-forgot`, data);
}

export function AtualizarToken(data: AtualizarToken) {
  return instance.post(`${environment.baseUrl}/refresh`, data);
}

export function signOut() {
  const auth = useAuthStore();
  const user = useUserStore();
  const tour = useTourStore();

  auth.storageAuthTokenRemove();
  user.storageUserRemove();
  tour.storageTourRemove();
}
