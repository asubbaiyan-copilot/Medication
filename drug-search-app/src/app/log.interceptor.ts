import type { HttpInterceptor, HttpInterceptorFn } from '@angular/common/http';

export const logInterceptor: HttpInterceptorFn = (req,next ) => {
  console.log('HTTP Request:', req);
  console.log('HTTP Request Headers:', req.headers);
  return next(req);
};