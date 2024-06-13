import Link from 'next/link'
import React from 'react'
import { RiEditLine  } from "react-icons/ri";


const ProfileData = ({data}) => {
  //console.log("data",data.id)
  return (
    <div className='profile-data'>
        <div>
            <span>Name : </span>
            <p>{data.name}</p>
        </div>
        <div>
            <span>Last Name : </span>
            <p>{data.lastName}</p>
        </div>
        <div>
            <span>Email : </span>
            <p>{data.email}</p>
        </div>

        <Link href={`/user/${data.id}`}><button>Edit Profile <RiEditLine/></button></Link>
    </div>
  )
}

export default ProfileData