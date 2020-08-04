import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavigationBarComponent } from "./Menu/navigationBar/navigationBar.component";
import { FooterComponent } from "./Misc/Footer/Footer.component";
import { HomeComponent } from "./Home/Home.component";
import { PropertyComponent } from "./Home/Property/Property.component";
import { FillFormBuyerComponent } from "./Home/Property/fillFormBuyer/fillFormBuyer.component";
import { BuyerMatcheListingComponent } from "./Home/Property/fillFormBuyer/confirmBuyerDetail/buyerMatchListing/buyerMatchListing.component";
import { SellerSelectedPropertyComponent } from "./Home/Property/fillFormSeller/confirmSellerDetail/sellerMatchListing/sellerSelectedPropertyDetail/sellerSelectedPropertyDetail.component";
import { ConfirmSellerDetailComponent } from "./Home/Property/fillFormSeller/confirmSellerDetail/confirmSellerDetail.component";
import { FillFormSellerComponent } from "./Home/Property/fillFormSeller/fillFormSeller.component";
import { SellerMatchListingComponent } from "./Home/Property/fillFormSeller/confirmSellerDetail/sellerMatchListing/sellerMatchListing.component";
import { ConfirmBuyerDetailComponent } from "./Home/Property/fillFormBuyer/confirmBuyerDetail/confirmBuyerDetail.component";
import { MyProfileComponent } from "./Menu/myProfile/Profile.component";
import { EditProfileComponent } from "./Menu/myProfile/editProfile/editProfile.component";
import { BuyerSelectedPropertyDetailComponent } from "./Home/Property/fillFormBuyer/confirmBuyerDetail/buyerMatchListing/buyerSelectedPropertyDetail/buyerSelectedPropertyDetail.component";
import { MyListingComponent } from "./Menu/myListings/myListing.component";
import { PrefrencesComponent } from "./Menu/Prefrences/Prefrences.component";
import { ChatsComponent } from "./Menu/Chats/chats.component";
import { AuthService } from "./auth.service";
import { AngularFireDatabaseModule } from "@angular/fire/database";

// Firebase modules
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "../environments/environment";
import { DashboardComponent } from "./Misc/components/dashboard/dashboard.component";
import { SignInComponent } from "./Misc/components/sign-in/sign-in.component";
import { ForgotPasswordComponent } from "./Misc/components/forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./Misc/components/verify-email/verify-email.component";
import { FirestoreSettingsToken } from "@angular/fire/firestore";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { A11yModule } from "@angular/cdk/a11y";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { AlertDialogComponent } from "./Home/Property/fillFormSeller/confirmSellerDetail/alertDialogSellerDataSubmission.component";
import { MaterialModule } from "././Misc/material";
import { AlertDialogBuyerDataSubmissionComponent } from "./Home/Property/fillFormBuyer/confirmBuyerDetail/alertDialogBuyerDataSubmission.component";
import { HttpClientModule } from "@angular/common/http";
import { SelectedPropertyDialogComponent } from "./Misc/selectedPropertyDialog/selectedPropertyDialog.component";
import { MyMatchesComponent } from "./Menu/myMatches/myMatches.component";
import { AltertFormDialogComponent } from "./Misc/alertFormdialog/alertFormdialog.component";
import { AgentSignupComponent } from "./Home/agent-signup/agent-signup.component";

import { TemplateComponent } from "./template/template.component";
import { PrivacyPolicyComponent } from "./Misc/privacy-policy/privacy-policy.component";
import { NotificationComponent } from "./Menu/notification/notification.component";
import { PlusComponent } from "./Menu/plus/plus.component";
import { ShortNamePipe } from './short-name.pipe';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { SelectAgentComponent } from './Menu/myMatches/select-agent/select-agent.component';
import { AgentsignupformComponent } from './Home/agentsignupform/agentsignupform.component';
import { AlertDialogAgentComponent } from'./Home/agentsignupform/alertDialogagent.component';
import { ListingPropertyDetailComponent } from './Menu/myListings/listing-property-detail/listing-property-detail.component';
import { ListingSellingPropertyDetailComponent } from './Menu/myListings/listing-selling-property-detail/listing-selling-property-detail.component';
import {EdiProfileComponent }  from "./Menu/myProfile/editProfile/ediProfileSubmission.component";
import { CookiesComponent } from './Misc/cookies/cookies.component';
import {BuyerAwaitingDetailComponent} from './Menu/myMatches/buyerAwaitingDetail/buyerAwaitingDetail.component'

