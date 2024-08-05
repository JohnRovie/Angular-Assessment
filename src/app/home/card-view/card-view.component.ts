import { Component, inject, Input, signal } from '@angular/core';
import { Contacts } from '../../shared/contact-list.model';
import { ContactListService } from '../../shared/contact-list.service';
import { FormControl } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.css',
})
export class CardViewComponent {
  @Input({ required: true }) contact!: Contacts;
  contactData: any;

  constructor(private contactList: ContactListService) {}

  ngOnInit(): void {
    return this.getData();
  }

  removeContact() {
    return this.contactList
      .removeContact(this.contactData.id)
      .subscribe((res) => {
        console.log(this.contactData.id);
        this.getData();
      });
  }
  getData() {
    this.contactList.getContacts().subscribe((res) => {
      this.contactData = res;
    });
    return this.contactData;
  }
}
