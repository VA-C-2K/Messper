import React from 'react'
import Attachment from '../components/svg/Attachment';

const MessageForm = ({handleSubmit,text,setText,setImg}) => {
  return (
    <form className="message_form" onSubmit={handleSubmit}>
        <label htmlFor="img">
            <Attachment />
        </label>
        <input 
        onChange={(e) => setImg(e.target.files[0])}
        type="file" 
        accept='image/*' 
        id="img" 
        style={{display:'none'}}/>
        <div>
            <input type="text"  placeholder='Message' value={text} onChange={e=>setText(e.target.value)} />
        </div>
        <div>
            <button style={{background:'rgb(49, 49, 49)',color:"#fff",fontWeight:"400"}} className="btn">Send</button>
        </div>
    </form>
  )
}

export default MessageForm