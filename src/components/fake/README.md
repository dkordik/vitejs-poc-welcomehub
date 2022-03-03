# Fake

A simple component useful as a template to copy/paste from.

It uses a built in template loaded as string, and thus it is well suited for for internal-to-application usage (as the html loading into string is handled by the assumed `rollup` based build system and html loader)

It has an empty `slot`-ed html `template` and basic css (to be consumed globally at the application level as this is a app component)

## How to wire into App

This component is not wired into the application (as its fake :P). In order to do so the `js` and `css` need to be included (`html` is internally wired in the component - again, as an application component this is assumed).

### CSS

The main application assumes the `css` `@import` chain is the normal and appropriate path for `css` inclusion. the applications `index.css` includes the primary style inclusions.

CSS is written in application terms and, as an application component template, this css is intended to be globals consumed by the app itself.

```css
@import url('components/fake/fake.css');
```

### JS

The application main entry point, after `rollup`, is into `index.js`. This is where the primary includes for javascript modules should be

```javascript
import { Fake } from './components/fake/fake.js'
```

## Dev env stuff

The main `rollup` application can be built and run via:

```shell
npm i
npm run build
```

Followed by your preferred choice of hosting, such as via VSCode Live-Server plugin or via command line `http-server` npm module.

`Rollup` also supports watch mode which can be run via:

```shell
npm run start
```

After build, the `/dist` directory will be populated and the root of the hosted web application (such as http://localhost:1977/dist)
