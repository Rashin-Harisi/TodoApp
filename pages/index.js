import HomePage from "@/compponents/templates/HomePage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";

export default function Home() {
  const session = useSession();
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();
  console.log(session.status);
  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.replace("/signin");
    } else if (session.status === "authenticated") {
      setIsLogged(true);
    }
  }, [session.status]);
  return (
    <div>
      {session.status === "loading" ? (
        <div className="spinner">
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="#3f47f4"
            ariaLabel="triangle-loading"
          />
        </div>
      ) : null}
      {isLogged ? <HomePage /> : null}
    </div>
  );
}

