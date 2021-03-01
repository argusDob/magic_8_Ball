# magic-8-ball

## Project scope

This project is a simple Vue application that communicates with a third party via Axios library. The user types a question and the Server responds with an answer.

## Project functionalities

1. The user fills in a text input with a question.
2. If the input text is empty and/or the inputs text is not question the client does not send any request to the server.
4. If the input text incudes a question the server responds with an answer and the user can see that response on the screen.
5. A spinner/loader between the requests.
6. Last ten questions/answer history.
7. The user can reset the history.
8. Error handling

## Project technologies

- Vue
- Javascript
- HTML
- CSS
- AXIOS
- Vuex


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
