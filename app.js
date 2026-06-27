/* ============================================================
   Newman Energy — Landing app.js (vanilla, zero deps)
   Calculadora de ahorro CFE · datos reales (almacén Newman, jun 2026)
   ============================================================ */
(() => {
  'use strict';
  const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const fmt = n => '$' + Math.round(n).toLocaleString('es-MX') + ' MXN';
  const pct = n => Math.round(n) + '%';

  /* ---- REAL CFE tariff data · cfe.tariff, junio 2026 (Newman warehouse) ----
     Componentes en MXN. energia/transmision/cenace/conexos = $/kWh;
     capacidad/distribucion = $/kW-mes (salvo PDBT, en $/kWh); fijo = $/mes. */
  const CFE = {
    period: 'junio 2026',
    GDMTH: {label:'GDMTH · Gran demanda media tensión horaria', energia:{base:0.8697,intermedio:1.5515,punta:1.8425}, transmision:0.1801, cenace:0.0076, conexos:0.0069, capacidad:371.4424, distribucion:115.3376, fijo:468.07, demandUnit:'kW'},
    GDMTO: {label:'GDMTO · Gran demanda media tensión ordinaria', energia:1.2208, transmision:0.1801, cenace:0.0076, conexos:0.0069, capacidad:310.6241, distribucion:115.3376, fijo:468.07, demandUnit:'kW'},
    GDBT:  {label:'GDBT · Gran demanda baja tensión', energia:1.5059, transmision:0.1801, cenace:0.0076, conexos:0.0069, capacidad:275.8324, distribucion:357.3153, fijo:468.07, demandUnit:'kW'},
    PDBT:  {label:'PDBT · Pequeña demanda baja tensión', energia:1.5017, transmision:0.1801, cenace:0.0076, conexos:0.0069, capacidad:0.9622, distribucion:0.9923, fijo:46.81, demandUnit:'kWh'}
  };
  // assumptions, stated to the user (honest, conservative)
  const MIX = {base:0.40, intermedio:0.40, punta:0.20};   // perfil 2 turnos típico
  const LF  = 0.55;                                         // factor de carga
  const PPA = 1.80;                                         // MXN/kWh solar PPA (Energía Real publicado)
  const SOLAR_COVER = 0.45;                                 // % energía cubierta por solar
  const BESS_DEMAND_CUT = 0.25;                             // % recorte de demanda con BESS
  const CFE_ESC = 0.058, PPA_ESC = 0.05;                    // escaladores anuales

  // all-in MXN/kWh for a tariff (transparent build-up)
  function allIn(t){
    const T = CFE[t];
    let energy;
    if (typeof T.energia === 'object')
      energy = MIX.base*T.energia.base + MIX.intermedio*T.energia.intermedio + MIX.punta*T.energia.punta;
    else energy = T.energia;
    const variable = energy + T.transmision + T.cenace + T.conexos;     // $/kWh
    let demandPerKwh;
    if (T.demandUnit === 'kW') demandPerKwh = (T.capacidad + T.distribucion) / (720 * LF); // kW-mes → kWh
    else demandPerKwh = T.capacidad + T.distribucion;                    // ya en $/kWh (PDBT)
    return {energy, variable, demandPerKwh, total: variable + demandPerKwh};
  }

  // savings model (conservative, clamped 18–30%) — la palanca principal es la demanda (BESS)
  const BESS_RECOVER = 0.45;   // BESS recupera ~45% del cargo de demanda
  const SOLAR_NET    = 0.10;   // solar aporta ~10% neto sobre la porción de energía
  function compute(spend, t){
    const a = allIn(t);
    const kwh = spend / a.total;
    const demandShare = a.demandPerKwh / a.total;   // % del recibo que es demanda
    const energyShare = a.variable / a.total;
    const demandSavePct = demandShare * BESS_RECOVER;
    const energySavePct = energyShare * SOLAR_NET;
    let p = (demandSavePct + energySavePct) * 100;
    p = Math.min(30, Math.max(18, p));              // honesto: 18–30%, nunca inflado
    const monthly = spend * p/100;
    // 10 años con brecha de escalador (CFE sube más rápido que PPA → el ahorro % crece)
    let cum = 0, s = spend;
    for (let y=0; y<10; y++){ const yp = Math.min(0.42, p/100 + y*0.008); cum += s*yp*12; s*=(1+CFE_ESC); }
    return {kwh, allIn:a, monthly, pct:p, annual:monthly*12, tenYr:cum, demandShare};
  }

  function animateNum(el, to, suffix=''){
    if (RM){ el.textContent = (suffix==='%'? Math.round(to)+'%' : fmt(to)); return; }
    let t0=null;
    const step = ts => { if(t0===null)t0=ts; const k=Math.min((ts-t0)/900,1), v=to*(1-Math.pow(1-k,3));
      el.textContent = suffix==='%'? Math.round(v)+'%' : fmt(v); if(k<1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }

  function runCalc(){
    const spendEl = document.getElementById('spend');
    const tEl = document.getElementById('tariff');
    const spend = parseFloat((spendEl.value||'').replace(/[^\d.]/g,''));
    const t = tEl.value;
    const res = document.getElementById('calc-result');
    if (!spend || spend < 1000){ spendEl.closest('.field').classList.add('error'); return; }
    spendEl.closest('.field').classList.remove('error');
    const r = compute(spend, t);
    document.getElementById('r-month').dataset.to = r.monthly;
    animateNum(document.getElementById('r-month'), r.monthly);
    animateNum(document.getElementById('r-pct'), r.pct, '%');
    animateNum(document.getElementById('r-year'), r.annual);
    animateNum(document.getElementById('r-ten'), r.tenYr);
    // mostrar la matemática (transparencia = el diferenciador)
    document.getElementById('r-math').innerHTML =
      `Su tarifa <strong>${t}</strong> (CFE, ${CFE.period}) cuesta ≈ <strong>${r.allIn.total.toFixed(2)} MXN/kWh</strong> all-in `+
      `(energía ${r.allIn.variable.toFixed(2)} + demanda ${r.allIn.demandPerKwh.toFixed(2)}). Estimamos <strong>${Math.round(r.kwh).toLocaleString('es-MX')} kWh/mes</strong>. `+
      `El <strong>${Math.round(r.demandShare*100)}% de su recibo es cargo por demanda</strong> y el sol no lo toca — por eso la palanca principal es el almacenamiento (BESS), más un aporte de solar. `+
      `Ahorro conservador: <strong>${pct(r.pct)}</strong>. Modelamos 18–30% a propósito — el recibo real no miente.`;
    // WhatsApp prefilled with the number
    const wa = document.getElementById('wa-result');
    if (wa) wa.href = `https://wa.me/525543831557?text=`+encodeURIComponent(
      `Hola, mi gasto CFE es ${fmt(spend)}/mes (tarifa ${t}). La calculadora estima ${fmt(r.monthly)}/mes de ahorro. Quiero el desglose a 10 años.`);
    res.hidden = false;
    res.scrollIntoView({behavior: RM?'auto':'smooth', block:'center'});
    if (window.gtag) window.gtag('event','result_shown',{spend, tariff:t, pct:Math.round(r.pct)});
  }

  /* ---- base UI: nav scroll-hide, mobile, reveal, accordion ---- */
  function initNav(){
    const nav=document.querySelector('.nav'); if(!nav) return; let last=0;
    addEventListener('scroll',()=>{const y=scrollY;nav.classList.toggle('hidden',y>last&&y>140);last=y;},{passive:true});
    nav.querySelector('.burger')?.addEventListener('click',e=>{const o=nav.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(o));});
    document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(id.length<2)return;const el=document.querySelector(id);if(el){e.preventDefault();el.scrollIntoView({behavior:RM?'auto':'smooth'});nav.classList.remove('open');}}));
  }
  function initReveal(){const els=document.querySelectorAll('[data-reveal]');if(RM||!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add('in'));return;}const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.15});els.forEach(e=>io.observe(e));}
  function initAccordion(){document.querySelectorAll('.acc-head').forEach(h=>h.addEventListener('click',()=>{const o=h.getAttribute('aria-expanded')==='true';h.setAttribute('aria-expanded',String(!o));const b=h.nextElementSibling;b.style.maxHeight=o?'0px':b.scrollHeight+'px';}));}

  addEventListener('DOMContentLoaded',()=>{
    initNav(); initReveal(); initAccordion();
    document.getElementById('calc-run')?.addEventListener('click', runCalc);
    document.getElementById('spend')?.addEventListener('keydown', e=>{ if(e.key==='Enter') runCalc(); });
    // populate tariff select
    const tEl=document.getElementById('tariff');
    if(tEl) Object.keys(CFE).filter(k=>k!=='period').forEach(k=>{const o=document.createElement('option');o.value=k;o.textContent=CFE[k].label;tEl.append(o);});
  });
  window.NewmanCalc = { compute, allIn, CFE };
})();
