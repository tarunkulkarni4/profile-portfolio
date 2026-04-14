import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo, projects } from '../data/portfolioData';

export default function Terminal({ onClose }) {
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to tk-os v1.0.0' },
    { type: 'output', content: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      setInput('');
      
      const newHistory = [...history, { type: 'input', content: `guest@tk-os:~$ ${cmd}` }];
      
      switch (cmd) {
        case 'help':
          newHistory.push({ type: 'output', content: 'Available commands: whoami, ls projects, clear, exit' });
          break;
        case 'whoami':
          newHistory.push({ type: 'output', content: personalInfo.bio });
          break;
        case 'ls projects':
          newHistory.push({ 
            type: 'output', 
            content: projects.map(p => `► ${p.title}`).join('\n')
          });
          break;
        case 'clear':
          setHistory([]);
          return;
        case 'exit':
          onClose();
          return;
        case '':
          break;
        default:
          newHistory.push({ type: 'error', content: `Command not found: ${cmd}` });
      }
      setHistory(newHistory);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <div 
          className="w-full max-w-2xl bg-[#1e1e1e] rounded-lg overflow-hidden shadow-2xl border border-[#333] font-mono text-sm"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-[#111]">
            <div className="flex gap-1.5">
              <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-[#888] mx-auto text-xs font-semibold tracking-wider">guest@tk-os</span>
          </div>

          {/* Body */}
          <div className="p-4 h-[400px] overflow-y-auto text-gray-300 flex flex-col gap-2">
            {history.map((line, i) => (
              <div 
                key={i} 
                className={`${line.type === 'error' ? 'text-red-400' : line.type === 'input' ? 'text-green-400' : 'whitespace-pre-wrap'}`}
              >
                {line.content}
              </div>
            ))}
            
            <div className="flex items-center gap-2 mt-2">
              <span className="text-green-400 font-semibold shrink-0">guest@tk-os:~$</span>
              <input
                autoFocus
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="flex-1 bg-transparent outline-none border-none text-gray-300"
                spellCheck={false}
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
