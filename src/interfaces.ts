type Severity = 'temporary' | 'permanent';

interface EventData {
  event: string;
  severity?: Severity;
  timestamp: number;
  id: string;
}

export interface Signature {
  timestamp: string;
  token: string;
  signature: string;
}

export interface MailGunPostObject {
  signature: Signature;
  'event-data': EventData;
}

export interface SNSMessageBody {
  Provider: string;
  timestamp: number;
  type: string;
}

export interface HandlerResponse {
  statusCode: number;
  body: string;
}
