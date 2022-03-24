import { Case } from 'src/models/sitrepCase';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss'],
})
export class CaseDetailsComponent {
  
  @Input()case: Case;

  constructor() {
  }
}
