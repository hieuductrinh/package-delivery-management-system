import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-package.component.html',
  styleUrl: './update-package.component.css'
})
export class UpdatePackageComponent {
  packageID: string = ""
  packageDestination: string = ""
  constructor(private db: DatabaseService, private router: Router) {}

  updatePackage() {
    let record = {
      packageID: this.packageID,
      destination: this.packageDestination
    }
    this.db.updatePackage(record).subscribe(
      (data: any) => {
      this.router.navigate(["list-packages"])
      },
      (error: any) => {
        this.router.navigate(["invalid"])
      }
    )
  }

  inputValidator() {
    let regexID = /P[A-Z]{2}-HT-[0-9]{3}/
    let regexDestination = /^[a-zA-Z0-9 ]+$/
    let packageIDCheck = regexID.test(this.packageID)
    let packageDestinationCheck = 5 <= this.packageDestination.length && this.packageDestination.length <= 15 && regexDestination.test(this.packageDestination)
    return packageIDCheck && packageDestinationCheck
  }
}
