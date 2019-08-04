import { Project } from "../../projects/project.model";
import { Action } from "@ngrx/store";

// 01 define our possible action types
// this could act as constants
export enum ProjectsActionTypes {
  ProjectSelected = '[Projects] Selected',
  LoadProjects = '[Projects] Load Data', // trigger action
  ProjectsLoaded = '[Projects] Data Loaded', // completed action
  AddProject = '[Projects] Add Data',
  ProjectAdded = '[Projects] Data Added',
  UpdateProject = '[Projects] Update Data',
  ProjectUpdated = '[Projects] Data Updated',
  DeleteProject = '[Projects] Delete Data',
  ProjectDeleted = '[Projects] Data Deleted'
}

// 02 create our actions
export class SelectProject implements Action {
  readonly type = ProjectsActionTypes.ProjectSelected;

  constructor(public payload: Project) {

  }
}

export class LoadProjects implements Action {
  readonly type = ProjectsActionTypes.LoadProjects
  constructor() {}
}


export class ProjectsLoaded implements Action {
  readonly type = ProjectsActionTypes.ProjectsLoaded;
  constructor(public payload: Project[]) {}
}


export class AddProject implements Action {
  readonly type = ProjectsActionTypes.AddProject;

  constructor(public payload: Project) {

  }
}

export class ProjectAdded implements Action {
  readonly type = ProjectsActionTypes.ProjectAdded;

  constructor(public payload: Project) {}
}

export class UpdateProject implements Action {
  readonly type = ProjectsActionTypes.UpdateProject;

  constructor(public payload: Project) {}
}

export class ProjectUpdated implements Action {
  readonly type = ProjectsActionTypes.ProjectUpdated;

  constructor(public payload: Project) {}
}

export class DeleteProject implements Action {
  readonly type = ProjectsActionTypes.DeleteProject;

  constructor(public payload: Project) {}
}

export class ProjectDeleted implements Action {
  readonly type = ProjectsActionTypes.ProjectDeleted;

  constructor(public payload: Project) {}
}

// 05 Expose objects actions as union type
// create custom type
// Convenient way to export all these projects
export type ProjectsActions = SelectProject
| LoadProjects
| ProjectsLoaded
| AddProject
| ProjectAdded
| DeleteProject
| ProjectDeleted
| UpdateProject
| ProjectUpdated
;

