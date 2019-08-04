import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ProjectsService } from "../../projects/projects.service";
import { ProjectsActionTypes, LoadProjects, ProjectsLoaded, DeleteProject, ProjectDeleted, AddProject, ProjectAdded, UpdateProject, ProjectUpdated } from "./projects.actions";
import { switchMap, map } from "rxjs/operators";
import { Project } from "../../projects/project.model";
// Provides convenience methods for implementing common operations of persisting data.
import { DataPersistence } from "@nrwl/nx";
import { ProjectsState } from "./projects.reducer";


// Data persistece is better solution for handling the complexity of async calls
@Injectable({providedIn: 'root'})
export class ProjectsEffects {
  // ofType: for triggered action name
  // switchMap: create that as observable flipt from incoming action to async actions that then fires off the complete actions
  // map: here can dispatch an action
  @Effect()
  LoadProjects$ = this.dataPersistence.fetch(ProjectsActionTypes.LoadProjects, {
    run: (action: LoadProjects, state: ProjectsState) => {
      return this.projectsService.all().pipe(map((res: Project[]) => new ProjectsLoaded(res)));
    },
    onError: (action: LoadProjects, error) => {
      console.log('Error', error);
    }
  })
  // LoadProjects$ = this.actions$.pipe(
  //   ofType(ProjectsActionTypes.LoadProjects), // trigger action
  //   switchMap((action: LoadProjects) =>
  //     this.projectsService.all()
  //       .pipe(map((res: Project[]) => new ProjectsLoaded(res))) // complete action which is dispatched
  //   )
  // );
  // pessimisticUpdate: it will update the UI and then make a call to the sever (update the server first)
  // if something goes wrong, you just have to undo it.
  @Effect()
  addProjects$ = this.dataPersistence.pessimisticUpdate(ProjectsActionTypes.AddProject, {
    run: (action: AddProject, state: ProjectsState) => {
      return this.projectsService.create(action.payload)
        .pipe(map((res: Project) => new ProjectAdded(res)));
    },
    onError: (action: AddProject, error) => {
      console.log('Error', error);
    }
  });
  // addProject$ = this.actions$.pipe(
  //   ofType(ProjectsActionTypes.AddProject), // trigger action
  //   switchMap((action: AddProject) =>
  //     this.projectsService.create(action.payload)
  //       .pipe(map((res: Project) => new ProjectAdded(res))) // complete action which is dispatched
  //   )
  // );

  @Effect()
  UpdateProject$ = this.dataPersistence.pessimisticUpdate(ProjectsActionTypes.UpdateProject, {
    run: (action: DeleteProject, state: ProjectsState) => {
      return this.projectsService.delete(action.payload)
        .pipe(map((res: Project) => new ProjectDeleted(res)));
    },
    onError: (action: DeleteProject, error) => {
      console.log('Error', error);
    }
  });
  // updateProject$ = this.actions$.pipe(
  //   ofType(ProjectsActionTypes.UpdateProject), // trigger action
  //   switchMap((action: UpdateProject) =>
  //     this.projectsService.update(action.payload)
  //       .pipe(map((res: Project) => new ProjectUpdated(res))) // complete action which is dispatched
  //   )
  // );

  @Effect()
  deleteProject$ = this.dataPersistence.pessimisticUpdate(ProjectsActionTypes.DeleteProject, {
    run: (action: UpdateProject, state: ProjectsState) => {
      return this.projectsService.update(action.payload)
        .pipe(map((res: Project) => new ProjectUpdated(res)));
    },
    onError: (action: UpdateProject, error) => {
      console.log('Error', error);
    }
  });
  // deleteProject$ = this.actions$.pipe(
  //   ofType(ProjectsActionTypes.DeleteProject), // trigger action
  //   switchMap((action: DeleteProject) =>
  //     this.projectsService.delete(action.payload)
  //       .pipe(map((res: Project) => {
  //         console.log(res, '===');
  //         return new ProjectDeleted(res);
  //       })) // complete action which is dispatched
  //   )
  // );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ProjectsState>,
    private projectsService: ProjectsService
  ) {}
}
