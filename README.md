# Dolby.io Communications SDK for Desktop Getting Started app

This is the sample app from the NDS app used in the
[Getting Started](https://docs.dolby.io/communications-apis/docs/getting-started-with-desktop-sdk) article. 

You can find additional reference documentation here:
- [JavaScript Reference](https://docs.dolby.io/communications-apis/docs/js-client-sdk-voxeetsdk)

## Run this project

Clone the repo:

```bash
git clone https://github.com/dolbyio-samples/comms-sdk-desktop-getting-started
```

Navigate to the folder:

```bash
cd comms-sdk-desktop-getting-started
```

Install the dependencies:

```bash
npm install
```

Open the file `src/scripts/client.js` and locate the `VoxeetSDK.initializeToken` function.  
Generate a client access token from the Dolby.io dashboard and insert into access_token variable.

Run the project:

```bash
npm run start
```
