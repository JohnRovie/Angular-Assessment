import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Contacts, NewContact } from './contact-list.model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactListService {
  httpClient = inject(HttpClient);
  contacts = [
    {
      id: '1',
      name: 'Jay Contreras',
      contact: '0917-123-4567',
      email: 'kamikazeegod@gmail.com',
    },
    {
      id: '2',
      name: 'Jason Dimaguiba',
      contact: '0929-321-5546',
      email: 'jasondmgb@gmail.com',
    },
    {
      id: '3',
      name: 'Angel Marie',
      contact: '0932-222-4452',
      email: 'angelm@gmail.com',
    },
  ];

  getContacts() {
    return this.httpClient.get<Contacts[]>(
      'http://localhost:3000/contacts-information'
    );
  }
  postContacts(data: any) {
    return this.httpClient.post<any>(
      'http://localhost:3000/contacts-information',
      data
    );
  }
  getContactId(id: string) {
    this.contacts = this.contacts = this.contacts.filter(
      (contact) => contact.id === id
    );
  }

  removeContact(id: string) {
    return this.httpClient.delete<any>(
      'http://localhost:3000/contacts-information/' + id
    );
  }

  addContact(contactData: NewContact) {
    this.contacts.push({
      id: new Date().getTime().toString(),
      name: contactData.name,
      contact: contactData.contact,
      email: contactData.email,
    });
  }
}
