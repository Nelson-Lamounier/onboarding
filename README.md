# Dummy Api

This is a dummy api for you to work with. It can be used with Docker, using the
following command:

```bash
docker build -t dummy-api .
docker run -d -p 5000:80 dummy-api
```

This will start the api on port 5000.

The api has a single endpoint: `/{name}/fruits`, where `{name}` is a your name.
This endpoint will require a `POST` request with a JSON body containing a fruit
and an amount. For example:

```json
{
  "fruit": "apple",
  "amount": 5
}
```

the API will respond with a message saying how many fruits you have. For
example:

```json
{
  "message": "Hi {name}, you have ordered 5 of apple."
}
```

The API will also respond with a 400 status code if the request is not valid.

# Task

Write a single page application that will allow the user to input their name and
order fruits. The application should display the message from the API.
Additionally, the application should display an error message if the request is
not valid, or the success message if the request is successful.

You have the freedom to design the application as you see fit. You can use any
style, as long as you use React. You can use any libraries you want, but you
should not use any boilerplate code.

This task is designed to test your ability to work with React and APIs, so the
style of the application should not be your main concern.

Try to have fun with this task! If you have any questions, feel free to ask me
(Lorenzo) or Manu.
