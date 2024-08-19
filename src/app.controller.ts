import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('hello')
  hello() {
    return { message: 'Hello world' };
  }

  @Post('subscribe')
  subscribeToPush(@Body() subscription: any) {
    this.appService.subscribeToPush(subscription);
    return { message: 'Subscription successful' };
  }

  // @Post('send-push')
  // sendPushNotification() {
  //   console.log('Send Push Notification API called'); // 로그 추가
  //   const payload = JSON.stringify({
  //     title: 'Hello World',
  //     body: 'This is a test push notification!',
  //   });

  //   this.appService.sendPushNotification(payload);
  //   return { message: 'Push sent' };
  // }
}