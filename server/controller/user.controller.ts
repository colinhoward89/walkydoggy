"use strict";
const User = require("../models/user.js");

exports.login = async (
  req: {
    body: { username: string; password: string };
    session: { uid: string };
  },
  res: {
    status: (arg0: number) => {
      send: {
        (arg0: { res?: string; error: boolean; message?: string }): void;
      };
    };
  },
  next: any
) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ res: "Missing fields!", error: true });
  }
  try {
    const user = await User.findOne({ username: username });
    if (user.password === password) {
      req.session.uid = user._id;
      res.status(200).send({ res: user, error: false });
    } else {
      return res.status(401).send({
        error: true,
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    res
      .status(401)
      .send({ message: "Username or password is incorrect", error: true });
  }
};

exports.create = async (
  req: { body: { email: string; username: string }; session: { uid: string } },
  res: {
    status: (arg0: number) => {
      send: { (arg0: { error: boolean; message: string }): void };
    };
  },
  next: any
) => {
  const { email, username } = req.body;
  const userEmail = await User.findOne({ email: email });
  const userUsername = await User.findOne({ username: username });
  if (userEmail) {
    return res
      .status(409)
      .send({ error: true, message: "User with this E-mail already exists" });
  } else if (userUsername) {
    return res
      .status(409)
      .send({ error: true, message: "Username already exists" });
  }
  try {
    const newUser = new User({ ...req.body });
    const user = await newUser.save();
    req.session.uid = user._id;
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: true, message: "Could not create user" });
  }
};

exports.profile = async (
  req: { params: { user: string } },
  res: {
    status: (arg0: number) => {
      send: {
        (arg0: { res?: string; error: boolean; message?: string }): void;
      };
    };
  },
  next: any
) => {
  try {
    const username = req.params.user;
    const findUser = await User.findOne({ username: username });
    if (findUser) {
      res.status(200).send({ res: findUser, error: false });
    } else {
      res.status(404).send({ message: "User not found", error: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error", error: true });
  }
};

exports.logout = (
  req: { session: { destroy: (arg0: (error: any) => void) => void } },
  res: {
    status: (arg0: number) => {
      send: { (arg0: { error: boolean; message: string }): void };
    };
    clearCookie: (arg0: string) => void;
  },
  next: any
) => {
  req.session.destroy((error: any) => {
    if (error) {
      res
        .status(500)
        .send({ error: true, message: "Could not log out, please try again" });
    } else {
      res.clearCookie("sid");
      res.status(200).send({ error: false, message: "Logout successful" });
    }
  });
};
