/* ============================================================
   Newman Energy — Landing app.js v2 (vanilla, zero deps)
   Calculadora de ahorro CFE · tarifas reales por división
   (almacén Newman · cfe.tariff · junio 2026)
   ============================================================ */
(() => {
  'use strict';
  const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const fmt = n => '$' + Math.round(n).toLocaleString('es-MX') + ' MXN';
  const PERIOD = 'junio 2026';

  /* ---- TARIFAS REALES por división (CFE, jun 2026) ---- */
  const TARIFFS = {"GDBT":{"Valle de México Sur":{"energia":2.008,"transmision":0.1801,"cenace":0.0076,"conexos":0.0069,"capacidad":298.33,"distribucion":301.71},"Norte":{"transmision":0.1801,"cenace":0.0076,"energia":1.37,"capacidad":298.33,"distribucion":342.87,"conexos":0.0069},"Oriente":{"transmision":0.1801,"distribucion":504.55,"energia":1.132,"conexos":0.0069,"capacidad":221.62,"cenace":0.0076},"Sureste":{"distribucion":441.19,"conexos":0.0069,"capacidad":243.7,"transmision":0.1801,"cenace":0.0076,"energia":1.275},"Baja California":{"conexos":0.0069,"energia":0.652,"transmision":0.1801,"capacidad":305.64,"distribucion":193.46,"cenace":0.0076},"Peninsular":{"energia":1.858,"distribucion":299.68,"capacidad":298.33,"conexos":0.0069,"transmision":0.1801,"cenace":0.0076},"Centro Sur":{"energia":1.323,"distribucion":521.84,"cenace":0.0076,"capacidad":237.2,"transmision":0.1801,"conexos":0.0069},"Golfo Norte":{"conexos":0.0069,"cenace":0.0076,"transmision":0.1801,"capacidad":261.86,"energia":1.168,"distribucion":273.29},"Bajío":{"conexos":0.0069,"transmision":0.1801,"capacidad":298.33,"energia":1.624,"cenace":0.0076,"distribucion":369.31},"Valle de México Norte":{"distribucion":311.23,"capacidad":293.23,"conexos":0.0069,"energia":1.905,"transmision":0.1801,"cenace":0.0076},"Valle de México Centro":{"distribucion":243.16,"cenace":0.0076,"transmision":0.1801,"capacidad":305.64,"energia":1.783,"conexos":0.0069},"Golfo Centro":{"energia":1.445,"distribucion":376.26,"transmision":0.1801,"cenace":0.0076,"conexos":0.0069,"capacidad":298.33},"Jalisco":{"conexos":0.0069,"transmision":0.1801,"energia":1.278,"capacidad":239.59,"cenace":0.0076,"distribucion":529.99},"Baja California Sur":{"transmision":0.1801,"conexos":0.0069,"cenace":0.0076,"distribucion":193.46,"energia":2.778,"capacidad":259.63},"Centro Oriente":{"conexos":0.0069,"cenace":0.0076,"distribucion":462.32,"capacidad":268.52,"transmision":0.1801,"energia":1.463},"Centro Occidente":{"distribucion":497.04,"capacidad":255.23,"cenace":0.0076,"energia":1.233,"transmision":0.1801,"conexos":0.0069},"Noroeste":{"transmision":0.1801,"energia":1.306,"cenace":0.0076,"distribucion":213.0,"capacidad":305.64,"conexos":0.0069}},"GDMTH":{"Valle de México Centro":{"cenace":0.0076,"capacidad":394.26,"transmision":0.1801,"conexos":0.0069,"energia":{"base":0.8972,"punta":1.9074,"intermedio":1.606},"distribucion":60.82},"Oriente":{"conexos":0.0069,"transmision":0.1801,"capacidad":353.26,"energia":{"punta":1.6115,"intermedio":1.4136,"base":0.7216},"cenace":0.0076,"distribucion":202.45},"Sureste":{"cenace":0.0076,"energia":{"base":0.8018,"punta":1.7418,"intermedio":1.5323},"distribucion":141.76,"transmision":0.1801,"conexos":0.0069,"capacidad":338.52},"Peninsular":{"transmision":0.1801,"energia":{"punta":2.0856,"base":1.0209,"intermedio":1.8492},"cenace":0.0076,"capacidad":384.86,"conexos":0.0069,"distribucion":91.87},"Golfo Centro":{"distribucion":124.41,"transmision":0.1801,"conexos":0.0069,"cenace":0.0076,"energia":{"intermedio":1.4705,"punta":1.7344,"base":0.7915},"capacidad":384.86},"Centro Sur":{"cenace":0.0076,"energia":{"base":0.7573,"punta":1.7043,"intermedio":1.4835},"distribucion":221.09,"conexos":0.0069,"capacidad":358.05,"transmision":0.1801},"Centro Occidente":{"capacidad":384.7,"transmision":0.1801,"cenace":0.0076,"conexos":0.0069,"energia":{"base":0.8429,"punta":1.8843,"intermedio":1.6517},"distribucion":155.41},"Bajío":{"energia":{"punta":1.9055,"base":0.8451,"intermedio":1.6491},"cenace":0.0076,"distribucion":97.88,"transmision":0.1801,"conexos":0.0069,"capacidad":384.86},"Noroeste":{"conexos":0.0069,"transmision":0.1801,"cenace":0.0076,"capacidad":384.86,"energia":{"base":0.7614,"punta":1.5012,"intermedio":1.3356},"distribucion":90.85},"Baja California":{"energia":{"base":0.41,"intermedio":0.7423,"punta":1.0687},"capacidad":351.29,"cenace":0.0076,"transmision":0.1801,"distribucion":90.01,"conexos":0.0069},"Norte":{"energia":{"punta":1.6761,"base":0.8124,"intermedio":1.4045},"conexos":0.0069,"cenace":0.0076,"transmision":0.1801,"capacidad":394.26,"distribucion":72.92},"Centro Oriente":{"energia":{"intermedio":1.6525,"punta":1.8897,"base":0.8403},"transmision":0.1801,"conexos":0.0069,"cenace":0.0076,"capacidad":381.29,"distribucion":149.44},"Baja California Sur":{"distribucion":90.01,"cenace":0.0076,"conexos":0.0069,"transmision":0.1801,"energia":{"intermedio":2.4217,"base":1.8667,"punta":3.4867},"capacidad":251.81},"Valle de México Sur":{"transmision":0.1801,"capacidad":394.26,"cenace":0.0076,"energia":{"intermedio":1.6164,"base":0.9051,"punta":1.9226},"conexos":0.0069,"distribucion":67.68},"Golfo Norte":{"cenace":0.0076,"conexos":0.0069,"transmision":0.1801,"energia":{"punta":1.4988,"intermedio":1.366,"base":0.8121},"distribucion":57.74,"capacidad":394.26},"Jalisco":{"transmision":0.1801,"energia":{"intermedio":1.5865,"base":0.8049,"punta":1.809},"cenace":0.0076,"capacidad":384.86,"conexos":0.0069,"distribucion":160.25},"Valle de México Norte":{"cenace":0.0076,"energia":{"base":0.8943,"punta":1.895,"intermedio":1.5935},"transmision":0.1801,"conexos":0.0069,"capacidad":394.26,"distribucion":86.15}},"GDMTO":{"Centro Sur":{"energia":1.052,"cenace":0.0076,"capacidad":257.66,"distribucion":221.09,"transmision":0.1801,"conexos":0.0069},"Centro Occidente":{"capacidad":291.95,"distribucion":155.41,"transmision":0.1801,"conexos":0.0069,"energia":1.179,"cenace":0.0076},"Norte":{"conexos":0.0069,"distribucion":72.92,"cenace":0.0076,"capacidad":305.69,"transmision":0.1801,"energia":1.028},"Golfo Centro":{"cenace":0.0076,"transmision":0.1801,"conexos":0.0069,"distribucion":124.41,"energia":1.14,"capacidad":315.03},"Valle de México Centro":{"cenace":0.0076,"distribucion":60.82,"transmision":0.1801,"capacidad":341.29,"energia":1.374,"conexos":0.0069},"Oriente":{"conexos":0.0069,"transmision":0.1801,"distribucion":202.45,"cenace":0.0076,"energia":1.109,"capacidad":285.65},"Valle de México Norte":{"cenace":0.0076,"conexos":0.0069,"energia":1.339,"transmision":0.1801,"capacidad":334.65,"distribucion":86.15},"Peninsular":{"distribucion":91.87,"capacidad":325.16,"energia":1.512,"conexos":0.0069,"transmision":0.1801,"cenace":0.0076},"Centro Oriente":{"cenace":0.0076,"capacidad":328.54,"conexos":0.0069,"distribucion":149.44,"transmision":0.1801,"energia":1.3},"Bajío":{"energia":1.319,"distribucion":97.88,"cenace":0.0076,"conexos":0.0069,"transmision":0.1801,"capacidad":331.31},"Baja California":{"capacidad":334.65,"conexos":0.0069,"energia":0.509,"transmision":0.1801,"cenace":0.0076,"distribucion":90.01},"Jalisco":{"cenace":0.0076,"energia":1.198,"transmision":0.1801,"capacidad":305.69,"conexos":0.0069,"distribucion":160.25},"Baja California Sur":{"energia":2.103,"capacidad":257.31,"distribucion":90.01,"cenace":0.0076,"transmision":0.1801,"conexos":0.0069},"Noroeste":{"capacidad":334.65,"conexos":0.0069,"energia":1.088,"distribucion":90.85,"transmision":0.1801,"cenace":0.0076},"Sureste":{"cenace":0.0076,"capacidad":253.88,"energia":1.064,"distribucion":141.76,"conexos":0.0069,"transmision":0.1801},"Golfo Norte":{"distribucion":57.74,"capacidad":334.65,"conexos":0.0069,"cenace":0.0076,"energia":1.052,"transmision":0.1801},"Valle de México Sur":{"transmision":0.1801,"capacidad":342.85,"cenace":0.0076,"conexos":0.0069,"energia":1.388,"distribucion":67.68}},"PDBT":{"Noroeste":{"capacidad":0.971,"distribucion":0.7753,"cenace":0.0076,"conexos":0.0069,"energia":1.36,"transmision":0.1801},"Peninsular":{"distribucion":0.9939,"cenace":0.0076,"capacidad":0.959,"energia":1.792,"conexos":0.0069,"transmision":0.1801},"Centro Sur":{"distribucion":1.3171,"conexos":0.0069,"energia":1.306,"cenace":0.0076,"capacidad":0.852,"transmision":0.1801},"Valle de México Sur":{"cenace":0.0076,"conexos":0.0069,"distribucion":0.7614,"energia":1.613,"transmision":0.1801,"capacidad":1.103},"Jalisco":{"conexos":0.0069,"cenace":0.0076,"capacidad":1.06,"transmision":0.1801,"distribucion":1.3377,"energia":1.719},"Baja California Sur":{"energia":2.307,"conexos":0.0069,"cenace":0.0076,"transmision":0.1801,"capacidad":0.691,"distribucion":0.6699},"Sureste":{"transmision":0.1801,"distribucion":1.1136,"energia":1.511,"cenace":0.0076,"conexos":0.0069,"capacidad":0.935},"Golfo Centro":{"cenace":0.0076,"distribucion":1.1182,"transmision":0.1801,"conexos":0.0069,"capacidad":0.995,"energia":1.585},"Oriente":{"energia":1.387,"distribucion":1.2735,"transmision":0.1801,"conexos":0.0069,"capacidad":0.878,"cenace":0.0076},"Baja California":{"cenace":0.0076,"transmision":0.1801,"distribucion":0.6699,"capacidad":0.975,"energia":0.644,"conexos":0.0069},"Centro Occidente":{"distribucion":1.2545,"cenace":0.0076,"capacidad":0.857,"transmision":0.1801,"energia":1.401,"conexos":0.0069},"Norte":{"conexos":0.0069,"energia":1.218,"cenace":0.0076,"capacidad":0.915,"distribucion":1.2734,"transmision":0.1801},"Centro Oriente":{"energia":1.396,"distribucion":1.1668,"cenace":0.0076,"transmision":0.1801,"conexos":0.0069,"capacidad":0.861},"Valle de México Norte":{"energia":1.581,"cenace":0.0076,"capacidad":1.086,"distribucion":0.7856,"conexos":0.0069,"transmision":0.1801},"Valle de México Centro":{"transmision":0.1801,"cenace":0.0076,"energia":1.703,"capacidad":1.11,"conexos":0.0069,"distribucion":0.6137},"Bajío":{"transmision":0.1801,"capacidad":1.036,"conexos":0.0069,"energia":1.608,"cenace":0.0076,"distribucion":0.9322},"Golfo Norte":{"conexos":0.0069,"transmision":0.1801,"distribucion":0.8122,"energia":1.398,"capacidad":1.074,"cenace":0.0076}}};
  const TARIFF_LABEL = {GDMTH:'GDMTH · Gran demanda media tensión horaria', GDMTO:'GDMTO · Gran demanda media tensión ordinaria', GDBT:'GDBT · Gran demanda baja tensión', PDBT:'PDBT · Pequeña demanda baja tensión'};
  const DEMAND_KWH = {PDBT:true};  // estas tarifas cobran demanda en $/kWh, no $/kW

  /* ---- giro → curva de carga (mezcla horaria + factor de carga) ---- */
  const GIRO = {
    manufactura:{l:'Manufactura / metalmecánica', mix:[0.45,0.35,0.20], lf:0.60},
    alimentos:{l:'Alimentos y bebidas (refrigeración)', mix:[0.50,0.30,0.20], lf:0.75},
    automotriz:{l:'Automotriz / autopartes', mix:[0.40,0.40,0.20], lf:0.65},
    quimica:{l:'Química / plástico / farma', mix:[0.50,0.30,0.20], lf:0.70},
    hoteleria:{l:'Hotelería / turismo', mix:[0.30,0.40,0.30], lf:0.50},
    retail:{l:'Comercio / retail / plazas', mix:[0.20,0.45,0.35], lf:0.45},
    datacenter:{l:'Data center / telecom', mix:[0.60,0.25,0.15], lf:0.90},
    mineria:{l:'Minería / cemento', mix:[0.55,0.30,0.15], lf:0.80},
    otra:{l:'Otra / no estoy seguro', mix:[0.40,0.40,0.20], lf:0.55}
  };
  /* ---- turnos → factor de carga (anula el del giro si se elige) ---- */
  const TURNOS = { '':0, t1:0.35, t2:0.55, t3:0.75, cont:0.88 };
  const TURNO_LABEL = {'' :'Usar el típico de mi giro', t1:'1 turno (~8 h)', t2:'2 turnos (~16 h)', t3:'3 turnos (~24 h)', cont:'Continuo 24/7'};

  const PPA = 1.80, BESS_RECOVER = 0.45, SOLAR_NET = 0.10, CFE_ESC = 0.058;

  function rates(t, div){ return (TARIFFS[t]||{})[div]; }

  function compute(opts){
    const {spend, t, div, giro, turno, demandaKw} = opts;
    const T = rates(t, div); if(!T) return null;
    const g = GIRO[giro] || GIRO.otra;
    const lf = TURNOS[turno] || g.lf;
    // energía mezclada según curva del giro (TOU) o plana
    let energy;
    if (typeof T.energia === 'object') energy = g.mix[0]*T.energia.base + g.mix[1]*T.energia.intermedio + g.mix[2]*T.energia.punta;
    else energy = T.energia;
    const variable = energy + (T.transmision||0) + (T.cenace||0) + (T.conexos||0);   // $/kWh
    const demandKwhUnit = !!DEMAND_KWH[t];
    let demandPerKwh = demandKwhUnit ? (T.capacidad + T.distribucion) : (T.capacidad + T.distribucion)/(720*lf);
    let allIn = variable + demandPerKwh;
    let kwh = spend / allIn;
    // si dan demanda contratada (kW) y la tarifa cobra en $/kW → cálculo exacto del cargo de demanda
    if (demandaKw && !demandKwhUnit){
      const demandCost = demandaKw * (T.capacidad + T.distribucion);   // $/mes
      // refinar: kWh ≈ (spend - fijo - demandCost) / variable, acotado
      const est = Math.max(spend*0.3, (spend - (T.suministradora||0) - demandCost) / variable);
      kwh = est;
      demandPerKwh = demandCost / kwh;
      allIn = variable + demandPerKwh;
    }
    const demandShare = demandPerKwh/allIn, energyShare = variable/allIn;
    let p = (demandShare*BESS_RECOVER + energyShare*SOLAR_NET)*100;
    p = Math.min(30, Math.max(18, p));
    const monthly = spend * p/100;
    let cum=0, s=spend; for(let y=0;y<10;y++){ const yp=Math.min(0.42, p/100 + y*0.008); cum += s*yp*12; s*=(1+CFE_ESC); }
    return {T, energy, variable, demandPerKwh, allIn, kwh, demandShare, lf, giro:g, monthly, pct:p, annual:monthly*12, tenYr:cum, demandKwhUnit};
  }

  function animateNum(el, to, isPct){
    if(RM){ el.textContent = isPct? Math.round(to)+'%' : fmt(to); return; }
    let t0=null; const step=ts=>{if(t0===null)t0=ts;const k=Math.min((ts-t0)/900,1),v=to*(1-Math.pow(1-k,3));el.textContent=isPct?Math.round(v)+'%':fmt(v);if(k<1)requestAnimationFrame(step);};
    requestAnimationFrame(step);
  }

  function runCalc(){
    const $=id=>document.getElementById(id);
    const spend = parseFloat(($('spend').value||'').replace(/[^\d.]/g,''));
    const t=$('tariff').value, div=$('division').value;
    const giro=$('giro').value, turno=$('turno').value;
    const demandaKw = parseFloat(($('demanda').value||'').replace(/[^\d.]/g,''))||0;
    if(!spend||spend<1000){ $('spend').closest('.field').classList.add('error'); return; }
    $('spend').closest('.field').classList.remove('error');
    const r = compute({spend,t,div,giro,turno,demandaKw});
    if(!r) return;
    animateNum($('r-month'), r.monthly);
    animateNum($('r-pct'), r.pct, true);
    animateNum($('r-year'), r.annual);
    animateNum($('r-ten'), r.tenYr);
    // matemática + precios reales usados
    const e=r.T.energia;
    const energyRow = (typeof e==='object')
      ? `Energía CFE — base ${e.base.toFixed(2)} · intermedia ${e.intermedio.toFixed(2)} · punta ${e.punta.toFixed(2)} $/kWh (mezcla ${r.giro.l})`
      : `Energía CFE — ${e.toFixed(2)} $/kWh`;
    const demRow = r.demandKwhUnit
      ? `Demanda — capacidad ${r.T.capacidad} + distribución ${r.T.distribucion} $/kWh`
      : `Demanda — capacidad ${r.T.capacidad} + distribución ${r.T.distribucion} $/kW-mes (factor de carga ${Math.round(r.lf*100)}%)`;
    $('r-math').innerHTML =
      `<strong>Tarifa ${t} · ${div} · CFE ${PERIOD}</strong> (datos reales del almacén Newman):<br>`+
      `· ${energyRow}<br>· ${demRow}<br>· Transmisión ${r.T.transmision} + CENACE ${r.T.cenace} + conexos ${r.T.conexos} $/kWh<br>`+
      `<br>Su costo all-in ≈ <strong>${r.allIn.toFixed(2)} MXN/kWh</strong> · estimamos <strong>${Math.round(r.kwh).toLocaleString('es-MX')} kWh/mes</strong>. `+
      `El <strong>${Math.round(r.demandShare*100)}% de su recibo es cargo por demanda</strong> y el sol no lo toca — la palanca principal es el almacenamiento (BESS), más solar. `+
      `Ahorro conservador <strong>${Math.round(r.pct)}%</strong>. Modelamos 18–30% a propósito; se valida con un estudio de carga antes de firmar.`;
    const wa=$('wa-result');
    if(wa) wa.href=`https://wa.me/525500000000?text=`+encodeURIComponent(`Hola, gasto CFE ${fmt(spend)}/mes, tarifa ${t}, división ${div}, giro ${r.giro.l}. Estimado de ahorro: ${fmt(r.monthly)}/mes. Quiero mi desglose a 10 años.`);
    const sr=$('r-sr'); if(sr) sr.textContent=`Ahorro estimado ${fmt(r.monthly)} al mes (${Math.round(r.pct)}% de su recibo), ${fmt(r.annual)} al año. Tarifa ${t}, división ${div}.`;
    $('calc-result').hidden=false;
    $('calc-result').scrollIntoView({behavior:RM?'auto':'smooth',block:'center'});
    if(window.gtag) gtag('event','result_shown',{spend,tariff:t,division:div,giro,pct:Math.round(r.pct)});
  }

  /* ---- base UI ---- */
  function initNav(){const nav=document.querySelector('.nav');if(!nav)return;let last=0;addEventListener('scroll',()=>{const y=scrollY;nav.classList.toggle('hidden',y>last&&y>140);last=y;},{passive:true});nav.querySelector('.burger')?.addEventListener('click',e=>{const o=nav.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(o));});document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(id.length<2)return;const el=document.querySelector(id);if(el){e.preventDefault();el.scrollIntoView({behavior:RM?'auto':'smooth'});nav.classList.remove('open');}}));}
  function initReveal(){const els=document.querySelectorAll('[data-reveal]');if(RM||!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add('in'));return;}const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.15});els.forEach(e=>io.observe(e));}
  function initAccordion(){document.querySelectorAll('.acc-head').forEach(h=>h.addEventListener('click',()=>{const o=h.getAttribute('aria-expanded')==='true';h.setAttribute('aria-expanded',String(!o));const b=h.nextElementSibling;b.style.maxHeight=o?'0px':b.scrollHeight+'px';}));}
  function fillSelect(id, entries, sel){const el=document.getElementById(id);if(!el)return;entries.forEach(([v,l])=>{const o=document.createElement('option');o.value=v;o.textContent=l;if(v===sel)o.selected=true;el.append(o);});}

  addEventListener('DOMContentLoaded',()=>{
    initNav(); initReveal(); initAccordion();
    fillSelect('tariff', Object.keys(TARIFFS).map(k=>[k,TARIFF_LABEL[k]]), 'GDMTH');
    fillSelect('division', Object.keys(TARIFFS.GDMTH).sort().map(d=>[d,d]), 'Bajío');
    fillSelect('giro', Object.keys(GIRO).map(k=>[k,GIRO[k].l]), 'manufactura');
    fillSelect('turno', Object.keys(TURNOS).map(k=>[k,TURNO_LABEL[k]]), '');
    document.getElementById('calc-run')?.addEventListener('click', runCalc);
    document.getElementById('spend')?.addEventListener('keydown', e=>{ if(e.key==='Enter') runCalc(); });
    const af=document.getElementById('afinar-toggle');
    af?.addEventListener('click',()=>{const p=document.getElementById('afinar');const open=p.hidden;p.hidden=!open;af.setAttribute('aria-expanded',String(open));af.textContent=open?'− Menos detalle':'+ Afinar mi estimado (tarifa, división, giro, turnos, demanda)';});
    // repopulate division when tariff changes (guards null rates)
    const tEl=document.getElementById('tariff');
    tEl?.addEventListener('change',()=>{const cur=document.getElementById('division').value;const el=document.getElementById('division');el.innerHTML='';Object.keys(TARIFFS[tEl.value]||TARIFFS.GDMTH).sort().forEach(d=>{const o=document.createElement('option');o.value=d;o.textContent=d;if(d===cur)o.selected=true;el.append(o);});});
    // email capture toggle
    document.getElementById('email-toggle')?.addEventListener('click',e=>{e.preventDefault();const c=document.getElementById('capture');c.hidden=false;e.target.style.display='none';c.querySelector('input')?.focus();});
    // form submit -> mailto fallback (works with no backend) + announce
    document.getElementById('capture')?.addEventListener('submit',e=>{
      e.preventDefault();
      const name=(document.getElementById('c-name').value||'').trim();
      const emp=(document.getElementById('c-emp').value||'').trim();
      const con=(document.getElementById('c-contact').value||'').trim();
      if(!name||!emp||!con){[['c-name',name],['c-emp',emp],['c-contact',con]].forEach(([id,v])=>document.getElementById(id).closest('.field').classList.toggle('error',!v));return;}
      if(window.gtag) gtag('event','lead_captured');
      const body=encodeURIComponent(`Nombre: ${name}\nEmpresa: ${emp}\nContacto: ${con}\nGasto CFE: ${document.getElementById('spend').value}\nTarifa: ${document.getElementById('tariff').value} / División: ${document.getElementById('division').value}`);
      window.location.href=`mailto:hola@newman.re?subject=${encodeURIComponent('Solicitud de desglose de ahorro')}&body=${body}`;
      e.target.innerHTML='<p style="color:#0d6347;font-family:var(--display)" role="status">✓ Gracias, '+name+'. Le enviamos su desglose a 10 años en breve.</p>';
    });
  });
  window.NewmanCalc = { compute, rates, TARIFFS, GIRO };
})();
