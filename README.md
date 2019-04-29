# Raar-Admin-Ui

[![Build Status](https://travis-ci.org/radiorabe/raar-admin-ui.svg?branch=master)](https://travis-ci.org/radiorabe/raar-admin-ui)

An Angular web client for the Radio Archive [RAAR](https://github.com/radiorabe/raar) Admin Area.

## Development

Run `npm install` to install all the dependencies.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng test` to run the unit tests of the project.

Run `ng build --prod` to build the project. The build artifacts will be stored in the `dist/` directory.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Smoke Tests

So far, there is no automatic test suite for raar-admin-ui. Click manually through the application to verify a basically correct behavior.

## Deployment

Run the following command to build and deploy the frontend. You need a correct
SSH host alias called `archiv` pointing to your server.

```bash
$ ./deploy.sh
```

## License

raar-admin-ui is released under the terms of the GNU Affero General Public License.
Copyright 2016-2019 Radio RaBe.
See `LICENSE` for further information.
