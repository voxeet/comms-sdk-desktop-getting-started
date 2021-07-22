> A bare minimum project structure to get started developing with Native Desktop SDK using [`electron-webpack-quick-start`](https://github.com/electron-userland/electron-webpack-quick-start).

## Get this project
```shell
git clone git@github.com:voxeet/iapi-sdk-desktop-gettingstarted.git
cd iapi-sdk-desktop-gettingstarted
```

## Set up dependencies
This project needs the following to be built:
- Native Desktop SDK
- voxeet-web-sdk
- voxeet-uxkit-react

### Set up environment variables
```shell
export PATH_WEBSDK=/path/to/websdk
export PATH_UXKIT_REACT=/path/to/uxkit-react
export PATH_NDS=/path/to/nds
export CKEY={Your Consumer Key}
export CSEC={Your Consumer Secret}
```

### Configure the project
```shell
yarn add file:${PATH_WEBSDK} file:${PATH_UXKIT_REACT}
```

## Build
```shell
yarn dist -c.electronDist=${PATH_NDS}
```

## Run
```shell
./dist/mac/iapi-sdk-desktop-gettingstarted.app/Contents/MacOS/iapi-sdk-desktop-gettingstarted
```

## Usage
To get a proper working conference, launch two instances of this application using the same consumer key and secret on the same system.
