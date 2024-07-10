import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).tokenStorage
  if(token){
    const clone = req.clone(
      {headers: req.headers.set('Authorization', `Bearer ${token}`)}
    );
    return next(clone);
  }
  return next(req);
};
