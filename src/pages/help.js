import React, { useState } from 'react';
import Layout from '@/components/Home/layout';
import { FaRegQuestionCircle, FaPhone, FaEnvelope, FaInfoCircle, FaServicestack, FaBullseye, FaFlag } from 'react-icons/fa';


import { db } from '../firebase.config'; // Make sure you have Firebase configured
import { addDoc, collection } from 'firebase/firestore'; // Import Firestore methods
import { toast } from 'react-toastify'; // Toast for success message

const HelpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');
    const [supportTicketId, setSupportTicketId] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    // Function to handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const docRef = await addDoc(collection(db, 'helpSupport'), {
          name,
          email,
          phone,
          location,
          message,
          createdAt: new Date()
        });
        setSupportTicketId(docRef.id); // Store the doc ID
        setIsSubmitted(true);
        toast.success('Support ticket created successfully!');
      } catch (error) {
        toast.error('Failed to create support ticket.');
      }
    };
  
    
  
  return (
    <Layout className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-6">
      {/* Header Section */}
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">GH-EVISA Help & Support</h1>
        <p className="text-lg text-gray-600">Your guide to navigating the GH-EVISA platform smoothly and efficiently.</p>
      </header>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* FAQ Section */}
        <section className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center"><FaRegQuestionCircle className="mr-2" /> Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-blue-800">How do I sign up for a GH-EVISA account?</h3>
              <p className="text-gray-700">To create an account, visit the sign-up page, fill in your personal details, and submit the form. You will receive a confirmation email to verify your account. Once confirmed, you can log in and access your dashboard.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-blue-800">How do I verify my identity?</h3>
              <p className="text-gray-700">After logging in, go to the Identity Verification section in your dashboard. Upload the required documents and submit a verification request. An admin will review your request within a few days.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-blue-800">How long does it take to get verified?</h3>
              <p className="text-gray-700">Verification typically takes 1-3 business days. You will be notified via email when your verification is complete, and you'll see the verified status on your dashboard.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-blue-800">How can I apply for an e-Visa?</h3>
              <p className="text-gray-700">Once verified, navigate to the e-Visa application page in your dashboard. Fill in the required details, attach necessary documents, and submit your application. You can track the status from your dashboard.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-blue-800">How will I know if my e-Visa is approved?</h3>
              <p className="text-gray-700">You will receive an email notification once your e-Visa application is reviewed. You can also log into your dashboard to check the application status.</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center"><FaPhone className="mr-2" /> Contact Us</h2>
          <p className="text-gray-700 mb-4">Need further assistance? Feel free to reach out to our support team via the following channels:</p>
          <ul className="space-y-4">
            <li className="flex items-center text-gray-700"><FaEnvelope className="mr-2 text-blue-700" /> Email: support@ghevisa.com</li>
            <li className="flex items-center text-gray-700"><FaPhone className="mr-2 text-blue-700" /> Phone: +233 24 123 4567</li>
          </ul>
        </section>
      </div>

      {/* About Us, Our Services, Mission, and Goal Section */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* About Us */}
        <section className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center"><FaInfoCircle className="mr-2" /> About Us</h2>
          <p className="text-gray-700">
            GH-EVISA is a cutting-edge e-visa application system designed to facilitate seamless visa applications for foreigners visiting Ghana. 
            Our platform provides a user-friendly and secure process for users to sign up, verify their identity, and apply for an e-visa. 
            We aim to streamline the visa application process and enhance travel experiences for international visitors.
          </p>
        </section>

        {/* Our Services */}
        <section className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center"><FaServicestack className="mr-2" /> Our Services</h2>
          <p className="text-gray-700">
            Our platform offers a variety of services tailored to meet the needs of our users, including identity verification, 
            e-visa application submission, and status tracking. With our secure digital platform, travelers can access 
            comprehensive visa-related services from anywhere in the world. Our support team is also available to assist with any inquiries or issues.
          </p>
        </section>

        {/* Our Mission */}
        <section className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center"><FaBullseye className="mr-2" /> Our Mission</h2>
          <p className="text-gray-700">
            Our mission is to simplify and digitize the visa application process for foreigners traveling to Ghana. 
            By leveraging the latest in technology and customer service, we strive to make the process efficient, 
            transparent, and accessible. We are committed to ensuring that all visitors to Ghana have a positive experience starting from the visa process.
          </p>
        </section>

        {/* Our Goal */}
        <section className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center"><FaFlag className="mr-2" /> Our Goal</h2>
          <p className="text-gray-700">
            Our goal is to become the leading e-visa platform in West Africa, providing a robust and scalable solution that serves the needs of 
            both travelers and authorities. We aim to foster tourism and international relationships by offering a streamlined, efficient 
            application process for those visiting Ghana.
          </p>
        </section>

        <div className="bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">Customer Service Center</h2>
      {isSubmitted ? (<>
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Support Ticket Created</h2>
          <p className="text-gray-700">Your support ticket has been created successfully.</p>
          <p className="text-gray-700">Support Ticket ID: <span className="font-bold">{supportTicketId}</span></p>
          <p className="text-gray-700">We will reach out to you via email or phone shortly.</p>
        </div>
      </>) : (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-800 transition duration-300"
        >
          Submit Support Ticket
        </button>
      </form>
      )}
    </div>

    <section className="bg-white shadow-lg rounded-lg p-8">
  <h2 className="text-2xl font-semibold text-blue-700 mb-6">How We Work</h2>
  
  <p className="text-gray-700 mb-4">
    At GH-EVISA, our process is streamlined for efficiency and simplicity. Foreigners wishing to visit Ghana can easily navigate the platform, sign up, and start their visa application process with ease.
  </p>

  <p className="text-gray-700 mb-4">
    Once you sign up and log in, the first step is to verify your identity. This ensures a secure experience for all users and builds trust between applicants and our system administrators.
  </p>

  <p className="text-gray-700 mb-4">
    After your identity is verified by an admin, you can proceed with creating your e-visa application. The system is designed to capture all the necessary details required for the application review process.
  </p>

  <p className="text-gray-700 mb-4">
    Each visa application is carefully reviewed by our experienced visa officers. They assess the information provided, ensuring that all necessary documents and criteria are met before making a decision.
  </p>

  <p className="text-gray-700 mb-4">
    Once a decision is made, you will receive a notification about your application status. Whether approved or rejected, we strive to keep the process transparent and provide timely responses to all applicants.
  </p>
</section>
      </div>

    

    </Layout>
  );
};

export default HelpPage;
