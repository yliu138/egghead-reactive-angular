import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ProjectsService } from "../../projects/projects.service";
import { ProjectsActionTypes, LoadProjects, ProjectsLoaded, DeleteProject, ProjectDeleted, AddProject, ProjectAdded, UpdateProject, ProjectUpdated } from "./projects.actions";
import { switchMap, map } from "rxjs/operators";
import { Project } from "../../projects/project.model";

@Injectable({providedIn: 'root'})
export class ProjectsEffects {
  // ofType: for triggered action name
  // switchMap: create that as observable flipt from incoming action to async actions that then fires off the complete actions
  // map: here can dispatch an action
  @Effect()
  LoadProjects$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.LoadProjects), // trigger action
    switchMap((action: LoadProjects) =>
      this.projectsService.all()
        .pipe(map((res: Project[]) => new ProjectsLoaded(res))) // complete action which is dispatched
    )
  );
  @Effect()
  addProject$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.AddProject), // trigger action
    switchMap((action: AddProject) =>
      this.projectsService.create(action.payload)
        .pipe(map((res: Project) => new ProjectAdded(res))) // complete action which is dispatched
    )
  );

  @Effect()
  updateProject$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.UpdateProject), // trigger action
    switchMap((action: UpdateProject) =>
      this.projectsService.update(action.payload)
        .pipe(map((res: Project) => new ProjectUpdated(res))) // complete action which is dispatched
    )
  );

  @Effect()
  deleteProject$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.DeleteProject), // trigger action
    switchMap((action: DeleteProject) =>
      this.projectsService.delete(action.payload)
        .pipe(map((res: Project) => {
          console.log(res, '===');
          return new ProjectDeleted(res);
        })) // complete action which is dispatched
    )
  );
  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService
  ) {}
}
