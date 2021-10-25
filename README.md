# Introdution

This project is an API to feed frontend application developed to supply TRTRN-21 demands. This demand was a sistem that to make access control both visitants and employees.

# Why was developed?

I'm a student of IFRN (Instituto Federal do Rio Grande do Norte) and I need to develop a tool using a API and a web application to the TRTRN-21.
This aplication is in production on this [link](https://caf-node-api.herokuapp.com/v2). The web app that consumes this API service is in production on [here](https://caf-next-web.herokuapp.com/) and the repository is [here](https://github.com/Rharuow/caf-web-heroku)

# How can I run this project?

1. First, clone this repository

```
  git clone https://github.com/Rharuow/caf-api-node
```

2. After that, enter the folder and install dependencies using npm or yarn

NPM case:

```
  cd caf-api-node && npm install
```

YARN case:

```
  cd caf-api-node && yarn
```

3. Copy and paste .env.example file as .env file and fill the environment variables

```
  cp .env.example .env
```

4. Finally, run the server with npm or yarn

NPM case:

```
  npm run dev
```

YARN case:

```
  yarn dev
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
