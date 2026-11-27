import type { Metadata } from "next";
import { Legal } from "@/components/Legal";
import { site } from "@/content/site";
import { og } from "@/lib";

const title = "Politica de confidențialitate";
const description = "Cum folosește MotorPro Service Auto Tecuci (firmă fictivă, site demonstrativ) datele trimise prin formularul de programare. Text exemplu.";
export const metadata: Metadata = { title, description, alternates: { canonical: "./" }, openGraph: og(title, description, "./") };

export default function Page() {
  return (
    <Legal titlu="Confidențialitate">
      <h2>Ce date colectăm</h2>
      <p>Prin formularul de programare ne trimiți: numele, numărul de telefon, datele mașinii (marcă, model, an, kilometri), descrierea problemei și data preferată. Nu cerem CNP, adresă sau date de plată.</p>
      <h2>De ce le folosim</h2>
      <ul>
        <li>ca să te contactăm pentru confirmarea programării;</li>
        <li>ca să pregătim intervenția (piese, timp pe elevator);</li>
        <li>pentru evidența lucrărilor, conform obligațiilor legale.</li>
      </ul>
      <p>Temeiul: demersurile făcute la cererea ta înainte de încheierea unui contract și obligațiile legale (art. 6 alin. (1) lit. b) și c) din Regulamentul (UE) 2016/679 — GDPR).</p>
      <h2>Cui le transmitem</h2>
      <p>Formularul poate fi procesat prin Formspree (furnizor de formulare online), iar varianta WhatsApp trimite mesajul prin serviciul Meta, doar dacă alegi tu să îl trimiți. Nu vindem și nu închiriem datele.</p>
      <h2>Cât timp le păstrăm</h2>
      <p>Cererile de programare care nu devin lucrări se șterg după <span className="tbd">exemplu</span> luni. Documentele lucrărilor se păstrează cât prevede legea.</p>
      <h2>Drepturile tale</h2>
      <p>Poți cere acces, rectificare, ștergere, restricționare sau te poți opune prelucrării, scriind la {site.email}. Ai dreptul să depui plângere la ANSPDCP (dataprotection.ro).</p>
    </Legal>
  );
}
