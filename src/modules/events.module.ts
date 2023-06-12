import { Module } from '@nestjs/common';
import { EventsGateway } from 'src/gateways/events.gateway';
import { BidsModule } from './bids.module';

@Module({
  imports: [BidsModule],
  providers: [EventsGateway],
})
export class EventsModule {}
