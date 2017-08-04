import { StartScreenComponent } from '../start-screen/start-screen.component';
import { MenuComponent } from '../menu/menu.component';
import { ServicesComponent } from '../menu/services/services.component';
import { DirectionComponent } from '../direction/direction.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', component: StartScreenComponent },
  { path: 'menu',
    children: [
      {path: '', component: MenuComponent},
      {path: 'services', component: ServicesComponent}
    ]
  },
  { path: 'direction', component: DirectionComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
