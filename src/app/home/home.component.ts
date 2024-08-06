import { Component, Input, Output, signal } from '@angular/core';
import { TableViewComponent } from './table-view/table-view.component';
import { CardViewComponent } from './card-view/card-view.component';
import { ModalComponent } from './modal/modal.component';
import { ContactListService } from '../shared/contact-list.service';
import { Contacts } from '../shared/contact-list.model';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AlertComponent } from './alert/alert.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TableViewComponent,
    CardViewComponent,
    ModalComponent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    AlertComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  card: boolean = true;
  table: boolean = false;
  isCardDisabled: boolean = true;
  isTableDisabled: boolean = false;
  modalView: boolean = false;
  contact!: Contacts;
  isSuccess: boolean = false;
  contactData: any;

  constructor(private contactList: ContactListService) {}

  ngOnInit() {
    this.getData();
  }

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
  toggleModal() {
    this.modalView = true;
  }
  closeModal() {
    this.modalView = false;
  }
  showSuccess() {
    this.isSuccess = true;
  }

  getData() {
    this.contactList.getContacts().subscribe({
      next: (res: Contacts[]) => {
        this.contactData = res;
      },
    });
  }
}
