import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AppService } from './app.service';

@WebSocketGateway({
  cors: {
    origin: '*', // 허용할 클라이언트 도메인
    methods: ['GET', 'POST'], // 허용할 HTTP 메서드
    credentials: true, // 쿠키 사용 허용
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly appService: AppService) { }
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('messageToServer')
  handleMessage(client: Socket, payload: { sender: string, message: string }): void {
    console.log(`Message from ${payload.sender}: ${payload.message}`);

    // 모든 클라이언트에게 메시지를 전송
    this.server.emit('messageToClient', payload);

    // 자신이 보낸 메시지에는 푸시 알림을 보내지 않음
    if (payload.sender !== 'YourUsername') {  // 'YourUsername' 대신 실제 사용자의 username을 확인
      const messages = JSON.stringify({
        title: 'New Message',
        body: payload.message,
      });

      // 푸시 알림 전송
      this.appService.sendPushNotification(messages);
    }
  }
}