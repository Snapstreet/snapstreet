import { Injectable , EventEmitter} from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { agentSignup } from '../../Model/agentSignup';
import {
  AngularFirestoreDocument
} from "@angular/fire/firestore";
@Injectable({
  providedIn: "root"
})
export class AgentSignupService {

  private dbPath = "agentSignup";
  dataSavedEventEmitter = new EventEmitter<string>();
  return: any;

  customersRef: AngularFirestoreCollection<agentSignup> = null;

  constructor(private db: AngularFirestore) {

    // Collection Group
    this.customersRef = db.collection(this.dbPath);
  }
  
  async createAgentCustomer(key, customer: agentSignup) {
    this.return = await this.customersRef
      .doc(key)
      .collection("agents")
      .add({ ...customer })
      .then(function(data) {
        console.log("Agents Written Successfully");
      });
    return true;
  }
  createUserCustomer(user) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`)
    const userData: any = {
      uid: user.uid,
      email: user.email,
      Name :user.Name,
      DOB :user.DOB,
      Phone:user.Phone,
      title:user.title="Mr",
     
    };
    return userRef.set(userData, {
      merge: true,
  
    });
    

  }
}
