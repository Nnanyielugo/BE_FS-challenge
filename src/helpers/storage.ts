import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { MailGunPostObject } from '../interfaces';

export class Storage {
  private table: string;
  private dynamoDB = new DynamoDB({ region: 'us-east-2' });
  constructor(private tableName: string) {}

  async createTable(): Promise<void> {
    const tables = await this.dynamoDB.listTables({});

    if (tables.TableNames.includes(this.tableName)) {
      this.table = this.tableName;
      return;
    } else {
      const table = await this.dynamoDB.createTable({
        TableName: this.tableName,
        KeySchema: [
          {
            AttributeName: 'id',
            KeyType: 'HASH',
          },
        ],
        AttributeDefinitions: [
          {
            AttributeName: 'id',
            AttributeType: 'S',
          },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      });
      this.table = table.TableDescription.TableName;
    }
  }

  async save(data: MailGunPostObject): Promise<void> {
    const id: string = data['event-data'].id;
    await this.dynamoDB.putItem({
      TableName: this.table,
      Item: marshall({
        id,
        ...data,
      }),
    });
  }
}
