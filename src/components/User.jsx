import React,{useLayoutEffect,useState} from 'react'
import Img from '../goku3.jpg';
import {
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

const User = ({ user1,user,selectUser,chat }) => {
  const user2 = user?.uid
  const [data,setData] = useState("");
  const [screenSize ,setScreenSize] =useState("");
 
  useLayoutEffect(()=>{
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db,'lastMsg',id),doc =>{
      setData(doc.data());
    });
    return () => unsub()
  },[])
  useLayoutEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize',handleResize);

    handleResize();
    return () => window.removeEventListener('resize',handleResize);
  }, []);
  return (
    <>
    {screenSize > 576 ? (

    <div className={`user_wrapper ${chat.name === user.name && "selected user"} `} onClick={() => selectUser(user)} >
        <div className="user_info">
            <div className="user_detail">
            <img src={user.avatar || Img} alt="avatar" className="avatar" />
            <h4>{user.name}</h4>
            {data?.from  !== user1 && data?.unread &&(
              <small className="unread">New</small>
            )}
            </div>
            <div className={`user_status ${user.isOnline ? "online" : "offline"}`}></div>
        </div>
        {data && (
          <p className="truncate">
            <strong>{data.from === user1 ? "Me:" : null}</strong>
            {data.text}
          </p>
        )}
      
    </div>
    ):(

      <div
          onClick={() => selectUser(user)}
          className={`sm_container ${chat.name === user.name && "selected_user"}`}
        >
          <div className={`user_status ${user.isOnline ? "online" : "offline"}`}></div> 
          <img
            src={user.avatar || Img}
            alt="avatar"
            className="avatar sm_screen"
          />
          {data?.from  !== user1 && data?.unread &&(
                <small className="unread">New</small>
              )}
          {data && (
            <p className="truncate">
              <strong>{data.from === user1 ? "Me:" : null}</strong>
              {data.text}
            </p>
          )}
          
        </div>
    )}
    </>
  )
}

export default User