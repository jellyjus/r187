import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppState } from './app.service';
import { SocketService } from './services/socket.service';
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

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    FooterButtonsComponent,
    StartScreenComponent,
    MenuComponent,
    ToolbarComponent,
    DirectionComponent,
    ServicesComponent,
    RecvMessagesComponent,
    DirectionComponent,
    HeaderComponent,
    DataEditorComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [AppState, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
