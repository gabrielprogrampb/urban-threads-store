import React from 'react';
import { motion } from 'framer-motion';

const Section: React.FC<{ title: string; children: React.ReactNode; delay?: number }> = ({ title, children, delay = 0.2 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="mb-12"
  >
    <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-white pl-4">{title}</h2>
    <div className="space-y-4 text-gray-400 leading-relaxed">
      {children}
    </div>
  </motion.div>
);

const ShippingReturnsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black tracking-wider">Shipping & Returns</h1>
        <p className="text-gray-400 mt-2">Everything you need to know about getting your gear.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Section title="Shipping Information">
          <p>We're committed to getting your order to you as quickly as possible. All orders are processed and shipped from our warehouse within 1-2 business days.</p>
          <h4 className="font-semibold text-white pt-2">Domestic Shipping Options:</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Standard Shipping:</strong> Estimated delivery within 3-5 business days after processing.</li>
            <li><strong>Expedited Shipping:</strong> Estimated delivery within 1-2 business days after processing.</li>
          </ul>
          <h4 className="font-semibold text-white pt-2">International Shipping:</h4>
          <p>International shipping is available and rates are calculated at checkout. Please note that delivery times can vary significantly based on the destination and customs processing.</p>
          <h4 className="font-semibold text-white pt-2">Order Tracking:</h4>
          <p>Once your order ships, you will receive a confirmation email containing a tracking number so you can follow your package's journey.</p>
        </Section>

        <Section title="Return Policy" delay={0.4}>
          <p>Your satisfaction is our priority. If you're not completely happy with your purchase, you can return it within <strong>30 days</strong> of the delivery date for a full refund or exchange.</p>
          <h4 className="font-semibold text-white pt-2">Conditions for Return:</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Items must be in new, unworn, and unwashed condition.</li>
            <li>All original tags and packaging must be intact.</li>
            <li>Proof of purchase is required for all returns.</li>
          </ul>
           <h4 className="font-semibold text-white pt-2">How to Initiate a Return:</h4>
          <p>To start a return, please email our support team at <a href="mailto:support@urbanthreads.com" className="text-white underline">support@urbanthreads.com</a> with your order number and the reason for the return. We will provide you with further instructions and a return shipping label.</p>
          <h4 className="font-semibold text-white pt-2">Refunds:</h4>
          <p>Once we receive and inspect your returned item, we will process your refund. The refund will be credited to your original method of payment within 5-7 business days.</p>
        </Section>
      </div>
    </div>
  );
};

export default ShippingReturnsPage;