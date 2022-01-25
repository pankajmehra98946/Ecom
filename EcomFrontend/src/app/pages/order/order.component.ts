import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../providers/posts.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { CanActivate, Router, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var jquery: any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  submitted: boolean=false;
  modalReference: any;

  constructor(private formBuilder: FormBuilder,private service: PostsService,private router: Router,private toastr: ToastrService,private modalService: NgbModal) { }

  product:any;
  show:any=false;
  showReview:any=false;
  closeResult: any;
  productid:any;
  formdata:any;
  userid:any;
  dtOptions: DataTables.Settings = {};
   async ngOnInit() {
    this.formdata = this.formBuilder.group({
      rating: ['', [Validators.required]],
      product_id:[''],
      user_id:[''],
      feedback:['', [Validators.required]],

    });
    var user_id=localStorage.getItem('user_id')
    this.userid=user_id;
    this.formdata.get('user_id').setValue( user_id);
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
     

   var info= await this.service.getorders().subscribe({
      next: data => {
        this.product=data.data;
        this.show=true;
        console.log("order"+ this.product);
          
         
      },
      error: error => {
         
          console.error('There was an error!', error);
      }
  });
  

  }

  open(content:any,id:any) {
    this.productid=id;
    
    this.formdata.get('product_id').setValue( id);
    this.modalReference = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
   this.modalReference.result.then((result:any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason:any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  get f() {
    return this.formdata.controls;
    }
    onClickSubmit() {
      this.submitted = true;
     
      this.service.insertReview(this.formdata.value).subscribe({
        next: data => {
            console.log(data);
           // this.closeResult=`Dismissed ${this.getDismissReason('by pressing ESC')}`;
         //  this.router.navigate(['/index']);
            this.toastr.success('review save successfully ');
            this.modalReference.close();
        },
        error: error => {
          this.toastr.error(error.error.message);
          this.modalReference.close();
            
        }
    });
      }

}
