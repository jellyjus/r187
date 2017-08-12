import { StartScreenComponent } from '../start-screen/start-screen.component';
import { MenuComponent } from '../menu/menu.component';
import { RecvMessagesComponent } from '../menu/recv-messages/recv-messages.component';
import { MessagesComponent } from '../menu/messages/messages.component';
import { RTCComponent } from '../rtc/rtc.component';
import { ServicesComponent } from '../menu/services/services.component';
import { DataEditorComponent } from '../menu/services/data-editor/data-editor.component';
import { ChannelsComponent } from '../menu/services/data-editor/channels/channels.component';
import { DirectionsComponent } from '../menu/services/data-editor/directions/directions.component';
import { CreateDirectionComponent } from '../menu/services/data-editor/directions/create-direction/create-direction.component';
import { WorkModeComponent } from '../menu/services/data-editor/work-mode/work-mode.component';
import { DmoModeComponent } from '../menu/services/data-editor/work-mode/dmo-mode/dmo-mode.component';
import { CreateChannelComponent } from '../menu/services/data-editor/channels/create-channel/create-channel.component';
import { DirectionComponent } from '../direction/direction.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {path: '', redirectTo: 'start-screen', pathMatch: 'full'},
  {path: 'start-screen', component: StartScreenComponent},
  {
    path: 'menu',
    children: [
      {path: '', component: MenuComponent},
      {path: 'messages', component: MessagesComponent},
      {path: 'rtc', component: RTCComponent},
      {
        path: 'services',
        children: [
          {path: '', component: ServicesComponent},
          {
            path: 'data_editor',
            children: [
              {path: '', component: DataEditorComponent},
              {
                path: 'work_mode',
                children: [
                  {path: '', component: WorkModeComponent},
                  {path: 'dmo', component: DmoModeComponent}
                ]
              },
              {
                path: 'channels',
                children: [
                  {path: '', component: ChannelsComponent},
                  {path: 'create-channel', component: CreateChannelComponent}
                ]
              },
              {
                path: 'directions',
                children: [
                  {path: '', component: DirectionsComponent},
                  {path: 'create-direction', component: CreateDirectionComponent}
                ]
              }
            ]
          },
        ]
      },
      {
        path: 'recv-messages',
        component: RecvMessagesComponent
      }
    ]
  },
  { path: 'direction', component: DirectionComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
