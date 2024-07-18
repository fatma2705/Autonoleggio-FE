import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {
  userName: string = '';
  constructor(private authService: AuthService) { }



  ngOnInit() {
    const userName = this.authService.getUserName();
    if (userName) {
      console.log('nome' + userName);
      this.userName = userName;
    }
  }






}
