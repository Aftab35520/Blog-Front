import emailjs from '@emailjs/browser';
import React, { useRef, useState } from 'react';
export default function Contact() {
  const [massage,setmassage]=useState("")

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_2teo3e7', 'template_4821jmv', form.current, {
        publicKey: 'rdwNKDnyWwB-Ams6n',
      })
      .then(
        () => {
          setmassage("thanks for contacting ")
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
      
      
  };
  return (
    <div className='w-full  bg-black h-dvh flex flex-col justify-center items-center'>
        <p className=' text-4xl text-green-500'>Contact Us</p>
        <form className=' p-6 flex flex-col w-2/5 contact' ref={form} onSubmit={sendEmail}>
            <input className=' h-10 mt-3 p-2 outline-none' type='text' name='first_name' placeholder='Enter Full Name'/>
            <input className=' h-10 mt-3 p-2 outline-none' type='text' name='email_' placeholder='Enter Email'/>
            <input className=' h-10 mt-3 p-2 outline-none' type='text' placeholder='Enter Country'/>
            <textarea className=' h-56 mt-3 p-2 outline-none' placeholder='Enter discription' name='message'/>
            <input className=' bg-green-500 text-white mt-3 p-2 cursor-pointer ' type='submit' value={"SEND"}/>
            <p className='text-blue-400 mt-3 ' onClick={()=>setmassage("")}>{massage}</p>
        </form>
    </div>
  )
}
