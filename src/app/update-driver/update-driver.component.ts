import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-driver.component.html',
  styleUrl: './update-driver.component.css'
})
export class UpdateDriverComponent {
  driverID: string = ""
  driverDepartment: string = "Food"
  driverLicence: string = ""
  error: string = ""
  constructor(private db: DatabaseService, private router: Router) {}

  updateDriver() {
    let record = {
      driverID: this.driverID,
      department: this.driverDepartment,
      licence: this.driverLicence
    }
    this.db.updateDriver(record).subscribe(
      (data: any) => {
      this.router.navigate(["list-drivers"])
      },
      (error: any) => {
        this.router.navigate(["invalid"])
      })
  }

  inputValidator() {
    let regexID = /D[0-9]{2}-33-[A-Z]{3}/;
    let driverIDCheck = regexID.test(this.driverID);
    let regexLicence = /^[a-zA-Z0-9]+$/
    let driverLicenceCheck = this.driverLicence.length == 5 && regexLicence.test(this.driverLicence)
    return driverIDCheck && driverLicenceCheck;
  }
}
