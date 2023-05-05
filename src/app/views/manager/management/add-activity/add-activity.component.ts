import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import { ActivitiesService } from 'src/app/views/services/activities.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
export class AddActivityComponent implements OnInit {
  activityForm!: FormGroup;
  activity: any = {};
  errorMessage!: string;

  constructor(private fb: FormBuilder, private http: HttpClient,private serv:ActivitiesService) { }

  ngOnInit() {
    this.activityForm = this.fb.group({
      activityName: ['', Validators.required],
      descriptionA: ['', Validators.required],
      objectiveA: ['', Validators.required],
      durationA: ['', Validators.required],
      deadlineA: ['', Validators.required],
      teamId: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      projectId: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],

    });
  }
 
  submitted = false;


  submit() {
    this.submitted = true;
    const formData = this.activityForm.value;
console.log(formData)
      this.serv.createActivity(formData).subscribe(
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