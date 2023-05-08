import { Injectable, OnInit, inject } from '@angular/core';
import { Database } from '@angular/fire/database';
import {
  Firestore,
  collection,
  doc,
  onSnapshot,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserDataService implements OnInit {
  firestore: Firestore = inject(Firestore);
  private database: Database = inject(Database);

  constructor() {}

  ngOnInit(): void {
    // let colData = collection(this.firestore, 'users')
  }
}
