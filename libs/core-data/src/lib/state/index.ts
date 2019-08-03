import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCustomers from './customers/customers.reducer';
import * as fromProjects from './projects/projects.reducer';

// Updated the shape of the entire application state
export interface AppState {
  customers: fromCustomers.CustomersState,
  projects: fromProjects.ProjectsState
}
// Add in feature reducer into combined reducer
export const reducers: ActionReducerMap<AppState> = {
  customers: fromCustomers.customersReducer,
  projects: fromProjects.projectsReducers
};


// -------------------------------------------------------------------
// PROJECTS SELECTORS
// -------------------------------------------------------------------
export const selectProjectsState = createFeatureSelector<fromProjects.ProjectsState>('projects');

// Two parameters:
// The first one being the entire state for that feature
// The second: low-level selector from projects.selectProjectIds: i.e. just select IDs
// the ids
export const selectProjectIds = createSelector(
  selectProjectsState,
  fromProjects.selectProjectIds
);

// the dict
export const selectProjectEntities = createSelector(
  selectProjectsState,
  fromProjects.selectProjectEntities
);

export const selectAllProjects = createSelector(
  selectProjectsState,
  fromProjects.selectAllProjects
);

// -------------------------------------------------------------------
// CUSTOMERS SELECTORS
// -------------------------------------------------------------------
export const selectCustomersState = createFeatureSelector<fromCustomers.CustomersState>('customers');

export const selectAllCustomers = createSelector(
  selectCustomersState,
  fromCustomers.selectAllCustomers
);


