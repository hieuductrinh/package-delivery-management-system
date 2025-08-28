import { Component } from '@angular/core';
import { WeightFormattingPipe } from '../weight-formatting.pipe';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-genai',
  standalone: true,
  imports: [WeightFormattingPipe],
  templateUrl: './genai.component.html',
  styleUrl: './genai.component.css'
})
export class GenaiComponent {
  packages: any[] = []
  socket: any
  distance: string = ""
  constructor(private db: DatabaseService, private router: Router) {
    this.socket = io();
    this.db.getPackages().subscribe((data: any) => {
      this.packages = data
    });
  }

  ngOnInit() {
    this.listen()
  }

  listen() {
    this.socket.on("genaiResponse", (data: any) => {
      this.distance = data;
    });
  }

  calculateDistance(_id: string) {
    this.distance = "Loading"
    let chosenPackage = this.findPackage(_id)
    this.socket.emit("genaiRequest", chosenPackage.destination);
  }

  findPackage(_id: string) {
    for (let i = 0; i < this.packages.length; i++) {
      if (this.packages[i]._id == _id) {
        return this.packages[i]
      }
    }
  }

  naviate(target: number) {
    if (target == 0) {
      this.router.navigate(["translation"])
    }
    else if (target == 1) {
      this.router.navigate(["tts"])
    }
    else {
      this.router.navigate(["genai"])
    }
  }
}
