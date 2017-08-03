import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppState } from './app.service';
import { DisplayComponent } from './components/display/display.component';
import { FooterButtonsComponent } from './components/footer-buttons/footer-buttons.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { MenuComponent } from './components/menu/menu.component';

import {routing} from './components/display/display.routing'

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    FooterButtonsComponent,
    StartScreenComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [AppState],
  bootstrap: [AppComponent]
})
export class AppModule { }
