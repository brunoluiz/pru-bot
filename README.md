# Pru-bot

A pigeo... err... a bot which is able to show the UFSC restaurant menu and
notify its users about the daily menu. It is powered by MS BotFramework.

## Requirements

- `Docker` & `docker-compose`: https://docs.docker.com/engine/installation/
- `Bot Framework Emulator`: https://emulator.botframework.com/
- `ngrok`: https://ngrok.com

## Running

- Start the containers: `make up`
- Seed pru-menus (menu database) with initial data: `make seed`

## Using it through the emulator

First things first: on the Bot Framework Emulator, go to the App Settings
and enable `ngrok` (required when using Docker). After this, connect to
`http://localhost:8080/v1/messages`. You should receive a welcome message.

## Structure

- `configs`: config files
- `locale/pt-br`: locale files (all messages are in these files)
- `public`: static assets, such as images
- `spec`: acceptance tests
- `src/apis`: apis abstractions
- `src/db`: database abstractions
- `src/dialogs`: bot framework files/dialogs
- `src/routes`: public exposed endpoints, with its controllers and
middlewares
- `src/services`: logic abstractions, such as the logic to control
the users subscriptions
- `tests`: test support files

## Todo

If you want to help on the project development, check out the Issues tab.
