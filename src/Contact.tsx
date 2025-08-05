import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';

export default function ContactPage() {
  const [formData, setFormData] = useState<any>({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev: FormData) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  

  function handleSubmit(e:any) {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  }

  // Variants for form container
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  // Variants for each input
  const inputVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-sky-50 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Navbar />

      {/* Contact Form */}
      <main className="flex-grow flex items-center justify-center px-6 py-12 max-w-xl mx-auto w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full">
          <h2 className="text-3xl font-bold mb-6 text-slate-800 text-center">Get in Touch</h2>

          {submitted ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-600 text-center text-lg"
            >
              Thanks for reaching out! We'll get back to you soon.
            </motion.p>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial="hidden"
              animate="visible"
              variants={formVariants}
            >
              {['name', 'email', 'message'].map((field:any) => (
                <motion.label
                  key={field}
                  className="block"
                  variants={inputVariants}
                >
                  <span className="text-gray-700 font-medium capitalize">{field === 'message' ? 'Message' : field.charAt(0).toUpperCase() + field.slice(1)}</span>
                  {field !== 'message' ? (
                    <motion.input
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      required
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={field === 'email' ? 'you@example.com' : `Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                      className="mt-1 block w-full rounded border border-gray-300 px-4 py-2 focus:outline-none"
                      whileFocus={{ borderColor: '#f43f5e', boxShadow: '0 0 8px rgba(244, 63, 94, 0.6)' }}
                    />
                  ) : (
                    <motion.textarea
                      name="message"
                      required
                    //   rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      className="mt-1 block w-full rounded border border-gray-300 px-4 py-2 resize-y focus:outline-none"
                      whileFocus={{ borderColor: '#f43f5e', boxShadow: '0 0 8px rgba(244, 63, 94, 0.6)' }}
                    />
                  )}
                </motion.label>
              ))}

              <motion.button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 transition text-white px-6 py-3 rounded-full shadow-lg"
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </motion.form>
          )}
        </div>
      </main>
    </motion.div>
  );
}
