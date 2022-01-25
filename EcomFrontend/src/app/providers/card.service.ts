import { Injectable } from '@angular/core';
import{BehaviorSubject} from 'rxjs';
import { SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private session: SessionStorageService, private toastr: ToastrService) { }
 public cartItemList:any=[]
 public productList:any=[]

//  gettotalitem(){
//   var product= JSON.parse(localStorage.getItem('products')|| '{}');
//   return product.length;
//  }
     getProduct(){
     
      return this.productList;
    }


  // setProduct(product: any) {
  //   this.cartItemList.push(...product);
  //   this.productList.next(product);

  // }
   arr:any=[];
   search(nameKey:any, myArray:any){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].id === nameKey) {
           
            return myArray[i];
        }
    }
}



products:any=[];
// new
addtoCart(product:any) {
 // let products = [];
  if (localStorage.getItem('products')) {
    this.productList = JSON.parse(localStorage.getItem('products')|| '{}'); // get product list 
  } 

     var search= this.search(product.id, this.productList);
      if(!search){
        this.productList.push(product);  
        this.toastr.success('One product added in cart');
      }else{
        this.toastr.warning('product already in cart..');
       
      }
 
  localStorage.setItem('products', JSON.stringify(this.productList)); 
}





  // addtoCart(product:any){
  //   var search= this.search(product.id, this.cartItemList);
  //     if(!search){
  //       this.cartItemList.push(product);
  //       this.toastr.success('One product added in cart');
  //     }else{
  //       this.toastr.warning('product already in cart..');
       
  //     }

  //   this.arr=this.cartItemList;
  //   localStorage.setItem("products", JSON.stringify(this.arr));
  // }

  getTotalPrice(){
    let grandTotal=0;
    var localproduct= JSON.parse(localStorage.getItem('products')|| '{}');
    localproduct.map((a:any)=>{

      grandTotal+=a.total;
    });
   
  }

  removeCartItem(product:any){
    var localproduct= JSON.parse(localStorage.getItem('products')|| '{}');
    localproduct.map((a:any,index:any)=>{
      if(product.id===a.id){
        localproduct.splice(index,1)
        localStorage.setItem("products", JSON.stringify(localproduct));
      }
    })
    this.toastr.success('one product removed from cart');

  }

  removeAllCart(){
    localStorage.removeItem("products");
  }


}
