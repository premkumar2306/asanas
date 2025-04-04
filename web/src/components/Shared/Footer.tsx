import React from "react";

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 text-center">
      Yogasara © {new Date().getFullYear()}
    </footer>
  );
}

export default Footer;
