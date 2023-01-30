## Table of Content

-   [About this Project](#about-this-project)
-   [How Does the application work](#how-does-the-application-work)
-   [Running this application locally and testing](#running-this-application-locally-and-testing)
    -   [Using Docker Compose](#using-docker-compose)
        -   [Prerequisites](#prerequisites)
        -   [Run the Application's Unit tests](#using-docker-compose-run-the-applications-unit-tests)
        -   [Start the Application locally](#using-docker-compose-start-the-application-locally)
        -   [Shutting down the Application](#using-docker-compose-shutting-down-the-application)
    -   [Using npm](#using-npm)
        -   [Prerequisites](#prerequisites-1)
        -   [Run the Application's Unit tests](#using-npm-run-the-applications-unit-tests)
        -   [Start the Application locally](#using-npm-start-the-application-locally)
        -   [Shutdown the Application](#using-npm-shutdown-the-application)
    -   [TroubleShooting](#troubleshooting)
    -   [Recording](#recording)

# About this Project

-   This project enables users connect to their [mqtt](https://mqtt.org/) broker instance by providing their username, password, and hostname
-   It provides such user with the ability to subscribe and or publish messages to topics while selecting their preferred Quality of Service (QoS)
-   This application is accessible on all types of devices (mobile and desktop)
-   This project uses the [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/) for it's component structure
-   It is built with
    -   [React](https://reactjs.org/)
    -   [Typescript](https://www.typescriptlang.org/)
    -   [Docker](https://docs.docker.com/compose/install/)
    -   [Mqtt](https://www.npmjs.com/package/precompiled-mqtt)
    -   Styled with [CSS Modules](https://github.com/css-modules/css-modules)
    -   Bootstrapped with [Create React App](https://create-react-app.dev/docs/getting-started/)
-   The application is tested (Unit tests) using:
    -   [Jest](https://jestjs.io/) and,
    -   [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## How Does the application work

As mentioned earlier, this application alllows users to subscribe, and or publish messages to topics on their Mqtt broker instance. In order to connect to a broker instance, users must provide the following information:

-   Username: The username of the broker instance you are trying to connect
-   Password: The password of the broker instance you are trying to connect
-   Hostname: The hostname of the broker instance

Users can easily see information about whether they were able to connect successfully to their broker instance or not, through a text displayed just below the `Connect/Disconnect` button

NB:

-   You would only able to publish, subscribe or receive messages only after connecting to a broker instacne, and subscribing to a topic.
-   This application allows you to specify the Quality of Service (QoS) when subcribing to a topic

## Running this application locally and testing

1. Open your workspace terminal
2. Clone this repository
3. Cd into the cloned repository
4. There are two ways you can start or test this application locally:

### Using Docker Compose:

#### Prerequisites:

1.  [Docker](https://docs.docker.com/get-docker/)
2.  [Docker Compose](https://docs.docker.com/compose/install/)

#### Using Docker Compose: Run the Application's Unit tests

1. To run the tests with docker-compose, simply run: (on MacOS)

```
docker-compose up test
```

1. To run the tests with docker-compose, simply run: (on Ubuntu)

```
sudo docker compose up test
```

#### Using Docker Compose: Start the Application locally

1. To start the application with docker-compose, simply run (on MacOS):

```
docker-compose up web
```

1. To start the application with docker-compose, simply run (on Ubuntu):

```
sudo docker compose up web
```

#### Using Docker Compose: Shutting down the Application

1. Press `Cmd + C` on a MacOS or `Ctrl+ C` on Ubuntu to stop the application
2. Run (on MacOS):

```
docker-compose down
```

2. Run (on Ubuntu):

```
sudo docker compose down
```

### Using npm:

#### Prerequisites:

1. [Node](https://nodejs.org/en/) at least v14.18.1
2. [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

#### Using npm: Run the Application's Unit tests

1. Install the dependencies with:

```
npm install
```

2. Run the tests with:

```
npm test
```

#### Using npm: Start the Application locally

1. Install the dependencies with:

```
npm install
```

2. Start the application with:

```
npm start
```

Visit `localhost:3000` on your favourite browser to view the application

#### Using npm: Shutdown the Application

1. Press `Cmd + C` on MacOs or `Ctrl + C` on Ubuntu to stop the application

## TroubleShooting:

1. Be sure to confirm that you do not have another project running on port 3000
2. Confirm that the credentials you are trying to login to the broker are actually valid
3. Seeing an Error like this error when trying to install depdencies on Ubuntu?

```
Error: EACCES: Permission denied, mkdir '/<file_path>
```

Solution:

-   Run `rm -rf node_modules` in the repository and then `npm install` again
    Why did that happen?: Well, it's possible that you had ran `docker-compose web` earlier

## Recording

https://user-images.githubusercontent.com/35481645/215463383-8526e5ed-e071-46d2-864e-02353a335652.mp4
