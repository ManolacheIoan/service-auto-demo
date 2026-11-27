/**
 * Ilustrații line-art (SVG) pe paleta site-ului — folosite acolo unde nu există o fotografie stock potrivită.
 * Desene originale, fără mărci. Decorative: au aria-hidden, textul alăturat descrie serviciul.
 */
export type ArtKey = "diagnoza" | "suspensie" | "geometrie" | "clima" | "itp";

const M = "#9aa6b5"; // metal
const A = "#ff5b1f"; // accent
const D = "#3a414c"; // linie discretă

function Diagnoza() {
  return (
    <>
      <rect x="120" y="62" width="220" height="146" rx="8" stroke={M} />
      <rect x="132" y="74" width="196" height="122" rx="3" stroke={D} />
      <path d="M102 208h256l14 22H88z" stroke={M} strokeLinejoin="round" />
      <path d="M210 219h40" stroke={D} />
      <polyline points="140,150 160,150 170,118 182,176 194,132 206,150 226,150 236,104 248,168 258,150 310,150" stroke={A} strokeWidth="2" strokeLinejoin="round" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={142 + i * 16} y={86} width="10" height={6 + i * 4} stroke={D} />)}
      <path d="M262 92h52M262 102h36" stroke={D} />
      <path d="M340 150c40 0 44 40 50 70s10 26 18 26" stroke={M} />
      <path d="M396 236h34l-6 26h-22z" stroke={A} strokeLinejoin="round" />
      {[0, 1, 2, 3].map((i) => <circle key={i} cx={404 + i * 7} cy={246} r="1.6" fill={A} stroke="none" />)}
      <path d="M60 286h360" stroke={D} strokeDasharray="2 6" />
    </>
  );
}

function Suspensie() {
  const rings = Array.from({ length: 8 }, (_, i) => 88 + i * 20);
  return (
    <>
      <path d="M180 56h120M196 56v-10h88v10" stroke={M} strokeLinejoin="round" />
      <path d="M238 56v120M242 56v120" stroke={M} />
      <rect x="224" y="168" width="32" height="104" rx="4" stroke={M} />
      <circle cx="240" cy="286" r="12" stroke={M} />
      <circle cx="240" cy="286" r="4" stroke={A} />
      <path d="M188 76h104" stroke={M} />
      {rings.map((y) => (
        <g key={y}>
          <path d={`M198 ${y} A42 8 0 0 1 282 ${y + 4}`} stroke={D} />
          <path d={`M198 ${y} A42 8 0 0 0 282 ${y + 4}`} stroke={A} strokeWidth="2" />
        </g>
      ))}
      <path d="M188 256h104" stroke={M} />
      <path d="M110 120v120M104 120h12M104 240h12" stroke={D} />
      <path d="M370 120v120M364 120h12M364 240h12" stroke={D} />
      <path d="M90 300h300" stroke={D} strokeDasharray="2 6" />
    </>
  );
}

function Geometrie() {
  return (
    <>
      <rect x="170" y="40" width="140" height="240" rx="40" stroke={D} strokeDasharray="4 6" />
      <path d="M240 20v280" stroke={D} strokeDasharray="8 6" />
      <path d="M170 92h140M170 228h140" stroke={M} />
      {/* roți față (convergență) */}
      <rect x="140" y="64" width="22" height="56" rx="5" stroke={A} strokeWidth="2" transform="rotate(-6 151 92)" />
      <rect x="318" y="64" width="22" height="56" rx="5" stroke={A} strokeWidth="2" transform="rotate(6 329 92)" />
      {/* roți spate */}
      <rect x="140" y="200" width="22" height="56" rx="5" stroke={M} />
      <rect x="318" y="200" width="22" height="56" rx="5" stroke={M} />
      <path d="M151 30v40" stroke={D} strokeDasharray="3 4" />
      <path d="M151 34 l-5.5 52" stroke={A} />
      <path d="M151 44 a22 22 0 0 0 -3 0" stroke={A} />
      <path d="M329 30v40" stroke={D} strokeDasharray="3 4" />
      <path d="M329 34 l5.5 52" stroke={A} />
      <path d="M100 92h30M350 92h30" stroke={M} />
      <circle cx="96" cy="92" r="4" stroke={M} />
      <circle cx="384" cy="92" r="4" stroke={M} />
      <path d="M60 150h70M350 150h70" stroke={D} />
      <path d="M60 160h46M374 160h46" stroke={D} />
    </>
  );
}

