# Node, Express, Typescript, Typeorm, Postgress Boilerplate

## This boiler plate uses Node, Express, Typeorm, Postgress. There are 10 endpoints within the boilerplate to demonstrate how it works.

### Below is the folder structure

- src
  - config
- controllers
- entity
  - common
  - dtos
- interfaces
  - shared
- repository
- routes
- services
- utils
  - error
  - helpers

To run the app

- Create a database locally with the name `bookvender`
- Clone the `.env.template` file and rename to `.env.development`
- add all the env configurations
- run `yarn watch` on a a terminal
- run `yarn dev` on a separate terminal

The project to start on the port:6000 or the port provided in the .env.development file
