# Adding frontend to our node app via React

We will be using [Create React App](https://github.com/facebook/create-react-app) for initiating our project. This Frontend react app will live at the root of your node app. Look below for file structure.

1. From your Node app root run the command below in bash/terminal

```
npx create-react-app frontend
cd frontEnd
npm start
```

Should see the react logo in browser if successful

2. We are going to use bootstrap 4 in our project for ease, for more info [Click here](https://getbootstrap.com/docs/4.0/getting-started/introduction/). Replace index.html with code below.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
      crossorigin="anonymous"
    />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script
      src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
      integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
      integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
      integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
```

3. Create `components` folder within the `src` folder

4. Create `Header` folder, inside create a `Header.js`

5. Using bootstrap's navbar, Add code below to `Header.js`

```js
import React from "react";
function Header() {
  return (
    <nav class="navbar navbar-dark bg-primary">
      <div className="row col-12 d-flex justify-content-center text-white">
        <span className="h3">Sign Up</span>
      </div>
    </nav>
  );
}
export default Header;
```

6. Import Header into `App.js` replacing its contents with the code below

```js
import React from "react";
import Header from "./components/Header/Header";
function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}
```

Now go look in browser, expect to see header.

7. Create `SignUp` folder in `components` adding code below.

```js
import React, { useState } from "react";
function SignUp(props) {
  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form>
        <div className="form-group text-left">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
}
```

This will add our required inputs.

We will be using react's useState hook, Assuming you have basic knowledge of react hooks, for more info [Click here](https://reactjs.org/docs/hooks-intro.html).

8. Update `SignUp.js` with code below.

```js
import React, { useState } from "react";

export default function SignUp(props) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form>
        <div className="form-group text-left">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={user.email}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
}
```

9. Add click event handler below anywhere above return statement.

<details>
<summary>Details </summary>

1. We check if password matches confirm password
2. Make the call `sendDetailsToServer` function (Not defined yet). This will make our backend api request.
</details>

```js
const handleSubmitClick = (e) => {
  e.preventDefault();
  if (state.password === state.confirmPassword) {
    sendDetailsToServer();
  } else {
    props.showError("Passwords do not match");
  }
};
```

10. Add to button our handler like below

```js
<button type="submit" className="btn btn-primary" onClick={handleSubmitClick}>
  Sign Up
</button>
```

We will be using `axios`, an npm module for async request. Click [here](https://www.npmjs.com/package/axios) for more info.

11. Run command below in terminal inside 'frontEnd' folder/dir.

```
npm i --save axios
```

12. Create constants folder at frontEnd `src` dir, Add apiConstants file adding code below

```js
export const API_BASE_URL = "http://localhost:4000/user/";
export const ACCESS_TOKEN_NAME = "login_access_token";
```

12. Add functions and imports below to Sign Up form

```js
import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants/apiConstants";

export default function SignUp(props) {
  // ...
  const sendDetailsToServer = () => {
    if (user.email.length && user.password.length) {
      props.showError(null);
      const payload = {
        email: user.email,
        password: user.password,
      };
      axios
        .post(API_BASE_URL + "/user/register", payload)
        .then(function (response) {
          if (response.status === 200) {
            setUser((prevState) => ({
              ...prevState,
              successMessage:
                "Registration successful. Redirecting to home page..",
            }));
            redirectToHome();
            props.showError(null);
          } else {
            props.showError("Some error ocurred");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      props.showError("Please enter valid username and password");
    }
  };
  const redirectToHome = () => {
    props.updateTitle("Home");
    props.history.push("/home");
  };
  // ...
}
```

13. Setup Client side routing by installing react-router-dom

```
npm i react-router-dom@5.2.0
```

- Add routing to `App.js` like code below

```js
import React from "react";
import Header from "./components/Header";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <SignUp />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
```

14. run npm start command, then we should see the sign up form in the home page route.
