import { APIGatewayProxyEvent } from 'aws-lambda';
import { Storage } from './helpers/storage';
import { Notification } from './helpers/sns';
import { verify } from './utils';
import { MailGunPostObject, HandlerResponse } from './interfaces';

const signingKey = process.env.SIGNING_KEY;
const tableName = process.env.TABLE_NAME;
const topicArn = process.env.TOPIC_ARN;

const storage = new Storage(tableName);
const notification = new Notification(topicArn);

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<HandlerResponse> => {
  try {
    // when testing the lambda function on its own, the event body is passed
    // as it is given: as an object, so we have to cover that case
    const mailgunEvent = (typeof event.body === 'string'
      ? JSON.parse(event.body)
      : (event.body as unknown)) as MailGunPostObject;
    const eventData = mailgunEvent['event-data'];

    const isMailgunWebhook = verify(signingKey, mailgunEvent.signature);

    if (isMailgunWebhook) {
      await storage.createTable();
      await storage.save(mailgunEvent);
      await notification.publish('MailGun Hook', {
        Provider: 'Mailgun',
        timestamp: eventData.timestamp,
        type: eventData.event,
      });
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Queued!',
        }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Bad Request!',
        }),
      };
    }
  } catch (err) {
    return {
      statusCode: err.statusCode,
      body: JSON.stringify(err.message),
    };
  }
};
