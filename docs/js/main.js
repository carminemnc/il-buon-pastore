/* main.js — Full-page engine · manifest-driven */
(function(){
  'use strict';
  const reduceMotion = matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* ===== CONFIG ===== */
  const CONTATTI = {
    tel: '+393393179926',
    wa: '+393393179926',
    email: 'levoland@libero.it',
    instagram: 'ilbuonpastore',
    address: "Via Ca' Santino 1963, 47834 Montefiore Conca (RN)",
    mapsQuery: "Via+Ca'+Santino+1963+47834+Montefiore+Conca+RN",
    orari: [
      { days:{it:'Lun – Sab',en:'Mon – Sat'}, hours:'15:00 – 19:00' },
      { days:{it:'Domenica',en:'Sunday'}, hours:{it:'Chiuso',en:'Closed'}, closed:true },
    ],
  };

  const CHAPTERS = [
    { id:'pascolo',      count:7, i18n:'pascolo',      focus:'center' },
    { id:'metamorfosi',  count:9, i18n:'metamorfosi',  focus:'center' },
    { id:'stagionatura', count:3, i18n:'stagionatura', focus:'center' },
    { id:'tavola',       count:3, i18n:'tavola',       focus:'center' },
    { id:'lana',         count:2, i18n:'lana',         focus:'center' },
    { id:'galleria',     count:0, i18n:'galleria',     gallery:true },
  ];

  const GALLERY = [
    {src:'assets/imgs/pecorino/ricotta.webp', name:'Ricotta Fresca',
      sub:{it:'Cremosa',en:'Creamy'},
      desc:{it:"La ricotta fresca è molto delicata e con una cremosità unica, ottima da mangiare al cucchiaio. Diventa un dessert completo con marmellate o miele e cannella.",
            en:"Our fresh ricotta is exceptionally delicate and creamy, perfect eaten by the spoonful. It becomes a complete dessert with jam or honey and cinnamon."},
      scheda:{it:'Ingredienti: Siero di latte | Pezzatura: 80gr, 400gr, 1500gr',
              en:'Ingredients: Whey | Size: 80g, 400g, 1500g'}},
    {src:'assets/imgs/pecorino/caciotta.webp', name:'La Caciotta',
      sub:{it:'Pecorino semistagionato',en:'Semi-aged pecorino'},
      desc:{it:"Un formaggio semplice e antico lavorato completamente a mano. Il latte viene scaldato a circa 33°, si aggiunge il caglio naturale di vitello. La cagliata si rompe a chicco di riso e si raccoglie a mano.",
            en:"A simple, ancient cheese made entirely by hand. The milk is heated to about 33°C, then natural calf rennet is added. The curd is broken to rice-grain size and gathered by hand."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio naturale di vitello, sale di Trapani | Stagionatura: Almeno 30gg | Pezzatura: 1,5 kg | Disponibilità: Tutto l\'anno',
              en:'Ingredients: Raw sheep milk, natural calf rennet, Trapani salt | Ageing: Min. 30 days | Size: 1.5 kg | Availability: Year-round'}},
    {src:'assets/imgs/pecorino/appassito.webp', name:"L'Appassito",
      sub:{it:'A pasta non lavorata',en:'Unworked curd'},
      desc:{it:"La cagliata viene raccolta in blocchi con formelle a cono. Le formelle si fanno stufare al calore del caldaio perdendo il 50% del peso. Appassisce lentamente senza pressione. Si presenta come una robiolina di circa 300gr.",
            en:"The curd is gathered in cone-shaped moulds and left to drain in the warmth of the vat, losing 50% of its weight. It wilts slowly without pressure, resulting in a small 300g wheel."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio naturale di vitello, sale di Trapani | Stagionatura: Circa 30gg | Pezzatura: 350 gr | Disponibilità: Da dicembre',
              en:'Ingredients: Raw sheep milk, natural calf rennet, Trapani salt | Ageing: ~30 days | Size: 350g | Availability: From December'}},
    {src:'assets/imgs/pecorino/aromatico.webp', name:"L'Aromatico",
      sub:{it:'Alle erbe aromatiche',en:'With aromatic herbs'},
      desc:{it:"Il pecorino fresco viene cosparso con un battuto di salvia, rosmarino, timo e finocchio selvatico. Lo si lascia in un otre per circa 10gg dove subisce una fermentazione. Si ottiene un formaggio intenso e profumato.",
            en:"The fresh pecorino is coated with a blend of sage, rosemary, thyme and wild fennel, then left in a cask for about 10 days to ferment. The result is an intense, fragrant cheese."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio naturale di vitello, sale di Trapani, erbe aromatiche | Stagionatura: Circa 20gg | Pezzatura: 1,5 kg | Disponibilità: Da dicembre',
              en:'Ingredients: Raw sheep milk, natural calf rennet, Trapani salt, aromatic herbs | Ageing: ~20 days | Size: 1.5 kg | Availability: From December'}},
    {src:'assets/imgs/pecorino/gobbo.webp', name:'Il Gobbo',
      sub:{it:'A caglio vegetale',en:'Vegetable rennet'},
      desc:{it:"Nelle terre di Montefiore si usava l'erba de ches, un'erba spontanea che cagliava il latte. Questa tradizione antichissima era affidata ai racconti dei nonni. Noi l'abbiamo raccolta e la proponiamo con lo spirito di una volta.",
            en:"In the hills of Montefiore, a wild herb called 'erba de ches' was traditionally used to curdle milk. We've revived this ancient practice, gathering the herb and making cheese the way our grandparents described."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio vegetale, sale di Trapani | Stagionatura: Circa 60gg | Pezzatura: 1,3 kg | Disponibilità: Da marzo',
              en:'Ingredients: Raw sheep milk, vegetable rennet, Trapani salt | Ageing: ~60 days | Size: 1.3 kg | Availability: From March'}},
    {src:'assets/imgs/pecorino/noci.webp', name:'Il Noci',
      sub:{it:'Nella foglia di noce',en:'In walnut leaves'},
      desc:{it:"L'affinamento in foglia di noce nasce da un formaggio di circa 6 mesi. Si raccolgono le foglie più verdi e vi si avvolge il formaggio, lasciandolo riposare per circa 40gg in una vecchia botte di vino.",
            en:"A 6-month pecorino is wrapped in the greenest walnut leaves and left to rest for about 40 days in an old wine barrel, gaining subtle tannin notes."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio naturale di vitello, sale di Trapani, foglia di noce | Stagionatura: Almeno 100gg | Pezzatura: 1,3 kg | Disponibilità: Da luglio',
              en:'Ingredients: Raw sheep milk, natural calf rennet, Trapani salt, walnut leaves | Ageing: Min. 100 days | Size: 1.3 kg | Availability: From July'}},
    {src:'assets/imgs/pecorino/ubriaco.webp', name:"L'Ubriaco",
      sub:{it:'Nella vinaccia di Sangiovese',en:'In Sangiovese grape pomace'},
      desc:{it:"In una vecchia botte di rovere poniamo a riposare il nostro pecorino migliore, cospargendolo con le bucce dell'uva dalla quale è appena stato spremuto il Sangiovese. Dopo circa 20 giorni si apre la botte.",
            en:"Our finest pecorino rests in an old oak barrel, covered with freshly pressed Sangiovese grape skins. After about 20 days the barrel is opened to reveal a rich, wine-kissed cheese."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio naturale di vitello, sale di Trapani, vinaccia di Sangiovese | Stagionatura: Almeno 100gg | Pezzatura: 1,3 kg | Disponibilità: Da ottobre',
              en:'Ingredients: Raw sheep milk, natural calf rennet, Trapani salt, Sangiovese grape pomace | Ageing: Min. 100 days | Size: 1.3 kg | Availability: From October'}},
    {src:'assets/imgs/pecorino/intenso.webp', name:"L'Intenso",
      sub:{it:'Di fossa',en:'Pit-aged'},
      desc:{it:"Nasce ad aprile/maggio quando il latte è più ricco. Lavorato a latte crudo, stagionato fino ad agosto e poi messo nelle antiche fosse di Sogliano. Si aspetta fino al giorno di Santa Caterina (24 novembre).",
            en:"Made in April/May when the milk is richest. Aged until August, then placed in the ancient pits of Sogliano until Saint Catherine's day (24 November)."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio naturale di vitello, sale di Trapani | Stagionatura: Almeno 150gg | Pezzatura: 1,1 kg | Disponibilità: Da novembre',
              en:'Ingredients: Raw sheep milk, natural calf rennet, Trapani salt | Ageing: Min. 150 days | Size: 1.1 kg | Availability: From November'}},
    {src:'assets/imgs/pecorino/birrozzo.webp', name:'Il Birrozzo',
      sub:{it:'Nelle trebbie di birra',en:'In beer spent grain'},
      desc:{it:"Con le trebbie fresche del birrificio artigianale La Cotta di Montecerinione, in una vecchia botte, affiniamo il nostro pecorino più stagionato. Il risultato è un formaggio con intensità forte e dolcezza d'orzo.",
            en:"Using fresh spent grain from the artisan brewery La Cotta di Montecerinione, we age our most mature pecorino in an old barrel. The result is an intense cheese with a sweet barley finish."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio naturale di vitello, sale di Trapani, trebbie di birra cruda | Stagionatura: Circa 6 mesi | Pezzatura: 1,3 kg',
              en:'Ingredients: Raw sheep milk, natural calf rennet, Trapani salt, raw beer spent grain | Ageing: ~6 months | Size: 1.3 kg'}},
    {src:'assets/imgs/pecorino/blu.webp', name:'Il Blu',
      sub:{it:'Erborinato naturale',en:'Natural blue'},
      desc:{it:"Un pecorino dalla stagionatura lunga in cui le muffe nobili penetrano naturalmente nella pasta, creando venature blu-verdi che regalano un sapore intenso e complesso con note di sottobosco.",
            en:"A long-aged pecorino where noble moulds naturally penetrate the paste, creating blue-green veins that deliver an intense, complex flavour with undergrowth notes."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio naturale di vitello, sale di Trapani | Stagionatura: Circa 6 mesi | Pezzatura: 1,5 kg',
              en:'Ingredients: Raw sheep milk, natural calf rennet, Trapani salt | Ageing: ~6 months | Size: 1.5 kg'}},
    {src:'assets/imgs/pecorino/stagionato.webp', name:'Lo Stagionato',
      sub:{it:'Lungo affinamento',en:'Long-aged'},
      desc:{it:"Dalla lavorazione a latte crudo con pasta semicotta si ottiene il nostro stagionato. Ben pressato in grosse formelle dai 2 ai 3 chili, viene lavato, girato e unto con cura per almeno 12 mesi.",
            en:"From raw milk with a semi-cooked paste comes our aged pecorino. Pressed into large 2–3 kg wheels, it is washed, turned and oiled with care for at least 12 months."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio naturale di vitello, sale di Trapani | Stagionatura: Almeno 9 mesi | Pezzatura: 2,5 kg',
              en:'Ingredients: Raw sheep milk, natural calf rennet, Trapani salt | Ageing: Min. 9 months | Size: 2.5 kg'}},
    {src:'assets/imgs/pecorino/yobee.webp', name:'Yobee',
      sub:{it:'Yogurt di pecora',en:'Sheep yogurt'},
      desc:{it:"Uno yogurt intero senza l'aggiunta di zuccheri, compatto e cremoso ma con un gusto delicato. Più ricco di proteine e più facilmente digeribile rispetto allo yogurt classico, è l'ideale per la colazione, uno spuntino o la preparazione di numerose ricette.",
            en:"A whole-milk yogurt with no added sugar, firm and creamy yet delicate in flavour. Richer in protein and easier to digest than regular yogurt, it is ideal for breakfast, a snack or countless recipes."},
      scheda:{it:'Ingredienti: Latte di pecora, fermenti lattici vivi | Pezzatura: 150gr, 500gr',
              en:'Ingredients: Sheep milk, live cultures | Size: 150g, 500g'}},
  ];

  const WA_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 14.9L2 22l5.3-1.4A10 10 0 1 0 12 2Zm5.4 14.2c-.2.7-1.3 1.3-1.8 1.4-.5 0-1 .2-3.2-.7a11.4 11.4 0 0 1-4.6-4c-.4-.5-1.2-1.8-1.2-3.4 0-1.6.8-2.4 1.1-2.7.3-.3.6-.4.8-.4h.6c.2 0 .5 0 .7.5s.9 2.2 1 2.3c.1.2.1.4 0 .6-.1.2-.2.3-.3.5l-.5.5c-.2.2-.4.4-.2.7.2.4.9 1.5 2 2.4.7.6 1.4 1 1.8 1.1.3.2.5.1.7-.1s.8-1 1-1.3c.2-.3.4-.3.7-.2s1.8.8 2.1 1c.3.1.5.2.6.3.1.1.1.7-.1 1.3Z"/></svg>';
  const WA_LINK = `https://wa.me/${CONTATTI.wa.replace('+','')}`;
  const NAV_ORDER = ['galleria','lana'];
  const RAIL_LABELS = ['Home','nav.pascolo','nav.metamorfosi','nav.stagionatura','nav.tavola','nav.lana','galleria.label','nav.contatti'];
  const CROSSFADE_INTERVAL = 5000;
  const COOLDOWN = reduceMotion ? 80 : 700;
  const WHEEL_DEBOUNCE = 500;

  /* ===== GENERA DOM ===== */
  const panelsContainer = document.getElementById('panels');
  const contattiPanel = document.getElementById('contatti');
  const railNav = document.getElementById('rail');
  const navLinksContainer = document.getElementById('navLinks');

  // Contatti
  const mapSrc = `https://www.google.com/maps?q=${CONTATTI.mapsQuery}&output=embed`;
  function lang(){ return document.body.getAttribute('data-lang')||'it'; }
  function t(field){ return typeof field==='object' ? (field[lang()]||field.it||'') : (field||''); }

  function buildOrari(){ return CONTATTI.orari.map(o => `<div class="orari-row${o.closed?' orari-closed':''}"><span>${t(o.days)}</span><span>${t(o.hours)}</span></div>`).join(''); }
  contattiPanel.innerHTML = `
    <div class="contatti-wrap">
      <div class="contatti-header"><span class="label" data-i18n="contatti.label"></span><h2 data-i18n="contatti.title"></h2></div>
      <div class="contatti-cards">
        <div class="contatti-left">
          <a href="https://instagram.com/${CONTATTI.instagram}" target="_blank" rel="noopener noreferrer" class="contatto-link">
            <span class="contatto-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></span>
            <span class="contatto-link-text"><strong>Instagram</strong><span class="contatto-detail">@${CONTATTI.instagram}</span></span>
          </a>
          <a href="${WA_LINK}" target="_blank" rel="noopener noreferrer" class="contatto-link">
            <span class="contatto-icon">${WA_SVG}</span>
            <span class="contatto-link-text"><strong data-i18n="contatti.wa.title"></strong><span class="contatto-detail" data-i18n="contatti.wa.detail"></span></span>
          </a>
          <a href="mailto:${CONTATTI.email}" class="contatto-link">
            <span class="contatto-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m2 7 10 6 10-6"/></svg></span>
            <span class="contatto-link-text"><strong>Email</strong><span class="contatto-detail">${CONTATTI.email}</span></span>
          </a>
        </div>
        <div class="contatti-right">
          <div class="contatto-place">
            <span class="contatto-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7Z"/><circle cx="12" cy="9" r="2.5"/></svg></span>
            <strong data-i18n="contatti.dove"></strong>
            <span class="contatto-detail">${CONTATTI.address}</span>
          </div>
          <div class="orari"><span class="orari-label" data-i18n="contatti.orari.label"></span>${buildOrari()}</div>
          <div class="map-wrap"><iframe src="${mapSrc}" width="100%" height="180" style="border:0;border-radius:6px" allowfullscreen loading="lazy" title="Mappa" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe></div>
        </div>
      </div>
      <footer class="footer">
        <span class="footer-logo">Il Buon Pastore</span>
        <p class="footer-copy" data-i18n="footer.copy"></p>
      </footer>
    </div>`;

  // Chapters
  CHAPTERS.forEach((ch, idx) => {
    const section = document.createElement('section');
    section.className = ch.gallery ? 'panel panel-gallery' : 'panel panel-chapter';
    section.id = ch.id;

    if (ch.gallery) {
      const items = GALLERY.map((img,i) => `<div class="gallery-item" data-product="${i}"><span class="gallery-name">${img.name}</span><img src="${img.src}" alt="${img.name}" loading="lazy"></div>`).join('');
      section.innerHTML = `
        <div class="gallery-wrap">
          <div class="gallery-header"><span class="label" data-i18n="${ch.i18n}.label"></span><h2 data-i18n="${ch.i18n}.title"></h2><p class="gallery-hint" data-i18n="galleria.hint">Tocca un formaggio per scoprirlo</p></div>
          <div class="gallery-strip">${items}</div>
        </div>
        <div class="panel-cue"><span class="scroll-arrow">↓</span></div>`;
    } else {
      const imgPath = i => `assets/imgs/${ch.id}/${ch.id}-${i}.webp`;
      const focus = ch.focus || 'center';
      let bgHtml;

      if (ch.count > 1) {
        const slides = Array.from({length:ch.count}, (_,i) =>
          `<div class="scene-slide${i===0?' is-active':''}" style="background-image:url('${imgPath(i+1)}')"></div>`
        ).join('');
        bgHtml = `<div class="panel-bg panel-crossfade" data-focus="${focus}">${slides}</div>`;
      } else {
        bgHtml = `<div class="panel-bg" style="background-image:url('${ch.count?imgPath(1):''}')" data-focus="${focus}"></div>`;
      }

      const dict = window.i18n ? window.i18n._dict : null;
      const hasP2 = dict ? !!dict[ch.i18n+'.p2'] : true;

      section.innerHTML = `
        ${bgHtml}
        <div class="panel-split"><div class="panel-text">
          <p class="label" data-i18n="${ch.i18n}.label"></p>
          <h2 data-i18n="${ch.i18n}.title"></h2>
          <p data-i18n="${ch.i18n}.p1"></p>
          ${hasP2 ? `<p data-i18n="${ch.i18n}.p2"></p>` : ''}
        </div></div>
        <div class="panel-cue"><span class="scroll-arrow">↓</span></div>`;
    }

    panelsContainer.insertBefore(section, contattiPanel);
  });

  // Crossfade
  document.querySelectorAll('.panel-crossfade').forEach(stage => {
    const slides = Array.from(stage.querySelectorAll('.scene-slide'));
    if (slides.length < 2) return;
    let idx = 0, timer = null;
    const play = () => { if(!timer) timer = setInterval(()=>{ slides[idx].classList.remove('is-active'); idx=(idx+1)%slides.length; slides[idx].classList.add('is-active'); }, CROSSFADE_INTERVAL); };
    const pause = () => { clearInterval(timer); timer=null; };
    const panel = stage.closest('.panel');
    new MutationObserver(() => panel.classList.contains('is-active') ? play() : pause())
      .observe(panel, {attributes:true, attributeFilter:['class']});
  });

  // Rail
  RAIL_LABELS.forEach((lbl, i) => {
    const btn = document.createElement('button');
    btn.className = 'rail-dot' + (i===0?' active':'');
    btn.setAttribute('data-goto', i);
    const isKey = lbl.includes('.');
    btn.innerHTML = `<span class="rail-label"${isKey?` data-i18n="${lbl}"`:''}>${isKey?'':lbl}</span>`;
    railNav.appendChild(btn);
  });

  // Nav links
  NAV_ORDER.forEach(id => {
    const idx = CHAPTERS.findIndex(ch => ch.id === id);
    if (idx === -1) return;
    const a = document.createElement('a');
    a.href = '#';
    a.setAttribute('data-goto', idx + 1);
    a.setAttribute('data-i18n', 'nav.' + id);
    navLinksContainer.appendChild(a);
  });
  const cLink = document.createElement('a');
  cLink.href = '#';
  cLink.setAttribute('data-goto', CHAPTERS.length + 1);
  cLink.setAttribute('data-i18n', 'nav.contatti');
  navLinksContainer.appendChild(cLink);

  // Apply i18n
  if(window.i18n){
    window.i18n.setLang(window.i18n.current());
    window.i18n.onLangChange(newLang =>{
      const orariEl = document.querySelector('.orari');
      if(orariEl){
        orariEl.innerHTML = `<span class="orari-label" data-i18n="contatti.orari.label"></span>${buildOrari()}`;
        const lbl = orariEl.querySelector('[data-i18n]');
        if(lbl) lbl.textContent = newLang==='it' ? 'Orari' : 'Hours';
      }
    });
  }

  /* ===== ENGINE ===== */
  const panels = Array.from(document.querySelectorAll('.panel'));
  const dots = Array.from(document.querySelectorAll('.rail-dot'));
  const total = panels.length;
  let current=0, animating=false, lastWheel=0, touchY=0, touchLock=false, touchInGallery=false;

  // Dark mode
  const TK='ibp-theme';
  (()=>{ const s=localStorage.getItem(TK); document.body.classList.toggle('dark',s?s==='dark':matchMedia('(prefers-color-scheme:dark)').matches); })();
  function toggleTheme(){ const d=document.body.classList.toggle('dark'); localStorage.setItem(TK,d?'dark':'light'); }

  // Navigation
  function clean(p){ p.classList.remove('is-active','is-leaving-fwd','is-leaving-bwd'); p.style.zIndex=''; }
  function goTo(i){
    if(i===current||i<0||i>=total||animating) return;
    animating=true;
    const fwd=i>current, prev=panels[current], next=panels[i];
    prev.style.zIndex=fwd?'1':'2'; next.style.zIndex=fwd?'2':'3';
    prev.classList.remove('is-active'); prev.classList.add(fwd?'is-leaving-fwd':'is-leaving-bwd');
    next.classList.add('is-active');
    dots.forEach((d,idx)=>d.classList.toggle('active',idx===i));
    setTimeout(()=>{ clean(prev); next.style.zIndex=''; current=i; animating=false; }, COOLDOWN);
  }

  // Input
  addEventListener('wheel', e=>{
    e.preventDefault();
    if(animating) return;
    const now=Date.now();
    if(now-lastWheel<WHEEL_DEBOUNCE||Math.abs(e.deltaY)<30) return;
    lastWheel=now;
    goTo(current+(e.deltaY>0?1:-1));
  }, {passive:false});

  addEventListener('touchstart', e=>{ if(animating){touchLock=true;return;} touchLock=false; touchInGallery=!!e.target.closest('.gallery-strip'); touchY=e.touches[0].clientY; }, {passive:true});
  addEventListener('touchmove', e=>{ if(!touchLock&&!touchInGallery&&!e.target.closest('.panel-light')) e.preventDefault(); }, {passive:false});
  addEventListener('touchend', e=>{ if(animating||touchLock||touchInGallery) return; const dy=touchY-e.changedTouches[0].clientY; if(Math.abs(dy)>50) goTo(current+(dy>0?1:-1)); }, {passive:true});

  addEventListener('keydown', e=>{
    if(document.querySelector('.product-lb.open')) return;
    if(animating) return;
    const tag = document.activeElement?.tagName;
    if(tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT') return;
    if(e.key==='ArrowDown'||e.key==='PageDown'){e.preventDefault();goTo(current+1);}
    else if(e.key===' '&&tag!=='BUTTON'&&tag!=='A'){e.preventDefault();goTo(current+1);}
    else if(e.key==='ArrowUp'||e.key==='PageUp'){e.preventDefault();goTo(current-1);}
    else if(e.key==='Home'){e.preventDefault();goTo(0);}
    else if(e.key==='End'){e.preventDefault();goTo(total-1);}
  });

  // Clicks
  document.querySelectorAll('[data-goto]').forEach(el=>el.addEventListener('click', e=>{
    e.preventDefault();
    const i=parseInt(el.getAttribute('data-goto'),10);
    if(!isNaN(i)) goTo(i);
    document.getElementById('navBurger')?.classList.remove('open');
    navLinksContainer?.classList.remove('open');
  }));

  // Burger
  const burger=document.getElementById('navBurger');
  if(burger) burger.addEventListener('click',()=>{
    const open=burger.classList.toggle('open');
    navLinksContainer.classList.toggle('open',open);
    burger.setAttribute('aria-expanded',String(open));
  });

  // Toggles
  document.getElementById('langToggle')?.addEventListener('click',()=>window.i18n?.toggle());
  document.getElementById('themeToggle')?.addEventListener('click',toggleTheme);

  // Init
  panels.forEach(clean);
  panels[0].classList.add('is-active');

  // Product lightbox
  const lb = document.createElement('div');
  lb.className = 'product-lb';
  lb.setAttribute('role','dialog');
  lb.setAttribute('aria-modal','true');
  lb.setAttribute('aria-label','Dettaglio prodotto');
  lb.innerHTML = '<div class="product-lb-inner"><button class="product-lb-close" aria-label="Chiudi">&times;</button><div class="product-lb-content"></div></div>';
  document.body.appendChild(lb);
  const lbContent = lb.querySelector('.product-lb-content');
  const lbClose = lb.querySelector('.product-lb-close');

  function openProduct(i){
    const p = GALLERY[i]; if(!p) return;
    const ordina = lang()==='it' ? 'Ordina' : 'Order';
    const waText = lang()==='it' ? 'Ciao, vorrei ordinare: '+p.name : 'Hi, I\'d like to order: '+p.name;
    lbContent.innerHTML = `
      <img src="${p.src}" alt="${p.name}">
      <div class="product-lb-info">
        <h3>${p.name}</h3>
        <span class="product-lb-sub">${t(p.sub)}</span>
        <p>${t(p.desc)}</p>
        <div class="product-lb-scheda">${t(p.scheda)}</div>
        <a href="${WA_LINK}?text=${encodeURIComponent(waText)}" target="_blank" rel="noopener" class="gallery-wa-btn">${WA_SVG} ${ordina}</a>
      </div>`;
    lb.classList.add('open');
  }
  lbClose.addEventListener('click',()=>lb.classList.remove('open'));
  lb.addEventListener('click',e=>{ if(e.target===lb) lb.classList.remove('open'); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') lb.classList.remove('open'); });

  document.querySelectorAll('.gallery-item[data-product]').forEach(el=>{
    el.addEventListener('click',()=>openProduct(parseInt(el.getAttribute('data-product'),10)));
  });
})();
