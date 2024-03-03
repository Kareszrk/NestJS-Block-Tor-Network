<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <a href="https://nestjs.com/" target="blank"><img src="https://www.torproject.org/static/images/tor-logo@2x.png?h=16ad42bc" width="120" alt="Tor Logo" /></a>
</p>

<p align="center">A simple way to deny access to your application from clients using TOR networks.</p>
  <p align="center">
</p>

# NestJS TOR Blocker Middleware

This NestJS application includes a middleware that blocks access to your application from TOR network IP addresses. It fetches a list of TOR exit nodes from the TOR Project's API and compares incoming requests' IP addresses with the list.

The code can be useful for those whose infrastructure does not let them use cloudflare, although don't forget that your NodeJS can still be called by these clients since otherwise we couldn't return any response.

## Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version >= 18)
- [Nest CLI](https://docs.nestjs.com/cli/overview)
- Last tested NestJS version: 10.0.1 , but most probably works with the latest versions as well

## Installation & Setup Steps

Follow these steps to set up the TOR Block Middleware in your NestJS application:

### 1st: Generate the Middleware

Run the following command to generate the `torBlock` middleware:

```bash
nest generate middleware torBlock
```

### 2nd: Replace Middleware Code

Replace the contents of `src/middleware/tor-block.middleware.ts` with the code from this repository's `tor-block.middleware.ts`.

### 3rd: Configure `app.module.ts`

Open your `src/app/app.module.ts` file and configure it as follows:

```typescript
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TorBlockMiddleware } from './middleware/tor-block.middleware';

@Module({})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TorBlockMiddleware).forRoutes('*');
  }
}
```

## Configuration

You can further customize the behavior of the TOR Block Middleware in the `tor-block.middleware.ts` file. For example, you can adjust the file path for the TOR block list (`tor-block.txt`) or modify the error response sent to blocked users.

## Usage

1. If you want, you can manually extend the `tor-block.txt` file in the root directory of your project with additional IP addresses you want to block. One IP address per line.

2. Run the application:

   ```bash
   npm start
   ```

3. The application will fetch the list of TOR exit nodes from the TOR Project's API, (which is free to use) save it to `tor-block.txt`, and initialize the blocking middleware during startup.

4. The middleware will block access to your application for any incoming requests with IP addresses found in the `tor-block.txt` file.

## Feel free to contribute

If you would like to contribute just fork the project, make changes then send a pull request and after a short review time I will accept it. :)

## Acknowledgments

- Thanks to the [TOR Project](https://www.torproject.org/) for providing the list of TOR exit nodes.
