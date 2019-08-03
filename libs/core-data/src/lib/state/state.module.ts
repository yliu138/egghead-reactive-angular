import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NxModule } from '@nrwl/nx';

import { reducers } from '.';
import { CustomersEffects } from './customers/customers.effects';

@NgModule({
  imports: [
    CommonModule,
    NxModule.forRoot(),
    StoreModule.forRoot(reducers),
    // The maxAge config is optional and helps limit the amount of actions kept in the DevTools.
    StoreDevtoolsModule.instrument({ maxAge: 10 }), //you can see the redux tab
    EffectsModule.forRoot([
      CustomersEffects
    ]),
  ],
  declarations: []
})
export class StateModule { }
