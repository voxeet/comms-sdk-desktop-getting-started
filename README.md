> A bare minimum project structure to get started developing with Native Desktop SDK using [`electron-webpack-quick-start`](https://github.com/electron-userland/electron-webpack-quick-start).

## Depencencies
This project needs the following to be built:
- Native Desktop SDK
- voxeet-web-sdk
- voxeet-uxkit-react

## Get this project
```shell
git clone git@github.com:voxeet/iapi-sdk-desktop-gettingstarted.git
cd iapi-sdk-desktop-gettingstarted
```

## macOS

### Configure
```shell
export PATH_WEBSDK=/path/to/websdk
export PATH_UXKIT_REACT=/path/to/uxkit-react
yarn add file:${PATH_WEBSDK} file:${PATH_UXKIT_REACT}
```

### Build
```shell
export PATH_NDS=/path/to/nds
yarn dist -c.electronDist=${PATH_NDS}
```

### Run
```shell
export CKEY={Your Consumer Key}
export CSEC={Your Consumer Secret}
./dist/mac/iapi-sdk-desktop-gettingstarted.app/Contents/MacOS/iapi-sdk-desktop-gettingstarted
```

## Windows

### Configure
```shell
set PATH_WEBSDK=X:\\path\\to\\websdk
set PATH_UXKIT_REACT=X:\\path\\to\\uxkit-react
yarn add file:%PATH_WEBSDK% file:%PATH_UXKIT_REACT%
```

### Build
```shell
set PATH_NDS=X:\\path\\to\\\nds
yarn dist -c.electronDist=%PATH_NDS%
```

### Run
```shell
set CKEY={Your Consumer Key}
set CSEC={Your Consumer Secret}
dist\win-unpacked\iapi-sdk-desktop-gettingstarted.exe
```

## Usage
To get a proper working conference, launch two instances of this application using the same consumer key and secret in the same environment.
