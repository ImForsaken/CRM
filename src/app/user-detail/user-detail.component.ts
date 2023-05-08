import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userId!: Params;
  userInfo$!: Observable<any>;
  user: User = new User();
  firestore: Firestore = inject(Firestore);

  constructor(public route: ActivatedRoute, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.userId = params;
    });
    this.getUser();
  }

  getUser() {
    const docRef = doc(collection(this.firestore, 'users'), this.userId['id']);
    this.userInfo$ = docData(docRef);
    this.userInfo$.subscribe((user) => {
      this.user = new User(user);
    });
  }

  editAdressMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editUserMenu() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}
