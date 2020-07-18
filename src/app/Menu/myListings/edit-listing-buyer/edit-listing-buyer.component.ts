import {
  Component,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnInit,
  ValueProvider,
  Inject
} from "@angular/core";
import { AuthService } from "./../../../auth.service";
import { listingBuyer } from "../../../Model/listingBuyer";
import { user } from "../../../Model/user";
import { EditListingBuyerService } from "./edit-listing-buyer.service"
import { AngularFireAuth } from "@angular/fire/auth";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import {
  VERSION,
  MatDialogRef,
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatDialogConfig
} from "@angular/material";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { StateServiceService } from "../../../state-service.service";
import { Observable, onErrorResumeNext } from "rxjs";
import { map, startWith, take, ignoreElements } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Config, HttpService } from "../../../http.service";
declare var $: any;
import { debounceTime } from "rxjs/operators";
import { switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { NgModel } from "@angular/forms";
import { FormArray, FormBuilder } from "@angular/forms";
import {
  NativeDateAdapter,
  DateAdapter,
  MAT_DATE_FORMATS,
} from "@angular/material";
import {
  AppDateAdapter,
  APP_DATE_FORMATS,
} from "./../../../Helper/date.adapter";
import { notification } from '../../../Model/notification';
import {EditDataSubmissionComponent} from './editDataSubmission.component';
import {AltertFormDialogComponent} from '../../../Misc/alertFormdialog/alertFormdialog.component'
@Component({
  selector: 'app-edit-listing-buyer',
  templateUrl: './edit-listing-buyer.component.html',
  styleUrls: ['./edit-listing-buyer.component.css']
})
export class EditListingBuyerComponent implements OnInit {
  public addressianAutoCompleteCurrent$: Observable<any> = null;
  public autoCompleteControlCurrent = new FormControl();
  public addressianAutoCompleteLooking$: Observable<any> = null;
  public autoCompleteControlLooking = new FormControl();
  data: any;
  isLoggedIn: Boolean = false;
  userData: any;
  config: Config;
  listingBuyer: listingBuyer = new listingBuyer();

  notification: notification = new notification()
  buyerUser: user = new user();
  submitted = false;
  DatafieldsService: any;
  financial: any[];
  links = ["First", "Second", "Third"];
  activeLink = this.links[0];
  background = "";
  selectedIndex = 0;
  maxNumberOfTabs = 2;
  isLoading: boolean = false;
  return: any;
  obj: any;
  
  version = VERSION;
  form: FormGroup;
  signatureFormGroup: any;
  myControl = new FormControl();
  result: any;
  interestFormGroup: FormGroup;
  interests: any;
  selected: any;
  $scope: any;
  years: any[];
  selectedYears: any[];
  Condition = new FormControl();
  ConditionsList: string[] = ["Garden", "Driveway", "Period Features", "Garage", "Gated Community", "Loft Conversion", "Conservatory/Sun room", "Granny Annexe", "Rear Extension"];
  registerForm: FormGroup;
  user: any;
  useremail: any;
  DOB: string;
  age: any;
  uid: any;
  Name: any;
  users: any;
  other: boolean = false;
finanacial: boolean = false;
  overlay: boolean = false;
  postcodeCoordinates: any;
  message: string = ""
  cancelButtonText = "Cancel"
  value: Promise<void>;
  name: any;
  email: any;
  password: any;
  passs: any;
  emails: any;
  newUser: boolean = false;
  sub: any;
  radius: any;
  Type: any;
  docid: any;

  toggleBackground() {
    this.background = this.background ? "" : "primary";
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }
  constructor(public authService: AuthService,
    public afs: AngularFirestore, // Inject Firestore service
    private firestore: AngularFirestore,
    public afAuth: AngularFireAuth,
    db: AngularFirestore,
    private EditListingBuyerService: EditListingBuyerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateServiceService,
    private postcodeService: HttpService,
    private formBuilder: FormBuilder,
    public fb: FormBuilder,) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid;


    this.sub = this.route.paramMap.subscribe((params) => {
      this.listingBuyer.Currentpostcode = params.get("Currentpostcode").trim();
      this.listingBuyer.CurrentTown = params.get("CurrentTown").trim();
      this.listingBuyer.CurrentAddress = params.get("CurrentAddress").trim();
      this.listingBuyer.Currentstate = params.get("Currentstate").trim();
      this.listingBuyer.Currentcountry = params.get("Currentcountry").trim();
      this.listingBuyer.Lookingpostcode = params.get("Lookingpostcode").trim();
      this.listingBuyer.LookingStreetname = params.get("LookingStreetname").trim();
      this.listingBuyer.LookingTown = params.get("LookingTown").trim();
      console.log(this.listingBuyer.LookingTown)
      this.listingBuyer.Lookingstate = params.get("Lookingstate").trim(); 
      this.listingBuyer.Country = params.get("Country").trim();
      this.listingBuyer.FinancialPosition = params.get("FinancialPosition").trim();
      this.listingBuyer.SearchRadius = params.get("SearchRadius").trim();
      this.listingBuyer.PropertyType = params.get("PropertyType").trim();
      this.listingBuyer.Roommin = params.get("Roommin").trim()
      this.listingBuyer.Roomsmax = params.get("Roomsmax").trim();
      this.listingBuyer.MinAmount = params.get("MinAmount").trim()
      this.listingBuyer.MaxAmount = params.get("MaxAmount").trim()
      this.listingBuyer.Validity = params.get("Validity").trim();
      this.listingBuyer.Minbathroom = params.get("Minbathroom").trim();
      this.listingBuyer.Maxbathroom = params.get("Maxbathroom").trim();
      this.listingBuyer.Minreception = params.get("Minreception").trim();
      this.listingBuyer.Maxreception = params.get("Maxreception").trim();
      this.listingBuyer.Conditions = params.get("Conditions").trim();
      this.listingBuyer.Ownership = params.get("Ownership").trim();
      this.listingBuyer.features = params.get("features").trim();
      this.docid = params.get("docid").trim();
      console.log(this.listingBuyer.features)

    })
    
    

  


    
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        this.LoggedIn();

      } else {
        localStorage.setItem("user", null);
        this.LoggedOut();
      }
    });

   










































    this.addressianAutoCompleteLooking$ = this.autoCompleteControlLooking.valueChanges.pipe(
      startWith(""),
      // delay emits
      debounceTime(1000),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap((value) => {
        if (value !== "") {
          this.lookup(this.listingBuyer.Lookingpostcode).subscribe((data) => {
            this.data = data;
          });

          return this.lookup(this.listingBuyer.Lookingpostcode);
        } else {
          return of(null);
        }
      })
    );

    // The auto population of github method
    this.addressianAutoCompleteCurrent$ = this.autoCompleteControlCurrent.valueChanges.pipe(
      startWith(""),
      // delay emits
      debounceTime(1000),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap((value) => {
        if (value !== "") {
          this.lookup(this.listingBuyer.Currentpostcode).subscribe((data) => {
            this.data = data;
          });

          return this.lookup(this.listingBuyer.Currentpostcode);
        } else {
          return of(null);
        }
      })
    );


  }
  private LoggedIn() {
    this.isLoggedIn = true;
    //Pre - populate the email field
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid
    this.EditListingBuyerService.getUser(this.uid).subscribe((ref) => {
      ref.forEach((element) => {
        if (element.data().uid == this.uid) {
          this.user.Name = element.data().Name
          this.user.email = element.data().email
          this.user.DOB = element.data().DOB.toDate()
          this.user.Phone = element.data().Phone
          this.user.title = element.data().title
          console.log(this.user.DOB);
        }
      });
    });


  }
  private LoggedOut() {
    this.isLoggedIn = false;
  }

  newCustomer(): void {
    this.submitted = false;
    this.listingBuyer = new listingBuyer();
  }

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);


  firstnameFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(15),
  ]);

  AddressFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(15),

  ]);



  stateFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(15),
  ]);

  postcodeFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(15),
  ]);

  addressnameFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(6),
  ]);
  phoneFormControl = new FormControl("", [
    Validators.required,
    Validators.maxLength(10),
    Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
  ]);
  lookup(value): Observable<any> {
    return this.postcodeService.search(value);
  }

  getPost(value) {
    //this.listingBuyer.CurrentAddress = value.address;
    this.listingBuyer.CurrentTown = value.citytown;
    this.listingBuyer.Currentstate = value.county;
    this.listingBuyer.Currentpostcode = value.postcode;
    console.log(value);
  }

  getPosts(value) {
    //this.listingBuyer.LookingTown = value.citytown;
    this.listingBuyer.Lookingstate = value.county;
    this.listingBuyer.Lookingpostcode = value.postcode;
    this.listingBuyer.LookingStreetname = value.address[2];
    console.log(value);
  }

  selectTab(nextIndex: number, presentIndex: number): void {

    if (presentIndex == 0) {
      if (this.user.Name == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please enter valid fulll name" }
        });
      }

      else if (this.user.email == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please enter valid email" }
        });
      }



      else if (Math.floor(Math.abs(Date.now() - new Date(this.user.DOB).getTime()) / (1000 * 3600 * 24) / 365.25)
        < 18) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Age Must be 18+" }
        });
      }
      else if (this.user.Phone == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please enter valid phone number" }
        });
      }
      else if (this.listingBuyer.ChainStatus == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please fill Listing Buyer" }
        });
      }
      else  if (this.listingBuyer.Currentpostcode == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please fill Current Postcode" }
        });
      }
      else if (this.listingBuyer.CurrentAddress == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please fill Current Address" }
        });
      }
      else if (this.listingBuyer.Currentstate == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please fill Current Sate" }
        });
      }
      else if (this.listingBuyer.CurrentTown == null) {
        const dialogRef = this.dialog.open(AltertFormDialogComponent, {
          data: { message: "Please fill Current Town" }
        });
      }
      else {
        this.userDetail();
        this.selectedIndex = nextIndex;
      }
    }


    else if (presentIndex == 1) {
      if (nextIndex > presentIndex) {
    
        if (this.listingBuyer.Lookingpostcode == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please fill LookingPostcode" }
          });
        }
        else if (this.listingBuyer.LookingStreetname == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please fill LookingStreetname" }
          });
        }
        else if (this.listingBuyer.Lookingstate == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please fill Looking State" }
          });
        }
        else if (this.listingBuyer.FinancialPosition == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please fill Financial Position" }
          });
        }
        else if (this.listingBuyer.SearchRadius == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please fill Select Radius" }
          });
        }
        else if (this.listingBuyer.PropertyType == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Select Property Type" }
          });
        }
        else if (this.listingBuyer.MinAmount == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Select MinAmount" }
          });
        }
        else if (this.listingBuyer.MaxAmount == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Select MaxAmount" }
          });
        }
        else if (this.listingBuyer.Validity == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please Select Validity" }
          });
        }
        else {
          this.selectedIndex = nextIndex;
        }
      } else {
        this.selectedIndex = nextIndex;
      }
    } else if (presentIndex == 2) {
      if (nextIndex > presentIndex) {
        if (
          this.listingBuyer.Type == null ||
          this.listingBuyer.Position == null ||
          this.listingBuyer.otherInfo == null
        ) {
          this.openAlertDialog();
        } else {
          this.onSubmit();
        }
      } else {
        this.selectedIndex = nextIndex;
      }
    }
  }

  onSubmit() {
    this.isLoading = true;
    this.return = this.EditListingBuyerService.createCustomer(this.uid,this.docid,this.listingBuyer).then(data => {
         this.isLoading = false
         const dialogRef = this.dialog.open(
          EditDataSubmissionComponent,
          {
            data: {
              message: "HelloWorld",
              buttonText: {
                cancel: "Done"
              }
            }
          }
        );

      });
  
    
  }

  userDetail() {

    this.return = this.EditListingBuyerService.createUserCustomer(this.user)
      .then(data => {
     
      });
  }
  otherOption() {
    this.other = false
  }
  otherChain() {
    this.other = true
  }
  financialPostion() {
    this.finanacial = true
  }
  removefinancialPostion() {
    this.finanacial = false
  }
  // submitForm() {
  //   // //Lookup Declared Function
  //   this.postcodeService
  //     .getLat(this.listingBuyer.Lookingpostcode)
  //     .subscribe(data => {
  //       this.postcodeCoordinates = data;
  //       (this.listingBuyer.longitude = this.postcodeCoordinates.result.longitude),
  //         (this.listingBuyer.latitude = this.postcodeCoordinates.result.latitude),
  //         (this.listingBuyer.UserId = this.userData.uid),

  //         this.return = this.EditListingBuyerService
  //           .createCustomer(this.userData.uid, this.listingBuyer)
  //           .then(data => {
  //             if (data == true) {
  //             }
  //           });
  //     });



  //   this.listingBuyer.UserId = this.userData.uid;
  //   this.isLoading = true;
  //   this.return = this.EditListingBuyerService
  //     .createCustomer(this.userData.uid, this.listingBuyer)
  //     .then(data => {
  //       if (data == true) {
  //         this.isLoading = false;


  //       }
  //     });

  // }

  //Login Form


  facebookLogin() {
    this.isLoading = true;

    this.authService.FacebookAuth().then((data) => {
      this.isLoading = false;
    });
  }

  //SignIn Google
  googleLogin() {
    this.isLoading = true;
    this.authService.GoogleAuth().then((data) => {
      this.isLoading = false;
    });
  }

  //Signup Google
  googleSignup() {
    this.isLoading = true;
    this.authService.GoogleAuthSignup().then((data) => {
      this.isLoading = false;
    });
  }

  signIn(email, pass) {
    console.log(email + pass);
    this.isLoading = true;
    this.authService.SignIn(email, pass).then((data) => {
      this.isLoading = false;
    });
  }

  NewUser() {
    this.newUser = true;
  }

  OldUser() {
    this.newUser = false;
  }
  close() {
    this.newUser = false;
    this.newUser = false;
  }

  signUp(displayName, email, pass) {
    this.authService.SignUp(email, pass).then((data) => {
      this.isLoading = false;
      this.user.Name = displayName;
      this.user.DOB = null;
      this.user.Phone = null;
      this.return = this.EditListingBuyerService.createUserCustomer(this.user).then(
        (user) => {
          if (this.user != null) {
            this.isLoading = false;
            this.overlay = true;
          }
        }
      );
    });
  }

  userNew() {
    this.user.DOB = null;
    this.user.Phone = null;
    this.user.name;
    this.return = this.EditListingBuyerService.createUserCustomer(this.user).then(
      (data) => {
        console.log(data);
      }
    );
  }
  continueClose() {
    this.overlay = false;
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.signUp(this.name, this.email, this.password);
    }
  }

  saves() {

    this.signIn(this.emails, this.passs);

  }
  openAlertDialog() {
    const dialogRef = this.dialog.open(AltertFormDialogComponent, {

      data: {
        message: "Please Fill form  fields before proceeding",
      },
    });
  }

}
