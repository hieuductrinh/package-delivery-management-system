import { UpperCasePipe } from '@angular/common';
import { Component, Sanitizer } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { FormsModule } from '@angular/forms';
import io from 'socket.io-client';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-text-to-speech',
  standalone: true,
  imports: [UpperCasePipe, FormsModule],
  templateUrl: './text-to-speech.component.html',
  styleUrl: './text-to-speech.component.css'
})
export class TextToSpeechComponent {
  drivers: any[] = []
  textToConvert: string = ""
  urlToFile: SafeUrl = ""
  socket: any
  constructor(private db: DatabaseService, private router: Router, private sanitizer: DomSanitizer) {
    this.socket = io();
    this.db.getDrivers().subscribe((data: any) => {
      this.drivers = data
    });
  }

  ngOnInit() {
    this.listen()
  }

  listen() {
    this.socket.on("ttsResponse", (data: any) => {
      this.urlToFile = data;
    });
  }

  textToSpeech(_id: string) {
    this.textToConvert = this.findDriver(_id).licence.toUpperCase()
    this.socket.emit("ttsRequest", this.textToConvert);
  }

  findDriver(_id: string) {
    for (let i = 0; i < this.drivers.length; i++) {
      if (this.drivers[i]._id == _id) {
        return this.drivers[i]
      }
    }
  }

  play() {
    let audio = document.getElementById("audio") as HTMLAudioElement;
    audio.load()
    audio.play()
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
