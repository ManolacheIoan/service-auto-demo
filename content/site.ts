/**
 * TOT conținutul site-ului este aici. Firma și datele sunt FICTIVE (site demonstrativ Manotek).
 * Convenție: orice text între paranteze drepte — „[exemplu]”, „[de confirmat cu firma]” — este afișat
 * pe site ca etichetă vizibilă (vezi components/T.tsx), ca nimeni să nu-l ia drept informație reală.
 */
import type { ArtKey } from "@/components/Art";
import type { StockKey } from "./images";

export const EX = "[exemplu]";

export const site = {
  nume: "MotorPro Service Auto",
  numeScurt: "MotorPro",
  slogan: "Service auto în Tecuci",
  bandaDemo: "Site demonstrativ realizat de Manotek — firmă fictivă",
  descriere:
    "Service auto în Tecuci, pentru șoferii din județul Galați: diagnoză auto computerizată, mecanică, frâne, revizii, geometrie, vulcanizare și pregătire ITP. Deviz aprobat de tine înainte de reparație.",
  adresa: { strada: "Str. Exemplu nr. 12", localitate: "Tecuci", judet: "Galați", tara: "RO" },
  // Telefon placeholder: se înlocuiește cu numărul real (format +407XXXXXXXX în `tel`).
  telefon: { afisat: "07XX XXX XXX", tel: "07XXXXXXXX" },
  // Număr WhatsApp în format internațional fără „+” (ex. 40712345678). Gol = WhatsApp deschide alegerea contactului.
  whatsapp: "",
  email: "programari@exemplu.ro",
  // Endpoint Formspree (https://formspree.io/f/<id>). Placeholder => formularul arată varianta WhatsApp.
  formspree: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "https://formspree.io/f/XXXXXXXX",
  program: [
    { zile: "Luni – Vineri", ore: "8:00 – 18:00", deschidere: 8, inchidere: 18 },
    { zile: "Sâmbătă", ore: "8:00 – 14:00", deschidere: 8, inchidere: 14 },
    { zile: "Duminică", ore: "Închis", deschidere: 0, inchidere: 0 },
  ],
  programNota: "Program orientativ [exemplu]",
  harta: {
    // Punct generic: centrul orașului Tecuci (adresa firmei este fictivă).
    embed: "https://www.google.com/maps?q=Tecuci,+Gala%C8%9Bi,+Rom%C3%A2nia&z=14&output=embed",
    link: "https://www.google.com/maps/search/?api=1&query=Tecuci%2C+Gala%C8%9Bi",
  },
  google: {
    nota: "[exemplu]",
    numarRecenzii: "[exemplu]",
    url: "https://www.google.com/maps/search/?api=1&query=MotorPro+Service+Auto+Tecuci",
  },
  zona: "Tecuci și județul Galați",
};

export const nav = [
  { href: "/#servicii", label: "Servicii" },
  { href: "/#de-ce-noi", label: "De ce noi" },
  { href: "/#cum-lucram", label: "Cum lucrăm" },
  { href: "/#revizie", label: "Revizie" },
  { href: "/#galerie", label: "Atelier" },
  { href: "/#intrebari", label: "Întrebări" },
  { href: "/#contact", label: "Contact" },
];

export type Serviciu = {
  id: string;
  titlu: string;
  icon: "diagnoza" | "mecanica" | "revizie" | "frane" | "suspensie" | "geometrie" | "vulcanizare" | "clima" | "electrica" | "itp";
  scurt: string;
  /** explicația „pe românește”, fără jargon */
  explicatie: string;
  include: string[];
  semne?: string[];
  durata: string;
  pret: string;
  media: { foto: StockKey } | { art: ArtKey };
};

