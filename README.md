# TP-Link Web App

## A webapp to connect with the TP-Link cloud.

Control your smart home without the need for an Android or iOS App!
Developed in Nuxt.js

![enter image description here](https://i.imgur.com/HKZilrh.png)

## Why won't it let me log in?

TP-Link's cloud uses outdated certificates. These are no longer supported by browsers.
https://really-simple-ssl.com/chrome-and-firefox-ending-support-for-legacy-symantec-certificates/
There is nothing I can do to fix this, as I have no control over either TP-Link or the Web Browser.

**How do I fix it?**
On browsers such as Firefox and Edge, you can navigate to their cloud URLs and add exceptions.
https://wap.tplinkcloud.com/
https://use1-wap.tplinkcloud.com/
On chrome, your best bet is to email them and ask them to update their certificates!

## Build/Develop

Development Server

    npm install
    npm run dev
    
Generate static files

    npm run generate
    
files will be dumped into /dist folder.
