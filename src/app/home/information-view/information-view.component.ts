import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ContactListService } from '../../shared/contact-list.service';
import { Contacts } from '../../shared/contact-list.model';

@Component({
  selector: 'app-information-view',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './information-view.component.html',
  styleUrl: './information-view.component.css',
})
export class InformationViewComponent {
  contactData: any;
  @Input({ required: true }) contact!: Contacts;

  constructor(private contactList: ContactListService) {}

  ngOnInit() {
    this.getData();
    this.getId;
    console.log(this.contact.id);
  }

  getData() {
    this.contactList.getContacts().subscribe((res) => {
      this.contactData = res;
      console.log(res);
    });
  }
  getId() {
    this.contactList.getContactId(this.contact.id);
  }
}
