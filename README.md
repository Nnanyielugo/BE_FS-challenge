## Serverless Webhook Endpoint
AWS lambda that collects serves as a Mailgun webhook endpoint, stores a raw copy of the webhook, and publishes a trannsformed copy to an email address via sns.

### Instructions for use
Preferred Option: [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html).

Steps:
- Follow the installation process outlined [here](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) to install AWS SAM on your machine.
- Clone the repository. Run `git clone`.
- `cd` into the project folder.
- Create a [mailgun](https://www.mailgun.com/) account
- Replace the MAILGUN_SIGNING_KEY config in `template.yaml` with your own values
- Create an AWS account
- Create a table [here](https://us-east-2.console.aws.amazon.com/dynamodb/home?region=us-east-2#tables:), and replace the TABLE_NAME config in `template.yaml` with your own values
- Create an SNS topic [here](https://us-east-2.console.aws.amazon.com/sns/v3/home?region=us-east-2#/topics), and replace the TOPIC_ARN config in `template.yaml` with your own values
- Install the project dependencies. Run `npm install`
- Compile the Typescript code into JS. Run `npm run build`
- Copy the `package.json` file into the generated build directory
- Build the application. Run `sam build`
- Deploy the application. Run `sam deploy --guided`
- Navigate to the [APIGateway](https://us-east-2.console.aws.amazon.com/apigateway/home?region=us-east-2#/apis/8v696cz0yj/stages/Prod) stages section, select a stage annd copy the url.
- Navigate to [mailgun webhooks](https://app.mailgun.com/app/sending/domains/sandbox86f29edef32648ca81ed71bf02739b19.mailgun.org/webhooks) section, select an event you would like to test, past the url copied from APIGateway, and click `Test Webhook`
