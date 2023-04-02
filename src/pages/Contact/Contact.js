/* eslint-disable jsx-a11y/iframe-has-title */
import emailjs from '@emailjs/browser';
import React, { useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Style from './css/Contact.module.css';



function Contact() {

  const [formData, setFormData] = useState({
    username : "",
    email : "",
    message : ""
  });
  const [loading, setLoading] = useState(false);
  const {username, email, message} = formData
  const form = useRef();
  const [notify, setNotify] = useState(false)
  const [response, setResponse] = useState("");
  const sendEmail =  (e) => {
    setLoading(true);
    e.preventDefault();

     emailjs.sendForm('service_dak4xfs', 'template_c5h9kp1', form.current, 'KTqgqrRo-oyLeGr0V')
      .then((result) => {
          setResponse("Message Sent Successful");
          setLoading(false)
      }, (error) => {
          setResponse("Message Sent Faild")
          setLoading(false)
      });

      setFormData({
        username : "",
        email : "",
        message : ""
      })
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }
  
  return (
    <div className={Style.contactUsSection}>
      <div className={Style.contactUsContainer}>
        <div className={Style.googleMap}>
        <iframe width="100%" height="100%" id="gmap_canvas" src="https://maps.google.com/maps?q=narayanganj&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
        </div>

        <div className={Style.contactForm}>
        {response && <div className={`${Style.notification} ${
        notify && `${Style.active}`}`}>
          <h3>{response}</h3>
          <RxCross2 onClick={() => {setNotify(true)}}/>
          </div>}
          <h2>Contact Us</h2>
          <p>Ask Your Question</p>
          <form onSubmit={sendEmail} ref={form}>
            <span>
              <label htmlFor="username">Your Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your name"
                onChange={(e) => handleChange(e)}
                value={username}
              />
            </span>
            <span>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                onChange={(e) => handleChange(e)}
                value={email}
              />
            </span>
            <span>
              <label htmlFor="message">Your Message</label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                placeholder="Enter your message"
                onChange={(e) => handleChange(e)}
                value={message}
              ></textarea>
            </span>
            <button type="submit">{loading ? "Loading..." : "Submit Form"}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact;