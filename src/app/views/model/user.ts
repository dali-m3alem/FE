export class User {
    id!: number;
    firstname!: string;
    userLastName!: string;
    email!: string;
    phoneNumber!: number;
    roles!: Authorisation[];
    titre!:string;
    profilePicture!:Uint8Array;
    
      // Ajoutez cette propriété à la classe User
  }
  export class Team{
    teamId!:number;
    teamName!:string;
    teamDesc!:string;
    emails!:User;
  }
  
  export class Authorisation {
    roleName!:string;
    id!:number;
  }
  
export class Project {
  id!:number;
  projectName!: string;
  descriptionP!: string;
  objectiveP!: string;
  deadlineP!: string;
  email!: string;
  userId!:number;
  status!:string;
  budget!:number;
  expanded!: boolean;
  activity!:any;
}
export class Activity{
  id!:number;
  activityName!: string;
  descriptionA!: string;
  objectiveA!: string;
  deadlineA!: string;
  team!:Team;
  project!: Project; // Modifier le type de "project" en "Project"
}
export class Task {
  id!: number;
  title!: string;
  status!: string;
  description!:string;
  dueDate!:string;
  activity!: {
    id: number;
    activityName: string;
    descriptionA: string;
    objectiveA: string;
    deadlineA: string;
    project: any;
    team: any;
  }
  user!:{
    id:number;
    email:string;
  }
  manager!:{
    id:number;
    email:string;
  }
}

