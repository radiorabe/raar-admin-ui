# Raar-Admin-Ui

[![Build Status](https://github.com/radiorabe/raar-admin-ui/actions/workflows/build.yml/badge.svg)](https://github.com/radiorabe/raar-admin-ui/actions/workflows/build.yml)

An Angular web client for the Radio Archive [RAAR](https://github.com/radiorabe/raar) Admin Area.

## Development

Run `npm install` to install all the dependencies.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. The backend API must be running on `http://localhost:3000/`. See https://github.com/radiorabe/raar for corresponding instructions.

Run `ng serve` and `npm run cy:open` to open the Cypress test runner (browser tests) or `npm run cy:run` for a single run. The browser tests cover a good amount of the frontend's functionality.

Run `npm run build:prod` to build the project. The build artifacts will be stored in the `dist/` directory.

To keep Angular up-to-date, run `ng update` to get a list of available updates and follow the instructions. For the other dependencies, check `npm outdated`, adjust version numbers in `package.json` and update with `npm update`.

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
Copyright 2016-2023 Radio RaBe.
See `LICENSE` for further information.
