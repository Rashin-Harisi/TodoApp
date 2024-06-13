import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function User() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [details,setDetails] = useState([])
  const router = useRouter();
  //console.log(details)
    
  useEffect(()=>{
    userFetch()
  },[router.query.userId])

  useEffect(() => {
    if(details){
        setName(details.name)
        setLastName(details.lastName)
        setEmail(details.email)
    }
  }, [details]);
  const userFetch= async()=>{
    const res= await fetch('/api/user');
    const data= await res.json();
    setDetails(data.data)
  }

  const editHandler=async()=>{
    const res= await fetch('/api/user',{
        method: "PATCH",
        body: JSON.stringify({name,lastName,email}),
        headers: {
            "Content-Type": "application/json",
          },
    })
    const data= await res.json();
    console.log(data);
    if (data.status === "success"){ userFetch()}
    router.push('/profile')
  }
  return (
    <>
      <div className="profile-form__input">
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="last-name">Last Name: </label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <button onClick={editHandler}>Edit</button>
    </>
  );
}

export default User;
