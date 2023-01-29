# About this Project

-   This project enables user to their [mqtt](https://mqtt.org/) broker instance by providing their username, password, and hostname
-   It provides such user with the ability to subscribe and public messages to topics while selecting their preferred Quality of Service (QoS)
-   This project uses the [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/) for it's component structure
-   It is built with
    -   [React](https://reactjs.org/)
    -   [Typescript](https://www.typescriptlang.org/)
    -   [Docker](https://docs.docker.com/compose/install/)
    -   Bootstrapped with [Create React App](https://create-react-app.dev/docs/getting-started/)
    -   [Mqtt](https://www.npmjs.com/package/precompiled-mqtt)
-   The application is tested (Unit tests) using:
    -   [Jest](https://jestjs.io/) and,
    -   [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## How Does this application work

This application allows users to subscribe, and publish messages to their Mqtt broker instance. In order to connect to a broker instance, users must provide the following information:

-   Username: The username for the broker
-   Password: The broker's password
-   Hostname: The hostname of the broker
    Users can easily see information about whether they were able to connect successfully to their broker instance

NB:
You would only able to publish, subscribe or receive messages after subscribing to a topic.

## Running this application locally and testing

1. Clone this repository
2. Cd into the cloned repository
3. There are two ways you can start or test this application locally:

### Using Docker Compose:

#### Prerequisites:

1.  [Docker](https://docs.docker.com/get-docker/)
2.  [Docker Compose](https://docs.docker.com/compose/install/)

#### How to:

1. To run the tests with docker-compose, simply run:

```
docker-compose up test
```

2. To start the application with docker-compose, simply run:

```
docker-compose up web
```

### Using npm:

#### Prerequisites:

1. [Node](https://nodejs.org/en/) at least v14.18.1
2. [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

#### How to:

1. Install the dependencies with:

```
npm install
```

2. Run the tests with:

```
npm test
```

3. Start the application with:

```
npm start
```

Visit `localhost:3000` on your favourite browser to view the application

## TroubleShooting:

1. Be sure to confirm that you do not have another project running on port 3000
2. Confirm that the credentials you are trying to login to the broker are actually valid
