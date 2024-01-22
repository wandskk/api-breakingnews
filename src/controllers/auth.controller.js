import bcrypt from "bcryptjs";
import { AuthService } from "../services/auth.service.js";

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await AuthService.findByEmailService(email);

      if (!user) res.sendStatus(404).send({ error: "User or password not found" });

      const passwordIsValid = await bcrypt.compare(password, user.password);

      if (!passwordIsValid)
        res.sendStatus(404).send({ error: "User or password not found" });

      const { id } = user;
      const token = AuthService.gerateTokenService(id);

      res.send({ token });
    } catch (error) {
      res.sendStatus(500).send({ error: error.message });
    }
  },
};

export default authController;
