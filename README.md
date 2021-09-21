# Dolby.io Communications SDK for Desktop Getting Started app

This is the sample app from the NDS app used in the
[Getting Started](https://docs.dolby.io/interactivity/docs/getting-started-with-nds) article. 

You can find additional reference documentation here:
- [JavaScript Reference](https://docs.dolby.io/interactivity/docs/js-client-sdk-voxeetsdk)

## Run this project

Clone the repo:

```bash
git clone https://github.com/voxeet/comms-sdk-desktop-gettingstarted
```

Navigate to the folder:

```bash
cd comms-sdk-desktop-gettingstarted
```

Install the dependencies:

```bash
npm install
```

Open the file `src/scripts/client.js` and locate the `VoxeetSDK.initialize('customerKey', 'customerSecret');` function.  
Replace the `customerKey` and `customerSecret` strings with your Consumer Key and Consumer Secret.

Run the project:

```bash
npm run start
```
