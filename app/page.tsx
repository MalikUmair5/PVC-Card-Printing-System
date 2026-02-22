"use client";

import React, { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   TYPE DEFINITIONS
   ═══════════════════════════════════════════════════════════ */
interface StudentData {
  name: string;
  fatherName: string;
  class: string;
  grNumber: string;
  photo: string;
}

/* ═══════════════════════════════════════════════════════════
   RESPONSIVE TEXT COMPONENT
   ═══════════════════════════════════════════════════════════ */
interface ResponsiveTextProps {
  children: React.ReactNode;
  minSize?: number;
  maxSize?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ResponsiveText = ({ children, minSize = 6, maxSize = 16, className = "", style = {} }: ResponsiveTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(maxSize);

  useEffect(() => {
    const adjustFontSize = () => {
      if (!textRef.current) return;
      
      const container = textRef.current;
      const containerWidth = container.offsetWidth;
      
      // Start with max size and reduce until text fits
      let currentSize = maxSize;
      container.style.fontSize = `${currentSize}px`;
      
      while (container.scrollWidth > containerWidth && currentSize > minSize) {
        currentSize -= 0.5;
        container.style.fontSize = `${currentSize}px`;
      }
      
      setFontSize(currentSize);
    };

    // Initial adjustment
    adjustFontSize();
    
    // Adjust on window resize
    const resizeObserver = new ResizeObserver(adjustFontSize);
    if (textRef.current) {
      resizeObserver.observe(textRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [children, minSize, maxSize]);

  return (
    <div
      ref={textRef}
      className={`break-words leading-tight ${className}`}
      style={{ fontSize: `${fontSize}px`, maxWidth: '100%', ...style }}
    >
      {children}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   ASSETS & STYLES
   ═══════════════════════════════════════════════════════════ */
const TopRightWave = () => (
  <svg className="absolute top-0 right-0 z-0" width="160" height="140" viewBox="0 0 160 140" fill="none">
    <path d="M60 0 H160 V100 Z" fill="#8cc63f" opacity="0.55" />
    <path d="M110 0 H160 V60 Z" fill="#5a9e1e" opacity="0.7" />
  </svg>
);

const BottomLeftWave = () => (
  <svg className="absolute bottom-0 left-0 z-0" width="160" height="140" viewBox="0 0 160 140" fill="none">
    <path d="M100 140 H0 V40 Z" fill="#8cc63f" opacity="0.55" />
    <path d="M50 140 H0 V80 Z" fill="#5a9e1e" opacity="0.7" />
  </svg>
);

const CardBackground = ({ children }: { children: React.ReactNode }) => (
  <div
    className="id-card rounded-lg overflow-hidden relative flex flex-col border border-gray-200 shadow-lg print:shadow-none print:border-gray-400"
    style={{
      background: "linear-gradient(180deg, #a8d84e 0%, #d4e8a4 15%, #f2f8e8 35%, #fafff2 50%, #f2f8e8 65%, #d4e8a4 85%, #8cc63f 100%)",
    }}
  >
    <TopRightWave />
    <BottomLeftWave />
    <div className="relative z-10 h-full flex flex-col">{children}</div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   CARD COMPONENTS (Clearer & Centralized)
   ═══════════════════════════════════════════════════════════ */
const IdCardFront = ({ student }: { student: StudentData }) => (
  <CardBackground>
    {/* Header */}
    <div className="mt-4 px-1 text-center relative z-20">
      <ResponsiveText 
        maxSize={16} 
        minSize={12} 
        className="leading-tight font-extrabold text-[#0e6a2e] italic drop-shadow-sm" 
        style={{ fontFamily: "serif" }}
      >
        Quaid-e-Azam Public Sec School
      </ResponsiveText>
    </div>

    {/* Photo */}
    <div className="flex flex-col items-center mt-2">
      <div className="w-[80px] h-[80px] rounded-full border-[3px] border-[#1a7a30] bg-white shadow-md overflow-hidden relative z-20">
        {student.photo ? <img src={student.photo} className="w-full h-full object-cover" alt="Student" /> : <div className="text-4xl mt-4 text-center text-gray-300">👤</div>}
      </div>
      <div className="relative -mt-2.5 z-30 px-4 py-0.5 rounded-full font-bold text-[8px] text-white bg-blue-600 border-2 border-white shadow-sm tracking-wider">
        STUDENT ID CARD
      </div>
    </div>

    {/* Student Details */}
    <div className="flex-1 px-4 mt-3 space-y-1.5 text-[11px] font-bold text-gray-900 relative z-20">
      {[
        ["Name", student.name], 
        ["Father", student.fatherName], 
        ["Class", student.class], 
        ["GR #", student.grNumber]
      ].map(([label, value]) => (
        <div key={label} className="flex items-end gap-1.5 border-b border-gray-600/40 pb-0.5">
          <span className="whitespace-nowrap w-11 text-[#0e6a2e] font-extrabold text-[10px]">{label}:</span>
          <div className="flex-1">
            {(label === "Name" || label === "Father") ? (
              <ResponsiveText 
                maxSize={9} 
                minSize={6} 
                className="font-black text-black uppercase text-left"
              >
                {value}
              </ResponsiveText>
            ) : (
              <span className="flex-1 font-black text-black uppercase truncate text-left text-[9px]">{value}</span>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* Footer */}
    <div className="text-center pb-3 pt-1 relative z-20">
      <ResponsiveText 
        maxSize={14} 
        minSize={10} 
        className="font-black text-[#0e6a2e] tracking-[0.2em] drop-shadow-sm"
      >
        QUAIDIAN
      </ResponsiveText>
    </div>
  </CardBackground>
);

const IdCardBack = () => (
  <CardBackground>
    {/* Logo Section */}
    <div className="mt-4 flex justify-center relative z-20">
      <div className="w-20 h-20 flex items-center justify-center">
        <img 
          src="/transparent-bg-logo.png" 
          alt="School Logo" 
          className="w-full h-full object-contain drop-shadow-md" 
        />
      </div>
    </div>

    {/* Address Section */}
    <div className="flex-1 flex flex-col items-center text-center px-3 mt-1 space-y-1.5 relative z-20">
      <h3 className="text-[12px] font-black text-black">IF FOUND, PLEASE RETURN TO</h3>
      <div className="space-y-0.5 w-full">
        <ResponsiveText 
          maxSize={11} 
          minSize={8} 
          className="font-black uppercase text-[#0e6a2e]"
        >
          Quaid-e-Azam Public Sec School
        </ResponsiveText>
        <div className="px-2">
          <ResponsiveText 
            maxSize={7} 
            minSize={5} 
            className="font-bold text-gray-800 leading-tight"
          >
            PLOT NO # 22/STREET NO # 11, QAYYUMABAD KARACHI
          </ResponsiveText>
        </div>
      </div>

      <ResponsiveText 
        maxSize={12} 
        minSize={9} 
        className="font-black text-black tracking-widest"
      >
        0308-2322242
      </ResponsiveText>

      <ul className="text-center w-full text-[9px] font-bold text-black space-y-0.5">
        <li>• Card is required to enter school.</li>
        <li>• Display of card is mandatory.</li>
      </ul>
    </div>

    {/* Signature Section */}
    <div className="mb-3 flex flex-col items-center relative z-20">
      <img 
        src="/signature.png" 
        alt="Signature" 
        className="h-8 object-contain mb-0.5"
      />
      
      <div className="w-28 border-b-2 border-black mb-0.5"></div>
      <span className="font-black text-[9px] uppercase tracking-wide text-black">
        Issuing Authority
      </span>
    </div>
  </CardBackground>
);

/* ═══════════════════════════════════════════════════════════
   MAIN APP LOGIC
   ═══════════════════════════════════════════════════════════ */
export default function IdCardApp() {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [isMirrored, setIsMirrored] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const preview = document.getElementById('photo-preview') as HTMLImageElement;
        if (preview) preview.src = ev.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (students.length >= 4) return alert("Sheet is full! (Max 4 Students per page)");
    const fd = new FormData(e.currentTarget);
    const photo = (document.getElementById('photo-preview') as HTMLImageElement)?.src || "";

    setStudents([...students, {
      name: fd.get('name') as string,
      fatherName: fd.get('father') as string,
      class: fd.get('class') as string,
      grNumber: fd.get('gr') as string,
      photo
    }]);
    e.currentTarget.reset();
    (document.getElementById('photo-preview') as HTMLImageElement).src = "";
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans">
      
      {/* ──────────────────────────────────────────────────────────
          INPUT UI (Visible on Screen)
          ────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 print:hidden">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Card Preview</h2>
              <div className="flex gap-3">
                
                {/* FLIP BUTTON */}
                <button 
                  onClick={() => setIsMirrored(!isMirrored)} 
                  className={`px-4 py-2 rounded-xl font-bold border transition-all ${isMirrored ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'}`}
                >
                  {isMirrored ? "✅ Mirrored (Ready)" : "🔄 Flip for Print"}
                </button>

                <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-md">
                  Print Sheet
                </button>
                <button onClick={() => setStudents([])} className="bg-slate-100 text-slate-600 px-6 py-2 rounded-xl font-bold hover:bg-slate-200">
                  Clear
                </button>
              </div>
            </div>

            {/* Visual Preview */}
            <div className={`flex flex-wrap gap-4 bg-slate-100 p-8 rounded-xl border-2 border-dashed border-slate-300 justify-center transition-transform duration-300 ${isMirrored ? 'scale-x-[-1]' : ''}`}>
              {students.length === 0 && <p className="text-slate-400 italic w-full text-center scale-x-100">No students added. Add up to 4 students.</p>}
              {students.map((s, i) => (
                <div key={i} className="flex gap-2 scale-75 origin-top">
                  <IdCardFront student={s} />
                  <IdCardBack />
                </div>
              ))}
            </div>
            {isMirrored && <p className="text-center text-purple-600 font-bold mt-2 animate-pulse">Preview is mirrored. Press Print now.</p>}
          </div>
        </div>

        {/* Form - Clearer & Centralized Inputs */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit sticky top-4">
          <h3 className="text-xl font-bold mb-4 text-slate-800 text-center">Add Student Details</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="flex justify-center mb-4">
              <img id="photo-preview" className="w-28 h-28 rounded-full border-4 border-blue-100 object-cover bg-slate-50" src="" alt="Preview" />
            </div>
            
            <input name="name" placeholder="Student Name" required className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-center font-bold text-lg" />
            <input name="father" placeholder="Father's Name" required className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-center font-bold text-lg" />
            
            <div className="grid grid-cols-2 gap-3">
              <input name="class" placeholder="Class" required className="p-3 bg-slate-50 border border-slate-300 rounded-xl outline-none text-center font-bold" />
              <input name="gr" placeholder="GR #" required className="p-3 bg-slate-50 border border-slate-300 rounded-xl outline-none text-center font-bold" />
            </div>
            
            <input type="file" onChange={handleFileUpload} className="text-sm block w-full text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer" />
            
            <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg text-lg">
              Add to Print List
            </button>
            <p className="text-xs text-center text-gray-400 font-semibold">Cards Added: {students.length}/4</p>
          </form>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          PRINT LAYOUT
          ────────────────────────────────────────────────────────── */}
      <div className="hidden print:block">
        {/* The 'mirror-mode' class here ensures the print output is also flipped */}
        <div className={`a4-print-container ${isMirrored ? 'mirror-mode' : ''}`}>
          
          {/* ROW 1: FRONTS */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="print-card-wrapper" key={`front-${i}`}>
              {students[i] ? <IdCardFront student={students[i]} /> : <div className="id-card" style={{border: 'none'}} />}
            </div>
          ))}

          {/* ROW 2: BACKS */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="print-card-wrapper" key={`back-${i}`}>
              {students[i] ? <IdCardBack /> : <div className="id-card" style={{border: 'none'}} />}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}