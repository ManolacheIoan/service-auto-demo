/**
 * Fotografii stock cu licență liberă (Unsplash License: uz comercial permis, fără atribuire obligatorie).
 * Surse și autori: CREDITS.md. Fișiere: public/images/<cheie>-{480,828,1280,1920}.webp (scripts/images.mjs).
 * Toate sunt ilustrative și marcate „[exemplu]” pe site — nu sunt poze din atelierul firmei.
 */
export type StockImage = { w: number; h: number; alt: string; autor: string; profil: string; sursa: string };

export const stock = {
  hero: { w: 2400, h: 1600, alt: "Autoturism argintiu ridicat pe elevator, cu capota deschisă, într-un atelier curat", autor: "SL Autowerkes", profil: "https://unsplash.com/@slautowerkes", sursa: "https://unsplash.com/photos/PwI7BA_J06k" },
  frane: { w: 2400, h: 1603, alt: "Disc de frână perforat și etrier, montate pe butucul roții", autor: "Erik Mclean", profil: "https://unsplash.com/@introspectivedsgn", sursa: "https://unsplash.com/photos/EpT-ZetoKm8" },
  frane2: { w: 2400, h: 1603, alt: "Prim-plan cu discul de frână și etrierul, fără roată", autor: "Erik Mclean", profil: "https://unsplash.com/@introspectivedsgn", sursa: "https://unsplash.com/photos/vS2shmNei2E" },
  motor: { w: 2400, h: 1600, alt: "Compartiment motor cu alternator, furtunuri și conexiuni electrice", autor: "Nazariy Kovalev", profil: "https://unsplash.com/@nazariykovalov", sursa: "https://unsplash.com/photos/xCLneDUHt4Q" },
  curea: { w: 2400, h: 1350, alt: "Curea de accesorii și role de întindere pe un motor", autor: "Chad Kirchoff", profil: "https://unsplash.com/@cakirchoff", sursa: "https://unsplash.com/photos/xe-e69j6-Ds" },
  anvelope: { w: 2400, h: 2400, alt: "Anvelope stivuite la intrarea într-un atelier", autor: "Tuccera LLC", profil: "https://unsplash.com/@tuccera", sursa: "https://unsplash.com/photos/pi7Jlnh5nuY" },
  roata: { w: 2400, h: 1600, alt: "Pistol pneumatic cu tubulară pe prezoanele unei jante din aliaj", autor: "Tekton", profil: "https://unsplash.com/@tekton_tools", sursa: "https://unsplash.com/photos/O_ufcLVTAYw" },
  unelte: { w: 2400, h: 1600, alt: "Clești și chei agățate pe peretele unui atelier", autor: "Marine Le Gac", profil: "https://unsplash.com/@plustrenn", sursa: "https://unsplash.com/photos/rKwUlkH3Kd8" },
  banc: { w: 2400, h: 1800, alt: "Banc de lucru cu panou de scule, luminat cald", autor: "camera obscura", profil: "https://unsplash.com/@cameraobscura2000", sursa: "https://unsplash.com/photos/v-LAxH7JSzI" },
  raft: { w: 2400, h: 1800, alt: "Perete de scule și bidoane de ulei într-un atelier întunecat", autor: "Kenny Letsoin", profil: "https://unsplash.com/@kenletsoin", sursa: "https://unsplash.com/photos/WhZ5pWTH4hM" },
  elevator: { w: 2400, h: 4265, alt: "Mașină pe elevator cu două coloane, cu partea din față demontată pentru reparație", autor: "Max Tcvetkov", profil: "https://unsplash.com/@your_scorpion", sursa: "https://unsplash.com/photos/UDzZBqE2BYE" },
} satisfies Record<string, StockImage>;

export type StockKey = keyof typeof stock;
export const WIDTHS = [480, 828, 1280, 1920] as const;
