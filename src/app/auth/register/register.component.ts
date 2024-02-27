import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  firstName: string = "";
  lastName: string = "";
  password: string = "";
  email: string = "";
  identityDocument:string ="";
  identityNumber:string="";

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    const email = this.email;
    const password = this.password;
    const firstName = this.firstName;
    const lastName = this.lastName;
    const identityDocument = this.identityDocument;
    const identityNumber = this.identityNumber;

    this.authService.register(email, password, firstName, lastName, identityNumber, identityDocument)
      .subscribe(
        (response) => {
          console.log('Register successful!', response);
          this.router.navigate(['/login']).then(r => console.log('Navigated to login'));
        },
        (error) => {
          console.error('Register error:', error);
        }
      );
  }
}
