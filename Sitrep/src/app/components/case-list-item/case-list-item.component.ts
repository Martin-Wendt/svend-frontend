import { Component, Input } from '@angular/core';
import { Case } from 'src/models/sitrepCase';

@Component({
  selector: 'app-case-list-item',
  templateUrl: './case-list-item.component.html',
  styleUrls: ['./case-list-item.component.scss'],
})
export class CaseListItemComponent {
  
  @Input()case: Case;
  @Input()tabType: string;

  constructor() {
  }

}
