import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css'
})
export class AddDriverComponent {
  driverName: string = "";
  driverDepartment: string = "Food";
  driverLicence: string = "";
  isDriverActive: boolean = true;
  constructor(private db: DatabaseService, private router: Router) {}

  addDriver() {
    let record = {
      name: this.driverName,
      department: this.driverDepartment,
      licence: this.driverLicence,
      isActive: this.isDriverActive
    }
    this.db.addDriver(record).subscribe(
      (data: any) => {
      this.router.navigate(["list-drivers"])
      },
      (error: any) => {
        this.router.navigate(["invalid"])
      })
  }

  inputValidator() {
    let regexName = /^[a-zA-Z ]+$/;
    let driverNameCheck = 3 <= this.driverName.length && this.driverName.length <= 20 && regexName.test(this.driverName);
    let regexLicence = /^[a-zA-Z0-9]+$/
    let driverLicenceCheck = this.driverLicence.length == 5 && regexLicence.test(this.driverLicence)
    return driverNameCheck && driverLicenceCheck;
  }
}
