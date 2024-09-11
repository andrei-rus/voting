import { Users } from './../services/Users.js'

const users = new Users();

export const doLogin = async (req, res, next) => {
  const user = await users.getUserByUsername({username: req.body.username})

  console.log(req)

  if (user?.password === req.body.password) {
    res.send(true)
  } else {
    res.send(false)
  }
}

export const doLogout = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(req)

  if (username === 'username' && password === 'password') {
    res.send(true)
  }

  res.send(false)
}