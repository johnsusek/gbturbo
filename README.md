# Giant Bomb Turbo

Customize giantbomb.com to your heart's content.

## Development

`npm install`

### Chrome

`npm run watch:dev:chrome`

### Firefox

`npm run watch:dev:firefox`

Extension files will end up in `dist/`

## Production

### Chrome

`npm run build:dev:chrome`
`npm run build-zip`

### Firefox

`npm run build:dev:firefox`
`npm run build-zip`

Built extension (a zip of `dist/`) will be placed into `dist-zip/`

## Release notes

### 0.3.0

- Remove header size feature, it broke with the new header re-design. New redesign has a non-obnoxious header size by default now.
- Remove Three Promo Strip and Popular toggles, as those sections have been removed from the homepage.

### 0.2.7

- Add toggle for Latest Premium section

### 0.2.6

- Fix issue with latest grid
- Fix issue with text wrapping in mini header thumbnail
- Fix issue with Upcoming background missing in mini header

### 0.2.5

- Fix issue when there are no upcoming shows

### 0.2.4

- Fix issue with mini header rendering

### 0.2.3

- Add mini header option
- Fix issue hiding/moving popular module

### 0.2.2

- Fix for firefox store

### 0.2.1

- Firefox support
- Bug fixes

### 0.1.0

- Make header smaller
- Hide homepage modules
- Sortable homepage modules
- Make "Latest" a grid
