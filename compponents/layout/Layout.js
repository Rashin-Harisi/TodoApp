import Link from "next/link";
import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { signOut, useSession } from "next-auth/react";
import { FiLogOut,FiLogIn } from "react-icons/fi";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();
  const logoutHandler = () => {
    signOut();
    router.push("/");
  };
  const signinHadler= ()=>{
    router.push('/signin')
  }

  return (
    <div className="container">
      <header>
        <p>Todo App</p>
        {status === "authenticated" ? (
          <button onClick={logoutHandler}>
            Logout
            <FiLogOut />
          </button>
        ) : (
            <button onClick={signinHadler}>Sign in
              <FiLogIn />
            </button>          
        )}
      </header>
      <div className="container--main">
        <aside>
          <p>Welcome 🖐</p>
          <ul>
            <li>
              {" "}
              <VscListSelection /> <Link href="/">Todos</Link>
            </li>
            <li>
              {" "}
              <BiMessageSquareAdd /> <Link href="/add-todo">Add Todo</Link>
            </li>
            <li>
              {" "}
              <RxDashboard /> <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
};

export default Layout;
