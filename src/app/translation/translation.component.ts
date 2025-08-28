import { Component } from '@angular/core';
import { WeightFormattingPipe } from '../weight-formatting.pipe';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { FormsModule } from '@angular/forms';
import io from 'socket.io-client';
import { LanguagePipe } from '../language.pipe';

@Component({
  selector: 'app-translation',
  standalone: true,
  imports: [WeightFormattingPipe, FormsModule, LanguagePipe],
  templateUrl: './translation.component.html',
  styleUrl: './translation.component.css'
})
export class TranslationComponent {
  packages: any[] = []
  translations: any[] = []
  targetLanguage: string = "de"
  socket: any;
  constructor(private db: DatabaseService, private router: Router) {
    this.socket = io();
    this.db.getPackages().subscribe((data: any) => {
      this.packages = data
    });
  }

  ngOnInit() {
    this.listen();
  }

  listen() {
    this.socket.on("translateResponse", (data: any) => {
      this.translations.push(data);
    });
  }

  translate(_id: string) {
    let chosenPackage = this.findPackage(_id)
    if (chosenPackage.description != "" && chosenPackage.description != null) {
      let request = {
        text: chosenPackage.description,
        target: this.targetLanguage
      }
      this.socket.emit("translateRequest", request);
    }
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
