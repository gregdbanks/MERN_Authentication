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

1. From your Node app root run the command below in bash/terminal
```
npx create-react-app frontend
cd frontEnd
npm start
```
Should see the react logo in browser if successful

2. We are going to use bootstrap 4 in our project for ease, for more info [Click here](https://getbootstrap.com/docs/4.0/getting-started/introduction/). Replace index.html with code below.
```js
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
    <link rel="stylesheet" 
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" 
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" 
          crossorigin="anonymous">
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>
```

3. Create `components` folder within the `src` folder

4. Create `Header` folder, inside create a `Header.js`

5. Using bootstrap's navbar, Add code below to `Header.js`
```js
import React from 'react';
function Header() {
    return(
        <nav class="navbar navbar-dark bg-primary">
            <div className="row col-12 d-flex justify-content-center text-white">
            <span className="h3">Sign Up</span>
            </div>
        </nav>
    )
}
export default Header;
```

6. Import Header into `App.js` replacing its contents with the code below
```js
import React from 'react';
import Header from './components/Header/Header';
function App() {
  return (
    <div className="App">
      <Header />
    </div>
  )
}
```
Now go look in browser, expect to see header.

7. Create `SignUp` folder in `components` adding code below. 
```js
import React, {useState} from 'react';
function SignUp(props) {
  return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email"
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}
```
This will add our required inputs.

We will be using react's useState hook, Assuming you have basic knowledge of react hooks, for more info [Click here](https://reactjs.org/docs/hooks-intro.html). 

8. Update `SignUp.js` with code below. 
```js
import React, {useState} from 'react';

export default function SignUp(props) {
    const [user , setUser] = useState({
        email : "",
        password : ""
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setUser(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
  return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={user.email}
                       onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}
```

