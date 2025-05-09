import { User } from "../../models/user/usermodles.js";
import bcrypt from "bcrypt";
import { genratToken } from "../../utils/jwtsigntoken.js";
const loginControler = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!(email && password)) {
    return res.status(403).send({ message: "Required email or password" });
  }
  try {
    const userIsExist = await User.findOne({ email });
    if (!userIsExist) {
      return res.status(404).send({ message: " User Not Found" });
    }
    const passwordIsMatch = await bcrypt.compare(
      password,
      userIsExist.password
    );
    if (!passwordIsMatch) {
      return res.status(400).json({ message: "Invelid Cradintional" });
    }
    const token = genratToken(userIsExist._id);
    console.log(token);
    return res.json({
      token: token,
      username: userIsExist.username,
      userpic: userIsExist.profilepicture,
      message: "Login Successfully",
    });
  } catch (error) {
    return console.log(error.message);
  }
};
export default loginControler;
