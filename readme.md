# User Layout

This module is in testing.

If you are pulling for development, you will need to create a symlink for the project and have the example project link to it.
in user-layout:
npm link

then, in user-layout/example-project:
npm link user-layout

you should then be capable of npm start from the user-layout directory or straight from the example-project directory.