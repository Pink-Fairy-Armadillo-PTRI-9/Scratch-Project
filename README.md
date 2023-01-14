# Scratch-Project instructions for setting up SQL

#### Fork and clone this repo

1. [ ] Open a terminal session and `cd` to the directory where you cloned this repo.

#### Install PostgreSQL

- If you haven't installed PostgreSQL during the precourse, follow the instructiosn linked below.

  - [MacOS & Linux](https://github.com/CodesmithLLC/dev-environment-setup/blob/main/mac-os.md#install-postgresql)
  - [Windows](https://github.com/CodesmithLLC/dev-environment-setup/blob/main/windows-os.md#install-postgresql)

- Go to your terminal and verify that you can run the psql command: `psql --version`

- If the psql command isn't recognized, you'll need to add it to your PATH.
  - Linux and Mac: add the line `export PATH=$PATH:/Library/PostgreSQL/latest/bin` to your `~/.bashrc` or `~/.bash_profile`, respectively, and restart your terminal. The exact path may vary so be sure to confirm the location of the postgresql binaries.
  - Windows (native): go to the advanced system settings to modify the PATH environmental variable to include the `bin` directory within the postgresql install directory.

#### Create an account on ElephantSQL

1. [ ] Go to [https://www.elephantsql.com/](https://www.elephantsql.com/), create an account, and create a new database instance. Make sure to select the free 'Tiny Turtle' plan.

![Create db gif](./docs/assets/images/create-sw-db.gif)

1. [ ] Grab the url of your new database so you can access it from the command line in your terminal.

![Copy url gif](./docs/assets/images/get-db-url.gif)

#### Create the tables and populate them with data

1. [ ] From the command line in your terminal, make sure your `pwd` (present working directory) is the top level of this repo.

1. [ ] Invoke `psql -d <url from elephantSQL> -f database.sql`. This will open the connection to your database and execute the SQL statements that will create tables in your database and populate them with rows of data. Make sure you let the script run all the way through. It will take a minute or two.

1. [ ] Here is the ER diagram of your database. The tables with purple headers are your core data tables, pulled down from the Star Wars API that you worked with in the Node unit. The tables in gray are associative entity (or 'join') tables that facilitate many-to-many relationships.

![Database Schema](./docs/assets/images/schema.png)
