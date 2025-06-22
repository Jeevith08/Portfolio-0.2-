import React, { useState, useCallback, useEffect } from 'react';
import { ArrowLeft, ArrowRight, X, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor';

const certificateFiles = [
  'c1.jpg', 'c2.jpg', 'c3.jpg', 'c4.png', 'c5.png', 'c6.jpg', 'c7.jpg', 'c7.png', 'c8.png', 'c9.png', 'c10.png', 'c11.png'
];

const verticalFiles = ['c2.jpg', 'c3.jpg', 'c9.png'];
const horizontalFiles = certificateFiles.filter(f => !verticalFiles.includes(f));
const allFiles = [...verticalFiles, ...horizontalFiles];

// Animation keyframes (add to global CSS if not present)
// @keyframes slide-in-left { from { opacity: 0; transform: translateX(-60px); } to { opacity: 1; transform: none; } }
// @keyframes slide-in-right { from { opacity: 0; transform: translateX(60px); } to { opacity: 1; transform: none; } }
// .animate-slide-in-left { animation: slide-in-left 0.7s cubic-bezier(.23,1.12,.67,.99) both; }
// .animate-slide-in-right { animation: slide-in-right 0.7s cubic-bezier(.23,1.12,.67,.99) both; }

const CertificateSection: React.FC<{ darkMode?: boolean }> = ({ darkMode: initialDarkMode }) => {
  const navigate = useNavigate();
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(initialDarkMode ?? false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openModal = (idx: number) => setModalIndex(idx);
  const closeModal = () => setModalIndex(null);
  const showPrev = () => setModalIndex(modalIndex !== null ? (modalIndex - 1 + allFiles.length) % allFiles.length : null);
  const showNext = () => setModalIndex(modalIndex !== null ? (modalIndex + 1) % allFiles.length : null);

  // Back to Journey section handler
  const handleBackToJourney = useCallback(() => {
    navigate('/', { replace: false });
    setTimeout(() => {
      const el = document.getElementById('journey');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, [navigate]);

  return (
    <section className={`min-h-screen w-full flex flex-col items-start justify-start bg-transparent`}>
      <CustomCursor />
      {/* Dark/Light mode toggle button */}
      <button
        className={`fixed top-6 right-8 z-50 p-1.5 rounded-full shadow transition-colors flex items-center justify-center
          ${darkMode ? 'bg-black/20 text-orange-400 hover:bg-orange-500 hover:text-white' : 'bg-orange-500 text-white hover:bg-orange-600'}
        `}
        style={{ width: '36px', height: '36px' }}
        onClick={() => setDarkMode((d) => !d)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
      <button
        type="button"
        onClick={handleBackToJourney}
        aria-label="Back"
        className={`fixed top-6 left-6 z-50 w-9 h-9 flex items-center justify-center rounded-full border-2 transition-all duration-200 shadow focus:outline-none focus:ring-2 focus:ring-orange-400
          ${darkMode ? 'bg-[#181818] border-orange-500 text-white' : 'bg-white border-orange-400 text-orange-700'}
          hover:bg-orange-500 focus:bg-orange-500 active:bg-orange-500 hover:text-white focus:text-white active:text-white`}
        style={{ fontSize: '1.1rem' }}
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div className="w-full flex flex-col items-center mt-24">
        <h2 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-orange-200' : 'text-orange-600'}`}>My Certificates</h2>
        <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl px-4">
          {/* Vertical Certificates */}
          <div className="flex-1 flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6 w-full place-items-center">
              {verticalFiles.map((file, idx) => (
                <div
                  key={file}
                  className={
                    `flex items-center justify-center border-4 shadow-lg aspect-[3/4] w-full max-w-xs p-1 rounded-xl cursor-pointer animate-slide-in-left`
                  }
                  style={{
                    borderColor: '#fb923c',
                    boxShadow: '0 0 8px 1px #fb923c88',
                    background: darkMode ? '#181818' : '#fff',
                    transition: 'box-shadow 0.3s',
                    animation: `slide-in-left 0.7s cubic-bezier(.23,1.12,.67,.99) both ${idx * 0.12 + 0.1}s, border-blink 2s infinite 1s`,
                  }}
                  onClick={() => openModal(idx)}
                >
                  <img
                    src={`/certificate/${file}`}
                    alt={file}
                    className="w-full h-full object-cover rounded-xl"
                    style={{ boxShadow: '0 0 4px 1px #fb923c33' }}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Horizontal Certificates */}
          <div className="flex-1 flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full place-items-center">
              {horizontalFiles.map((file, idx) => (
                <div
                  key={file}
                  className={
                    `flex items-center justify-center border-4 shadow-lg aspect-[4/3] w-full max-w-xs p-1 rounded-2xl cursor-pointer animate-slide-in-right`
                  }
                  style={{
                    borderColor: '#fb923c',
                    boxShadow: '0 0 8px 1px #fb923c88',
                    background: darkMode ? '#181818' : '#fff',
                    transition: 'box-shadow 0.3s',
                    animation: `slide-in-right 0.7s cubic-bezier(.23,1.12,.67,.99) both ${idx * 0.12 + 0.1}s, border-blink 2s infinite 1s`,
                  }}
                  onClick={() => openModal(verticalFiles.length + idx)}
                >
                  <img
                    src={`/certificate/${file}`}
                    alt={file}
                    className="w-full h-full object-cover rounded-2xl"
                    style={{ boxShadow: '0 0 4px 1px #fb923c33' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Modal for full-screen image viewer */}
      {modalIndex !== null && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-all`}
          onClick={closeModal}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-orange-500 text-orange-500 hover:text-white transition-all"
            onClick={closeModal}
            aria-label="Close"
            style={{ zIndex: 60 }}
          >
            <X className="w-6 h-6" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-orange-500 text-orange-500 hover:text-white transition-all"
            onClick={e => { e.stopPropagation(); showPrev(); }}
            aria-label="Previous"
            style={{ zIndex: 60 }}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-orange-500 text-orange-500 hover:text-white transition-all"
            onClick={e => { e.stopPropagation(); showNext(); }}
            aria-label="Next"
            style={{ zIndex: 60 }}
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div
            className={`flex items-center justify-center w-full h-full`}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={`/certificate/${allFiles[modalIndex]}`}
              alt={allFiles[modalIndex]}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl border-4"
              style={{ borderColor: '#fb923c', boxShadow: '0 0 32px 8px #fb923c88' }}
            />
          </div>
        </div>
      )}
      <style>{`
        @keyframes border-blink {
          0%, 100% { border-color: #fb923c; }
          50% { border-color: #f97316; }
        }
      `}</style>
    </section>
  );
};

export default CertificateSection; 