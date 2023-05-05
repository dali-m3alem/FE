import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import { TasksService } from 'src/app/views/services/tasks.service';
import { AuthadminService } from 'src/app/views/services/authadmin.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;
  task: any = {};
  submitted = false;
  constructor(private fb: FormBuilder, private serv: TasksService,private auth:AuthadminService) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      activity: [1, Validators.required],
      email: ['', Validators.required],
      createdBy: ['', Validators.required],
      dueDate: ['', Validators.required],
      manager: [0, Validators.required],

    });
  }

  submit() {
    const user = this.auth.getUser();
    const name = this.auth. getUsername()
    this.submitted = true;
    const  task = this.taskForm.value;
    task.createdBy=name
    task.manager=user;
    console.log(task)
    this.serv.createTasks(task).subscribe(
        res => {
          console.log('Task added successfully!');
        },
        err => {
          console.log('Error adding task:', err);
        }
      );
    }
  
}