export const servicii: Serviciu[] = [
  {
    id: "diagnoza",
    titlu: "Diagnoză computerizată",
    icon: "diagnoza",
    scurt: "Citim erorile din calculatorul mașinii și verificăm cauza reală, nu doar codul.",
    explicatie:
      "Mașinile moderne își notează singure problemele sub formă de coduri de eroare. Le citim cu tester-ul, apoi verificăm pe mașină ce le-a provocat. Un cod îți spune unde să cauți, nu ce piesă să schimbi.",
    include: ["Citirea și interpretarea codurilor de eroare", "Verificarea senzorilor și a parametrilor în timp real", "Test de drum, dacă e nevoie", "Explicație pe înțeles și recomandări în scris"],
    semne: ["Martorul „check engine” aprins", "Mașina trage mai slab sau consumă mai mult", "Pornește greu sau merge în avarie"],
    durata: "30–60 min",
    pret: "de la [exemplu] lei",
    media: { art: "diagnoza" },
  },
  {
    id: "mecanica",
    titlu: "Mecanică generală și distribuție",
    icon: "mecanica",
    scurt: "Reparații de motor, ambreiaj, curele și kit de distribuție, cu piese explicate.",
    explicatie:
      "Distribuția (curea sau lanț) ține în sincron piesele mobile ale motorului. Dacă cedează, motorul se poate avaria serios, de aceea se schimbă la intervalul recomandat de producător, chiar dacă pare în regulă.",
    include: ["Kit de distribuție (curea, role, întinzător, pompă de apă dacă e cazul)", "Curea de accesorii", "Ambreiaj și volantă", "Garnituri, pierderi de ulei sau lichid de răcire"],
    semne: ["Zgomot metalic sau țăcănit la motor", "Pete de ulei sub mașină", "Ambreiaj care patinează"],
    durata: "după diagnoză",
    pret: "preț după diagnoză",
    media: { foto: "curea" },
  },
  {
    id: "revizie",
    titlu: "Revizii (ulei și filtre)",
    icon: "revizie",
    scurt: "Schimb de ulei și filtre conform cărții service, cu verificare generală inclusă.",
    explicatie:
      "Uleiul unge și răcește motorul; în timp se degradează și nu mai protejează. La revizie schimbăm uleiul cu tipul cerut de producător și filtrele, apoi trecem prin punctele importante ale mașinii.",
    include: ["Ulei motor conform specificației", "Filtru de ulei, aer, habitaclu și combustibil (după caz)", "Verificare lichide, frâne, anvelope, lumini", "Resetarea indicatorului de service"],
    durata: "45–90 min",
    pret: "de la [exemplu] lei + piese",
    media: { foto: "raft" },
  },
  {
    id: "frane",
    titlu: "Sistem de frânare",
    icon: "frane",
    scurt: "Plăcuțe, discuri, etriere și lichid de frână — măsurate, nu ghicite.",
    explicatie:
      "Plăcuțele și discurile se uzează normal. Le măsurăm grosimea și îți arătăm cât mai au. Lichidul de frână absoarbe umezeală în timp, așa că se schimbă periodic chiar dacă nivelul e bun.",
    include: ["Înlocuire plăcuțe și discuri", "Revizie etriere și ghidaje", "Schimb lichid de frână", "Verificare frână de mână"],
    semne: ["Scârțâit sau vibrații la frânare", "Pedală moale sau care coboară mult", "Mașina trage într-o parte când frânezi"],
    durata: "1–2 ore pe punte",
    pret: "de la [exemplu] lei / punte",
    media: { foto: "frane" },
  },
  {
    id: "suspensie",
    titlu: "Suspensie și direcție",
    icon: "suspensie",
    scurt: "Amortizoare, brațe, bielete, capete de bară — mașina ține drumul ca la carte.",
    explicatie:
      "Suspensia ține roțile lipite de drum, iar direcția le orientează. Piesele uzate nu se simt brusc, ci treptat: bătăi pe denivelări, volan care vibrează sau anvelope roase inegal.",
    include: ["Verificare jocuri pe elevator", "Amortizoare și arcuri", "Brațe, bucșe, bielete antiruliu", "Capete de bară și bielete de direcție"],
    semne: ["Bătăi în gropi sau pe denivelări", "Volan care vibrează sau nu stă drept", "Mașina „plutește” la viteză"],
    durata: "după diagnoză",
    pret: "preț după diagnoză",
    media: { art: "suspensie" },
  },
  {
    id: "geometrie",
    titlu: "Geometrie roți",
    icon: "geometrie",
    scurt: "Reglăm unghiurile roților ca mașina să meargă drept și anvelopele să țină mai mult.",
    explicatie:
      "Geometria înseamnă unghiurile la care stau roțile față de mașină și față de drum. Dacă sunt deviate, mașina trage într-o parte și anvelopele se rod pe o margine. Se face după piese noi de direcție sau suspensie.",
    include: ["Măsurare inițială și raport", "Reglaj convergență și, unde se poate, cădere", "Centrare volan", "Raport final înainte și după"],
    durata: "45–60 min",
    pret: "de la [exemplu] lei",
    media: { art: "geometrie" },
  },
  {
    id: "vulcanizare",
    titlu: "Vulcanizare și schimb anvelope",
    icon: "vulcanizare",
    scurt: "Montaj, echilibrare, reparații pene și hotel de anvelope pentru setul din afara sezonului.",
    explicatie:
      "Echilibrarea elimină vibrațiile din volan. Hotelul de anvelope înseamnă că păstrăm noi setul de iarnă sau de vară, curat și etichetat, până la următorul schimb.",
    include: ["Demontare, montare și echilibrare", "Reparații pene", "Verificare presiune și uzură", "Hotel de anvelope [de confirmat cu firma]"],
    durata: "30–45 min / set",
    pret: "de la [exemplu] lei / set",
    media: { foto: "roata" },
  },
  {
    id: "clima",
    titlu: "Climatizare",
    icon: "clima",
    scurt: "Încărcare freon, verificare scurgeri și igienizarea instalației de aer condiționat.",
    explicatie:
      "Instalația pierde puțin agent frigorific în fiecare an, așa că răcește tot mai slab. Igienizarea scoate bacteriile și mirosul neplăcut din tubulatură și din filtrul de habitaclu.",
    include: ["Recuperare, vidare și încărcare freon", "Test de etanșeitate", "Igienizare instalație", "Schimb filtru de habitaclu"],
    semne: ["Aerul nu mai iese rece", "Miros de mucegai la pornirea ventilației", "Geamurile se aburesc greu de dezaburit"],
    durata: "45–60 min",
    pret: "de la [exemplu] lei",
    media: { art: "clima" },
  },
  {
    id: "electrica",
    titlu: "Electrică auto",
    icon: "electrica",
    scurt: "Baterie, alternator, demaror, lumini și consumatori care descarcă bateria peste noapte.",
    explicatie:
      "Alternatorul încarcă bateria cât merge motorul, iar demarorul o folosește la pornire. Când mașina pornește greu dimineața, testăm întâi bateria și încărcarea, ca să nu schimbi o piesă bună.",
    include: ["Test baterie și sistem de încărcare", "Alternator și demaror", "Becuri, faruri, siguranțe", "Căutare consum anormal în repaus"],
    durata: "după diagnoză",
    pret: "de la [exemplu] lei / test",
    media: { foto: "motor" },
  },
  {
    id: "itp",
    titlu: "Pregătire pentru ITP",
    icon: "itp",
    scurt: "Verificăm înainte ce se controlează la inspecție, ca să nu pleci de acolo cu probleme.",
    explicatie:
      "Trecem prin punctele urmărite la inspecția tehnică — frâne, lumini, emisii, jocuri la direcție — și îți spunem ce e de reparat. Inspecția propriu-zisă se face la o stație autorizată RAR [de confirmat cu firma].",
    include: ["Verificare frâne și lumini", "Jocuri la direcție și suspensie", "Pierderi de lichide, eșapament", "Listă clară cu ce e de rezolvat"],
    durata: "30–45 min",
    pret: "de la [exemplu] lei",
    media: { art: "itp" },
  },
];

