
# Getting Started

This template is designed to be installed inside a Codio box. To to this, open the terminal and run the following command:

```
$ curl -sL https://bit.ly/3htttku | bash
```

This will configure the box ready for you to start development.

> The process can take up to 15 min. Make sure you don't close the browser tab _or let your computer go into sleep mode_.

To run the server:

```shell
$ deno run --allow-all --unstable index.js
```

The website database has been added with a root password of `p455w0rd` and a single **accounts** table which is pre-configured with a single account:

username: `doej`

password: `p455w0rd`

There is a secure page called **Foo Bar** which can be accessed at the `/foo` route. You will need to delete this and replace with your own secure content.

## Frequently-Asked Questions

If you get stuck your first step should be to see if this is a problem that others have already encountered. There is a comprehensive FAQ document that gives solutions to the most common problems.

[Frequently-Asked Questions](https://docs.google.com/document/d/1b_lTA_ay0Yi46annuNnZ6fK1nIe_ddszmPua1Wwvfa0/edit?usp=sharing)
