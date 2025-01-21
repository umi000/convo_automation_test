# gos-automation


This repository contains automation tests for our application. To get started, follow the instructions below to set up your environment and run the tests.

To run the test 

## Headed mode
run npx cypress open

## Headless mode
run npx cypress run

## Headless mode for a specific test file
npx cypress run --spec (Test file path)


## Prerequisites

Before running tests, ensure you have the following installed:

- Node.js (v14 or later)
- npm (usually comes with Node.js)
- MongoDB (if you’re running tests that require a database)

## Environment Setup

You need to create a `.env` file in the root of your project directory to configure your environment variables. This file should include the MongoDB URIs for the different environments.

### Example `.env` File


# Development Environment

MONGO_URI = mongodb+srv://abuzar:RQ6qxIqpIwtxhZme@common-central.9hvbzh7.mongodb.net/test?retryWrites=true&w=majority&appName=Common-Central
