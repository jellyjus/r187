import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChannelsComponent } from './data-editor/channels/channels.component';
import { CreateChannelComponent } from './data-editor/channels/create-channel/create-channel.component';

@NgModule({
  imports: [],
  declarations: [ChannelsComponent, CreateChannelComponent],
  providers: []
})
export class ServicesModule {}
