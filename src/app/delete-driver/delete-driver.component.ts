import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { DateFormattingPipe } from '../date-formatting.pipe';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-delete-driver',
  standalone: true,
  imports: [UpperCasePipe, DateFormattingPipe],
  templateUrl: './delete-driver.component.html',
  styleUrl: './delete-driver.component.css'
})
export class DeleteDriverComponent {
  drivers: any[] = []
  constructor(private db: DatabaseService, private router: Router) {
    this.db.getDrivers().subscribe((data: any) => {
      this.drivers = data
    });
  };
  deleteDriver(_id: string) {
    this.db.deleteDriver(_id).subscribe((data: any) => {
      this.router.navigate(["list-drivers"])
    })
  }
}
