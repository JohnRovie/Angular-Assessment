import { Component, signal } from '@angular/core';
import { Contacts } from '../../shared/contact-list.model';
import { ContactListService } from '../../shared/contact-list.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.css'
})
export class TableViewComponent {
  displayContacts = signal<Contacts[] | undefined>(undefined);

  constructor(private contactList: ContactListService){}


  ngOnInit() {
    return this.contactList.getContacts().subscribe({
      next: (resultData) => {
        this.displayContacts.set(resultData)
        console.log(resultData)
      }
    })
  }
}
