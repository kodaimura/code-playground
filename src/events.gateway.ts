import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('typing')
    handleMessage(
        @MessageBody() data: any,
        @ConnectedSocket() client: Socket): void {
        this.server.emit(data.group, {clientId: client.id, ...data});
    
    }
}
