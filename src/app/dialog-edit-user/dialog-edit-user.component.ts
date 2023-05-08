import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Params } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss'],
})
export class DialogEditUserComponent {
  user!: User;
  loading: boolean = false;
  birthDate!: Date;
  firestore: Firestore = inject(Firestore);
  userId!: Params;
  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {}

  async saveUser() {
    this.loading = true;
    const docRef = doc(collection(this.firestore, 'users'), this.userId['id']);
    await updateDoc(docRef, this.user.toJSON()).then(() => {
      this.loading = false;
      this.dialogRef.close();
    });
  }
}
