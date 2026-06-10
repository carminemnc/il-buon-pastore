/* i18n.js — bilingue IT/EN */
(function(){
  'use strict';
  const DICT = {
    it:{
      'meta.desc':'Azienda agricola Il Buon Pastore: pecorino a latte crudo certificato biologico. Dal pascolo alla tavola, un solo gesto antico.',
      'nav.pascolo':'Pascolo','nav.metamorfosi':'Metamorfosi','nav.stagionatura':'Stagionatura','nav.tavola':'Tavola','nav.lana':'Lana','nav.galleria':'Pecorino','nav.contatti':'Contatti',
      'hero.label':'Azienda agricola · Montefiore Conca','hero.title':'Il Buon Pastore',
      'hero.sub':'Pecorino a latte crudo, certificato biologico.<br>Un gesto antico, ogni giorno.',
      'hero.cta':'Scopri come nasce','hero.scroll':'scorri',
      'pascolo.label':'Capitolo','pascolo.title':'Il Pascolo',
      'pascolo.p1':"Tutto inizia dall'erba. Le pecore pascolano libere sui prati spontanei delle colline: erba diversa, latte diverso. È il territorio che, ogni giorno, entra nel formaggio.",
      'pascolo.p2':"Nessun mangime forzato, nessuna fretta — solo ciò che la collina offre, stagione dopo stagione, dalla madre all'agnello.",
      'metamorfosi.label':'Capitolo','metamorfosi.title':'La Metamorfosi',
      'metamorfosi.p1':'Il latte appena munto incontra il caglio. Cuaglia, si rompe, si raccoglie a mano. Gesti che non si possono accelerare: ogni forma nasce dalle stesse mani, ogni giorno.',
      'metamorfosi.p2':'Latte crudo, mai pastorizzato: conserva i fermenti naturali e i profumi del pascolo, la microflora che rende ogni forma unica e viva.',
      'stagionatura.label':'Capitolo','stagionatura.title':'La Stagionatura',
      'stagionatura.p1':'Nelle cantine fresche le forme riposano per mesi. Girate, spazzolate, accarezzate. Alcune maturano sotto le vinacce, altre tra le erbe: il tempo è un ingrediente.',
      'stagionatura.p2':'È qui, nel silenzio, che il pecorino trova il suo carattere.',
      'tavola.label':'Capitolo','tavola.title':'La Tavola',
      'tavola.p1':"Il viaggio finisce dove conta: nel piatto. Una forma intera, tagliata, condivisa. Il sapore del pascolo, della pazienza e delle mani che l'hanno fatta.",
      'tavola.p2':'',
      'lana.label':'Non solo formaggio','lana.title':'La Lana',
      'lana.p1':'Le nostre pecore non ci danno solo il latte: ogni anno la tosatura restituisce una lana pregiata, che diventa filato artigianale.',
      'lana.p2':'Scopri il progetto dedicato alla lana su <a href="https://caveoves.it" target="_blank" rel="noopener" class="link-evidenziato">Cave Oves</a>.',
      'galleria.label':'Il nostro pecorino','galleria.title':'Dal pascolo alla tavola','galleria.hint':'Tocca un formaggio per scoprirlo',
      'contatti.label':'Contatti','contatti.title':'Vieni a trovarci',
      'contatti.wa.title':'Filo diretto','contatti.wa.detail':'Tira il filo, rispondiamo noi',
      'contatti.dove':'Dove siamo','contatti.orari.label':'Orari',
      'footer.copy':"Il Buon Pastore di Preci &amp; Nonne Società Agricola S.S.<br>Via Ca' Santino 1963, 47834 Montefiore Conca (RN)<br>P.IVA 03555670409"
    },
    en:{
      'meta.desc':'Il Buon Pastore farm: organic raw-milk pecorino. From pasture to table, one ancient craft.',
      'nav.pascolo':'Pasture','nav.metamorfosi':'Transformation','nav.stagionatura':'Ageing','nav.tavola':'Table','nav.lana':'Wool','nav.galleria':'Pecorino','nav.contatti':'Contact',
      'hero.label':'Farm · Montefiore Conca, Italy','hero.title':'Il Buon Pastore',
      'hero.sub':'Organic raw-milk pecorino.<br>An ancient craft, every day.',
      'hero.cta':"Discover how it's made",'hero.scroll':'scroll',
      'pascolo.label':'Chapter','pascolo.title':'The Pasture',
      'pascolo.p1':'It all starts with the grass. The sheep graze freely on the wild meadows of the hills: different grass, different milk. It is the land that, every day, enters the cheese.',
      'pascolo.p2':'No forced feed, no haste — only what the hillside offers, season after season, from ewe to lamb.',
      'metamorfosi.label':'Chapter','metamorfosi.title':'The Transformation',
      'metamorfosi.p1':'Freshly milked, the milk meets the rennet. It curdles, breaks, is gathered by hand. Gestures that cannot be hurried: every wheel comes from the same hands, every day.',
      'metamorfosi.p2':'Raw milk, never pasteurised: it keeps the natural ferments and the scents of the pasture, the microflora that makes every wheel unique and alive.',
      'stagionatura.label':'Chapter','stagionatura.title':'The Ageing',
      'stagionatura.p1':'In cool cellars the wheels rest for months. Turned, brushed, cared for. Some mature under grape pomace, others among herbs: time is an ingredient.',
      'stagionatura.p2':'It is here, in the silence, that the pecorino finds its character.',
      'tavola.label':'Chapter','tavola.title':'The Table',
      'tavola.p1':'The journey ends where it matters: on the plate. A whole wheel, cut, shared. The taste of the pasture, of patience, and of the hands that made it.',
      'tavola.p2':'',
      'lana.label':'Not just cheese','lana.title':'The Wool',
      'lana.p1':'Our sheep don\u2019t only give us milk: every year shearing yields a fine wool that becomes artisan yarn.',
      'lana.p2':'Discover our wool project at <a href="https://caveoves.it" target="_blank" rel="noopener" class="link-evidenziato">Cave Oves</a>.',
      'galleria.label':'Our pecorino','galleria.title':'From pasture to table','galleria.hint':'Tap a cheese to discover it',
      'contatti.label':'Contact','contatti.title':'Come visit us',
      'contatti.wa.title':'Direct line','contatti.wa.detail':"Pull the thread, we'll answer",
      'contatti.dove':'Where we are','contatti.orari.label':'Hours',
      'footer.copy':"Il Buon Pastore di Preci &amp; Nonne Società Agricola S.S.<br>Via Ca' Santino 1963, 47834 Montefiore Conca (RN), Italy<br>VAT 03555670409"
    }
  };

  const KEY='ibp-lang', cbs=[];
  function detect(){ const s=localStorage.getItem(KEY); if(s&&DICT[s])return s; const n=(navigator.language||'it').slice(0,2).toLowerCase(); return DICT[n]?n:'it'; }
  function apply(lang){
    const d=DICT[lang]||DICT.it;
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const v=d[el.getAttribute('data-i18n')]; if(v==null)return;
      const a=el.getAttribute('data-i18n-attr'); a?el.setAttribute(a,v):(el.innerHTML=v);
    });
    document.documentElement.lang=lang; document.body.setAttribute('data-lang',lang);
    localStorage.setItem(KEY,lang); cbs.forEach(cb=>cb(lang));
  }
  window.i18n={_dict:DICT.it, setLang(l){if(DICT[l])apply(l)}, toggle(){apply(document.body.getAttribute('data-lang')==='it'?'en':'it')}, current(){return document.body.getAttribute('data-lang')||'it'}, onLangChange(cb){if(typeof cb==='function')cbs.push(cb)}};
  apply(detect());
})();
