const jwt = require("jsonwebtoken");
const config = require("../config");
let verificatoken = (req, res, next) => {
  let token = req.headers["token"];
  if (!token) {
    return res.status(401).json({
      auth: false,
      msg: "Debe introducir un token",
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err,
      });
    }

    // El usuario de decoded.usuario es el que ponemos en jwt.sign(usuario)
    usuariodevuelto = decoded.usuario;
    console.log(decoded);
    next();
  });
};

module.exports = {
  verificatoken,
};
