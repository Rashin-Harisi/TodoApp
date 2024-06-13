import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import User from "@/models/User";


async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB!" });
  }
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.send({
      error: "You are not Logged in!",
    });
  }
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exist!" });
  }

  if (req.method === "GET") {

    res.status(200).json({ status: "success", data: user });

  } else if (req.method === "PATCH") {
    const { name,lastName,email} = req.body;
    const updatedData = await User.updateOne(
      { "email": session.user.email },
      {
        $set: {
          name: name,
          lastName: lastName,
          email:email,
        },
      }
    );
    res
      .status(200)
      .json({
        status: "success",
        message: "Profile is edited",
        data: updatedData
      });
  } 
}
export default handler;
