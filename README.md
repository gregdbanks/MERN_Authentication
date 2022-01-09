<!-- # Node_MVP :smiley:
Guide for making authentication API utilizing json web tokens

# What is JWT and why is it useful?

JWT is useful for Authorization and Information exchange. Can be sent via URL/ Post request/HTTP Header which makes it fast for transmission and usable. It contains the details of user (not session id in cookies like traditional request) so , :drum: :drum: :drum: , NO need to query database to get user details.


# What to Know?
You should know the basics of javascript and node, so this guide assumes both.

We will be using MongoDB Atlas Cloud Database to store our users. [For more info...](https://docs.atlas.mongodb.com/)

<details>
<summary>Instructions for MongoDB Atlas </summary>

1. Visit [Official Docs](https://docs.atlas.mongodb.com/) , After signing up, click on `+ New Project`
2. Name your project
3. Click `Create Project`
4. Click `Build a Database`
5. Select FREE tier and click `Create`
6. Choose a cloud provider, I chose AWS, but any will do
7. Choose a region, any
8. Scroll to the bottom and click `Create Cluster` (could take several minutes)
9. Create a User, entering in a username and password and then clicking `Create User`
10. Select where you would like to connect from, select local, and then click `Add My Current Ip Address`
11. Click `Finish and Close` at the bottom of page
12. In Database Deployments Click the `Connect` button next to your cluster name
13. Click `Connect your application`, here is where you can get your connection string. :smile:


</details>

---

<details>
<summary>What NPM packages will we be using?</summary>

> [express](http://expressjs.com/)

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications

> [express-validator](https://express-validator.github.io/docs/)

To Validate the body data on the server in the express framework, we will be using this library. It's a server-side data validation library. So, even if a malicious user bypasses the client-side verification, the server-side data validation will catch it and throw an error.

> [bcryptjs](https://www.npmjs.com/package/bcrypt)

This library will be used to hash the password and then store it to database.This way even app administrators can't access the account of a user.

> [JWT](https://jwt.io/)

JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA. You can specify how much time that token will last as well.

> [mongoose](https://mongoosejs.com/docs/)

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

> [body-parser](https://www.npmjs.com/package/body-parser)

A Node middleware for parsing request.body data (JSON).

> [dotenv](https://www.npmjs.com/package/dotenv)

Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

</details> -->

# Adding frontend to our node app via React

We will be using [Create React App](https://github.com/facebook/create-react-app) for initiating our project. This Frontend react app will live at the root of your node app. Look below for file structure.

1. From your Node app root, run the command below in bash/terminal

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
    <nav className="navbar navbar-dark bg-primary">
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

- We check if password matches confirm password
- Make the call `sendDetailsToServer()` (Not defined yet). This will make our backend api request.
</details>

```js
const handleSubmitClick = (e) => {
  e.preventDefault();
  if (user.password === user.confirmPassword) {
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
        .post(API_BASE_URL + "signup", payload)
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
import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import SignUp from "./components/SignUp/SignUp";
import Alert from "./components/Alert/Alert";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
      <div className="App">
        <Header title={title} />
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <SignUp
                showError={updateErrorMessage}
                updateTitle={updateTitle}
              />
            </Route>
          </Switch>
          <Alert errorMessage={errorMessage} hideError={updateErrorMessage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
```

14. run npm start command, then we should see the sign up form in the home page route.

15. Make `Alert` folder in components folder, adding `Alert.js` and `Alert.css`

```js
// Alert.js

import React, { useState, useEffect } from "react";
import "./Alert.css";
function Alert(props) {
  const [modalDisplay, toggleDisplay] = useState("none");
  const openModal = () => {
    toggleDisplay("block");
  };
  const closeModal = () => {
    toggleDisplay("none");
    props.hideError(null);
  };
  useEffect(() => {
    if (props.errorMessage !== null) {
      openModal();
    } else {
      closeModal();
    }
  });

  return (
    <div
      className={"alert alert-danger alert-dismissable mt-4"}
      role="alert"
      id="alertPopUp"
      style={{ display: modalDisplay }}
    >
      <div className="d-flex alertMessage">
        <span>{props.errorMessage}</span>
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => closeModal()}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
}

export default Alert;
```

<details>
<summary>Code Details</summary>

- Notice we pass props as an argument, this will come from the parent Component using this Alert component
- We also use Reacts [useEffect](https://reactjs.org/docs/hooks-effect.html) hook which will wait for props to change from parent

</details>

16. Add code below to `Alert.css`

```css
/* ALert.css */
.alertMessage {
  min-width: 200px;
  justify-content: space-between;
}
```

Now that we have a sign up page, we need to be able to show a new user their home page after logging in. To protect that users info we can use session tokens.

17. Update sendDetailsToServer function in `SignUp.js` and add import from constants

```js
...
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../../constants/apiConstants";

...

  const sendDetailsToServer = () => {
    if (user.email.length && user.password.length) {
      props.showError(null);
      const payload = {
        username: user.username,
        email: user.email,
        password: user.password,
      };
      axios
        .post(API_BASE_URL + "signup", payload)
        .then(function (response) {
          if (response.status === 200) {
            setUser((prevState) => ({
              ...prevState,
              successMessage:
                "Registration successful. Redirecting to home page..",
            }));
            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
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
```

We use `localStorage.setItem` to store the token received from backend API to browser’s local storage.

18. Create `utils` folder at root of src, name it `PrivateRoute.js`, add code

```js
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from "../constants/apiConstants";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem(ACCESS_TOKEN_NAME) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
```

Here we make a generic Route checking for our token which we will use later for our `Home` route.

19. Create `Login` component folder, then `Login.js` file.

```js
import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../../constants/apiConstants";
import { withRouter } from "react-router-dom";

function Login(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    successMessage: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      email: state.email,
      password: state.password,
    };
    axios
      .post(API_BASE_URL + "login", payload)
      .then(function (response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            successMessage: "Login successful. Redirecting to home page..",
          }));
          localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
          redirectToHome();
          props.showError(null);
        } else if (response.status === 204) {
          props.showError("Username and password do not match");
        } else {
          props.showError("Username does not exists");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const redirectToHome = () => {
    props.updateTitle("Home");
    props.history.push("/home");
  };
  const redirectToRegister = () => {
    props.history.push("/register");
    props.updateTitle("Register");
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
            value={state.email}
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
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-check"></div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitClick}
        >
          Submit
        </button>
      </form>
      <div
        className="alert alert-success mt-2"
        style={{ display: state.successMessage ? "block" : "none" }}
        role="alert"
      >
        {state.successMessage}
      </div>
      <div className="registerMessage">
        <span>Dont have an account? </span>
        <span className="loginText" onClick={() => redirectToRegister()}>
          Register
        </span>
      </div>
    </div>
  );
}

export default withRouter(Login);
```

20. Create `Home` component folder, then `Home.js` file.

```js
import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { ACCESS_TOKEN_NAME, API_BASE_URL } from "../../constants/apiConstants";

function Home(props) {
  useEffect(() => {
    axios
      .get(API_BASE_URL + "me", {
        headers: { token: localStorage.getItem(ACCESS_TOKEN_NAME) },
      })
      .then(function (response) {
        if (response.status !== 200) {
          redirectToLogin();
        }
      })
      .catch(function (error) {
        redirectToLogin();
      });
  });
  function redirectToLogin() {
    props.history.push("/login");
  }
  return <div className="mt-2">Home page only user should see.</div>;
}

export default withRouter(Home);
```

Notice our useEffect function checks to make sure our token is NOT expired by sending it in the headers to our API.

21. Now lets update our `App.js` file to include our home and login component routes.

```js
import React, { useState } from "react";
import "./App.css";

import PrivateRoute from "./utils/PrivateRoute";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Alert from "./components/Alert/Alert";

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
      <div className="App">
        <Header title={title} />
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <SignUp
                showError={updateErrorMessage}
                updateTitle={updateTitle}
              />
            </Route>
            <Route path="/signup">
              <SignUp
                showError={updateErrorMessage}
                updateTitle={updateTitle}
              />
            </Route>
            <Route path="/login">
              <Login showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>
            <PrivateRoute path="/home">
              <Home />
            </PrivateRoute>
          </Switch>
          <Alert errorMessage={errorMessage} hideError={updateErrorMessage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
```

Notice our `Home` component is wrapped in our `PrivateRoute` requiring our user has a validated token.

22. Update `Header` component to include dynamic title, and Logout button.

```js
import React from "react";
import { withRouter } from "react-router-dom";

import { ACCESS_TOKEN_NAME } from "../../constants/apiConstants";

function Header(props) {
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  let title = capitalize(
    props.location.pathname.substring(1, props.location.pathname.length)
  );
  if (props.location.pathname === "/") {
    title = "Welcome";
  }
  function renderLogout() {
    if (props.location.pathname === "/home") {
      return (
        <div className="ml-auto">
          <button className="btn btn-danger" onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
      );
    }
  }
  function handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
    props.history.push("/login");
  }
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="row col-12 d-flex justify-content-center text-white">
        <span className="h3">{props.title || title}</span>
        {renderLogout()}
      </div>
    </nav>
  );
}
export default withRouter(Header);
```

The title is determined by which page, and the logout button only shows if you are on the home page.

Now you should have something fully functional, to test:

- user should be able to signup
- user should be able to login and see private home page.

# This wraps up the second part of this course and now you know how to use react with private routes and authentication on the client side.
