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
import { FormsService } from "./fillFormBuyer.service";
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
import { AltertFormDialogComponent } from "../../../Misc/alertFormdialog/alertFormdialog.component";
import { AlertDialogBuyerDataSubmissionComponent } from './alertDialogBuyerDataSubmission.component'
import { notification } from '../../../Model/notification'
@Component({
  selector: "app-fillFormBuyer",
  templateUrl: "./fillFormBuyer.component.html",
  styleUrls: ["./fillFormBuyer.component.css"],
  providers: [
    {
      provide: DateAdapter,
      useClass: AppDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: APP_DATE_FORMATS,
    },
  ],
})
export class FillFormBuyerComponent implements OnInit {
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
  Cpostcode: string;
  Ctown: any;
  Cstate: string;
  Ccountry: any;
  Lpostcode: string;
  Lstreetname: string;
  Ltown: any;
  Lstate: any;
  Lcountry: string;
  Financial: any;
  radius: any;
  Type: any;
  Minroom: any;
  Maxroom: string;
  AmountMin: string;
  amountmax: any;
  offer: any;
  bathroommin: string;
  bathroommax: string;
  receptionmin: string;
  receptionmax: string;
  condition: string;
  ownership: string;
  Caddress: any;
  toggleBackground() {
    this.background = this.background ? "" : "primary";
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }

  constructor(
    public authService: AuthService,
    public afs: AngularFirestore, // Inject Firestore service
    private fillFormsService: FormsService,
    private firestore: AngularFirestore,
    public afAuth: AngularFireAuth,
    db: AngularFirestore,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private stateService: StateServiceService,
    private postcodeService: HttpService,
    private formBuilder: FormBuilder,
    public fb: FormBuilder,
  ) {
  }

  ngOnInit() {
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

    this.sub = this.route.paramMap.subscribe((params) => {
      this.Cpostcode = params.get("Currentpostcode");
      this.Ctown = params.get("CurrentTown");
      this.Cstate = params.get("Currentstate");
      this.Ccountry = params.get("Currentcountry");
      this.Lpostcode = params.get("Lookingpostcode");
      this.Lstreetname = params.get("LookingStreetname");
    this.Ltown = params.get("LookingTown");
      this.Lstate = params.get("Lookingstate");
      this.Lcountry = params.get("Country");
      this.Financial = params.get("FinancialPosition");
      this.radius = params.get("SearchRadius");
      this.Type = params.get("PropertyType");
      this.Minroom = params.get("Roommin");
      this.Maxroom = params.get("Roomsmax");
      this.AmountMin = params.get("MinAmount");
      this.amountmax = params.get("MaxAmount");
      this.offer = params.get("Validity");
      this.bathroommin = params.get("Minbathroom");
      this.bathroommax = params.get("Maxbathroom");
      this.receptionmin = params.get("Minreception");
      this.receptionmax = params.get("Maxreception");
      this.condition = params.get("Conditions");
      this.ownership = params.get("Ownership");
      this.Caddress = params.get("CurrentAddress");
      

    });

    if (this.Cpostcode != ":Currentpostcode") {
      this.listingBuyer.Currentpostcode = this.Cpostcode
    }

    if (this.Ctown != ":CurrentTown") {
      this.listingBuyer.CurrentTown = this.Ctown
    }
    if (this.Cstate != ":Currentstate") {
      this.listingBuyer.Currentstate = this.Cstate
    }
    if (this.Ccountry != ":Currentcountry") {
      this.listingBuyer.Currentcountry = this.Ccountry
    }
    if (this.Lpostcode != ":Lookingpostcode") {
      this.listingBuyer.Lookingpostcode = this.Lpostcode
    }
    if (this.Lstreetname != ":LookingStreetname") {
      this.listingBuyer.LookingStreetname = this.Lstreetname
    }
  
    if (this.Ltown != ":LookingTown") {
      this.listingBuyer.LookingTown =  this.Ltown
    }
  
    if (this.Lstate != ":Lookingstate") {
      this.listingBuyer.Lookingstate = this.Lstate
    }
    if (this.Lcountry != ":Country") {
      this.listingBuyer.Country = this.Lcountry
    }

    if (this.Financial != ":FinancialPosition") {
      this.listingBuyer.FinancialPosition = this.Financial
    }
    if (this.radius != ":SearchRadius") {
      this.listingBuyer.SearchRadius = this.radius
    }
    if (this.Type != ":PropertyType") {
      this.listingBuyer.PropertyType = this.Type
    }
    if (this.Minroom != ":Roommin") {
      this.listingBuyer.Roommin = this.Minroom
    }
    if (this.Maxroom != ":Roomsmax") {
      this.listingBuyer.Roomsmax = this.Maxroom
    }
    if (this.AmountMin != ":MinAmount") {
      this.listingBuyer.MinAmount = this.AmountMin
    }
    if (this.amountmax != ":MaxAmount") {
      this.listingBuyer.MaxAmount = this.amountmax
    }
    if (this.offer != ":Validity") {
      this.listingBuyer.Validity = this.offer
    }
   
        this.listingBuyer.Minbathroom = this.bathroommin

   
      this.listingBuyer.Maxbathroom = this.bathroommax
    
   
      this.listingBuyer.Minreception = this.receptionmin
    
    
      this.listingBuyer.Maxreception = this.receptionmax
    
   
      this.listingBuyer.Conditions = this.condition
    
   
      this.listingBuyer.Ownership = this.ownership
    
    if (this.Caddress != ":CurrentAddress") {
      this.listingBuyer.CurrentAddress = this.Caddress
    }
    // if(this.Ltown !=":LookingTown")
    // {
    //   this.listingBuyer.LookingTown = this.Ltown
    // }

  }

