"use client";

import { useRef, useState } from "react";

const Certificate = () => {
  const printRef = useRef();
  const [participantName, setParticipantName] = useState("نام شرکت‌کننده");
  const [courseName, setCourseName] = useState("React & Next.js");
  const [issueDate, setIssueDate] = useState(new Date().toLocaleDateString('fa-IR'));
  const [isHovered, setIsHovered] = useState(false);

  const handlePrint = () => {
    const printArea = printRef.current;

    const printWindow = window.open("", "_blank", "width=1200,height=800");
    printWindow.document.write(`
      <html>
        <head>
          <title>گواهی‌نامه افتخار</title>
          <style>
            @page {
              size: A4 landscape;
              margin: 15mm;
            }
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: linear-gradient(135deg, #1e1e1e, #2d1b00);
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 0;
              padding: 20px;
              min-height: 100vh;
            }
            .certificate-container {
              width: 100%;
              height: 100%;
              background: 
                radial-gradient(circle at 20% 80%, rgba(255,215,0,0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255,140,0,0.1) 0%, transparent 50%),
                linear-gradient(135deg, #0c0a06 0%, #1a1208 30%, #2d1b00 70%, #1a1208 100%);
              border: 20px solid transparent;
              border-image: linear-gradient(45deg, #ffd700, #ffa500, #ff8c00, #daa520, #ffd700);
              border-image-slice: 1;
              border-radius: 30px;
              padding: 60px;
              position: relative;
              box-sizing: border-box;
              box-shadow: 
                0 0 50px rgba(255,215,0,0.3),
                inset 0 0 100px rgba(0,0,0,0.5);
              overflow: hidden;
            }
            .certificate-container::before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: 
                url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><path fill="rgba(255,215,0,0.03)" d="M40,40 L160,40 L160,160 L40,160 Z M50,50 L150,50 L150,150 L50,150 Z"/></svg>'),
                url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle fill="rgba(255,140,0,0.02)" cx="50" cy="50" r="40"/></svg>');
              background-size: 200px 200px, 100px 100px;
              opacity: 0.5;
              z-index: 1;
            }
            .inner-frame {
              border: 8px double transparent;
              border-image: linear-gradient(45deg, #ffd700, #ffa500, #ff8c00, #daa520);
              border-image-slice: 1;
              border-radius: 20px;
              padding: 70px 50px;
              height: calc(100% - 140px);
              text-align: center;
              position: relative;
              z-index: 2;
              background: 
                linear-gradient(135deg, rgba(20,15,5,0.9) 0%, rgba(40,30,10,0.8) 100%);
              box-shadow: 
                inset 0 0 50px rgba(0,0,0,0.7),
                0 0 30px rgba(255,215,0,0.2);
              backdrop-filter: blur(5px);
            }
            h1 {
              color: transparent;
              background: linear-gradient(45deg, #ffd700, #ffa500, #ff8c00, #ffd700);
              -webkit-background-clip: text;
              background-clip: text;
              font-size: 58px;
              margin-bottom: 40px;
              text-shadow: 0 0 30px rgba(255,215,0,0.5);
              position: relative;
              display: inline-block;
              font-weight: 800;
              letter-spacing: 2px;
            }
            h1::after {
              content: "";
              display: block;
              width: 60%;
              height: 4px;
              background: linear-gradient(to right, transparent, #ffd700, #ff8c00, #ffd700, transparent);
              margin: 15px auto 0;
              border-radius: 2px;
            }
            h2 {
              color: transparent;
              background: linear-gradient(45deg, #ffffff, #ffd700, #ffffff);
              -webkit-background-clip: text;
              background-clip: text;
              font-size: 48px;
              margin: 30px 0;
              text-shadow: 0 0 20px rgba(255,215,0,0.4);
              font-weight: 700;
              padding: 10px 30px;
              border: 2px solid transparent;
              border-image: linear-gradient(45deg, #ffd700, #ffa500, #ff8c00);
              border-image-slice: 1;
              border-radius: 15px;
              background-color: rgba(0,0,0,0.3);
              position: relative;
              display: inline-block;
            }
            p {
              color: #e0e0e0;
              font-size: 22px;
              margin-bottom: 20px;
              line-height: 1.8;
              text-shadow: 0 1px 3px rgba(0,0,0,0.8);
            }
            .course-name {
              font-size: 26px;
              font-weight: bold;
              color: #ffd700;
              display: inline-block;
              padding: 8px 20px;
              border-radius: 30px;
              background: rgba(255,140,0,0.15);
              border: 2px solid rgba(255,215,0,0.3);
              text-shadow: 0 0 10px rgba(255,215,0,0.5);
              box-shadow: 0 0 15px rgba(255,140,0,0.2);
            }
            .footer {
              display: flex;
              justify-content: space-between;
              position: absolute;
              bottom: 70px;
              left: 70px;
              right: 70px;
            }
            .footer div {
              width: 240px;
              border-top: 3px solid #ffd700;
              text-align: center;
              padding-top: 10px;
              font-size: 18px;
              color: #ffd700;
              font-weight: bold;
              text-shadow: 0 0 10px rgba(255,215,0,0.5);
            }
            .watermark {
              position: absolute;
              font-size: 180px;
              font-weight: 900;
              color: rgba(255,215,0,0.05);
              transform: rotate(-25deg);
              top: 30%;
              left: 5%;
              user-select: none;
              z-index: 1;
              letter-spacing: 15px;
              text-shadow: 0 0 20px rgba(255,215,0,0.1);
            }
            .seal {
              position: absolute;
              top: 50%;
              right: 70px;
              transform: translateY(-50%);
              width: 180px;
              height: 180px;
              border: 8px solid #ffd700;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: 
                radial-gradient(circle at 30% 30%, rgba(255,215,0,0.3) 0%, transparent 50%),
                radial-gradient(circle at 70% 70%, rgba(255,140,0,0.2) 0%, transparent 50%),
                linear-gradient(135deg, rgba(40,30,10,0.9) 0%, rgba(20,15,5,0.9) 100%);
              box-shadow: 
                0 0 30px rgba(255,215,0,0.4),
                inset 0 0 30px rgba(0,0,0,0.7);
              z-index: 3;
            }
            .seal::before {
              content: "✓";
              font-size: 80px;
              color: #ffd700;
              text-shadow: 0 0 20px rgba(255,215,0,0.7);
            }
            .seal::after {
              content: "AWARD";
              position: absolute;
              bottom: -40px;
              left: 50%;
              transform: translateX(-50%);
              color: #ffd700;
              font-weight: bold;
              font-size: 16px;
              text-shadow: 0 0 10px rgba(255,215,0,0.5);
            }
            .corner-decoration {
              position: absolute;
              width: 140px;
              height: 140px;
              z-index: 3;
            }
            .corner-tl {
              top: 30px;
              left: 30px;
              border-top: 8px solid #ffd700;
              border-left: 8px solid #ffd700;
              border-top-left-radius: 20px;
            }
            .corner-tr {
              top: 30px;
              right: 30px;
              border-top: 8px solid #ffd700;
              border-right: 8px solid #ffd700;
              border-top-right-radius: 20px;
            }
            .corner-bl {
              bottom: 30px;
              left: 30px;
              border-bottom: 8px solid #ffd700;
              border-left: 8px solid #ffd700;
              border-bottom-left-radius: 20px;
            }
            .corner-br {
              bottom: 30px;
              right: 30px;
              border-bottom: 8px solid #ffd700;
              border-right: 8px solid #ffd700;
              border-bottom-right-radius: 20px;
            }
            .gold-strip {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 12px;
              background: linear-gradient(90deg, 
                transparent 0%, 
                #ffd700 10%, 
                #ffa500 30%, 
                #ff8c00 50%, 
                #ffa500 70%, 
                #ffd700 90%, 
                transparent 100%);
              box-shadow: 0 0 20px rgba(255,215,0,0.7);
              z-index: 3;
            }
            .medal {
              position: absolute;
              top: 50%;
              left: 70px;
              transform: translateY(-50%);
              width: 120px;
              height: 120px;
              background: linear-gradient(135deg, #ffd700, #ffa500, #daa520);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 
                0 0 30px rgba(255,215,0,0.7),
                inset 0 -5px 10px rgba(0,0,0,0.3);
              z-index: 3;
            }
            .medal::before {
              content: "🏆";
              font-size: 50px;
              filter: drop-shadow(0 2px 5px rgba(0,0,0,0.5));
            }
            .medal::after {
              content: "WINNER";
              position: absolute;
              bottom: -35px;
              left: 50%;
              transform: translateX(-50%);
              color: #ffd700;
              font-weight: bold;
              font-size: 14px;
              text-shadow: 0 0 10px rgba(255,215,0,0.5);
            }
            .sparkle {
              position: absolute;
              width: 8px;
              height: 8px;
              background: #ffd700;
              border-radius: 50%;
              box-shadow: 0 0 10px 2px #ffd700;
              animation: sparkle 3s infinite;
            }
            @keyframes sparkle {
              0%, 100% { opacity: 0; }
              50% { opacity: 1; }
            }
            .sparkle1 { top: 20%; left: 15%; animation-delay: 0s; }
            .sparkle2 { top: 70%; left: 85%; animation-delay: 0.5s; }
            .sparkle3 { top: 40%; left: 90%; animation-delay: 1s; }
            .sparkle4 { top: 80%; left: 10%; animation-delay: 1.5s; }
            .sparkle5 { top: 10%; left: 70%; animation-delay: 2s; }
          </style>
        </head>
        <body>
          ${printArea.outerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-amber-900 p-6 gap-8">
      {/* کنترل‌های سفارشی‌سازی */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-amber-800 to-yellow-800 rounded-2xl shadow-2xl p-6 mb-4 border border-amber-500">
        <h2 className="text-3xl font-bold text-amber-200 mb-6 text-center drop-shadow-lg">سفارشی‌سازی گواهی اپیک</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-amber-100 mb-2">نام شرکت‌کننده</label>
            <input 
              type="text" 
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              className="w-full px-4 py-3 bg-amber-900 border border-amber-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-amber-100 placeholder-amber-300"
              placeholder="نام خود را وارد کنید"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-100 mb-2">نام دوره</label>
            <input 
              type="text" 
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full px-4 py-3 bg-amber-900 border border-amber-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-amber-100 placeholder-amber-300"
              placeholder="نام دوره آموزشی"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-100 mb-2">تاریخ صدور</label>
            <input 
              type="text" 
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className="w-full px-4 py-3 bg-amber-900 border border-amber-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-amber-100 placeholder-amber-300"
              placeholder="تاریخ صدور گواهی"
            />
          </div>
        </div>
      </div>

      {/* دکمه پرینت */}
      <button
        onClick={handlePrint}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="px-10 py-5 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-2xl shadow-2xl hover:from-amber-400 hover:to-yellow-500 transition-all font-bold text-xl flex items-center gap-3 hover:scale-105 transform duration-300 relative overflow-hidden group"
      >
        <span className="relative z-10 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          پرینت گواهی اپیک
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        
        {isHovered && (
          <>
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          </>
        )}
      </button>

      {/* محتوای گواهی */}
      <div
        ref={printRef}
        className="certificate-container w-[1120px] h-[790px] border-[20px] border-yellow-600 rounded-3xl shadow-2xl flex flex-col justify-center items-center text-center relative overflow-hidden"
        style={{
          background: "radial-gradient(circle at 20% 80%, rgba(255,215,0,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,140,0,0.1) 0%, transparent 50%), linear-gradient(135deg, #0c0a06 0%, #1a1208 30%, #2d1b00 70%, #1a1208 100%)",
          boxShadow: "0 0 50px rgba(255,215,0,0.3), inset 0 0 100px rgba(0,0,0,0.5)"
        }}
      >
        <div className="gold-strip"></div>
        <div className="corner-decoration corner-tl"></div>
        <div className="corner-decoration corner-tr"></div>
        <div className="corner-decoration corner-bl"></div>
        <div className="corner-decoration corner-br"></div>
        
        <div className="sparkle sparkle1"></div>
        <div className="sparkle sparkle2"></div>
        <div className="sparkle sparkle3"></div>
        <div className="sparkle sparkle4"></div>
        <div className="sparkle sparkle5"></div>
        
        <div className="inner-frame w-full h-full flex flex-col justify-center items-center">
          <h1>گواهی‌نامه افتخار</h1>
          <p>این گواهی‌نامه به پاس پشتکار و عملکرد درخشان تقدیم می‌گردد به</p>
          <h2>{participantName}</h2>
          <p className="text-xl">
            برای موفقیت در دوره آموزشی <span className="course-name">{courseName}</span>
          </p>
          <p className="mt-6 text-lg text-amber-200">با امتیاز عالی و رضایت کامل استاد دوره</p>

          <div className="footer">
            <div>مدیر آموزش</div>
            <div>تاریخ صدور: {issueDate}</div>
          </div>
          
          <div className="watermark">CERTIFICATE</div>
          <div className="seal"></div>
          <div className="medal"></div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;