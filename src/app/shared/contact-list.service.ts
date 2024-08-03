import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Contacts } from './contact-list.model';

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

  removeContact(id: string) {
    return this.httpClient.delete<Contacts>(
      'http://localhost:3000/contacts-information' + id
    );
  }
}
