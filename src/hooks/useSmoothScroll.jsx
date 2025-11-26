// // hooks/useSmoothScroll.js
// "use client";

// import { useEffect } from 'react';

// export const useSmoothScroll = () => {
//   useEffect(() => {
//     document.documentElement.classList.add('smooth-scroll');
    
//     const handleInternalLinks = (e) => {
//       const link = e.target.closest('a[href^="#"]');
//       if (link) {
//         e.preventDefault();
//         const targetId = link.getAttribute('href').slice(1);
//         const targetElement = document.getElementById(targetId);
        
//         if (targetElement) {
//           const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
//           window.scrollTo({
//             top: offsetTop - 80, 
//             behavior: 'smooth'
//           });
//         }
//       }
//     };

//     document.addEventListener('click', handleInternalLinks);
    
//     return () => {
//       document.removeEventListener('click', handleInternalLinks);
//       document.documentElement.classList.remove('smooth-scroll');
//     };
//   }, []);
// };