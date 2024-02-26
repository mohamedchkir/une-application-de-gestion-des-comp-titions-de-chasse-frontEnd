import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    const email = this.email;
    const password = this.password;


    this.authService.login(email, password)
      .subscribe(
        (response) => {

          if (response.access_token) {
            localStorage.setItem('accessToken', response.access_token);
            localStorage.setItem('refreshToken', response.refresh_token);
            localStorage.setItem('expireAt', response.expire_at);
            console.log('Login successful!', response);
            this.router.navigate(['/competition']).then(r => console.log('Navigated to dashboard'));
          } else {
            console.error('Access token missing in response:', response);
          }
        },
        (error) => {
          console.error('Login error:', error);
        }
      );
  }

}