  private LoggedIn() {
    this.isLoggedIn = true;
    //Pre - populate the email field
    this.user = JSON.parse(localStorage.getItem("user"));
    this.uid = this.user.uid
    this.fillFormsService.getUser(this.uid).subscribe((ref) => {
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
    this.listingBuyer.CurrentAddress = value.address;
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

        else if (this.listingBuyer.LookingTown == null) {
          const dialogRef = this.dialog.open(AltertFormDialogComponent, {
            data: { message: "Please fill LookingTown" }
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
  openAlertDialog() {
    const dialogRef = this.dialog.open(AltertFormDialogComponent, {

      data: {
        message: "Please Fill form  fields before proceeding",
      },
    });
  }

  onSubmit() {
    this.stateService.listingBuyer = this.listingBuyer;
    this.router.navigate(["confirmbuyerdetail"]);
  }

  userDetail() {
    console.log(this.user)
    this.return = this.fillFormsService.createUserCustomer(this.user)
      .then(data => {
        console.log(this.user);
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
  submitForm() {
    // //Lookup Declared Function
    this.postcodeService
      .getLat(this.listingBuyer.Lookingpostcode)
      .subscribe(data => {
        this.postcodeCoordinates = data;
        (this.listingBuyer.longitude = this.postcodeCoordinates.result.longitude),
          (this.listingBuyer.latitude = this.postcodeCoordinates.result.latitude),
          (this.listingBuyer.UserId = this.userData.uid),

          this.return = this.fillFormsService
            .createCustomer(this.userData.uid, this.listingBuyer)
            .then(data => {
              if (data == true) {
              }
            });
      });

    this.listingBuyer.UserId = this.userData.uid;
    this.isLoading = true;
    this.return = this.fillFormsService
      .createCustomer(this.userData.uid, this.listingBuyer)
      .then(data => {
        if (data == true) {
          this.isLoading = false;

          const dialogRef = this.dialog.open(
            AlertDialogBuyerDataSubmissionComponent,
            {
              data: {

              }
            }
          );
        }
      });

  }

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
      this.return = this.fillFormsService.createUserCustomer(this.user).then(
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
    this.return = this.fillFormsService.createUserCustomer(this.user).then(
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

  check()
  {
    console.log(this.listingBuyer.LookingTown)
  }
}



