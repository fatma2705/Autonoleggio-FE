import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router, private authService: AuthService) { }

  userName: string = '';

  ngOnInit() {
    const userName = this.authService.getUserName();
    if (userName) {
      console.log('nome' + userName);
      this.userName = userName.toUpperCase();
    }
  }





  onLogout() {
    console.log('Logout button clicked');
    this.router.navigate(['/home']);
  }


}