export const deCeNoi = [
  { icon: "scan", titlu: "Diagnoză înainte de reparație", text: "Nu schimbăm piese „la noroc”. Întâi aflăm cauza, apoi îți spunem ce e de făcut și de ce." },
  { icon: "file", titlu: "Devizul îl aprobi tu", text: "Primești prețul pentru piese și manoperă înainte să începem. Dacă apare ceva în plus, te sunăm întâi." },
  { icon: "box", titlu: "Piese explicate", text: "Îți spunem ce variante de piese există, cât costă fiecare și îți arătăm piesele vechi la final." },
  { icon: "clock", titlu: "Gata la ora promisă", text: "Îți dăm o oră realistă de predare. Dacă se schimbă ceva, afli de la noi, nu când ajungi la atelier." },
] as const;

export const pasi = [
  { titlu: "Programare", text: "Ne suni sau completezi formularul. Îți confirmăm ziua și ora." },
  { titlu: "Diagnoză și deviz", text: "Verificăm mașina și îți trimitem devizul: piese, manoperă, timp." },
  { titlu: "Reparație după acordul tău", text: "Lucrăm doar ce ai aprobat. Orice surpriză o discutăm întâi cu tine." },
  { titlu: "Predare cu explicații", text: "Îți arătăm ce am făcut, piesele vechi și ce trebuie urmărit pe viitor." },
];

