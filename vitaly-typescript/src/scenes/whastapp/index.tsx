import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const WhatsApp = () => {
  const whatsappURL = "https://wa.me/5511912369899"; 

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 bg-green-500 p-5 rounded-full shadow-lg hover:bg-green-600 transition duration-300 md:p-6 lg:p-7"
    >
      <FontAwesomeIcon 
        icon={faWhatsapp} 
        className="text-white text-3xl md:text-4xl lg:text-5xl" 
      />
    </a>
  );
};

export default WhatsApp;
