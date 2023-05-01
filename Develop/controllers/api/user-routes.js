const router = require("express").Router();
const { User } = require("../../models");

router.get("/", async (req, res) => {
    console.log('sup')
    try {
        const userData = await User.findAll();
        console.log(userData);
        res.json(userData)
    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
      console.log(newUser);

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.name = newUser.name;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
    try {
        console.log('login route');
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
        console.log(user);
    if (!user) {
      res.status(400).json({ message: "No user account found!" });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);
        console.log(validPassword);
    if (!validPassword) {
      res.status(400).json({ message: "No user account found!" });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.name = user.name;
      req.session.loggedIn = true;
    });
    res.json({ user, message: "You are now logged in!" });
    } catch (err) {
    console.log('last catch')
    res.status(400).json({ message: "No user acccount found!" });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
