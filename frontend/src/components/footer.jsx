import React from 'react';

export default function Footer() {
  return (
    <div className="footer-main text-white p-6 text-center mt-8 border-t border-gray-700">
      <p className="mb-2 text-sm md:text-base">&copy; 2023 QuizApp. All rights reserved.</p>
      <p className="mb-2 text-sm md:text-base">Contact us: <a href="mailto:support@quizapp.com" className="text-blue-400 hover:underline">support@quizapp.com</a></p>
      <p className="mb-4 text-base md:text-lg">Follow us on social media: <a href="https://facebook.com/quizapp" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Facebook</a></p>

      
      <p className="text-xs md:text-sm opacity-80">
        <a href="/terms" className="hover:underline">Terms of Service</a> | <a href="/privacy" className="hover:underline">Privacy Policy</a>
      </p>
    </div>
  );
}