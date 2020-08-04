import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection} from "@angular/fire/firestore";
@Injectable({
  providedIn: 'root'
})
export class ConfirmsellerDetailService {
  userCollection:any;
  userDetail:any;
  return: void;
  constructor(private db: AngularFirestore) { 
    this.userCollection = db.collection("users")
    this.userDetail = db.collectionGroup("${user.uid}");
  }

  getUser(uid): any {
    return this.userCollection.get();
  }
}
