import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DatabaseService } from '../database.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  loggedIn = false
  loggedInCheckSubscription: Subscription
  constructor(private db: DatabaseService, private router: Router, private auth: AuthService, private cdf: ChangeDetectorRef) {
    this.loggedInCheckSubscription = this.auth.getSignal().subscribe((status => {
      this.loggedIn = status
    }))
  }

  signout() {
    this.auth.signout()
  }
}
