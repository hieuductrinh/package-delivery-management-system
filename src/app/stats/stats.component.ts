import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  operation = {
    retrieve: 0,
    insert: 0,
    delete: 0,
    update: 0
  }
  drivers = []
  packages = []
  constructor(private db: DatabaseService) {
    this.db.getStats().subscribe((data: any) => {
      this.operation = data.operation
    })
    this.db.getDrivers().subscribe((data: any) => {
      this.drivers = data
    })
    this.db.getPackages().subscribe((data: any) => {
      this.packages = data
    })
  }

}
