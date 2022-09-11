import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { ClientModel } from './contact-form.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  ClientValue!:FormGroup;

  ClientModelObj : ClientModel = new ClientModel();

  ClientList !: any;

  showUpdate !: boolean;

  showSend !: boolean;

  constructor( private formBuilder : FormBuilder, private api: ApiService) { }

  ngOnInit(): void {

    this.ClientValue = this.formBuilder.group({
      fileImg : [''],
      name : [''],
      email : [''],
      address : [''],
      pinCode : [''] 
    })

    this.getmethod();
    this.showSend = true;

  }

  Postmethod(){
    this.ClientModelObj.fileImg = this.ClientValue.value.fileImg;
    this.ClientModelObj.name = this.ClientValue.value.name;
    this.ClientModelObj.email = this.ClientValue.value.email;
    this.ClientModelObj.address = this.ClientValue.value.address;
    this.ClientModelObj.pinCode = this.ClientValue.value.pinCode;

    this.api.PostData(this.ClientModelObj).subscribe( res=>{
      console.log(res);
      alert("Data Send Successfully !");
      this.ClientValue.reset();
      return this.getmethod();
    },
    err=>{
      alert("Something went wrong !");
    }
    )
  }

  getmethod(){

    this.api.getData().subscribe(res=>{
        this.ClientList = res;
    })

  }

  EditMethod(row: any){
    this.showUpdate = true;
    this.showSend = false;
    this.ClientModelObj.id = row.id;
    this.ClientValue.controls['name'].setValue(row.name);
    this.ClientValue.controls['email'].setValue(row.email);
    this.ClientValue.controls['address'].setValue(row.address);
    this.ClientValue.controls['pinCode'].setValue(row.pinCode);
  }

  updateStudent(){
    this.ClientModelObj.name = this.ClientValue.value.name;
    this.ClientModelObj.email = this.ClientValue.value.email;
    this.ClientModelObj.address = this.ClientValue.value.address;
    this.ClientModelObj.pinCode = this.ClientValue.value.pinCode;

    this.api.updateData(this.ClientModelObj, this.ClientModelObj.id).subscribe(res=>{
      alert('data updated Successful !');
      this.ClientValue.reset();
      return this.getmethod();
      
    },
    
    err=>{
      alert('something went wrong !');
    }

    )
    
    this.showUpdate = false;
    this.showSend = true;

  }

  deleteData( row : any){

    this.api.deleteData(row.id).subscribe(res=>{
      alert('This recod deleted !');
      this.getmethod();
    },
    err=>{
      alert('Something went wrong !');
    }
    )

  }

}
