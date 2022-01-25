import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/providers/posts.service';
import { CanActivate, Router, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  totalItem:any=0;
  productId: any;
  formdata: any;
  submitted: boolean=false;
  constructor(private actRoute: ActivatedRoute,private formBuilder: FormBuilder,private service: PostsService,private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(res => {
      this.productId = res.get('id');
      });  

    this.formdata = this.formBuilder.group({
      password: ['', [Validators.required]],
      id: [''],
      
     
    });
    this.formdata.get('id').setValue(this.productId);
  }
  get f() {
    return this.formdata.controls;
    }
  
    onClickSubmit() {
      this.submitted = true;

      const formData= new FormData();

      formData.append('id', this.formdata.get('id').value);
     
    console.log(this.formdata.value);
  
      this.service.updatePassword(this.formdata.value).subscribe({
        next: data => {

            this.router.navigate(['/login']);
            this.toastr.success('password updated successfully ');
          
        },
        error: error => {
         
          this.toastr.error("token expired");
        }
    });
      }

}
