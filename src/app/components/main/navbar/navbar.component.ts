import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router, private authService: AuthService) { }

  userName: string = '';

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateUserName();
      }
    });
    this.updateUserName();
  }

  updateUserName() {
    const userName = this.authService.getUserName();
    if (userName) {
      console.log('nome' + userName);
      this.userName = userName;
    } else {
      this.userName = '';
    }
}
  onLogout() {
    console.log('Logout button clicked');
    this.router.navigate(['/home']);
  }






  

}
