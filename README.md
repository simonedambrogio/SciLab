# Monkey Training Interface

A Node.js-based application designed for training monkeys using a Windows tablet interface. The system integrates with an Arduino board to control a reward pump system.

## Overview

This project provides a web-based interface for conducting monkey training experiments. The Node.js backend makes it easy to create new experiments using the [jsPsych](https://www.jspsych.org/latest/) framework - a JavaScript library specifically designed for building behavioral experiments in a web browser. The system features:
- Interactive tablet-based interface with jsPsych for flexible experiment design
- Arduino integration for reward dispensing
- Data collection and storage in MongoDB
- Real-time communication between the interface and reward system

## Prerequisites

- Node.js 16.x
- Arduino One board
- Windows tablet
- MongoDB (optional for data storage)
- USB connection to Arduino board

## Hardware Setup

1. Connect the Arduino One board to your computer via USB
2. Ensure the pump system is properly connected to the Arduino
3. Note the COM port number for the Arduino connection (default: COM3)

## Software Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

## Configuration

1. Arduino Serial Port: By default, the application uses COM3. If your Arduino is connected to a different port, update it in `app.js`:
```javascript
var port = new SerialPort('COM3', {
    baudRate: 9600,
    ...
});
```

2. MongoDB (optional): To enable data storage, set the `MONGODB_URI` environment variable with your MongoDB connection string.

## Running the Application

1. Start the server:
```bash
npm start
```

2. Access the application:
- Open a web browser on your Windows tablet
- Navigate to `http://localhost:3000`

## Project Structure

- `/public/html/` - Contains the experiment interface pages
- `/public/javascript/` - Client-side JavaScript files
- `/public/css/` - Styling files
- `app.js` - Main server application
- `package.json` - Project dependencies and scripts

## Features

- Real-time reward dispensing through Arduino communication
- Experiment data collection and storage
- Customizable experiment interface
- Automatic reward system control

## Dependencies

- express: ^4.18.1
- serialport: ^9.0.1
- mongodb: ^4.9.1
- mongoose: ^6.5.4
- body-parser: ^1.20.0
- ejs: ^3.1.8
- nodemon: ^2.0.19

## License

ISC

## Contributing

Feel free to submit issues and enhancement requests. 