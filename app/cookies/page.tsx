import type { Metadata } from "next";
import { Legal } from "@/components/Legal";
import { og } from "@/lib";

const title = "Politica de cookies";
const description = "Ce cookie-uri folosește site-ul MotorPro Service Auto Tecuci (site demonstrativ, firmă fictivă). Text exemplu.";
export const metadata: Metadata = { title, description, alternates: { canonical: "./" }, openGraph: og(title, description, "./") };

export default function Page() {
  return (
    <Legal titlu="Cookies">
      <h2>Pe scurt</h2>
      <p>Site-ul nu folosește cookie-uri de analiză sau de publicitate și nu te urmărește între site-uri.</p>
      <h2>Stocare locală</h2>
      <p>Când apeși un buton „Programează” de la un anumit serviciu, browserul ține minte temporar (sessionStorage) serviciul ales, ca să îl găsești preselectat în formular. Se șterge imediat după folosire și la închiderea filei.</p>
      <h2>Servicii terțe</h2>
      <ul>
        <li><strong>Google Maps</strong> — harta se încarcă doar dacă apeși „Afișează harta”. Din acel moment Google poate seta propriile cookie-uri, conform politicii Google.</li>
        <li><strong>WhatsApp</strong> — linkul deschide aplicația sau site-ul WhatsApp doar la cererea ta.</li>
      </ul>
      <h2>Cum controlezi cookie-urile</h2>
      <p>Le poți șterge sau bloca din setările browserului. Site-ul funcționează și fără ele.</p>
    </Legal>
  );
}
