import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChannelsComponent } from './data-editor/channels/channels.component';
import { CreateChannelComponent } from './data-editor/channels/create-channel/create-channel.component';
import { DirectionsComponent } from './data-editor/directions/directions.component';
import { CreateDirectionComponent } from './data-editor/directions/create-direction/create-direction.component';

@NgModule({
  imports: [],
  declarations: [ChannelsComponent, CreateChannelComponent, DirectionsComponent, CreateDirectionComponent],
  providers: []
})
export class ServicesModule {}
