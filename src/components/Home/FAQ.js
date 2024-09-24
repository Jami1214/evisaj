import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
        question: "What is the GH E-Visa?",
        answer: "The GH E-Visa is an electronic visa system that allows foreign nationals to apply for a visa to enter Ghana online. This system simplifies the application process by enabling applicants to submit their documents and payment electronically, eliminating the need for in-person visits to embassies or consulates."
    },
    {
        question: "How can I apply for the GH E-Visa?",
        answer: "To apply for the GH E-Visa, you need to visit the official e-visa portal of Ghana. There, you will fill out an online application form, upload required documents such as a passport copy and passport-sized photographs, and pay the visa fee using a credit or debit card. After submission, you will receive a confirmation email with further instructions."
    },
    {
        question: "What documents are required for the GH E-Visa application?",
        answer: "The required documents for the GH E-Visa application typically include: A valid passport with at least six months’ validity beyond your intended stay in Ghana. A recent passport-sized photograph. Proof of accommodation in Ghana (hotel reservation or invitation letter). A return flight ticket or proof of onward travel. Additional documents may be requested based on your nationality or purpose of travel."
    }
];


  return (
<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div className="grid md:grid-cols-5 gap-10">
    <div className="md:col-span-2">
      <div className="max-w-xs">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">Frequently<br/>asked questions</h2>
        <p className="mt-1 hidden md:block text-gray-600 dark:text-neutral-400">Answers to the most frequently asked questions.</p>
      </div>
    </div>

    <div className="md:col-span-3">
          <div className="hs-accordion-group divide-y divide-gray-200 dark:divide-neutral-700">
            {faqs.map((faq, index) => (
              <div key={index} className={`hs-accordion pt-6 pb-3 ${activeIndex === index ? 'active' : ''}`} id={`hs-basic-with-title-and-arrow-stretched-heading-${index}`}>
                <button
                  className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400"
                  aria-controls={`hs-basic-with-title-and-arrow-stretched-collapse-${index}`}
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <svg className="hs-accordion-active:hidden block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  <svg
                    className={`hs-accordion-active:${activeIndex !== index ? 'block' : 'hidden'} hidden flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div
                  id={`hs-basic-with-title-and-arrow-stretched-collapse-${index}`}
                  className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${activeIndex === index ? 'block' : 'hidden'}`}
                  aria-labelledby={`hs-basic-with-title-and-arrow-stretched-heading-${index}`}
                >
                  <p className="text-gray-600 dark:text-neutral-400">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
  </div>
</div>
  )
}

export default FAQ;