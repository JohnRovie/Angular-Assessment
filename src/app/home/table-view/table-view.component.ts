import { Component, signal } from '@angular/core';
import { Contacts } from '../../shared/contact-list.model';
import { ContactListService } from '../../shared/contact-list.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.css',
})
export class TableViewComponent {
  contactData: any;

  constructor(private contactList: ContactListService) {}

  ngOnInit() {
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

  getData() {
    this.contactList.getContacts().subscribe((res) => {
      this.contactData = res;
    });
  }
}
