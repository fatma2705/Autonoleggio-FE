import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [ ],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {
username: string =  '';

constructor(private authService: AuthService) { }


    
    ngOnInit() {
    const username = this.authService.getUserName();
    if (username) {
      this.username = username.toUpperCase();
    }
  }

}
