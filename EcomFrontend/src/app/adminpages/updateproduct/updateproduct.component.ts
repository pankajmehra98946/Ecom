
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { PostsService } from '../../providers/posts.service';
import { ActivatedRoute, CanActivate, Router, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {
  productId: any;
  product: any;

  constructor(private actRoute: ActivatedRoute,private formBuilder: FormBuilder,private service: PostsService,private router: Router,private toastr: ToastrService) { }
  categories:any;
  formdata:any;
  submitted = false;
  subcategories:any;
  
  ngOnInit() { 
    this.actRoute.paramMap.subscribe(res => {
      this.productId = res.get('id');
      }); 
      this.service.getoneproduct(this.productId).subscribe({
        next: data => {
          this.product=data.data[0];
          this.formdata.get('id').setValue( this.product['id']);
          this.formdata.get('product_name').setValue( this.product['product_name']);
          this.formdata.get('product_discription').setValue( this.product['product_discription']);
          this.formdata.get('product_price').setValue( this.product['product_price']);
          this.formdata.get('product_image').setValue( this.product['product_image']);
          this.formdata.get('product_quantity').setValue( this.product['product_quantity']);
          this.formdata.get('product_category').setValue( this.product['product_category']);
          this.formdata.get('product_subcategory').setValue( this.product['product_subcategory']);
          this.showsubcat(this.product['product_category']);
           
        },
        error: error => {
           
            console.error('There was an error!', error);
        }
    }); 
    
    this.formdata = this.formBuilder.group({
      id: [''],
      product_name: ['', [Validators.required]],
      product_discription: ['', [Validators.required]],
      product_price: ['', [Validators.required]],
      product_image: ['',[Validators.required]],
      product_imagename: [''],
      product_quantity: ['', [Validators.required]],
      product_category: ['', [Validators.required]],
       product_subcategory: ['', [Validators.required]],
     
    });


    this.service.showCategory().subscribe({
      next: data => {
        var dataarry=data.data;
        this.categories =  dataarry.filter((element:any) => {
            return element['parent_id']=="0";
 
        });
         
       
      },
      error: error => {
        this.toastr.error('please enter valid credentials');
          
      }
  });
 } 
 get f() {
  return this.formdata.controls;
  }

  file:any;
  imageSrc:any = '';
  status:boolean = false;
  imagename:any;
  onFileChanged(event:any) {
    this.status = false;
    this.imagename=event.target.files[0].name;
    this.readFile(event).then(data =>{
      this.formdata.get('product_image').setValue(data);
      this.formdata.get('product_imagename').setValue(event.target.files[0].name);
      this.formdata.get('id').setValue(this.productId);
      
    });;
 
  }

   readFile(file:any){
    return new Promise((resolve, reject) => {
      var fr = new FileReader();
      fr.readAsDataURL(file.target.files[0]);  
      fr.onload = () => {
        resolve(fr.result )
      };
    
    });
  }
  onClickSubmit() {
    this.submitted = true;

    const formData= new FormData();

    formData.append('product_image', this.formdata.get('product_image').value);
    formData.append('product_imagename',this.formdata.get('product_imagename').value );
    formData.append('id',this.formdata.get('id').value );
    
   
   // console.log(this.formdata.value);
    this.service.upateProduct(this.formdata.value).subscribe({
      next: data => {
          console.log(data);
       
         // this.router.navigate(['/admindashboard']);
          this.toastr.success('product updated successfully ');
      },
      error: error => {
        this.toastr.error('please enter valid credentials');
          
      }
  });
    }


    //get sub cat
    changeCategory(e:any){
      console.log(e.target.value);
      this.showsubcat(e.target.value);
   

    }

    showsubcat(id:any){
      this.service.showCategory().subscribe({
        next: data => {
  
          var dataarry=data.data;
         
          this.subcategories =  dataarry.filter((element:any) => {
         
              return element['parent_id']==id;
   
          });
          console.log(this.subcategories);
           
         
        },
        error: error => {
          this.toastr.error('please enter valid credentials');
            
        }
        
    });

    }

}
