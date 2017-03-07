# nanowrimo

Nanowrimo has stopped. I needed something to boost writing motivation. So I created my own.

> A Vue.js project linked with Firebase 

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Config

The config file has been gitignored to not post the credentials everywhere.

```
# src/config.js

const Config = {
  apiKey: '...',
  authDomain: '...',
  databaseURL: '...',
  storageBucket: '...',
  messagingSenderId: '...',
};

module.exports = Config;
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
