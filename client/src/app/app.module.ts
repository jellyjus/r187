import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { StateService } from './services/state.service';
import { DisplayComponent } from './components/display/display.component';
import { FooterButtonsComponent } from './components/footer-buttons/footer-buttons.component';
import { StartScreenComponent } from './components/start-screen/start-screen.component'

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    FooterButtonsComponent,
    StartScreenComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
