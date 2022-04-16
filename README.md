
## Getting Started

This template is designed to be installed inside a Codio box. To to this, open the terminal and run the following command:

```
$ curl -sL https://bit.ly/3htttku | bash
```

This will configure the box ready for you to start development.

> The process can take up to 15 min. Make sure you don't close the browser tab _or let your computer go into sleep mode_.

## To run the server:

```shell
$ deno run --allow-all --unstable index.js
```

## To run the Database:
The website database has been added with a root password of `p455w0rd`.

```shell
$ mysql -u root -p website
```


## Frequently-Asked Questions

If you get stuck your first step should be to see if this is a problem that others have already encountered. There is a comprehensive FAQ document that gives solutions to the most common problems.

[Frequently-Asked Questions](https://docs.google.com/document/d/1b_lTA_ay0Yi46annuNnZ6fK1nIe_ddszmPua1Wwvfa0/edit?usp=sharing)

## Run the coverage
There is a shell script prepared for that, simply run 
```shell
$ sh/coverage.sh
```

## lint
```shell
$ deno lint --unstable --config deno.json
```

## Test the project
Coverage already tests the project, but if you want to do it separately, run:
```shell
$ deno test --allow-all --unstable --import-map './test.json' ut/
```

## Create Documentation
There is a shell script prepared for that, simply run 
```shell
$ sh/jsDoc.sh
```

## Run UATs
There is a shell script prepared for that, simply run (Note that it is not possible to run it on this environment)
```shell
$ sh/runAllUATs.sh
```

## Connect to online database
To connect to the online database Use this command and insert `cfR6lA2pnn` as the password
```shell
$ mysql -u sql4486255 -p -h sql4.freemysqlhosting.net sql4486255
```

## Project online
The website is on [https://instantparcel.herokuapp.com](`https://instantparcel.herokuapp.com`)

## GitHub
I am using three githubs repositories (you can see them by running `git remote -v`):
The Main one
The Heroku repository
The Repository with the gitActions (To test the project and pushing to heroku automatically)