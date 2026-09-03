Object.keys(F).forEach(sys=>{const g=document.getElementById('flash-'+sys);if(!g)return;F[sys].forEach(f=>{const e=document.createElement('div');e.className='flip';e.innerHTML=`<div class="flip-inner"><div class="face"><div class="q">${f[0]}</div><div class="hint">tap to reveal</div></div><div class="face back"><div class="a">${f[1]}</div></div></div>`;e.addEventListener('click',()=>e.classList.toggle('flipped'));g.appendChild(e);});});
Object.keys(Q).forEach(sys=>{const h=document.getElementById('quiz-'+sys);const s=document.getElementById('score-'+sys);const b=document.getElementById('prog-'+sys);if(!h)return;const items=Q[sys];let idx=0,score=0;function build(){if(idx>=items.length)return finish();const it=items[idx];const c=document.createElement('div');c.className='quiz-card';c.innerHTML=`<div class="quiz-q">Q${idx+1}/${items.length}. ${it.q}</div><div class="choices">${it.o.map((o,i)=>`<button class="btn" data-i="${i}">${o}</button>`).join('')}</div><div class="explanation"></div>`;h.innerHTML='';h.appendChild(c);const ex=c.querySelector('.explanation');c.querySelectorAll('.btn').forEach(btn=>{btn.addEventListener('click',()=>{if(c.querySelector('.btn.correct'))return;const p=+btn.dataset.i;if(p===it.a){btn.classList.add('correct');score++;}else{btn.classList.add('wrong');c.querySelector(`.btn[data-i="${it.a}"]`).classList.add('correct');}c.querySelectorAll('.btn').forEach(x=>x.disabled=true);ex.innerHTML=`<strong>${p===it.a?'Correct.':'Not quite.'}</strong> ${it.why}`;ex.classList.add('show');up();setTimeout(()=>{idx++;build();},1400);});});up();}function up(){s.textContent=`Score ${score} / ${items.length}`;b.style.width=(idx/items.length*100)+'%';}function finish(){h.innerHTML=`<div class="quiz-card" style="text-align:center"><h3 style="border:0;padding:0">Done — ${score} / ${items.length}</h3><p class="muted">${score===items.length?'Clean run.':score>=items.length*0.7?'Solid. Review the flashcards.':'Re-read this system and retry.'}</p><button class="btn" id="ret-${sys}">Retake</button></div>`;b.style.width='100%';up();document.getElementById('ret-'+sys).addEventListener('click',()=>{idx=0;score=0;build();});}window['__start_'+sys]=build;});
window.addEventListener('load',()=>{
  if(window['__start_s1'])window['__start_s1']();

  /* ---- Flow hover path highlighting ---- */
  document.querySelectorAll('.flow').forEach(flow=>{
    const nodes=flow.querySelectorAll('.node');
    const conns=flow.querySelectorAll('.conn');
    // Build path map: for each terminal node, which nodes+conns lead to it
    function getPathTo(node){
      const path=new Set([node]);
      // walk up the DOM: each preceding sibling that's a node or conn
      let el=node;
      while(el && el!==flow){
        el=el.previousElementSibling;
        if(!el)break;
        // go up to parent if at start of a col
        if(!el.previousElementSibling && el.parentElement!==flow && el.parentElement.classList.contains('col')){
          el=el.parentElement;
          continue;
        }
        if(el.classList.contains('node'))path.add(el);
        if(el.classList.contains('conn'))path.add(el);
      }
      return path;
    }
    nodes.forEach(node=>{
      // Only attach to terminal/leaf nodes (yes/no/action nodes)
      if(node.classList.contains('yes')||node.classList.contains('no')){
        node.style.cursor='pointer';
        node.addEventListener('mouseenter',()=>{
          const path=getPathTo(node);
          flow.classList.add('highlight');
          flow.querySelectorAll('.node,.conn').forEach(el=>{
            if(path.has(el))el.classList.add('hl');
            else el.classList.remove('hl');
          });
        });
        node.addEventListener('mouseleave',()=>{
          flow.classList.remove('highlight');
          flow.querySelectorAll('.hl').forEach(el=>el.classList.remove('hl'));
        });
      }
    });
  });

  /* ---- Flow scroll entrance ---- */
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        // stagger child animations
        const items=e.target.querySelectorAll('.node,.conn');
        items.forEach((item,i)=>{item.style.animationDelay=(i*0.04)+'s';});
        io.unobserve(e.target);
      }
    });
  },{threshold:0.15});
  document.querySelectorAll('.flow').forEach(f=>io.observe(f));
});
