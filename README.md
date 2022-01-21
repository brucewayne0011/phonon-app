<p align="center">
  <img src="./logo192.png"/>
</p>

# phonon-app

The application for creating, sending, and redeeming Phonons. 

It can be built to target Web, iOS, and Android platforms. 

To learn more about Phonon, visit [phonon.network](https://phonon.network) and to get help [join the PhononDAO Discord](https://discord.gg/8EhKQXsm).

## Dependencies

### All Platforms

- [`node`](https://nodejs.org) - Build tools for the web-based technologies that make this app possible.
- [`Ionic`](https://ionicframework.com/) - Higher-level build tools for generating the mobile apps and user-interface component library.
- [`tailwind`](https://tailwindcss.com/) - Styling library for making the app look good.

### Web

- [`Go`](https://go.dev) - The programming language in which the [phonon-client](https://github.com/GridPlus/phonon-client) is written.

### iOS

- `macOS` - Operating system that is required to build iOS apps.

## Getting started

To run the app locally, or to begin developing new features for the Phonon App, you'll need to run [phonon-client](https://github.com/GridPlus/phonon-client) locally on your machine. This is the service that the phonon-app talks to in order to securely interact with the phonon network.

Most of the time, you'll be working with the web app. Many web features will work just fine across all platforms, but since we are engineers, we always test on the mobile platforms as well.

To check if any particular web platform feature works on mobile browsers, we suggest putting the name of that feature into [CanIUse.com](https://caniuse.com/) to see how well it is supported.

### Start the phonon-client

1. [Install Go](https://go.dev/doc/install) (if you don't already have it on your machine).
2. `git clone https://github.com/GridPlus/phonon-client.git` - Clone the [phonon-client](https://github.com/GridPlus/phonon-client) git repository to your machine.
3. `go run main/phonon.go webUI` - Start up the [phonon-client](https://github.com/GridPlus/phonon-client).

### Start the Web App

1. `npm install` - Install dependencies
1. `npm run start` - Start the web app
    - It should either start up at `localhost:3000` or if something is already running at that address, it will prompt you to start at a new address.
1. At this point, your browser should open the app for you. If not, visit the address displayed in your terminal, which is `localhost:3000` by default. 

### Start the iOS App

You'll need a computer running macOS to work on the iOS app. There is quite a bit of preparation required, which you can do by following along with the [Ionic Documentation](https://ionicframework.com/docs/developing/ios). Once you're set up, you'll run: 

`$ ionic capacitor run ios -l --external` 

to get the development environment set up to allow for live-reloading while working. 

### Start the Android App

As with iOS development, Android also requires preparation of your machine before you can get started with development. Visit the [Ionic Documentation](https://ionicframework.com/docs/developing/android) to learn how to set up your computer. The following command:  

`$ ionic capacitor run android -l --host=YOUR_IP_ADDRESS` 

with your IP address in the command, so the app knows where to look for changes.

## Architecture

This application uses the [Ionic Framework](https://ionicframework.com) to both give us UI components that look good on all platforms, as well as help us out with some build tools that make it easier to deploy mobile apps.

The web app works the same as any other website, the browser renders our HTML, JS, and CSS. The mobile apps work by wrapping our app in a "webview" that uses the native browser on the device to render our web app as though it were an actual native application.

### User Interface 

The user interface is built using [React](https://reactjs.org) with [Tailwind](https://tailwindcss.com) for styling. And it is written with [TypeScript](https://www.typescriptlang.org/).

### State Management

State is managed using [Redux Toolkit](https://redux-toolkit.js.org/). This gives us a simple, hooks-based way to sync state with the backend service ([phonon-client](https://github.com/GridPlus/phonon-client)).

## Contributing

Pick up an unassigned ticket from the issues on this repo, do your work on a new branch, then open a PR targeting the `master` branch.
