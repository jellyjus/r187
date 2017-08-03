import { StartScreenComponent } from '../start-screen/start-screen.component';
import { MenuComponent } from '../menu/menu.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', component: StartScreenComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
