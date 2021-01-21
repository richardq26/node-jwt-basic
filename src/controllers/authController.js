const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { verificatoken } = require("../middlewares/autenticacion");

router.post("/signup", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  await user.save((err, usuariodb) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      auth: true,
      usuario: usuariodb,
      msg: 'Usuario registrado!'
    });
  });
});
router.post("/signin", (req, res, next) => {
  User.findOne({ email: req.body.email }, async (err, usuariodb) => {
    if (err) {
      return res.status(400).json({ ok: false, err });
    }
    if (!usuariodb) {
      return res.status(404).json({ ok: false, msg: "El usuario no existe" });
    }
    const valido = await usuariodb.validatePassword(req.body.password);
    if (!valido) {
      return res.status(400).json({ ok: false, msg: "Clave incorrecta" });
    }
    const token = jwt.sign({ usuario: usuariodb }, config.secret, {
      expiresIn: 60 * 60 * 24,
    });
    res.json({
      auth: true,
      usuario: usuariodb,
      token,
    });
  });
});
router.get("/me", verificatoken, (req, res) => {
  res.json(usuariodevuelto);
});
module.exports = router;