export const revizie = {
  intervalImplicit: 15000,
  intervalNota: "Interval implicit [exemplu]: 10.000–15.000 km sau o dată pe an, ce vine mai întâi.",
  atentionare: "Verificați intervalul în cartea service a mașinii.",
};

export const sezon = {
  titlu: "Schimb anvelope iarnă / vară",
  text: "Montăm setul potrivit sezonului, echilibrăm roțile și verificăm presiunea și uzura. Setul scos îl poți lăsa la noi, la hotelul de anvelope [de confirmat cu firma].",
  // Regula din România: anvelope de iarnă obligatorii când drumul e acoperit cu zăpadă, gheață sau polei.
  nota: "Pe drum acoperit cu zăpadă, gheață sau polei, anvelopele de iarnă sunt obligatorii.",
  serviciu: "vulcanizare",
};

export const galerie: { k: StockKey; span?: string }[] = [
  { k: "elevator", span: "row-span-2" },
  { k: "banc", span: "md:col-span-2" },
  { k: "frane2" },
  { k: "curea" },
  { k: "unelte", span: "md:col-span-2" },
  { k: "anvelope", span: "md:col-span-2" },
  { k: "motor" },
  { k: "raft", span: "col-span-2 md:col-span-1" },
];

export const intrebari = [
  {
    q: "Cât durează o diagnoză?",
    a: "Citirea erorilor durează câteva minute, dar o diagnoză corectă înseamnă și verificarea cauzei pe mașină. De obicei 30–60 de minute; pentru defecte intermitente (care apar doar uneori) poate dura mai mult, iar atunci îți spunem din timp.",
  },
  {
    q: "Pot aduce piesele mele?",
    a: "Da, în general se poate. Îți spunem dinainte dacă piesa e potrivită pentru mașina ta. Garanția pe piesă rămâne la cel care ți-a vândut-o, iar noi răspundem pentru manoperă. Condițiile exacte: [de confirmat cu firma].",
  },
  {
    q: "Primesc deviz înainte de reparație?",
    a: "Da. După diagnoză primești devizul cu piese, manoperă și timp estimat. Nu începem lucrarea până nu îl aprobi. Dacă în timpul reparației descoperim altceva, te sunăm înainte să facem orice în plus.",
  },
  {
    q: "Ce garanție are manopera?",
    a: "Manopera are garanție, iar piesele noi au garanția producătorului sau a distribuitorului. Durata garanției pentru manoperă: [de confirmat cu firma]. O primești trecută în scris, pe documentele lucrării.",
  },
  {
    q: "Trebuie să las mașina toată ziua?",
    a: "Nu întotdeauna. Reviziile, schimbul de anvelope sau o diagnoză se fac de multe ori cât aștepți. Pentru reparații mai mari îți spunem de la început cât durează și la ce oră poți veni după ea.",
  },
  {
    q: "La cât timp se face revizia?",
    a: "Intervalul îl stabilește producătorul și e trecut în cartea service: de obicei între 10.000 și 30.000 km sau o dată pe an. Dacă mergi mult prin oraș, pe distanțe scurte, e bine să o faci mai des. Poți folosi calculatorul de mai sus ca orientare.",
  },
  {
    q: "Ce fac dacă se aprinde martorul de motor?",
    a: "Dacă martorul e aprins continuu și mașina merge normal, programează o diagnoză cât mai curând. Dacă martorul clipește, mașina trage slab sau apare fum, oprește în siguranță și sună-ne — continuarea drumului poate strica alte piese.",
  },
  {
    q: "Cum plătesc?",
    a: "Plata se face la predarea mașinii, după ce îți explicăm lucrarea. Metodele de plată acceptate (numerar, card, transfer): [de confirmat cu firma].",
  },
];

export const legal = {
  actualizat: "[exemplu] noiembrie 2026",
  operator: "MotorPro Service Auto [exemplu] — firmă fictivă, date de identificare [de confirmat]",
};
