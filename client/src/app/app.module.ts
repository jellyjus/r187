import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';

import { AppState } from './app.service';

import { SocketService } from './services/socket.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DisplayComponent } from './components/display/display.component';
import { FooterButtonsComponent } from './components/footer-buttons/footer-buttons.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { MenuComponent } from './components/menu/menu.component';

import {routing} from './components/display/display.routing';
import { DirectionComponent } from './components/direction/direction.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RecvMessagesComponent } from './components/menu/recv-messages/recv-messages.component';
import { HeaderComponent } from './components/header/header.component';
import { ServicesComponent } from './components/menu/services/services.component';
import { DataEditorComponent } from './components/menu/services/data-editor/data-editor.component';
import { ChannelsComponent } from './components/menu/services/data-editor/channels/channels.component';
import { DirectionsComponent } from './components/menu/services/data-editor/directions/directions.component';
import { WorkModeComponent } from './components/menu/services/data-editor/work-mode/work-mode.component';
import { CreateChannelComponent } from './components/menu/services/data-editor/channels/create-channel/create-channel.component';
import { CreateDirectionComponent } from './components/menu/services/data-editor/directions/create-direction/create-direction.component';
import { DmoModeComponent } from './components/menu/services/data-editor/work-mode/dmo-mode/dmo-mode.component';
import { MessagesComponent } from './components/menu/messages/messages.component';
import { SubMenuComponent } from './components/sub-menu/sub-menu.component';
import { PhoneComponent } from './components/start-screen/phone/phone.component';
import { RTCComponent } from './components/rtc/rtc.component';


@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    FooterButtonsComponent,
    StartScreenComponent,
    MenuComponent,
    ToolbarComponent,
    DirectionComponent,
    WorkModeComponent,
    ServicesComponent,
    RecvMessagesComponent,
    DirectionComponent,
    HeaderComponent,
    ChannelsComponent,
    DataEditorComponent,
    CreateChannelComponent,
    DirectionsComponent,
    CreateDirectionComponent,
    DmoModeComponent,
    MessagesComponent,
    SubMenuComponent,
    PhoneComponent,
    RTCComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    routing,
    FormsModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [AppState, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
