import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/views/services/data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit{
  submitted = false;
  selectedFile!: File;
  public errorMessage: string = '';

  formLogin !:FormGroup
  // formlogin essem samitou tasmya
  
    constructor(private fb:FormBuilder,private asd:DataService,private router: Router) { }
  
    ngOnInit(): void {
      this.formLogin = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, this.emailValidator]],
        phoneNumber: ['', [Validators.required, Validators.pattern('^\\d{8}$')]],
        password: ['', Validators.required],
        userLastName: ['', Validators.required],
        roleName: ['', Validators.required],
        titre: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        profilePicture: ['']
      }, { validator: this.ConfirmedValidator('password', 'confirmPassword') });

    
    }
    emailValidator(control: AbstractControl): {[key: string]: boolean} | null {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const valid = emailRegex.test(control.value);
      return valid ? null : { invalidEmail: true };
    }
    
 
    ConfirmedValidator(controlPassword: string, matchingControlPassword: string){
      return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlPassword];
        const matchingControl = formGroup.controls[matchingControlPassword];
        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
        } else {
          matchingControl.setErrors(null);
        }
      }
    }
    onFileSelected(event: any) {
      this.selectedFile = <File>event.target.files[0];
    }
    onclickForm() {
      this.submitted = true;
  
      if (this.formLogin.invalid) {
        return;
      }
  
      const formData = new FormData();
  
      formData.append('username', this.formLogin.get('username')!.value);
      formData.append('email', this.formLogin.get('email')!.value);
      formData.append('phoneNumber', this.formLogin.get('phoneNumber')!.value);
      formData.append('password', this.formLogin.get('password')!.value);
      formData.append('userLastName', this.formLogin.get('userLastName')!.value);
      formData.append('roleName', this.formLogin.get('roleName')!.value);
      formData.append('titre', this.formLogin.get('titre')!.value);
      formData.append('confirmPassword', this.formLogin.get('confirmPassword')!.value);
      formData.append('profilePicture', this.selectedFile);
      console.log(this.formLogin)

      this.asd.adduser(formData).subscribe(
        (response) => {
          console.log(response);
          // faire quelque chose avec la réponse du service
          this.router.navigate(['/users']);
        },
        (error) => {
          console.error(error);
          console.log(formData)
          if (error.error && error.error.token) {
            this.errorMessage = error.error.token;
          } else {
            this.errorMessage = 'An error occurred while uploading the file.';
          }        }
        
      );
    }
    
    }

