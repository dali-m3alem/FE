import { Component } from '@angular/core';
import { Task } from 'src/app/views/model/user';
import { Column } from './column';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from './board';
import { TasksService } from 'src/app/views/services/tasks.service';
import { AuthadminService } from 'src/app/views/services/authadmin.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { InfoTaskComponent } from '../info-task/info-task.component';

@Component({
  selector: 'app-task-user',
  templateUrl: './task-user.component.html',
  styleUrls: ['./task-user.component.scss']
})
export class TaskUserComponent {
  constructor(private taskService :TasksService, private auth: AuthadminService,public modalService: NgbModal){}
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
    const targetContainer = event.container as CdkDropList<Task[]>;
  const targetColumn = this.getColumnForContainer(targetContainer);
    if (targetColumn && targetColumn.name === 'done') {
      if (event.previousContainer === event.container) {
        const targetIndex = event.currentIndex;
        const previousIndex = event.previousIndex;
        
        if (targetIndex === previousIndex + 1 || targetIndex === previousIndex - 1) {
          return; // Allow movement within the "done" column
        }
      } else {
        return; // Block the movement to the "done" column from other columns
      }
    }
    
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
              deadlineA: '',
              project: undefined,
              team: undefined
            },
            dueDate: '',
            manager: {
              id: 0,
              email: ''
            },
            user: {
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
      deadlineA: '',
      project: undefined,
      team: undefined
    },
    dueDate:'',
    manager: {
      id: 0,
      email: ''
    },
    user: {
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
        deadlineA: task.activity.deadlineA,
        project: task.activity.project,
        team: task.activity.team
      },
      manager:{
        id:task.manager.id,
        email:task.manager.email
      },
      user:{
        id:task.manager.id,
        email:task.manager.email
      }
    };
    // Afficher le popup pour modifier l'utilisateur
    this.showPopup = true;
  } 
  // Afficher le popup pour modifier l'utilisateur

  details(row: any) {
    const options1: NgbModalOptions = {
      size: 'xl',
      centered: true,
      scrollable: true,
      windowClass:'modal-holder'
  
    };
    const modalRef = this.modalService.open(InfoTaskComponent, options1);
    modalRef.componentInstance.taskStatus = row;
  
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  
  }

}
