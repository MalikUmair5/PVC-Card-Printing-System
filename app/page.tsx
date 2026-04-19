"use client";
import React, { useState, useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */
interface StudentData {
  name: string;
  fatherName: string;
  class: string;
  grNumber: string;
  photo: string;
}

/* ═══════════════════════════════════════════════════════════
   RESPONSIVE TEXT
   Shrinks font-size until text fits its container width.
   ═══════════════════════════════════════════════════════════ */
interface ResponsiveTextProps {
  children: React.ReactNode;
  minSize?: number;
  maxSize?: number;
  style?: React.CSSProperties;
}

const ResponsiveText = ({
  children,
  minSize = 6,
  maxSize = 16,
  style = {},
}: ResponsiveTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(maxSize);

  useEffect(() => {
    const adjust = () => {
      if (!ref.current) return;
      let size = maxSize;
      ref.current.style.fontSize = `${size}px`;
      while (ref.current.scrollWidth > ref.current.offsetWidth && size > minSize) {
        size -= 0.5;
        ref.current.style.fontSize = `${size}px`;
      }
      setFontSize(size);
    };
    adjust();
    const ro = new ResizeObserver(adjust);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [children, minSize, maxSize]);

  return (
    <div
      ref={ref}
      style={{ fontSize: `${fontSize}px`, maxWidth: "100%", lineHeight: 1.15, ...style }}
    >
      {children}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   SHARED CARD GRADIENT
   Radial: bright, lighter yellow-green center → lighter green edges
   ═══════════════════════════════════════════════════════════ */
const CARD_BG: React.CSSProperties = {
  background:
    "radial-gradient(ellipse at 50% 42%, #fdfce3 0%, #eefc9f 28%, #d1f067 55%, #a6d43e 78%, #72ad20 100%)",
};

/* ═══════════════════════════════════════════════════════════
   SWOOSH SVGs  — width="100%" fills whatever .id-card width is
   ═══════════════════════════════════════════════════════════ */
const FrontSwoosh = () => (
  <svg
    style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "28%", zIndex: 1 }}
    viewBox="0 0 204 97"
    preserveAspectRatio="none"
  >
    <path d="M0,97 L204,97 L204,49 Q112,93 0,44 Z" fill="rgba(80,150,20,0.45)" />
    <path d="M84,97 L204,97 L204,0 Q168,76 49,97 Z" fill="rgba(30,90,10,0.55)" />
  </svg>
);

const BackSwoosh = () => (
  <svg
    style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "22%", zIndex: 1 }}
    viewBox="0 0 204 78"
    preserveAspectRatio="none"
  >
    <path d="M0,78 L204,78 L204,43 Q124,78 0,34 Z" fill="rgba(80,150,20,0.45)" />
    <path d="M93,78 L204,78 L204,0 Q173,62 58,78 Z" fill="rgba(30,90,10,0.55)" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   FIELD ROW
   ═══════════════════════════════════════════════════════════ */
const FieldRow = ({ label, value }: { label: string; value: string }) => (
  <div
    style={{
      display: "flex",
      alignItems: "flex-end",
      marginBottom: 8,
      width: "100%",
    }}
  >
    <span
      style={{
        fontSize: 11,
        fontWeight: 800,
        color: "#0e6a2e",
        whiteSpace: "nowrap",
        marginRight: 4,
        paddingBottom: 1,
        fontFamily: "serif",
        flexShrink: 0,
      }}
    >
      {label}
    </span>
    <div
      style={{
        flex: 1,
        borderBottom: "1.5px solid #2a2a2a",
        paddingBottom: 1,
        paddingLeft: 3,
        minWidth: 0,
      }}
    >
      <ResponsiveText
        minSize={8}
        maxSize={13}
        style={{
          fontWeight: 900,
          color: "#111",
          textTransform: "uppercase",
          fontFamily: "serif",
          letterSpacing: 0.5,
        }}
      >
        {value}
      </ResponsiveText>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   FRONT CARD
   ═══════════════════════════════════════════════════════════ */
export const IdCardFront = ({ student }: { student: StudentData }) => (
  <div
    className="id-card"
    style={{
      ...CARD_BG,
      borderRadius: 12,
      boxShadow: "0 4px 20px rgba(0,0,0,0.22)",
      WebkitFontSmoothing: "antialiased",
    }}
  >
    <FrontSwoosh />

    <div
      style={{
        position: "relative",
        zIndex: 10,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px 0 0",
      }}
    >
      {/* ── School Name ── */}
      <div style={{ width: "100%", padding: "0 6px", textAlign: "center" }}>
        <ResponsiveText
          minSize={12}
          maxSize={18}
          style={{
            fontWeight: 900,
            color: "#0e6a2e",
            fontFamily: "serif",
            textAlign: "center",
            textShadow: "0 1px 0 rgba(255,255,255,0.7)",
          }}
        >
          Quaid-e-Azam Public Sec School
        </ResponsiveText>
      </div>

      {/* ── Photo ── */}
      <div
        style={{
          width: 92,
          height: 92,
          borderRadius: "50%",
          border: "3px solid #1a7a30",
          background: "#ffffff",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 8,
          flexShrink: 0,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        {student.photo ? (
          <img
            src={student.photo}
            alt="Student"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <span style={{ color: "#ccc", fontSize: 36 }}>👤</span>
        )}
      </div>

      {/* ── STUDENT ID CARD Badge ── */}
      <div
        style={{
          marginTop: 8,
          background: "linear-gradient(135deg, #2a5fd4, #1a3fa0)",
          color: "white",
          fontFamily: "sans-serif",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: 1.5,
          padding: "3px 14px",
          borderRadius: 20,
          border: "1px solid #1a3080",
          flexShrink: 0,
        }}
      >
        STUDENT ID CARD
      </div>

      {/* ── Fields ── */}
      <div style={{ width: "100%", padding: "0 12px", marginTop: 10, flex: 1 }}>
        <FieldRow label="Name:" value={student.name} />
        <FieldRow label="Father's Name:" value={student.fatherName} />
        <FieldRow label="Class:" value={student.class} />
        <FieldRow label="GR #:" value={student.grNumber} />
      </div>

      {/* ── QUAIDIAN ── */}
      <div
        style={{
          fontFamily: "serif",
          fontSize: 15,
          fontWeight: 900,
          color: "#1a5220",
          letterSpacing: 5,
          position: "absolute",
          bottom: 6,
          left: "50%",
          transform: "translateX(-50%)",
          textShadow: "1px 1px 0 rgba(255,255,255,0.5)",
          zIndex: 20,
          whiteSpace: "nowrap",
        }}
      >
        QUAIDIAN
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   BACK CARD
   ═══════════════════════════════════════════════════════════ */
export const IdCardBack = () => (
  <div
    className="id-card"
    style={{
      ...CARD_BG,
      borderRadius: 12,
      boxShadow: "0 4px 20px rgba(0,0,0,0.22)",
      WebkitFontSmoothing: "antialiased",
    }}
  >
    <BackSwoosh />

    <div
      style={{
        position: "relative",
        zIndex: 10,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "12px 0 0", // Reduced top padding
      }}
    >
      {/* ── School Logo ── */}
      <div
        style={{
          width: 95, // Reduced from 110
          height: 75, // Reduced from 85
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <img
          src="/transparent-bg-logo.png"
          alt="School Logo"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
            const p = e.currentTarget.parentElement;
            if (p)
              p.innerHTML = `<div style="width:75px;height:75px;border-radius:50%;border:2px solid #1a5c2a;display:flex;align-items:center;justify-content:center;background:white;font-size:8px;font-weight:900;color:#1a5c2a;text-align:center;line-height:1.3;">QPS<br/>LOGO</div>`;
          }}
        />
      </div>

      {/* ── Info text ── */}
      <div
        style={{
          textAlign: "center",
          padding: "0 14px",
          marginTop: 6, // Reduced margin
          zIndex: 10,
          width: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            fontSize: 11.5, // Reduced from 13
            fontWeight: 900,
            color: "#111",
            fontFamily: "serif",
            marginBottom: 4,
            lineHeight: 1.2,
          }}
        >
          IF FOUND, PLEASE RETURN TO
        </p>
        <p
          style={{
            fontSize: 10, // Reduced from 11
            fontWeight: 900,
            color: "#111",
            fontFamily: "serif",
            marginBottom: 4,
            lineHeight: 1.2,
          }}
        >
          QUAID-E-AZAM PUBLIC SEC SCHOOL
        </p>
        <p
          style={{
            fontSize: 7.5, // Reduced from 8.5
            fontWeight: 700,
            color: "#111",
            fontFamily: "serif",
            lineHeight: 1.4,
            marginBottom: 8,
          }}
        >
          PLOT NO # 22/STREET NO # 11, SECTOR C, QAYYUMABAD KARACHI
        </p>
        <p
          style={{
            fontSize: 11, // Reduced from 12.5
            fontWeight: 900,
            color: "#111",
            fontFamily: "serif",
            marginBottom: 10,
          }}
        >
          CONTACT NO: 0308-2322242
        </p>
        <div
          style={{
            textAlign: "left",
            fontSize: 7.5, // Reduced from 8.5
            fontWeight: 700,
            color: "#111",
            fontFamily: "serif",
            lineHeight: 1.5,
            padding: "0 4px",
            width: "100%",
          }}
        >
          <p style={{ display: "flex", margin: 0, marginBottom: 2 }}>
            <span style={{ marginRight: 5 }}>›</span>Card is required to enter the school premises.
          </p>
          <p style={{ display: "flex", margin: 0 }}>
            <span style={{ marginRight: 5 }}>›</span>Display of card is mandatory while at school.
          </p>
        </div>
      </div>

      {/* ── Signature ── */}
      <div
        style={{
          position: "absolute",
          bottom: 26, // Raised slightly to clear the swoosh curve
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 20,
        }}
      >
        <img
          src="/signature.png"
          alt="Signature"
          style={{ height: 32, objectFit: "contain", marginBottom: 2, mixBlendMode: "multiply" }} // Reduced from 40
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <div style={{ width: 110, borderBottom: "1.5px solid #111", marginBottom: 3 }} /> {/* Reduced from 130 */}
        <span
          style={{
            fontSize: 7.5, // Reduced from 8.5
            fontWeight: 800,
            color: "#111",
            fontFamily: "serif",
            letterSpacing: 0.5,
          }}
        >
          ISSUING AUTHORITY
        </span>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════ */
export default function IdCardApp() {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [isMirrored, setIsMirrored] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentPhoto, setCurrentPhoto] = useState<string>("");
  const [form, setForm] = useState({ name: "", father: "", class: "", gr: "" });

  const PLACEHOLDER =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%23e8ede8'/%3E%3C/svg%3E";

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCurrentPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPhoto) { alert("Please upload a student photo."); return; }
    if (!form.name || !form.gr) { alert("Please fill in Student Name and GR #."); return; }

    const student: StudentData = {
      name: form.name,
      fatherName: form.father,
      class: form.class,
      grNumber: form.gr,
      photo: currentPhoto,
    };

    if (editingIndex !== null) {
      const updated = [...students];
      updated[editingIndex] = student;
      setStudents(updated);
      setEditingIndex(null);
    } else {
      if (students.length >= 5) { alert("Sheet is full! Max 5 students per page."); return; }
      setStudents([...students, student]);
    }
    setForm({ name: "", father: "", class: "", gr: "" });
    setCurrentPhoto("");
  };

  const handleEdit = (i: number) => {
    const s = students[i];
    setForm({ name: s.name, father: s.fatherName, class: s.class, gr: s.grNumber });
    setCurrentPhoto(s.photo);
    setEditingIndex(i);
  };

  const handleDelete = (i: number) => {
    setStudents(students.filter((_, idx) => idx !== i));
    if (editingIndex === i) {
      setEditingIndex(null);
      setForm({ name: "", father: "", class: "", gr: "" });
      setCurrentPhoto("");
    }
  };

  const btnBase: React.CSSProperties = {
    padding: "8px 14px",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 12,
    cursor: "pointer",
    border: "none",
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f0f4f8", padding: 20, fontFamily: "sans-serif" }}>

        {/* ════════════════════════════════════════════════
            SCREEN UI  (hidden on print via print:hidden)
            ════════════════════════════════════════════════ */}
        <div
          className="print:hidden"
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* ── Preview Panel ── */}
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              flex: 1,
              minWidth: 480,
            }}
          >
            {/* Top bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a2a1a", margin: 0 }}>Card Preview</h2>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setIsMirrored(!isMirrored)}
                  style={{
                    ...btnBase,
                    border: "1.5px solid #7c3aed",
                    background: isMirrored ? "#7c3aed" : "white",
                    color: isMirrored ? "white" : "#7c3aed",
                  }}
                >
                  {isMirrored ? "✅ Mirrored" : "🔄 Flip for Print"}
                </button>
                <button
                  onClick={() => window.print()}
                  style={{ ...btnBase, background: "#1a3fa0", color: "white" }}
                >
                  Print Sheet
                </button>
                <button
                  onClick={() => setStudents([])}
                  style={{ ...btnBase, background: "#f0f0f0", color: "#444" }}
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Cards area */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                justifyContent: "center",
                background: "#dde8dd",
                padding: 20,
                borderRadius: 12,
                minHeight: 160,
                alignItems: "flex-start",
                transform: isMirrored ? "scaleX(-1)" : "none",
                transition: "transform 0.3s",
              }}
            >
              {students.length === 0 && (
                <p
                  style={{
                    color: "#aaa",
                    fontSize: 13,
                    textAlign: "center",
                    padding: "40px 0",
                    width: "100%",
                  }}
                >
                  No students added. Add up to 5 students.
                </p>
              )}
              {students.map((s, i) => (
                <div key={i} style={{ position: "relative", display: "flex", gap: 8 }}>
                  {/* Edit / Delete */}
                  <div
                    style={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                      display: "flex",
                      gap: 4,
                      zIndex: 50,
                    }}
                  >
                    <button
                      onClick={() => handleEdit(i)}
                      title="Edit"
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        border: "1px solid #ddd",
                        background: "white",
                        cursor: "pointer",
                        fontSize: 11,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(i)}
                      title="Delete"
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        border: "1px solid #ddd",
                        background: "white",
                        cursor: "pointer",
                        fontSize: 11,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                  <IdCardFront student={s} />
                  <IdCardBack />
                </div>
              ))}
            </div>

            {isMirrored && (
              <p style={{ textAlign: "center", color: "#7c3aed", fontWeight: 700, marginTop: 8 }}>
                Preview is mirrored. Press Print now.
              </p>
            )}
          </div>

          {/* ── Form Panel ── */}
          <div
            style={{
              background: "white",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              width: 270,
              height: "fit-content",
              position: "sticky",
              top: 16,
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#1a2a1a",
                marginBottom: 14,
                textAlign: "center",
                margin: "0 0 14px",
              }}
            >
              Add Student Details
            </h3>

            {/* Photo preview */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
              <img
                src={currentPhoto || PLACEHOLDER}
                alt="Preview"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #1a5c2a",
                }}
              />
            </div>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
            >
              {(["name", "father"] as const).map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field === "name" ? "Student Name" : "Father's Name"}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  required={field === "name"}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: "1.5px solid #c8d8c0",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#1a2a1a",
                    background: "#f8fcf4",
                    textAlign: "center",
                    outline: "none",
                  }}
                />
              ))}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <input
                  type="text"
                  placeholder="Class"
                  value={form.class}
                  onChange={(e) => setForm({ ...form, class: e.target.value })}
                  style={{
                    padding: "9px 8px",
                    border: "1.5px solid #c8d8c0",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#1a2a1a",
                    background: "#f8fcf4",
                    textAlign: "center",
                    outline: "none",
                  }}
                />
                <input
                  type="text"
                  placeholder="GR #"
                  value={form.gr}
                  onChange={(e) => setForm({ ...form, gr: e.target.value })}
                  required
                  style={{
                    padding: "9px 8px",
                    border: "1.5px solid #c8d8c0",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#1a2a1a",
                    background: "#f8fcf4",
                    textAlign: "center",
                    outline: "none",
                  }}
                />
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ fontSize: 11, color: "#666", cursor: "pointer" }}
              />

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: 12,
                  background: "#1a5c2a",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {editingIndex !== null ? "Update Entry" : "Add to Print List"}
              </button>

              {editingIndex !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingIndex(null);
                    setForm({ name: "", father: "", class: "", gr: "" });
                    setCurrentPhoto("");
                  }}
                  style={{
                    width: "100%",
                    padding: 10,
                    background: "#f0f0f0",
                    color: "#444",
                    border: "none",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Cancel Edit
                </button>
              )}

              <p style={{ textAlign: "center", fontSize: 11, color: "#888", margin: 0 }}>
                Cards Added: {students.length}/5
              </p>
            </form>
          </div>
        </div>

        {/* ════════════════════════════════════════════════
            PRINT LAYOUT  — uses .a4-print-container from global.css
            Row 1: all fronts  |  Row 2: all backs
            ════════════════════════════════════════════════ */}
        <div className="hidden print:block">
          <div className={`a4-print-container ${isMirrored ? "mirror-mode" : ""}`}>

            {/* ROW 1 — Fronts */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div className="print-card-wrapper" key={`front-${i}`}>
                {students[i] ? (
                  <IdCardFront student={students[i]} />
                ) : (
                  <div className="id-card" style={{ border: "none", background: "transparent", boxShadow: "none" }} />
                )}
              </div>
            ))}

            {/* ROW 2 — Backs */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div className="print-card-wrapper" key={`back-${i}`}>
                {students[i] ? (
                  <IdCardBack />
                ) : (
                  <div className="id-card" style={{ border: "none", background: "transparent", boxShadow: "none" }} />
                )}
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
}