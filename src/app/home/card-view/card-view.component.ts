import { Component, inject, Input, signal } from '@angular/core';
import { Contacts } from '../../shared/contact-list.model';
import { ContactListService } from '../../shared/contact-list.service';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.css',
})
export class CardViewComponent {
  displayContacts = signal<Contacts[] | undefined>(undefined);
  @Input({ required: true }) contact!: Contacts;

  constructor(private contactList: ContactListService) {}

  ngOnInit() {
    return this.contactList.getContacts().subscribe({
      next: (resultData) => {
        this.displayContacts.set(resultData);
        console.log(resultData);
      },
    });
  }
  removeContact() {
    return this.contactList.removeContact(this.contact.id);
  }
}
