Yet a new admin app based on react boilerplate

Same same, but different :)

# STYLES

## Colors
the palette is being exported and used in theme.js

#Font icons
If you want to use a class, add one following this pattern to the global styles:
`
  .material-icon-removed-red-eye:before {
    content: "remove_red_eye";
  }
`
`remove_red_eye` was picked from https://material.io/icons/#ic_remove_red_eye

# Architecture

Containers -> stateless, connected to redux
Components -> state, reusable, unaware of redux

If a component is only used by one component, like in the Dashboard, then it should be placed inside that container folder

# sagas

For basic requests, use the generator sitting on utils/Sagas.js

# Generate code:

* generate a flow to make requests: yarn generate container will generate actions, sagas, constants, etc...
* generate a route: yarn generate route. For the moment just private.

# app basics:

* public pages: login

# Containers:

* Dashboard: This is the mother of the app and contains shared actions, constants, etc to send and receive messages.

# Commands:

*package.json* has everything :D
Some examples:
* `yarn start`
* `yarn start:ci`
* `yarn build`

## TODO:

# TOP PRIORITY
* add builder and list components (both accept an ashana list. List will have an onAddAshana which will add the ashana to the builder (via sagas and firebase))
* cleanup styles on global and theme
