export class User {
    id!: number;
    username!: string;
    userLastName!: string;
    email!: string;
    phoneNumber!: number;
    roles!: Authorisation[];
    titre!:string;
    profilePicture!:Uint8Array;
    
      // Ajoutez cette propriété à la classe User
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
  durationP!: number;
  deadlineP!: string;
  email!: string;
  userId!:number;
  status!:string;
  budget!:number;
  expanded!: boolean;
  
}
export class Activity{
  id!:number;
  activityName!: string;
  descriptionA!: string;
  objectiveA!: string;
  durationA!: number;
  deadlineA!: string;
}