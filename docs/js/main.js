/* main.js — Full-page engine · manifest-driven */
(function(){
  'use strict';
  const reduceMotion = matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* ===== CONFIG ===== */
  const CONTATTI = {
    wa: '+393393179926',
    email: 'levoland@libero.it',
    instagram: 'ilbuonpastore',
    address: "Via Ca' Santino 1963, 47834 Montefiore Conca (RN)",
    mapsQuery: "Via+Ca'+Santino+1963+47834+Montefiore+Conca+RN",
    orari: [
      { days:{it:'Lun \u2013 Sab',en:'Mon \u2013 Sat'}, hours:'15:00 \u2013 19:00' },
      { days:{it:'Domenica',en:'Sunday'}, hours:{it:'Chiuso',en:'Closed'}, closed:true },
    ],
  };

  const CHAPTERS = [
    { id:'pascolo',      count:5, i18n:'pascolo',      focus:'center' },
    { id:'metamorfosi',  count:5, i18n:'metamorfosi',  focus:'center' },
    { id:'stagionatura', count:3, i18n:'stagionatura', focus:'center' },
    { id:'tavola',       count:2, i18n:'tavola',       focus:'center' },
    { id:'lana',         count:2, i18n:'lana',         focus:'center' },
    { id:'galleria',     count:0, i18n:'galleria',     gallery:true },
  ];

  const GALLERY = [
    {src:'assets/imgs/pecorino/ricotta.webp', name:'Ricotta Fresca',
      sub:{it:'Cremosa',en:'Creamy'},
      desc:{it:"Dopo la prima scrematura del latte, nel caldaio resta il siero povero di grassi ma ricco di proteine; queste ultime per effetto del calore si associano e si ottiene cos\u00ec per fioritura la ricotta. La ricotta fresca \u00e8 molto delicata e con una cremosit\u00e0 unica, ottima da mangiare al cucchiaio. Diventa un dessert completo con l\u2019aggiunta di marmellate o miele e cannella.",
            en:"After the first skimming, the vat retains whey low in fat but rich in protein; heated, the proteins bond and the ricotta \u2018blooms\u2019. Our fresh ricotta is exceptionally delicate and creamy, perfect eaten by the spoonful. It becomes a complete dessert with jam or honey and cinnamon."},
      scheda:{it:'Ingredienti: Siero di latte | Pezzatura: 80gr, 400gr, 1500gr | Conservazione: tra 0\u00b0 e 4\u00b0',
              en:'Ingredients: Whey | Size: 80g, 400g, 1500g | Storage: 0\u20134\u00b0C'}},
    {src:'assets/imgs/pecorino/fresco.webp', name:'Il Fresco',
      sub:{it:'Pecorino a buccia bianca',en:'White-rind pecorino'},
      desc:{it:"\u00c8 un formaggio semplice e antico lavorato completamente a mano. Il latte posto nel caldaio viene scaldato a circa 33\u00b0, quindi si aggiunge il caglio naturale di vitello senza conservanti. Trascorso il tempo necessario per cagliare, si rompe la cagliata a chicco di riso e la si raccoglie a mano con le formelle, lavorandole una ad una.",
            en:"A simple, ancient cheese made entirely by hand. The milk is heated to about 33\u00b0C in the vat, then preservative-free natural calf rennet is added. Once curdled, the curd is broken to rice-grain size and gathered by hand into moulds, each one shaped individually."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio naturale di vitello, sale di Trapani | Stagionatura: Circa 1 settimana | Pezzatura: 1,5 kg | Conservazione: tra 4\u00b0 e 9\u00b0',
              en:'Ingredients: Raw sheep milk, natural calf rennet, Trapani salt | Ageing: ~1 week | Size: 1.5 kg | Storage: 4\u20139\u00b0C'}},
    {src:'assets/imgs/pecorino/caciotta.webp', name:'La Caciotta',
      sub:{it:'Pecorino semistagionato',en:'Semi-aged pecorino'},
      desc:{it:"\u00c8 un formaggio semplice e antico lavorato completamente a mano. Il latte posto nel caldaio viene scaldato a circa 33\u00b0, quindi si aggiunge il caglio naturale di vitello senza conservanti. Trascorso il tempo necessario per cagliare, si rompe la cagliata a chicco di riso e la si raccoglie a mano con le formelle, lavorandole una ad una.",
            en:"A simple, ancient cheese made entirely by hand. The milk is heated to about 33\u00b0C in the vat, then preservative-free natural calf rennet is added. Once curdled, the curd is broken to rice-grain size and gathered by hand into moulds, each one shaped individually."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio naturale di vitello, sale di Trapani | Stagionatura: Almeno 30gg | Pezzatura: 1,5 kg | Conservazione: tra 0\u00b0 e 4\u00b0 | Disponibilit\u00e0: Tutto l\'anno',
              en:'Ingredients: Raw sheep milk, natural calf rennet, Trapani salt | Ageing: Min. 30 days | Size: 1.5 kg | Storage: 0\u20134\u00b0C | Availability: Year-round'}},
    {src:'assets/imgs/pecorino/appassito.webp', name:"L'Appassito",
      sub:{it:'A pasta non lavorata',en:'Unworked curd'},
      desc:{it:"Questo formaggio \u00e8 un pecorino a pasta non lavorata. Dal caldaio viene raccolta la cagliata rotta in blocchi, con delle formelle a cono della capienza di poco pi\u00f9 di 1 kg. Le formelle si fanno stufare al calore del caldaio e perdono cos\u00ec il 50% del loro peso, quindi vengono messe in cella dove in circa 20gg perdono ancora il 30%. L\u2019abbiamo chiamato l\u2019appassito perch\u00e9 appunto appassisce lentamente senza alcuna pressione manuale. Si presenta come una robiolina di circa 300gr, con buccia dorata e pasta morbida e burrosa.",
            en:"An unworked-curd pecorino. The curd is gathered from the vat in blocks using cone-shaped moulds holding just over 1 kg. The moulds sweat in the vat\u2019s warmth, losing 50% of their weight, then rest in a cold room where they lose another 30% over 20 days. We call it \u2018l\u2019appassito\u2019 because it wilts slowly without any manual pressure. The result is a small 300g wheel with a golden rind and soft, buttery paste."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio naturale di vitello, sale di Trapani | Stagionatura: Circa 30gg | Pezzatura: 350 gr | Conservazione: tra 0\u00b0 e 4\u00b0 | Disponibilit\u00e0: Da dicembre',
              en:'Ingredients: Raw sheep milk, natural calf rennet, Trapani salt | Ageing: ~30 days | Size: 350g | Storage: 0\u20134\u00b0C | Availability: From December'}},
    {src:'assets/imgs/pecorino/aromatico.webp', name:"L'Aromatico",
      sub:{it:'Alle erbe aromatiche',en:'With aromatic herbs'},
      desc:{it:"Il pecorino fresco, a buccia ancora bianca, viene cosparso con un battuto di erbe aromatiche: salvia, rosmarino, timo, finocchio selvatico e menta. Lo si lascia in un otre per circa 10gg, dove subisce una fermentazione. Si ottiene cos\u00ec un formaggio particolarmente intenso e profumato con una pasta bianchissima fortemente aromatizzata ma con la consistenza di un formaggio giovane.",
            en:"The fresh pecorino, still white-skinned, is coated with a blend of aromatic herbs: sage, rosemary, thyme, wild fennel and mint. It rests in a cask for about 10 days, undergoing fermentation. The result is an intensely fragrant cheese with a very white, heavily aromatised paste yet the texture of a young cheese."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio naturale di vitello, sale di Trapani, erbe aromatiche | Stagionatura: Circa 20gg | Pezzatura: 1,5 kg | Conservazione: tra 0\u00b0 e 4\u00b0 | Disponibilit\u00e0: Da dicembre',
              en:'Ingredients: Raw sheep milk, natural calf rennet, Trapani salt, aromatic herbs | Ageing: ~20 days | Size: 1.5 kg | Storage: 0\u20134\u00b0C | Availability: From December'}},
    {src:'assets/imgs/pecorino/gobbo.webp', name:'Il Gobbo',
      sub:{it:'A caglio vegetale',en:'Vegetable rennet'},
      desc:{it:"In passato il formaggio era l\u2019alimento dei contadini. Nelle terre di Montefiore e dintorni si usava \"l\u2019erba de ches\", un\u2019erba spontanea che messa nel latte munto in giornata aveva la capacit\u00e0 di cagliarlo. Questa tradizione molto vecchia era ormai completamente perduta e affidata ai racconti dei nonni. Noi abbiamo raccolto questa tradizione e la proponiamo con lo spirito di una volta che narra delle stagioni e dei pascoli dove hanno brucato le pecore.",
            en:"In the past, cheese was the peasant\u2019s staple. In the lands around Montefiore they used \u2018erba de ches\u2019, a wild herb that could curdle the day\u2019s fresh milk. This ancient tradition had been all but lost, surviving only in grandparents\u2019 tales. We\u2019ve revived it with the same spirit, telling of seasons and pastures where the sheep grazed."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio vegetale, sale di Trapani | Stagionatura: Circa 60gg | Pezzatura: 1,2 kg | Conservazione: tra 0\u00b0 e 4\u00b0 | Disponibilit\u00e0: Da febbraio',
              en:'Ingredients: Raw sheep milk, vegetable rennet, Trapani salt | Ageing: ~60 days | Size: 1.2 kg | Storage: 0\u20134\u00b0C | Availability: From February'}},
    {src:'assets/imgs/pecorino/noci.webp', name:'Il Noci',
      sub:{it:'Nella foglia di noce',en:'In walnut leaves'},
      desc:{it:"L\u2019affinamento in foglia di noce nasce da un formaggio di almeno 70gg. Si raccolgono le foglie pi\u00f9 verdi e vi si avvolge il formaggio, quello fatto in primavera quando il pascolo \u00e8 ricco di erbe profumate. Il pecorino si lascia riposare con le foglie per circa 40gg in una vecchia botte di vino. La tradizione di questo formaggio \u00e8 antica e racconta di un tempo in cui saper affinare non era una ricerca del gusto ma una esigenza.",
            en:"The walnut-leaf ageing starts from a cheese at least 70 days old. The greenest leaves are gathered and wrapped around the spring-made pecorino, when the pasture is rich with fragrant herbs. The cheese rests with the leaves for about 40 days in an old wine barrel. This ancient tradition tells of a time when ageing was not a pursuit of flavour but a necessity."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio naturale di vitello, sale di Trapani, foglia di noce | Stagionatura: Almeno 100gg | Pezzatura: 1,3 kg | Conservazione: tra 0\u00b0 e 4\u00b0 | Disponibilit\u00e0: Da luglio fino ad esaurimento',
              en:'Ingredients: Raw sheep milk, natural calf rennet, Trapani salt, walnut leaves | Ageing: Min. 100 days | Size: 1.3 kg | Storage: 0\u20134\u00b0C | Availability: From July until sold out'}},
    {src:'assets/imgs/pecorino/castagno.webp', name:'Il Castagno',
      sub:{it:'Nella foglia di castagno',en:'In chestnut leaves'},
      desc:{it:"La gente di Montefiore \u00e8 particolarmente legata alla castagna. Il nostro paese pur essendo a 3 km dal mare in linea d\u2019aria \u00e8 attorniato da due castagneti molto antichi. Da questo legame particolare nasce il desiderio di affinare il nostro pecorino nelle foglie di castagno. L\u2019affinamento segue la tecnica della foglia di noce per ottenere un formaggio stagionato con un intenso profumo di sottobosco.",
            en:"The people of Montefiore have a special bond with the chestnut. Despite being just 3 km from the sea as the crow flies, our village is surrounded by two very old chestnut groves. From this bond comes the desire to age our pecorino in chestnut leaves, following the walnut-leaf technique to obtain a cheese with an intense undergrowth aroma."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio naturale di vitello, sale di Trapani, foglia di castagno | Stagionatura: Almeno 100gg | Pezzatura: 1,3 kg | Conservazione: tra 0\u00b0 e 4\u00b0 | Disponibilit\u00e0: Da ottobre fino ad esaurimento',
              en:'Ingredients: Raw sheep milk, natural calf rennet, Trapani salt, chestnut leaves | Ageing: Min. 100 days | Size: 1.3 kg | Storage: 0\u20134\u00b0C | Availability: From October until sold out'}},
    {src:'assets/imgs/pecorino/ubriaco.webp', name:"L'Ubriaco",
      sub:{it:'Nella vinaccia di Sangiovese',en:'In Sangiovese grape pomace'},
      desc:{it:"L\u2019autunno \u00e8 un tempo speciale per l\u2019agricoltura. Nelle nostre colline \u00e8 preziosa l\u2019uva di Sangiovese dalla quale si ottiene il nostro pi\u00f9 celebre vino. In una vecchia botte di legno di rovere poniamo a riposare il nostro pecorino migliore, stagionato almeno 60 giorni, cospargendolo con le bucce dell\u2019uva dalla quale \u00e8 appena stato spremuto il Sangiovese. Dopo un tempo di riposo di circa 20 giorni si apre la botte e si pu\u00f2 degustare un nuovo pecorino esaltato dall\u2019intensit\u00e0 della vinaccia.",
            en:"Autumn is a special time for farming. In our hills the Sangiovese grape is prized, yielding our most celebrated wine. In an old oak barrel we lay our finest pecorino, aged at least 60 days, covered with the skins of freshly pressed Sangiovese grapes. After about 20 days the barrel is opened to reveal a pecorino elevated by the intensity of the pomace."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio naturale di vitello, sale di Trapani, vinaccia di Sangiovese | Stagionatura: Almeno 100gg | Pezzatura: 1,3 kg | Conservazione: tra 0\u00b0 e 4\u00b0 | Disponibilit\u00e0: Da ottobre fino ad esaurimento',
              en:'Ingredients: Raw sheep milk, natural calf rennet, Trapani salt, Sangiovese grape pomace | Ageing: Min. 100 days | Size: 1.3 kg | Storage: 0\u20134\u00b0C | Availability: From October until sold out'}},
    {src:'assets/imgs/pecorino/intenso.webp', name:"L'Intenso",
      sub:{it:'Di fossa',en:'Pit-aged'},
      desc:{it:"Il nostro pecorino l\u2019intenso viene fatto nel completo rispetto delle tradizioni. Il formaggio nasce ad aprile/maggio quando il latte \u00e8 pi\u00f9 ricco e carico dei profumi della primavera. Viene lavorato a latte crudo completamente a mano. Lo si lascia stagionare per almeno due mesi fino ad agosto, mese in cui viene messo nelle antiche fosse di Sogliano. Non resta che aspettare fino al giorno di Santa Caterina (24 novembre) per gustare il risultato dell\u2019uomo e della terra \u2014 ogni anno \u00e8 un\u2019attesa con sfumature e retrogusti sempre da scoprire.",
            en:"Our \u2018intenso\u2019 is made in full respect of tradition. The cheese is born in April/May when the milk is richest, laden with the scents of spring. Worked entirely by hand from raw milk, it ages until August when it enters the ancient pits of Sogliano. Then we wait until Saint Catherine\u2019s day (24 November) to taste the union of man and earth \u2014 each year brings new nuances and aftertastes to discover."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio naturale di vitello, sale di Trapani | Stagionatura: Almeno 150gg | Pezzatura: 1,1 kg | Conservazione: tra 0\u00b0 e 4\u00b0',
              en:'Ingredients: Raw sheep milk, natural calf rennet, Trapani salt | Ageing: Min. 150 days | Size: 1.1 kg | Storage: 0\u20134\u00b0C'}},
    {src:'assets/imgs/pecorino/birrozzo.webp', name:'Il Birrozzo',
      sub:{it:'Nelle trebbie di birra',en:'In beer spent grain'},
      desc:{it:"Nei tempi passati affinare era una necessit\u00e0. Spesso negli antichi monasteri trappisti, dove i monaci mettevano a fermentare l\u2019orzo per fare la birra, poteva capitare che in una di quelle vecchie botti i monaci con le trebbie scolate mettessero il formaggio troppo secco. Nella botte il formaggio trovava nuova vita. Noi lo riproponiamo con lo stesso spirito: alla Cotta, il birrificio artigianale di Montecerinione, abbiamo preso le trebbie fresche e in una vecchia botte le abbiamo messe con il nostro pecorino pi\u00f9 stagionato. Il risultato \u00e8 un formaggio con un\u2019intensit\u00e0 molto forte che lascia in bocca la dolcezza dell\u2019orzo.",
            en:"In times past, ageing was a necessity. In ancient Trappist monasteries, where monks brewed beer, they would sometimes place cheese too dry to cut into barrels with spent grain \u2014 and the cheese found new life. We revive this spirit: from La Cotta, the artisan brewery in Montecerinione, we take fresh spent grain and barrel it with our most aged pecorino. The result is an intensely flavoured cheese that leaves the sweetness of barley on the palate."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio naturale di vitello, sale di Trapani, trebbie di birra cruda | Stagionatura: Almeno 100gg | Pezzatura: 1,3 kg | Conservazione: tra 4\u00b0 e 9\u00b0',
              en:'Ingredients: Raw sheep milk, natural calf rennet, Trapani salt, raw beer spent grain | Ageing: Min. 100 days | Size: 1.3 kg | Storage: 4\u20139\u00b0C'}},
    {src:'assets/imgs/pecorino/blu.webp', name:'Il Blu',
      sub:{it:'Pecorino erborinato',en:'Blue pecorino'},
      desc:{it:"Il nostro Blu \u00e8 un pecorino erborinato prodotto a latte crudo, con metodo biologico di animali allevati al pascolo. Prodotto completamente a mano, viene cagliato a bassa temperatura con l\u2019aggiunta di muffe nobili Roqueforti. La foratura su entrambi i lati durante la stagionatura permette l\u2019ossigenazione della pasta e la naturale fioritura delle muffe. Matura in circa tre mesi, si presenta con una crosta ammuffita e una pasta semidura striata di muffe blu.",
            en:"Our Blu is a blue pecorino made from raw milk, using organic methods with pasture-raised sheep. Entirely handmade, it is curdled at low temperature with the addition of noble Roquefort moulds. Piercing on both sides during ageing allows oxygenation and the natural blooming of the moulds. It matures in about three months, presenting a mouldy rind and a semi-hard paste streaked with blue veins."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio naturale, muffe nobili Roqueforti, sale di Trapani | Stagionatura: Almeno 90gg | Pezzatura: 3 kg | Conservazione: tra 4\u00b0 e 9\u00b0',
              en:'Ingredients: Raw sheep milk, natural rennet, noble Roquefort moulds, Trapani salt | Ageing: Min. 90 days | Size: 3 kg | Storage: 4\u20139\u00b0C'}},
    {src:'assets/imgs/pecorino/stagionato.webp', name:'Lo Stagionato',
      sub:{it:'Lungo affinamento',en:'Long-aged'},
      desc:{it:"Fare un buon stagionato \u00e8 sicuramente il desiderio di ogni produttore di formaggio, ma occorre tempo e dedicarsi alla cura di un formaggio per un tempo molto lungo non \u00e8 cosa semplice. Dalla lavorazione a latte crudo con il procedimento della pasta semicotta si ottiene il nostro stagionato. \u00c8 un formaggio ben pressato in grosse formelle dai due ai tre chili; viene lavato, girato e unto con la massima cura per oltre 12 mesi, cos\u00ec da raggiungere un\u2019intensit\u00e0 ben bilanciata con la dolcezza.",
            en:"Making a great aged cheese is every cheesemaker\u2019s dream, but it takes time \u2014 caring for a cheese over many months is no simple task. From raw milk using the semi-cooked paste method comes our stagionato. Pressed into large 2\u20133 kg wheels, it is washed, turned and oiled with the utmost care for over 12 months, achieving an intensity perfectly balanced with sweetness."},
      scheda:{it:'Ingredienti: Latte crudo di pecora, caglio naturale di vitello, sale di Trapani | Stagionatura: Almeno 12 mesi | Pezzatura: 2,5 kg | Conservazione: tra 4\u00b0 e 9\u00b0',
              en:'Ingredients: Raw sheep milk, natural calf rennet, Trapani salt | Ageing: Min. 12 months | Size: 2.5 kg | Storage: 4\u20139\u00b0C'}},
    {src:'assets/imgs/pecorino/yobee.webp', name:'Yobee',
      sub:{it:'Yogurt di pecora',en:'Sheep yogurt'},
      desc:{it:"Uno yogurt intero senza l\u2019aggiunta di zuccheri, compatto e cremoso ma con un gusto delicato. Pi\u00f9 ricco di proteine e pi\u00f9 facilmente digeribile rispetto allo yogurt classico, \u00e8 l\u2019ideale per la colazione, uno spuntino o la preparazione di numerose ricette.",
            en:"A whole-milk yogurt with no added sugar, firm and creamy yet delicate in flavour. Richer in protein and easier to digest than regular yogurt, it is ideal for breakfast, a snack or countless recipes."},
      scheda:{it:'Ingredienti: Latte di pecora, fermenti lattici vivi | Pezzatura: 150gr, 500gr',
              en:'Ingredients: Sheep milk, live cultures | Size: 150g, 500g'}},
  ];

  const WA_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 14.9L2 22l5.3-1.4A10 10 0 1 0 12 2Zm5.4 14.2c-.2.7-1.3 1.3-1.8 1.4-.5 0-1 .2-3.2-.7a11.4 11.4 0 0 1-4.6-4c-.4-.5-1.2-1.8-1.2-3.4 0-1.6.8-2.4 1.1-2.7.3-.3.6-.4.8-.4h.6c.2 0 .5 0 .7.5s.9 2.2 1 2.3c.1.2.1.4 0 .6-.1.2-.2.3-.3.5l-.5.5c-.2.2-.4.4-.2.7.2.4.9 1.5 2 2.4.7.6 1.4 1 1.8 1.1.3.2.5.1.7-.1s.8-1 1-1.3c.2-.3.4-.3.7-.2s1.8.8 2.1 1c.3.1.5.2.6.3.1.1.1.7-.1 1.3Z"/></svg>';
  const WA_LINK = `https://wa.me/${CONTATTI.wa.replace('+','')}`;
  const NAV_ORDER = ['galleria','lana'];
  const CROSSFADE_INTERVAL = 5000;
  const COOLDOWN = reduceMotion ? 80 : 700;
  const WHEEL_DEBOUNCE = 500;

  /* ===== GENERA DOM ===== */
  const panelsContainer = document.getElementById('panels');
  const contattiPanel = document.getElementById('contatti');
  const navLinksContainer = document.getElementById('navLinks');

  // Helpers
  function lang(){ return document.body.getAttribute('data-lang')||'it'; }
  function t(field){ return typeof field==='object' ? (field[lang()]||field.it||'') : (field||''); }
  function buildOrari(){ return CONTATTI.orari.map(o => `<div class="orari-row${o.closed?' orari-closed':''}"><span>${t(o.days)}</span><span>${t(o.hours)}</span></div>`).join(''); }

  // Contatti
  contattiPanel.innerHTML = `
    <div class="contatti-wrap">
      <div class="contatti-header"><span class="label" data-i18n="contatti.label"></span><h2 data-i18n="contatti.title"></h2></div>
      <div class="contatti-cards">
        <div class="contatti-left">
          <a href="tel:+393393179926" class="contatto-link">
            <span class="contatto-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/></svg></span>
            <span class="contatto-link-text"><strong data-i18n="contatti.tel.title"></strong><span class="contatto-detail" data-i18n="contatti.tel.detail"></span></span>
          </a>
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
          <div class="map-wrap"><iframe src="https://www.google.com/maps?q=${CONTATTI.mapsQuery}&output=embed" width="100%" height="180" style="border:0;border-radius:6px" allowfullscreen loading="lazy" title="Mappa" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe></div>
        </div>
      </div>
    </div>`;

  // Chapters
  CHAPTERS.forEach(ch => {
    const section = document.createElement('section');
    section.className = ch.gallery ? 'panel panel-gallery' : 'panel panel-chapter';
    section.id = ch.id;

    if (ch.gallery) {
      const items = GALLERY.map((img,i) => `<div class="gallery-item" data-product="${i}"><span class="gallery-name">${img.name}</span><img src="${img.src}" alt="${img.name} - ${t(img.sub)} | Il Buon Pastore, pecorino a latte crudo biologico" loading="lazy"></div>`).join('');
      section.innerHTML = `
        <div class="gallery-wrap">
          <div class="gallery-header"><span class="label" data-i18n="${ch.i18n}.label"></span><h2 data-i18n="${ch.i18n}.title"></h2><p class="gallery-hint" data-i18n="galleria.hint">Tocca un formaggio per scoprirlo</p></div>
          <div class="gallery-strip">${items}</div>
        </div>
        <div class="panel-cue"><span class="scroll-arrow">\u2193</span></div>`;
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
          ${ch.count > 1 ? `<div class="photo-dots">${Array.from({length:ch.count},(_,i)=>`<button class="photo-dot${i===0?' active':''}" data-slide="${i}" aria-label="Foto ${i+1}"></button>`).join('')}</div>` : ''}
        </div></div>
        <div class="panel-cue"><span class="scroll-arrow">\u2193</span></div>`;
    }

    panelsContainer.insertBefore(section, contattiPanel);
  });

  // Crossfade
  document.querySelectorAll('.panel-crossfade').forEach(stage => {
    const slides = Array.from(stage.querySelectorAll('.scene-slide'));
    if (slides.length < 2) return;
    let idx = 0, timer = null;
    const panel = stage.closest('.panel');
    const dots = Array.from(panel.querySelectorAll('.photo-dot'));

    const goSlide = (i) => {
      slides[idx].classList.remove('is-active');
      idx = i;
      slides[idx].classList.add('is-active');
      dots.forEach((d,j) => d.classList.toggle('active', j===idx));
    };
    const advance = () => goSlide((idx+1) % slides.length);
    const play = () => { if(!timer) timer = setInterval(advance, CROSSFADE_INTERVAL); };
    const pause = () => { clearInterval(timer); timer=null; };
    const restart = () => { pause(); play(); };

    dots.forEach((dot,i) => dot.addEventListener('click', () => {
      if(i===idx) return;
      goSlide(i);
      restart();
    }));

    // Swipe horizontally to change photo
    let swipeX = 0;
    stage.addEventListener('touchstart', e => { swipeX = e.touches[0].clientX; }, {passive:true});
    stage.addEventListener('touchend', e => {
      const dx = swipeX - e.changedTouches[0].clientX;
      if(Math.abs(dx) < 50) return;
      if(dx > 0) goSlide((idx+1) % slides.length);
      else goSlide((idx-1+slides.length) % slides.length);
      restart();
    }, {passive:true});

    new MutationObserver(() => panel.classList.contains('is-active') ? play() : pause())
      .observe(panel, {attributes:true, attributeFilter:['class']});
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
    window.i18n.onLangChange(newLang => {
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
  const total = panels.length;
  let current=0, animating=false, lastWheel=0, touchY=0, touchX=0, touchLock=false, touchInGallery=false;

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

  // Navigation
  function clean(p){ p.classList.remove('is-active','is-leaving-fwd','is-leaving-bwd'); p.style.zIndex=''; }
  function goTo(i){
    if(i===current||i<0||i>=total||animating) return;
    animating=true;
    const fwd=i>current, prev=panels[current], next=panels[i];
    prev.style.zIndex=fwd?'1':'2'; next.style.zIndex=fwd?'2':'3';
    prev.classList.remove('is-active'); prev.classList.add(fwd?'is-leaving-fwd':'is-leaving-bwd');
    next.classList.add('is-active');
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

  addEventListener('touchstart', e=>{ if(animating){touchLock=true;return;} touchLock=false; touchInGallery=!!e.target.closest('.gallery-strip'); touchY=e.touches[0].clientY; touchX=e.touches[0].clientX; }, {passive:true});
  addEventListener('touchmove', e=>{ if(!touchLock&&!touchInGallery&&!e.target.closest('.panel-light')&&!e.target.closest('.product-lb')) e.preventDefault(); }, {passive:false});
  addEventListener('touchend', e=>{ if(animating||touchLock||lb.classList.contains('open')) return; const dy=touchY-e.changedTouches[0].clientY; const dx=touchX-e.changedTouches[0].clientX; if(touchInGallery&&Math.abs(dx)>=Math.abs(dy)) return; if(Math.abs(dy)>50) goTo(current+(dy>0?1:-1)); }, {passive:true});

  addEventListener('keydown', e=>{
    if(e.key==='Escape'){ lb.classList.remove('open'); return; }
    if(lb.classList.contains('open')) return;
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

  // Init
  panels.forEach(clean);
  panels[0].classList.add('is-active');

  function openProduct(i){
    const p = GALLERY[i]; if(!p) return;
    const cta = lang()==='it' ? 'Chiedi info' : 'Ask info';
    const waText = lang()==='it' ? 'Ciao, vorrei più informazioni su: '+p.name : 'Hi, I\'d like more info about: '+p.name;
    const schedaHtml = t(p.scheda).split('|').map(s => {
      const parts = s.trim().split(':');
      if(parts.length>1){ return `<div class="scheda-item"><span class="scheda-tag">${parts[0].trim()}:</span><span class="scheda-val">${parts.slice(1).join(':').trim()}</span></div>`; }
      return `<div class="scheda-item"><span class="scheda-val">${s.trim()}</span></div>`;
    }).join('');
    lbContent.innerHTML = `
      <img src="${p.src}" alt="${p.name} - ${t(p.sub)} | Il Buon Pastore, pecorino a latte crudo biologico">
      <div class="product-lb-info">
        <h3>${p.name}</h3>
        <span class="product-lb-sub">${t(p.sub)}</span>
        <p>${t(p.desc)}</p>
        <div class="product-lb-scheda">${schedaHtml}</div>
        <a href="${WA_LINK}?text=${encodeURIComponent(waText)}" target="_blank" rel="noopener noreferrer" class="gallery-wa-btn">${WA_SVG} ${cta}</a>
      </div>`;
    lb.classList.add('open');
  }
  lbClose.addEventListener('click',()=>lb.classList.remove('open'));
  lb.addEventListener('click',e=>{ if(e.target===lb) lb.classList.remove('open'); });

  document.querySelectorAll('.gallery-item[data-product]').forEach(el=>{
    el.addEventListener('click',()=>openProduct(parseInt(el.getAttribute('data-product'),10)));
  });
})();
