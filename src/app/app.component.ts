import { Component } from '@angular/core';
import {AuthService} from "./services/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aftas-front-end';

  constructor(private authService: AuthService) {
  }

  logout() {
    this.authService.logout();
  }
}
