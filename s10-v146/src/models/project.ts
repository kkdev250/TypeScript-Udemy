export enum ProjectStatus {
  Active, 
  Finished
}

export class Project {
  constructor( // prop creation shorthand!
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}
