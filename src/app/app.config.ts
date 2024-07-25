import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { authInterceptor } from './auth/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(withInterceptors([authInterceptor])), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync()
    ]
};

