import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Customer, Project, ProjectsService, NotificationsService, CustomersService, ProjectsState } from '@workshop/core-data';
import { ProjectsActionTypes, AddProject, UpdateProject, DeleteProject } from 'libs/core-data/src/lib/state/projects/projects.actions';

const emptyProject: Project = {
  id: null,
  title: '',
  details: '',
  percentComplete: 0,
  approved: false,
  customerId: null
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;
  customers$: Observable<Customer[]>;
  currentProject: Project;

  constructor(
    private projectsService: ProjectsService,
    private customerService: CustomersService,
    private store: Store<ProjectsState>,
    private ns: NotificationsService) {
      // set our observable stream to the initial data we define in the reducer
      // it is just like connect in react redux for providing the state data to the UI/component in anuglar context
      // this corresponds to the AppState projects
      this.projects$ = store.pipe(
        select('projects'),
        map((projectsState: ProjectsState) => projectsState.projects)
      )
    }

  ngOnInit() {
    this.getProjects();
    this.getCustomers();
    this.resetCurrentProject();
  }

  resetCurrentProject() {
    this.currentProject = emptyProject;
  }

  selectProject(project) {
    this.currentProject = project;
  }

  cancel(project) {
    this.resetCurrentProject();
  }

  getCustomers() {
    this.customers$ = this.customerService.all();
  }

  getProjects() {
    // this.projects$ = this.projectsService.all();
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
      this.getProjects();
  }

  updateProject(project) {
    this.store.dispatch(new UpdateProject(project));

      this.ns.emit('Project updated!');
      this.getProjects();
  }

  // we will want strongly typed action objects rather than free style
  deleteProject(project) {
    this.store.dispatch(new DeleteProject(project));

      this.ns.emit('Project deleted!');
      this.getProjects();
  }
}

