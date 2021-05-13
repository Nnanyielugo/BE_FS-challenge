import { SNS } from '@aws-sdk/client-sns';
import { SNSMessageBody } from '../interfaces';

export class Notification {
  private sns = new SNS({ region: 'us-east-2' });
  constructor(private topicArn: string) {}

  async publish(subject: string, messageBody: SNSMessageBody): Promise<void> {
    await this.sns.publish({
      Subject: subject,
      Message: `Provider: ${messageBody.Provider}. \nTimestamp: ${messageBody.timestamp}. \nType: ${messageBody.type}`,
      TopicArn: this.topicArn,
    });
    console.log('successfully published message');
  }
}
