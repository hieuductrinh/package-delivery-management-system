import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DatabaseService } from '../database.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  username: string = ""
  password: string = ""
  constructor(private db: DatabaseService, private router: Router, private auth: AuthService) {}

  login() {
    let credentials = {
      username: this.username,
      password: this.password,
    }
    this.auth.login(credentials)
  }

  inputValidator() {
    let regexUsername = /^[a-zA-Z0-9]+$/
    let usernameCheck = this.username.length >= 6 && regexUsername.test(this.username)
    let passwordCheck = 5 <= this.password.length && this.password.length <= 10
    return usernameCheck && passwordCheck
  }
}
