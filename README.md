# Raar-Admin-Ui

[![Build Status](https://github.com/radiorabe/raar-admin-ui/actions/workflows/build.yml/badge.svg)](https://github.com/radiorabe/raar-admin-ui/actions/workflows/build.yml)

An Angular web client for the Radio Archive [RAAR](https://github.com/radiorabe/raar) Admin Area.

## Development

Install dependencies with `npm install -g @angular/cli` and `npm install`.

For the dev server, run `ng serve`. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. The backend API must be running on `http://localhost:3000/`. See https://github.com/radiorabe/raar for corresponding instructions.

For tests with Cypress, run `ng serve` and `npm run cy:open` to open the Cypress test runner (browser tests) or `npm run cy:once` for a single run. The browser tests cover a good amount of the frontend's functionality.

To build the project, run `npm run build:prod`. The build artifacts will be stored in the `dist/raar-admin-ui` directory.

To keep Angular up-to-date, run `ng update` to get a list of available updates and follow the instructions. For the other dependencies, check `npm outdated`, adjust version numbers in `package.json` and update with `npm update`.

The source code is formatted with Prettier. After updates, run `npx prettier . --write` to auto format the code.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Deployment

Run the following command to build and deploy the frontend. You need a correct
SSH host alias called `archiv` pointing to your server.

```bash
$ ./deploy.sh
```

## License

raar-admin-ui is released under the terms of the GNU Affero General Public License.
Copyright 2016-today Radio RaBe.
See `LICENSE` for further information.
