import { Injectable } from '@nestjs/common';
import * as webPush from 'web-push';

@Injectable()
export class AppService {
  private subscriptions: any[] = [];

  constructor() {
    const vapidKeys = {
      publicKey: 'BLMuqANzgt98IBfsEIeO1a7ZMhtKV73qqxWvn44oRhxamelcLU3jzEPXrXR9S_qy8JwfzeJzKhgCX8cvHNB7QG4',
      privateKey: 'TVWYQVnOklzoG9LL-VpWy974cax4mW0tbXXv1j995QE',
    };

    webPush.setVapidDetails(
      'mailto:your-email@example.com',
      vapidKeys.publicKey,
      vapidKeys.privateKey,
    );
  }

  subscribeToPush(subscription: any) {
    console.log('Received subscription:', subscription); // 구독 정보 확인
    if (subscription && subscription.endpoint) {
      this.subscriptions.push(subscription);
      console.log('Subscription stored:', this.subscriptions); // 저장된 구독 정보 출력
    } else {
      console.error('Invalid subscription received');
    }
  }

  sendPushNotification(payload: string) {
    if (this.subscriptions.length === 0) {
      console.error('No subscriptions found'); // 구독 정보가 없으면 로그 출력
      return;
    }
  
    this.subscriptions.forEach(subscription => {
      console.log('Sending push notification to subscription:', subscription); // 구독 정보 로그 출력
  
      if (subscription && subscription.endpoint) {
        webPush.sendNotification(subscription, payload).then(() => {
          console.log('Push notification sent successfully'); // 성공 로그 출력
        }).catch((error) => {
          console.error('Error sending notification:', error); // 에러 로그 출력
        });
      } else {
        console.error('Invalid subscription:', subscription);
      }
    });
  }
}