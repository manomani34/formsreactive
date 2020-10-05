import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male' , 'female'];
  inputForm: FormGroup; 
  banedEmails = ['ali@g.com' , 'a@a.com'];

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      'username' : new FormControl(null, Validators.required , this.bannedusername),
      'email' : new FormControl(null,  [Validators.required , Validators.email , this.bannedEmailCheck.bind(this)]),
      'gender' : new FormControl('male')
    });

    //get All of Value of controls in Form
    // this.inputForm.valueChanges.subscribe(
    //   (value) =>{
    //     console.log(value);
    //   }
    // );

    //validate All of Form
    this.inputForm.statusChanges.subscribe(
      (status) =>{
        console.log(status);
      }
    );

    //fill all of form
    this.inputForm.setValue({
      'username' : 'iuiui',
      'email' : 'g@c.com',
      'gender' : 'female'
    });

    //fill all of form
    this.inputForm.patchValue({
      'username' : 'iuiui'
    });
  }

  onSubmit(){
    console.log(this.inputForm)
  }

  // custom validator
  bannedEmailCheck(control: FormControl): {[e: string]: boolean} {
    if(this.banedEmails.indexOf(control.value) !== -1){
      return{'isBnnedEmail': true};
    }
  }

  bannedusername(control: FormControl): Promise<any> | Observable<any>{
    const promis = new Promise<any> ((resolve , rejects) => {
      setTimeout(() => {   
        if(control.value === 'foad'){
          resolve({'usernameisbanned' : true});
        }
        else{
          resolve(null);
        }
      }, 2000);
    });
    return promis;
  }
  

}
