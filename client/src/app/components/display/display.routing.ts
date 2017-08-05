import { StartScreenComponent } from '../start-screen/start-screen.component';
import { MenuComponent } from '../menu/menu.component';
import { ServicesComponent } from '../menu/services/services.component';
import { DataEditorComponent } from '../menu/services/data-editor/data-editor.component';
import { DirectionComponent } from '../direction/direction.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {path: '', component: StartScreenComponent},
  {
    path: 'menu',
    children: [
      {path: '', component: MenuComponent},
      {
        path: 'services',
        children: [
          {path: '', component: ServicesComponent},
          {path: 'data_editor', component: DataEditorComponent},
        ]
      }
    ]
  },
  { path: 'direction', component: DirectionComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