function Clima() {
  const arm = (a: number) => {
    const r = (a * Math.PI) / 180, c = Math.cos(r), s = Math.sin(r);
    const p = (d: number, o = 0) => `${(330 + c * d - s * o).toFixed(1)} ${(160 + s * d + c * o).toFixed(1)}`;
    return `M${p(0)} L${p(46)} M${p(26)} L${p(36, 9)} M${p(26)} L${p(36, -9)}`;
  };
  return (
    <>
      <rect x="60" y="100" width="130" height="120" rx="16" stroke={M} />
      {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M76 ${124 + i * 18}h98`} stroke={D} />)}
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M196 ${128 + i * 32}c30 ${-14 + i * 6} 50 ${18 - i * 8} 80 ${4 - i * 4}`} stroke={i === 1 ? A : M} strokeDasharray={i === 1 ? undefined : "5 6"} />
      ))}
      {[0, 60, 120, 180, 240, 300].map((a) => <path key={a} d={arm(a)} stroke={A} strokeWidth="2" strokeLinecap="round" />)}
      <circle cx="330" cy="160" r="6" stroke={A} />
      <circle cx="330" cy="160" r="70" stroke={D} strokeDasharray="2 6" />
      <path d="M40 290h400" stroke={D} strokeDasharray="2 6" />
    </>
  );
}

function Itp() {
  return (
    <>
      <rect x="250" y="44" width="160" height="230" rx="10" stroke={M} />
      <rect x="296" y="34" width="68" height="22" rx="5" stroke={M} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="270" y={84 + i * 44} width="20" height="20" rx="4" stroke={i < 3 ? A : D} />
          {i < 3 && <path d={`M274 ${95 + i * 44}l5 5 8-11`} stroke={A} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
          <path d={`M302 ${90 + i * 44}h86M302 ${100 + i * 44}h56`} stroke={D} />
        </g>
      ))}
      {/* mașină, vedere din față */}
      <path d="M70 210v-36l18-42c4-9 10-14 20-14h68c10 0 16 5 20 14l18 42v36" stroke={M} strokeLinejoin="round" />
      <path d="M92 168h120" stroke={M} />
      <path d="M100 136h104" stroke={D} />
      <rect x="82" y="180" width="30" height="14" rx="4" stroke={A} />
      <rect x="192" y="180" width="30" height="14" rx="4" stroke={A} />
      <path d="M128 188h48" stroke={D} />
      <rect x="70" y="210" width="26" height="28" rx="4" stroke={M} />
      <rect x="208" y="210" width="26" height="28" rx="4" stroke={M} />
      <path d="M96 222h112" stroke={M} />
      <path d="M40 286h400" stroke={D} strokeDasharray="2 6" />
    </>
  );
}

const ART: Record<ArtKey, () => React.ReactElement> = { diagnoza: Diagnoza, suspensie: Suspensie, geometrie: Geometrie, clima: Clima, itp: Itp };

export function Art({ name, className = "" }: { name: ArtKey; className?: string }) {
  const Draw = ART[name];
  return (
    <div className={`art blueprint relative overflow-hidden ${className}`} aria-hidden="true">
      <svg viewBox="0 0 480 320" fill="none" strokeWidth="1.5" className="absolute inset-0 h-full w-full p-[6%]" preserveAspectRatio="xMidYMid meet">
        <Draw />
      </svg>
      <span className="photo-badge">Ilustrație</span>
    </div>
  );
}
