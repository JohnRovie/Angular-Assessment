import { Component } from '@angular/core';
import { TableViewComponent } from './table-view/table-view.component';
import { CardViewComponent } from './card-view/card-view.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableViewComponent, CardViewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  card: boolean = true;
  table: boolean = false;
  isCardDisabled: boolean = true;
  isTableDisabled: boolean = false;

  isCard() {
    this.card = true;
    this.table = false;
    this.isCardDisabled = true;
    this.isTableDisabled = false;
  }
  isTable() {
    this.table = true;
    this.card = false;
    this.isTableDisabled = true;
    this.isCardDisabled = false;
  }
}
