import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgIf,RegisterComponent,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
errorMessage: string = '';

  authService = inject(AuthService);
  router = inject(Router);

  protected loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      console.log(this.authService.getCurrentUser)
      this.authService.login(this.loginForm.value).subscribe({
        next: (data: any) => {
          if (this.authService.isLoggedIn()) {

            if (this.authService.getCurrentUser().includes('ROLE_ADMIN')) {
              this.router.navigate(['admin']);
            } else {
              this.router.navigate(['/user/home']);
            }


          }
        },
        error: (err: any) => {
          this.errorMessage = (err.error && err.error.message) ? err.error.message : 'Credenziali di accesso errate';
        }
      });
    }
  }


}
