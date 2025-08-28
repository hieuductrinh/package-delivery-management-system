import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.css'
})
export class AddPackageComponent {
  drivers: any[] = []
  packageTitle: string = ""
  packageDescription: string = ""
  packageWeight: number = 0
  packageDestination: string = ""
  driverID: string = ""
  isAllocated: boolean = true
  constructor(private db: DatabaseService, private router: Router) {
    this.db.getDrivers().subscribe((data: any) => {
      this.drivers = data
      this.driverID = this.drivers[0]._id
    });
  };

  addPackage() {
    let record = {
      title: this.packageTitle,
      weight: this.packageWeight,
      destination: this.packageDestination,
      description: this.packageDescription,
      isAllocated: this.isAllocated,
      driverID: this.driverID
    }
    this.db.addPackage(record).subscribe(
      (data: any) => {
      this.router.navigate(["list-packages"])
      },
      (error: any) => {
        this.router.navigate(["invalid"])
      })
  }

  inputValidator() {
    let regexTitle = /^[a-zA-Z0-9 ]+$/
    let regexDestination = /^[a-zA-Z0-9 ]+$/
    let titleCheck = 3 <= this.packageTitle.length && this.packageTitle.length <= 15 && regexTitle.test(this.packageTitle)
    let descriptionCheck = this.packageDescription.length <= 30
    let weightCheck = this.packageWeight > 0
    let destinationCheck = 5 <= this.packageDestination.length && this.packageDestination.length <= 15 && regexDestination.test(this.packageDestination)
    return titleCheck && descriptionCheck && weightCheck && destinationCheck
  }
}
