import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { DateFormattingPipe } from '../date-formatting.pipe';
import { WeightFormattingPipe } from '../weight-formatting.pipe';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-list-packages',
  standalone: true,
  imports: [DateFormattingPipe, WeightFormattingPipe, UpperCasePipe],
  templateUrl: './list-packages.component.html',
  styleUrl: './list-packages.component.css'
})
export class ListPackagesComponent {
  packages: any[] = []
  chosenPackage: any = {}
  beingDisplayed: boolean = false
  assignedDriver: any = {}
  constructor(private db: DatabaseService) {
    this.db.getPackages().subscribe((data: any) => {
      this.packages = data
    });
  };

  showDriver(_id: string) {
    this.beingDisplayed = true
    this.findPackage(_id)
    this.assignedDriver = this.chosenPackage.driverID
  }

  findPackage(_id: string) {
    for (let i = 0; i < this.packages.length; i++) {
      if (this.packages[i]._id == _id) {
        this.chosenPackage = this.packages[i]
      }
    }
  }

  return() {
    this.beingDisplayed = false
  }
  
}
