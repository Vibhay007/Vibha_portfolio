import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // success/error messages
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);

  const emailData = { ...formData, time: new Date().toLocaleString() };

  emailjs
    .send(
      "service_cpallqd",
      "template_0dabbwf",
      emailData,
      "3g478QAJbTLN8PnTh"
    )
    .then(
      () => {
        toast.success("Message sent successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setFormData({ name: "", email: "", message: "" });
        setLoading(false);
      },
      (error) => {
        toast.error("Failed to send message. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log(error);
        setLoading(false);
      }
    );
};

 return (
  <section className="contact" id="contact">
    <h2>Contact</h2>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <textarea
        name="message"
        rows="5"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        required
      ></textarea>

      <button className="btn" type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>

    {/* Toast Container */}
    <ToastContainer />
  </section>
);
};

export default Contact;