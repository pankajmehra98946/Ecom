import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnersAngularModule } from 'spinners-angular';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistationComponent } from './pages/registation/registation.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';

import { IndexComponent } from './pages/index/index.component';
import { ProductdetailsComponent } from './pages/productdetails/productdetails.component';
import { ShoppingcardComponent } from './pages/shoppingcard/shoppingcard.component';
import { FormsModule } from '@angular/forms'
import { HeaderComponent } from './pages/header/header.component';
import { AdminloginComponent } from './adminpages/adminlogin/adminlogin.component';
import { AdmindashboardComponent } from './adminpages/admindashboard/admindashboard.component';
import { AddproductComponent } from './adminpages/addproduct/addproduct.component';
import { AddcategoryComponent } from './adminpages/addcategory/addcategory.component';
import { AddsubcategoryComponent } from './adminpages/addsubcategory/addsubcategory.component';
import { OrderComponent } from './pages/order/order.component';
import { ProductsComponent } from './adminpages/products/products.component';
import { SubheaderComponent } from './pages/subheader/subheader.component';
import { UpdateproductComponent } from './adminpages/updateproduct/updateproduct.component';
import { ShowusersComponent } from './adminpages/showusers/showusers.component';
import { ShowordersComponent } from './adminpages/showorders/showorders.component';
import { DataTablesModule } from 'angular-datatables';
import { AddnestedcategoryComponent } from './adminpages/addnestedcategory/addnestedcategory.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { AddcouponComponent } from './adminpages/addcoupon/addcoupon.component';
import { ShowcouponComponent } from './adminpages/showcoupon/showcoupon.component';
import { EditcouponComponent } from './adminpages/editcoupon/editcoupon.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    RegistationComponent,
    LoginComponent,
    HomeComponent,
   
    IndexComponent,
    ProductdetailsComponent,
    ShoppingcardComponent,
    
    HeaderComponent,
    AdminloginComponent,
    AdmindashboardComponent,
    AddproductComponent,
    AddcategoryComponent,
    AddsubcategoryComponent,
    OrderComponent,
    ProductsComponent,
    SubheaderComponent,
    UpdateproductComponent,
    ShowusersComponent,
    ShowordersComponent,
    AddnestedcategoryComponent,
    ForgetPasswordComponent,
    ChangepasswordComponent,
    AddcouponComponent,
    ShowcouponComponent,
    EditcouponComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule ,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    SpinnersAngularModule ,
     NgxSpinnerModule,
     DataTablesModule,
     NgbModule,
     TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
