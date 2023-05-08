import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { UserDataService } from '../user-data.service';
import {
  Firestore,
  collection,
  collectionData,
  docData,
  onSnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserData } from '../shared/user-data';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user = new User();
  firestore: Firestore = inject(Firestore);
  allUserData: UserData[] = [];
  userInfo$!: Observable<any>;
  constructor(public dialog: MatDialog, private userData: UserDataService) {}

  ngOnInit(): void {
    const colData = collection(this.firestore, 'users');
    collectionData(colData, { idField: 'uid' }).subscribe((users: any) => {
      this.allUserData = users;
      console.log(this.allUserData);
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
