import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-6"
      >
        <span className="text-lg font-semibold text-white">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const faqs = [
  {
    question: "What are your shipping options?",
    answer: "We offer Standard (3-5 business days) and Expedited (1-2 business days) shipping within the country. International shipping times may vary. All options are available at checkout."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order has shipped, you will receive an email with a tracking number and a link to the carrier's website. You can use this to monitor your package's journey."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 30 days of delivery. Items must be in their original, unworn condition with all tags attached. Please visit our Shipping & Returns page for more details on how to initiate a return."
  },
  {
    question: "What materials are your products made from?",
    answer: "Our t-shirts are typically made from 100% premium Pima or organic cotton for a soft feel and durability. Our caps are made from high-quality materials like cotton twill, wool blends, and performance fabrics. Check the product description for specific details."
  },
  {
    question: "How do I care for my items?",
    answer: "To keep your gear looking its best, we recommend machine washing tees on cold with like colors and tumble drying on low. For caps, we suggest spot cleaning when possible. Please refer to the care label on your specific item for detailed instructions."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to many countries worldwide! International shipping rates and delivery times are calculated at checkout based on your location."
  },
];

const FAQPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black tracking-wider">Frequently Asked Questions</h1>
        <p className="text-gray-400 mt-2">Find answers to common questions below.</p>
      </div>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQPage;