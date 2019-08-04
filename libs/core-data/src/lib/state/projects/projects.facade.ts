import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Project, Customer, ProjectsState, selectCurrentProject } from "@workshop/core-data";
import { Store, select } from "@ngrx/store";
import { selectAllProjects } from "./projects.reducer";
import { LoadProjects, SelectProject, UpdateProject, DeleteProject, AddProject } from "./projects.actions";

@Injectable({providedIn: 'root'})
export class ProjectsFacade {
  projects$: Observable<Project[]>;
  currentProject$: Observable<Project>;

  constructor(
    private store: Store<ProjectsState>
  ) {
    this.projects$ = store.pipe(select(selectAllProjects));

    this.currentProject$ = store.pipe(
      select(selectCurrentProject)
    );
  }

  getProjects() {
    this.store.dispatch(new LoadProjects());
  }

  selectProject(project: Project) {
    this.store.dispatch(new SelectProject(project.id));
  }

  createProject(project: Project) {
    this.store.dispatch(new AddProject(project));
  }

  updateProject(project: Project) {
    this.store.dispatch(new UpdateProject(project));
  }

  deleteProject(project: Project) {
    this.store.dispatch(new DeleteProject(project));
  }
}
