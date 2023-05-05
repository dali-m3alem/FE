import { Component, OnInit } from '@angular/core';
import { Board } from './board';
import { Column } from './column';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TasksService } from 'src/app/views/services/tasks.service';
import { AuthadminService } from 'src/app/views/services/authadmin.service';

export interface Task {
  id: number;
  title: string;
  status: string;
  description:string;
  dueDate:string;
  activity: {
    id: number;
    activityName: string;
    descriptionA: string;
    objectiveA: string;
    durationA: string;
    deadlineA: string;
    project: any;
    team: any;
  }
  manager:{
    id:number;
    email:string;
  }
}
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit{
  constructor(private taskService :TasksService, private auth: AuthadminService){}
  showOverlay=false;
  showPopup: boolean = false;
  
  togglePopup(): void {
    this.showPopup = !this.showPopup;
    this.showOverlay = !this.showOverlay;
  }

  board: Board = new Board('Test Board', [
    new Column('Todo', [
     
    ]),
    new Column('Ideas', [
      
    ]),
    new Column('review', [
     
    ]),
    
    new Column('done', [
     
    ])
  ]);

  ngOnInit() {
    this.getTasksByUserId();
  }
  userId=this.auth.getUser();
  getTasksByUserId() {
    this.taskService.getTasksByUserId(this.userId)
      .subscribe(
        (data: Task[]) => {
          const boardData: Board = new Board('Test Board', [
            new Column('Todo', []),
            new Column('In progress', []),
            new Column('review', []),
            new Column('done', [])
          ]);
  
          data.forEach((task: Task) => {
            if (task.status === 'todo') {
              boardData.columns[0].tasks.push(task);
            } else if (task.status === 'inprogress') {
              boardData.columns[1].tasks.push(task);
            } else if (task.status === 'review') {
              boardData.columns[2].tasks.push(task);
            } else if (task.status === 'done'){
              boardData.columns[3].tasks.push(task);
            }          console.log(task)

          });
          this.board = boardData; // assign boardData to the board property
        },
        error => {
          console.error(error);
        }
      );
  }
  
  
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.item.data as Task;
      console.log(task)
      if (task) { // check if task is defined
        const column = this.getColumnForContainer(event.container);
        console.log('Column:', column);
  
        if ((column) && task) { // check if both column and task are defined
          task.status = this.getStatusForColumn(column);
  
          const taskStatus: Task = {
            id: task.id,
            status: task.status,
            title: '',
            description: '',
            activity: {
              id: 0,
              activityName: '',
              descriptionA: '',
              objectiveA: '',
              durationA: '',
              deadlineA: '',
              project: undefined,
              team: undefined
            },
            dueDate: '',
            manager: {
              id: 0,
              email: ''
            }
          };
          this.taskService.updateTask(taskStatus).subscribe(
            (data) => {
              console.log('Task status updated successfully');
            },
            error => {
              console.error('Error updating task status:', error);
            }
          );
        } else {
          console.error('Invalid column or task: undefined');
        }
      } else {
        console.error('Invalid task: undefined');
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  
  getColumnForContainer(container: CdkDropList): Column | undefined {
    for (const column of this.board.columns) {
      if (column.tasks === container.data) {
        return column;
      }
    }
    return undefined;
  }
  
  getStatusForColumn(column: Column): string {
    switch (column.name) {
      case 'Todo':
        return 'todo';
      case 'In progress':
        return 'inprogress';
      case 'review':
        return 'review';
      case 'done':
        return 'done';
      default:
        console.log('Column:', column);
        return '';
    }
  }
  taskStatus: Task = {
    id: 0,
    status: '',
    title: '',
    description: '',
    activity: {
      id: 0,
      activityName: '',
      descriptionA: '',
      objectiveA: '',
      durationA: '',
      deadlineA: '',
      project: undefined,
      team: undefined
    },
    dueDate:'',
    manager: {
      id: 0,
      email: ''
    }
  };
  
  get(task: Task) {
    this.taskStatus = {
      id: task.id,
      title: task.title,
      status: task.status,
      description: task.description,
      dueDate:task.dueDate      ,
      activity: {
        id: task.activity.id,
        activityName: task.activity.activityName,
        descriptionA: task.activity.descriptionA,
        objectiveA: task.activity.objectiveA,
        durationA: task.activity.durationA,
        deadlineA: task.activity.deadlineA,
        project: task.activity.project,
        team: task.activity.team
      },
      manager:{
        id:task.manager.id,
        email:task.manager.email
      }
    };
    // Afficher le popup pour modifier l'utilisateur
    this.showPopup = true;
  } 
  // Afficher le popup pour modifier l'utilisateur

   

    
  }
    