import { Component } from '@angular/core';
import { WeightFormattingPipe } from '../weight-formatting.pipe';
import { DateFormattingPipe } from '../date-formatting.pipe';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-package',
  standalone: true,
  imports: [WeightFormattingPipe, DateFormattingPipe],
  templateUrl: './delete-package.component.html',
  styleUrl: './delete-package.component.css'
})
export class DeletePackageComponent {
  packages: any[] = []
  constructor(private db: DatabaseService, private router: Router) {
    this.db.getPackages().subscribe((data: any) => {
      this.packages = data
    });
  };

  deletePackage(_id: string) {
    this.db.deletePackage(_id).subscribe((data: any) => {
      this.router.navigate(["list-packages"])
    })
  }
}
