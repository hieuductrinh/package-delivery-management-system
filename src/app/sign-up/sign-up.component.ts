import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DatabaseService } from '../database.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  username: string = ""
  password: string = ""
  confirmPassword: string = ""

  constructor(private db: DatabaseService, private router: Router, private auth: AuthService) {}

  signup() {
    let credentials = {
      username: this.username,
      password: this.password,
      passwordConfirm: this.confirmPassword
    }
    this.auth.signup(credentials)
  }

  inputValidator() {
    let regexUsername = /^[a-zA-Z0-9]+$/
    let usernameCheck = this.username.length >= 6 && regexUsername.test(this.username)
    let passwordCheck = 5 <= this.password.length && this.password.length <= 10 && this.password == this.confirmPassword
    return usernameCheck && passwordCheck
  }
}
