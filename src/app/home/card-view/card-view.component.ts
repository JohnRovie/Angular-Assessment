import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Contacts } from '../../shared/contact-list.model';
import { ContactListService } from '../../shared/contact-list.service';
import { FormControl } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.css',
})
export class CardViewComponent implements OnInit {
  @Input({ required: true }) contact!: Contacts;
  contactData: any;
  contactmodelobj!: Contacts[];
  data: any;

  constructor(private contactList: ContactListService) {}

  ngOnInit(): void {
    this.getData();
  }

  removeContact(data: Contacts) {
    this.contactList
      .removeContact(data.id)
      .pipe(
        map((res: any) => {
          return res;
        })
      )
      .subscribe((res: any) => {
        this.contactData = res.id;
        console.log(res);
        this.getData();
      });
  }

  updateContact(id: any) {
    this.contactList
      .updateContacts(this.contactList, this.contact.id)
      .subscribe((res: Contacts[]) => {
        this.getData();
      });
  }
  getData() {
    this.contactList.getContacts().subscribe((res) => {
      this.contactData = res;
    });
  }
}
