import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { BidDto } from 'src/dtos/bids.dto';
import { BidsService } from 'src/services/bids.service';
import { SocketEvents } from 'src/utils/enums';

@WebSocketGateway(4000, {
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly bidService: BidsService) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Socket connected', socket.id);
    });
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log('Sent message in events here');

    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage(SocketEvents.BID_CREATED_INPUT)
  async emitBidCreated(@MessageBody() bidId: string): Promise<BidDto> {
    const bid: BidDto = await this.bidService.getBidById(bidId);
    this.server.emit(SocketEvents.BID_CREATED_OUTPUT, bid);
    console.log('Sent message increated here');
    return bid;
  }
}
