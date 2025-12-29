import React from 'react';
import { motion } from 'framer-motion';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="space-y-4 text-gray-400 leading-relaxed">
        {children}
      </div>
    </div>
);


const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
      >
        <h1 className="text-4xl font-black tracking-wider">Privacy Policy</h1>
        <p className="text-gray-400 mt-2">Last Updated: {new Date().toLocaleDateString()}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-4xl mx-auto"
    >
        <Section title="Introduction">
          <p>
            Welcome to Urban Threads ("we," "our," "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.
          </p>
        </Section>

        <Section title="Information We Collect">
          <p>We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products, when you participate in activities on the website, or otherwise when you contact us.</p>
          <p>The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
          <ul className="list-disc pl-5">
            <li><strong>Personal Information You Disclose to Us:</strong> Name, shipping address, email address, phone number, and payment information.</li>
            <li><strong>Information Automatically Collected:</strong> IP address, browser type, operating system, referring URLs, and information on how you use our site.</li>
          </ul>
        </Section>
        
        <Section title="How We Use Your Information">
          <p>We use personal information collected via our website for a variety of business purposes described below:</p>
          <ul className="list-disc pl-5">
            <li>To facilitate account creation and logon process.</li>
            <li>To process and manage your orders, payments, returns, and exchanges.</li>
            <li>To send you marketing and promotional communications.</li>
            <li>To respond to your inquiries and solve any potential issues you might have.</li>
            <li>To protect our site from fraud and other security risks.</li>
          </ul>
        </Section>

        <Section title="Information Sharing and Disclosure">
            <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work.</p>
        </Section>

        <Section title="Data Security">
            <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>
        </Section>

        <Section title="Your Rights">
            <p>Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete the personal data we hold about you. If you wish to exercise these rights, please contact us.</p>
        </Section>
        
        <Section title="Contact Us">
          <p>
            If you have questions or comments about this policy, you may email us at <a href="mailto:privacy@urbanthreads.com" className="text-white underline">privacy@urbanthreads.com</a>.
          </p>
        </Section>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicyPage;