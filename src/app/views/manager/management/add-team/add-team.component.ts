import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TeamsService } from 'src/app/views/services/teams.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {
  teamForm: any;
  team: any = {};
  submitted = false;

  errorMessage!: string;

  constructor(private fb: FormBuilder, private http: HttpClient,private serv:TeamsService) { }

  ngOnInit() {
    this.teamForm = this.fb.group({
      teamName: ['', Validators.required],
      teamDesc: ['', Validators.required],
      emails: this.fb.array([]),

    });
  }

  get emails(): FormArray {
    return this.teamForm.get('emails') as FormArray;
  }

  addEmail() {
    this.emails.push(this.fb.control('', Validators.email));
  }

  removeEmail(index: number) {
    this.emails.removeAt(index);
  }

  submit() {
    
    this.submitted = true;
    const formData = {
      teamName: this.teamForm.value.teamName,
      emails: this.teamForm.value.emails, // Convert the string of comma-separated emails to an array
      teamDesc: this.teamForm.value.teamDesc
    };
console.log(formData)

      this.serv.createTeam(formData).subscribe(
        (response) => {
          console.log('Activity added successfully!');
          console.log(response)
        },
        (err) => {
          console.log('Error adding Activity:', err.error);
          this.errorMessage = err.error;
        }
      );
    }
  }
