import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false
  authenticationChange = new Subject<any>()
  constructor(private db: DatabaseService, private router: Router) {}

  isAuthenticated() {
    return this.loggedIn
  }

  login(credentials: Object) {
    this.db.login(credentials).subscribe(
      (data: any) => {
      this.router.navigate([""])
      this.loggedIn = true
      this.sendSignal(true)
      },
      (error: any) => {
        this.router.navigate(["invalid"])
        this.sendSignal(false)
      })
  }

  signup(credentials: Object) {
    this.db.signup(credentials).subscribe(
      (data: any) => {
      this.router.navigate(["login"])
      this.loggedIn = false
      this.sendSignal(false)
      },
      (error: any) => {
        this.router.navigate(["invalid"])
        this.sendSignal(false)
      })
  }

  signout() {
    this.db.signout().subscribe(
      (data: any) => {
      this.router.navigate([""])
      this.loggedIn = false
      this.sendSignal(false)
      })
  }

  sendSignal(status: any) {
    this.authenticationChange.next(status)
  }

  getSignal(): Observable<any> {
    return this.authenticationChange.asObservable()
  }
}
