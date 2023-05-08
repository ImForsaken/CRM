import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Params } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss'],
})
export class DialogEditAddressComponent implements OnInit {
  user!: User;
  loading = false;
  firestore: Firestore = inject(Firestore);
  userId!: Params;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {}

  ngOnInit(): void {}

  async saveUser() {
    this.loading = true;
    const docRef = doc(collection(this.firestore, 'users'), this.userId['id']);
    await updateDoc(docRef, this.user.toJSON()).then(() => {
      this.loading = false;
      this.dialogRef.close();
    });
  }
}