import { EditListingBuyerComponent } from './Menu/myListings/edit-listing-buyer/edit-listing-buyer.component';
import { EditListingSellerComponent } from './Menu/myListings/edit-listing-seller/edit-listing-seller.component'
import {EditDataSubmissionComponent} from './Menu/myListings/edit-listing-buyer/editDataSubmission.component'
import {EditSellerSubmissionComponent} from'./Menu/myListings/edit-listing-seller/editSellerSubmission.component';
import { PropertyMatchesComponent } from './property-matches/property-matches.component';
import { MatchesBuyerComponent } from './Menu/myMatches/matches-buyer/matches-buyer.component';
import { SellerMatchesComponent } from './Menu/myMatches/seller-matches/seller-matches.component';
import {MyMatchesToSellSelectedDetailComponent}  from "./Menu/myMatches/my-matches-to-sell-selected-detail/my-matches-to-sell-selected-detail.component"
import { from } from 'rxjs';
import { NestimatesHomeComponent } from './Home/nestimates-home/nestimates-home.component';
import {DeleteDataComponent} from "./Menu/myListings/deleteData.component";
import { HomeMatchesComponent } from './Home/home-matches/home-matches.component';
import { PriceMatchesComponent } from './Potential/price-matches/price-matches.component';
import { AgenthomeComponent } from './agenthome/agenthome.component';
import { SelecteddetailareaComponent } from './agenthome/selecteddetailarea/selecteddetailarea.component';
import { EditDetailsComponent } from './agenthome/edit-details/edit-details.component';
import { SelecteddetailsellerComponent } from './agenthome/selecteddetailseller/selecteddetailseller.component';
import { ClickhomeComponent } from './Home/clickhome/clickhome.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    FooterComponent,
    HomeComponent,
    PropertyComponent,
    FillFormBuyerComponent,
    BuyerMatcheListingComponent,
    SellerSelectedPropertyComponent,
    ConfirmSellerDetailComponent,
    FillFormSellerComponent,
    SellerMatchListingComponent,
    ConfirmBuyerDetailComponent,
    EditProfileComponent,
    MyProfileComponent,
    BuyerSelectedPropertyDetailComponent,
    MyListingComponent,
    EdiProfileComponent,
    PrefrencesComponent,
    ChatsComponent,
    DashboardComponent,
    SignInComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    AlertDialogComponent,
    AlertDialogBuyerDataSubmissionComponent,
    AlertDialogAgentComponent,
    SelectedPropertyDialogComponent,
    MyMatchesComponent,
    AltertFormDialogComponent,
    MyMatchesToSellSelectedDetailComponent,
    AgentSignupComponent,
  
    TemplateComponent,
    PrivacyPolicyComponent,
    NotificationComponent,
    PlusComponent,
 
    ShortNamePipe,
    TermsConditionComponent,
    SelectAgentComponent,
    AgentsignupformComponent,
    ListingPropertyDetailComponent,
    ListingSellingPropertyDetailComponent,
    CookiesComponent,
    BuyerAwaitingDetailComponent,
    EditListingBuyerComponent,
    EditListingSellerComponent,
    EditDataSubmissionComponent,
    EditSellerSubmissionComponent,
    DeleteDataComponent,
    PropertyMatchesComponent,
    MatchesBuyerComponent,
    SellerMatchesComponent,
    NestimatesHomeComponent,
    HomeMatchesComponent,
    PriceMatchesComponent,
    AgenthomeComponent,
    SelecteddetailareaComponent,
    EditDetailsComponent,
    SelecteddetailsellerComponent,
    ClickhomeComponent,
    

  
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "street"),
    AngularFirestoreModule, // Only required for database features
    AngularFireAuthModule, // Only required for auth features,
    AngularFireStorageModule, // Only required for storage features
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatTabsModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  entryComponents: [
    AlertDialogComponent,
    AlertDialogBuyerDataSubmissionComponent,
    SelectedPropertyDialogComponent,
    AltertFormDialogComponent,
    AlertDialogAgentComponent,
    EdiProfileComponent,
    EditDataSubmissionComponent,
    EditSellerSubmissionComponent,
    DeleteDataComponent
  ],
  providers: [AuthService, { provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent],
})
export class AppModule {}
