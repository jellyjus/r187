import { StartScreenComponent } from '../start-screen/start-screen.component';
import { MenuComponent } from '../menu/menu.component';
import { DirectionComponent } from '../direction/direction.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', component: StartScreenComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'direction', component: DirectionComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
