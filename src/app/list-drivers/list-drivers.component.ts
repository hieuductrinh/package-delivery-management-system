import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { UpperCasePipe } from '@angular/common';
import { DateFormattingPipe } from '../date-formatting.pipe';
import { ListPackagesComponent } from "../list-packages/list-packages.component";
import { Observable, Subject } from 'rxjs';
import { WeightFormattingPipe } from '../weight-formatting.pipe';

@Component({
  selector: 'app-list-drivers',
  standalone: true,
  imports: [UpperCasePipe, DateFormattingPipe, ListPackagesComponent, WeightFormattingPipe],
  templateUrl: './list-drivers.component.html',
  styleUrl: './list-drivers.component.css'
})
export class ListDriversComponent {
  drivers: any[] = []
  assignedPackages: any[] = []
  beingDisplayed: boolean = false
  chosenDriver: any = {}
  constructor(private db: DatabaseService) {
    this.db.getDrivers().subscribe((data: any) => {
      this.drivers = data
    });
  };

  showPackages(_id: string) {
    this.beingDisplayed = true
    this.findDriver(_id)
    this.assignedPackages = this.chosenDriver.assignedPackages
  }

  findDriver(_id: string) {
    for (let i = 0; i < this.drivers.length; i++) {
      if (this.drivers[i]._id == _id) {
        this.chosenDriver = this.drivers[i]
      }
    }
  }

  return() {
    this.beingDisplayed = false
  }

}
