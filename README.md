# Marvin

Hi! I am Marvin and here I am, brain the size of a planet, and they tell me to **help your team in the daily work and methodologies**. Call that job satisfaction? 'Cos I don't.

## Installation

>Life? Don't talk to me about life.

## Usage example

>I think you ought to know I'm feeling very depressed.


## Development setup (with Slack)

>Pardon me for breathing, which I never do anyway so I don't know why I bother to say it, Oh God, I'm so depressed.

- Clone the repo and install the dependencies

```sh
git clone git@github.com:ssanchezmarc/marvin.git
cd marvin
yarn install
```

- Define a new `config/.env` file. Use as base the `config/.env.example` to know the secrets you need: [signing secret](https://api.slack.com/apps/A01C9CH5UUV/general?) and [bot token](https://api.slack.com/apps/A01C9CH5UUV/oauth?).

- Run the app in development mode

```sh
yarn run start:dev
```

- In other command line panel, run [expose](https://beyondco.de/docs/expose/getting-started/sharing-your-first-site) or [ngrok](https://ngrok.com/) to make public your localhost:3033

```sh
expose share http://localhost:3033
```

- Verified the request public url genereted in the previous step [in slack](https://api.slack.com/apps/A01C9CH5UUV/event-subscriptions?). Remember to append the path `/slack/events` to the base url.
 
## Contributing
>I wish you'd just tell me rather trying to engage my enthusiasm because I haven't got one.

Read [Contributing details](.github/CONTRIBUTING.md)
