import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function FaqSection() {
  // 🟢 Set to `null` so no FAQ is active by default
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Do I need internet for the card to work?",
      answer: "No.For using QR code can work entirely offline — it reads directly. The only moment you need data is when the receiving phone loads your profile page, which takes almost no bandwidth."

    },
    {
      question: "Can I update my details after printing?",
      answer: "Yes, absolutely! Your card stays linked to your online profile dashboard. You can change your phone number, social links, profile picture, or bio anytime — your physical card updates instantly."
    },
    {
      question: "What if someone's phone doesn't support NFC?",
      answer: "Every card comes with a high-definition printed QR code on the back. If an older phone doesn't support NFC, they can simply scan the QR code with their camera app to open your profile."
    },
    {
      question: "Is there a monthly fee?",
      answer: "Zero subscription fees! You pay a one-time charge for your physical NFC card, and your hosted digital profile page is free forever with unlimited edits."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="FaqSection">
      <div className="FaqContainer">
        
        {/* Header Block */}
        <div className="FaqHeader">
          <div className="SectionBadge">
            <span className="BadgeDot"></span> FAQS
          </div>
          <h2 className="FaqTitle">Before you order</h2>
          <p className="FaqSubtitle">
            Everything you need to know about our NFC cards, profile page compatibility, and instant updates.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="FaqList">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`FaqItem ${isOpen ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="FaqQuestionRow">
                  <h3 className="FaqQuestion">{faq.question}</h3>
                  <div className="ToggleIconBox">
                    {isOpen ? <FaMinus className="Icon" /> : <FaPlus className="Icon" />}
                  </div>
                </div>

                <div className="FaqAnswerWrapper">
                  <p className="FaqAnswer">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

