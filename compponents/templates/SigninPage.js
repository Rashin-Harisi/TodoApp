import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()
  const session = useSession();
  console.log(session)
  useEffect(() => {
    if (session.status === "authenticated") router.push('/')
  }, [session.status]);

  const signInHandler = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    //console.log("res", res);
    if (res.ok) {
      toast.success("Login was successful");
      router.replace("/");
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
  }



  return (
    <div className="signin-form">
      <h3>Sign in Form</h3>
      <input
        type="text"
        placeholder="Email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signInHandler}> Sign in</button>
      <div>
        <p>Create an account?</p>
        <Link href='/signup'>Sign up</Link>
      </div>
    </div>
  );
};

export default SigninPage;
