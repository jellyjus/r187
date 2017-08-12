"use strict"

const builder = require("electron-builder");
const Platform = builder.Platform;


builder.build({
    targets: Platform.WINDOWS.createTarget(),
    config: {
        directories: {
            buildResources: './client/build/',
            output: 'electron-build'
        }
    }
})
    .then(() => {
        console.log('COMPLETE')
    })
    .catch((error) => {
        console.log('error', error)
    });
