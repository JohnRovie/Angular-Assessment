import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Contacts } from "./contact-list.model";

@Injectable({providedIn: 'root'})
export class ContactListService{
    httpClient = inject(HttpClient)

    getContacts(){
        return this.httpClient.get<Contacts[]>('http://localhost:3000/contacts-information')
    }
    
}