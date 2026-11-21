import { useEffect, useMemo, useState } from 'react';
import { wordExercises, excelExercises, type Exercise } from './exercises';

type Exam = 'rssb' | 'hc';
type Tab = 'dashboard' | 'word' | 'excel' | 'typing' | 'about';
const examNames: Record<Exam,string> = { rssb:'RSSB LDC / Junior Assistant', hc:'Rajasthan High Court JJA / Clerk' };
function App() {
  const [exam,setExam] = useState<Exam>('rssb');
  const [tab,setTab] = useState<Tab>('dashboard');
  const [selected,setSelected] = useState<Exercise|null>(null);
  const [seconds,setSeconds] = useState(600);
  const [running,setRunning] = useState(false);
  const [completed,setCompleted] = useState<string[]>([]);
  const [answer,setAnswer] = useState('');
  const [typed,setTyped] = useState('');
  const [typingStarted,setTypingStarted] = useState(false);
  const [typingSeconds,setTypingSeconds] = useState(60);
  const [dark,setDark] = useState(true);
  const bank = tab === 'excel' ? excelExercises : wordExercises;
  const doneCount = completed.length;
  useEffect(()=>{ if(!running) return; const id=window.setInterval(()=>setSeconds(s=>{if(s<=1){setRunning(false);return 0;}return s-1;}),1000); return ()=>window.clearInterval(id); },[running]);
  useEffect(()=>{ if(!typingStarted) return; const id=window.setInterval(()=>setTypingSeconds(s=>{if(s<=1){setTypingStarted(false);return 0;}return s-1;}),1000); return ()=>window.clearInterval(id); },[typingStarted]);
  const mmss = (n:number)=>`${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;
  const openExercise=(e:Exercise)=>{setSelected(e);setSeconds(e.durationMinutes*60);setRunning(false);setAnswer('');};
  const finish=()=>{if(selected&&!completed.includes(selected.id))setCompleted(v=>[...v,selected.id]);setRunning(false);setSelected(null);};
  const nav=[['dashboard','Overview'],['word','Word Practice'],['excel','Excel Practice'],['typing','Typing Practice'],['about','About']];
  const sampleText='राजस्थान की संस्कृति, इतिहास और प्रशासनिक व्यवस्था का अध्ययन प्रतियोगी परीक्षाओं की तैयारी में महत्वपूर्ण भूमिका निभाता है। नियमित अभ्यास से गति और शुद्धता में सुधार होता है।';
  const typedWords=typed.trim()?typed.trim().split(/\s+/).length:0;
  const expectedWords=sampleText.split(/\s+/);
  const correctWords=typed.trim().split(/\s+/).filter((w,i)=>w===expectedWords[i]).length;
  return <div className={dark?'app dark':'app light'}>
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">S</div><div><b>SAROTECH</b><small>EFFICIENCY TEST</small></div></div>
      <div className="side-label">WORKSPACE</div>
      {nav.map(([id,label])=><button key={id} className={tab===id?'nav active':'nav'} onClick={()=>{setTab(id as Tab);setSelected(null);}}>{label}</button>)}
      <div className="side-bottom"><span className="status-dot"/> Offline-ready<br/><small>Version 0.1.0 · Windows x64</small></div>
    </aside>
    <main className="main">
      <header className="topbar"><div><span className="eyebrow">PRACTICE WORKSPACE</span><h1>{selected?selected.title:nav.find(n=>n[0]===tab)?.[1]}</h1></div><div className="top-actions"><select value={exam} onChange={e=>setExam(e.target.value as Exam)}><option value="rssb">RSSB LDC / Junior Assistant</option><option value="hc">High Court JJA / Clerk</option></select><button className="icon-btn" onClick={()=>setDark(v=>!v)} title="Toggle theme">{dark?'☼':'☾'}</button></div></header>
      {selected ? <section className="workspace">
        <div className="work-head"><div><span className="pill">{selected.module} · Original practice</span><p className="muted">Exercise {selected.id.toUpperCase()} · {examNames[exam]}</p></div><div className="timer">{mmss(seconds)}</div></div>
        <div className="task-card"><h2>Task instructions</h2><p>{selected.instruction}</p><p className="muted">यह अभ्यास निर्देश-आधारित है। वास्तविक MS Word/Excel फाइल संपादन और स्वचालित दस्तावेज़ मूल्यांकन अगले विकास चरण में जोड़े जाएंगे।</p></div>
        <label className="field-label">अपना उत्तर / कार्य-नोट्स</label><textarea value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="यहाँ अपने किए गए कार्य का विवरण लिखें..." rows={7}/>
        <div className="actions"><button className="secondary" onClick={()=>setRunning(v=>!v)}>{running?'Pause timer':'Start timer'}</button><button className="primary" onClick={finish}>Complete exercise</button><button className="ghost" onClick={()=>setSelected(null)}>Back to list</button></div>
      </section> : tab==='dashboard' ? <section>
        <div className="welcome"><div><span className="pill">YOUR EXAM PREPARATION DESK</span><h2>Practice with purpose.</h2><p>दोनों राजस्थान भर्ती परीक्षाओं के लिए कंप्यूटर दक्षता अभ्यास।</p></div><div className="welcome-icon">S</div></div>
        <div className="stats"><div className="stat"><small>WORD EXERCISES</small><strong>50</strong><span>Original practice tasks</span></div><div className="stat"><small>EXCEL EXERCISES</small><strong>40</strong><span>Original practice tasks</span></div><div className="stat"><small>COMPLETED</small><strong>{doneCount}</strong><span>Across this session</span></div></div>
        <div className="section-title"><div><h2>Choose your practice</h2><p className="muted">एक मॉड्यूल चुनकर अभ्यास शुरू करें।</p></div></div>
        <div className="module-grid"><button className="module-card" onClick={()=>setTab('word')}><div className="module-icon word">W</div><h3>Word Processing</h3><p>Document formatting, paragraphs, tables and page layout.</p><b>50 exercises →</b></button><button className="module-card" onClick={()=>setTab('excel')}><div className="module-icon excel">X</div><h3>Spreadsheet</h3><p>Formulas, cell formatting, sorting, filtering and charts.</p><b>40 exercises →</b></button><button className="module-card" onClick={()=>setTab('typing')}><div className="module-icon typing">⌨</div><h3>Typing Practice</h3><p>Hindi and English timed typing practice.</p><b>Start practice →</b></button></div>
        <div className="notice"><b>Exam profile selected:</b> {examNames[exam]}. परीक्षा के अंतिम नियम आधिकारिक भर्ती नोटिस से सत्यापित होने तक provisional रहेंगे।</div>
      </section> : tab==='word'||tab==='excel' ? <section>
        <div className="section-title"><div><h2>{tab==='word'?'Word exercise bank':'Excel exercise bank'}</h2><p className="muted">Original practice material · {bank.length} exercises</p></div><span className="pill">{bank.filter(e=>completed.includes(e.id)).length}/{bank.length} completed</span></div>
        <div className="exercise-list">{bank.map((e,i)=><div className="exercise-row" key={e.id}><div className="exercise-num">{String(i+1).padStart(2,'0')}</div><div className="exercise-info"><b>{e.title}</b><p>{e.instruction}</p></div><span className="marks">{e.marks} marks</span><button className="small-primary" onClick={()=>openExercise(e)}>Open</button></div>)}</div>
      </section> : tab==='typing' ? <section className="typing-panel"><span className="pill">60-SECOND PRACTICE</span><h2>Hindi typing practice</h2><p className="muted">नीचे दिया गया अनुच्छेद टाइप करें। यह सामान्य अभ्यास है, आधिकारिक परीक्षा सामग्री नहीं।</p><div className="sample">{sampleText}</div><textarea value={typed} onChange={e=>setTyped(e.target.value)} placeholder="यहाँ टाइप करना शुरू करें..." rows={5}/><div className="actions"><button className="primary" onClick={()=>{setTypingSeconds(60);setTypingStarted(true);setTyped('');}}>Start / Restart 60s</button><span className="timer">{mmss(typingSeconds)}</span><span className="pill">{typedWords} words · {correctWords} exact word matches</span></div></section> : <section className="about"><div className="brand-mark large">S</div><h2>SAROTECH Efficiency Test</h2><p>Developed by Prashant Latta</p><p>Brand: SAROTECH</p><p>Windows 10 and Windows 11 · 64-bit</p><p className="muted">Open-source project. Independent practice software; not affiliated with RSSB, Rajasthan High Court, Soni Office or Microsoft.</p><div className="notice">Version 0.1.0 — Foundation application. DOCX/XLSX editing, automated grading and exam-verified profiles are planned for subsequent releases.</div></section>}
      <footer>© SAROTECH · Prashant Latta <span>Built for focused practice</span></footer>
    </main>
  </div>;
}
export default App;
