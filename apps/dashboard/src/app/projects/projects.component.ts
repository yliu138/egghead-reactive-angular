import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Customer, Project, ProjectsService, NotificationsService, CustomersService, ProjectsState, LoadProjects, initialProjects, selectAllProjects, selectCurrentProject, SelectProject } from '@workshop/core-data';
import { ProjectsActionTypes, AddProject, UpdateProject, DeleteProject } from '@workshop/core-data';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  currentProject$: Observable<Project>;

  constructor(
    private customerService: CustomersService,
    private store: Store<ProjectsState>,
    private ns: NotificationsService) {
      // set our observable stream to the initial data we define in the reducer
      // it is just like connect in react redux for providing the state data to the UI/component in anuglar context
      // this corresponds to the AppState projects
      this.projects$ = store.pipe(
        select(selectAllProjects)
        // map(data => data.entities),
        // map(data => Object.keys(data).map(k => data[k]))
        // map((projectsState: ProjectsState) => projectsState.projects)
      )

      this.currentProject$ = store.pipe(
        select(selectCurrentProject)
      );
    }

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    // this.currentProject = emptyProject;
    this.store.dispatch(new SelectProject(null));
  }

  selectProject(project: Project) {
    // this.currentProject = project;
    this.store.dispatch(new SelectProject(project.id));
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    // this.projects$ = this.projectsService.all();
    // this action was then dispatched throught the effect lateron
    this.store.dispatch(new LoadProjects());
  }

  saveProject(project) {
    if (!project.id) {
      this.createProject(project);
    } else {
      this.updateProject(project);
    }
  }

  createProject(project) {
      this.store.dispatch(new AddProject(project));

      this.ns.emit('Project created!');
  }

  updateProject(project) {
    this.store.dispatch(new UpdateProject(project));

      this.ns.emit('Project updated!');
  }

  // we will want strongly typed action objects rather than free style
  deleteProject(project) {
    this.store.dispatch(new DeleteProject(project));

      this.ns.emit('Project deleted!');
  }
}

