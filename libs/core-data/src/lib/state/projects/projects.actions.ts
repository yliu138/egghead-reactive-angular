import { Project } from "../../projects/project.model";
import { Action } from "@ngrx/store";

// 01 define our possible action types
// this could act as constants
export enum ProjectsActionTypes {
  ProjectSelected = '[Projects] Selected',
  LoadProjects = '[Projects] Load Data',
  AddProject = '[Projects] Add Data',
  UpdateProject = '[Projects] Update Data',
  DeleteProject = '[Projects] Delete Data'
}

// 02 create our actions
export class SelectProject implements Action {
  readonly type = ProjectsActionTypes.ProjectSelected;

  constructor(private payload: Project) {

  }
}

export class LoadProjects implements Action {
  readonly type = ProjectsActionTypes.LoadProjects
  constructor(private payload: Project[]) {}
}

export class AddProject implements Action {
  readonly type = ProjectsActionTypes.AddProject;

  constructor(private payload: Project) {

  }
}

export class UpdateProject implements Action {
  readonly type = ProjectsActionTypes.UpdateProject;

  constructor(private payload: Project) {

  }
}

export class DeleteProject implements Action {
  readonly type = ProjectsActionTypes.DeleteProject;

  constructor(private payload: Project) {

  }
}

// 05 Expose objects actions as union type
// create custom type
// Convenient way to export all these projects
export type ProjectsActions = SelectProject
| LoadProjects
| AddProject
| DeleteProject
| UpdateProject

