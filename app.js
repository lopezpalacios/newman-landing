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
  const CP2DIV = {"01":"Valle de México Centro","02":"Valle de México Norte","03":"Valle de México Centro","04":"Valle de México Sur","05":"Valle de México Norte","06":"Valle de México Centro","07":"Valle de México Norte","08":"Valle de México Centro","09":"Valle de México Sur","10":"Valle de México Sur","11":"Valle de México Centro","12":"Valle de México Sur","13":"Valle de México Sur","14":"Valle de México Sur","15":"Valle de México Centro","16":"Valle de México Sur","20":"Bajío","21":"Baja California","22":"Baja California","23":"Baja California Sur","24":"Peninsular","25":"Norte","26":"Norte","27":"Norte","28":"Jalisco","29":"Sureste","30":"Sureste","31":"Norte","32":"Norte","33":"Norte","34":"Norte","35":"Norte","36":"Bajío","37":"Bajío","38":"Bajío","39":"Centro Sur","40":"Centro Sur","41":"Centro Sur","42":"Centro Oriente","43":"Centro Oriente","44":"Jalisco","45":"Jalisco","46":"Jalisco","47":"Jalisco","48":"Jalisco","49":"Jalisco","50":"Valle de México Norte","51":"Valle de México Norte","52":"Valle de México Norte","53":"Valle de México Norte","54":"Valle de México Norte","55":"Valle de México Norte","56":"Valle de México Sur","57":"Valle de México Norte","58":"Centro Occidente","59":"Centro Occidente","60":"Centro Occidente","61":"Centro Occidente","62":"Centro Sur","63":"Jalisco","64":"Golfo Norte","65":"Golfo Norte","66":"Golfo Norte","67":"Golfo Norte","68":"Sureste","69":"Sureste","70":"Sureste","71":"Sureste","72":"Centro Oriente","73":"Centro Oriente","74":"Centro Oriente","75":"Centro Oriente","76":"Bajío","77":"Peninsular","78":"Bajío","79":"Bajío","80":"Noroeste","81":"Noroeste","82":"Noroeste","83":"Noroeste","84":"Noroeste","85":"Noroeste","86":"Sureste","87":"Golfo Norte","88":"Golfo Norte","89":"Golfo Norte","90":"Centro Oriente","91":"Golfo Centro","92":"Golfo Centro","93":"Oriente","94":"Oriente","95":"Oriente","96":"Oriente","97":"Peninsular","98":"Bajío","99":"Bajío"};
  function resolveDiv(cp){ cp=(cp||'').replace(/\D/g,''); const d=CP2DIV[cp.slice(0,2)]; return {div:d||'Bajío', found:!!d&&cp.length>=5}; }
  // estima la tarifa por banda de consumo mensual (lo prometemos en la UI; el usuario puede ajustarla en Afinar)
  function inferTariff(spend){ return spend<10000?'PDBT' : spend<60000?'GDMTO' : 'GDMTH'; }
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

  const PPA=1.80, BESS_RECOVER=0.45, SOLAR_COVER=0.45, CFE_ESC=0.058;
  const MINS=1000, MAXS=50000000;
  let refined=false;
  function rates(t,div){ return (TARIFFS[t]||{})[div]; }

  function compute(o){
    let {spend,t,div,giro,turno,demandaKw}=o;
    spend=Number(spend);
    if(!isFinite(spend)||spend<MINS) return {error:'spend_low'};
    if(spend>MAXS) return {error:'spend_high'};
    const T=rates(t,div); if(!T) return {error:'no_rate'};
    const g=GIRO[giro]||GIRO.otra, lf=TURNOS[turno]||g.lf;
    const energy=(typeof T.energia==='object')? g.mix[0]*T.energia.base+g.mix[1]*T.energia.intermedio+g.mix[2]*T.energia.punta : T.energia;
    const variable=energy+(T.transmision||0)+(T.cenace||0)+(T.conexos||0);
    const dk=!!DEMAND_KWH[t];
    let demandPerKwh=dk?(T.capacidad+T.distribucion):(T.capacidad+T.distribucion)/(720*lf);
    let allIn=variable+demandPerKwh, kwh=spend/allIn, demExact=false;
    if(demandaKw && !dk){
      const demCost=demandaKw*(T.capacidad+T.distribucion);
      const k=Math.max(spend*0.25,(spend-(T.suministradora||0)-demCost)/variable);
      const ai=k>0?variable+demCost/k:0;
      // gate del RANGO de tarifa Y de la plausibilidad física (demanda vs gasto): un dedazo no debe acuñar un "exacto"
      if(ai>=0.7 && ai<=5 && k>0 && demCost>=spend*0.08 && demCost<=spend*0.95){ kwh=k; demandPerKwh=demCost/kwh; allIn=ai; demExact=true; }
    }
    const demandMonthly=demandPerKwh*kwh;
    let demandSave=BESS_RECOVER*demandMonthly;
    let energySave=SOLAR_COVER*Math.max(0,variable-PPA)*kwh;
    let monthly=demandSave+energySave, raw=monthly/spend, p=Math.min(0.32, raw);   // tope honesto, SIN piso
    monthly=spend*p;
    const _sc=(demandSave+energySave)>0?monthly/(demandSave+energySave):1; demandSave*=_sc; energySave*=_sc; // reconcilia a lo mostrado
    let cum=0,s=spend; for(let y=0;y<10;y++){ const yp=Math.min(0.40,p+y*0.006); cum+=s*yp*12; s*=(1+CFE_ESC); }
    return {T,energy,variable,demandPerKwh,allIn,kwh,lf,demandShare:demandPerKwh/allIn,demandMonthly,demandSave,energySave,giro:g,monthly,pct:p*100,capped:raw>0.32,annual:monthly*12,tenYr:cum,demExact,demHigh:demExact&&allIn>3.6,refined};
  }

  const round1k=n=>Math.round(n/1000)*1000;
  let raf=[];
  function animateNum(el,to,isPct){
    if(RM){ el.textContent=isPct?Math.round(to)+'%':'≈ '+fmt(to); return; }
    const id={}; raf.push(id); let t0=null;
    const step=ts=>{ if(id.cancel)return; if(t0===null)t0=ts; const k=Math.min((ts-t0)/900,1),v=to*(1-Math.pow(1-k,3));
      el.textContent=isPct?Math.round(v)+'%':'≈ '+fmt(v); if(k<1)id.h=requestAnimationFrame(step); };
    id.h=requestAnimationFrame(step);
  }

  function runCalc(){ try{
    const $=id=>document.getElementById(id);
    raf.forEach(x=>x.cancel=true); raf=[];
    const spend=parseFloat(($('spend').value||'').replace(/[^\d.]/g,''));
    const cp=($('cp').value||'').replace(/\D/g,''); const R=resolveDiv(cp);
    // si el usuario no abrió "Afinar", estimamos la tarifa por su consumo (lo prometemos en la UI → que sea verdad)
    let t=$('tariff').value;
    if(!refined && isFinite(spend)){ t=inferTariff(spend); const ts=$('tariff'); if(ts) ts.value=t; }
    const o={spend,t,div:R.div,giro:$('giro').value,turno:$('turno').value,
             demandaKw:parseFloat(($('demanda').value||'').replace(/[^\d.]/g,''))||0};
    const r=compute(o), errEl=$('calc-err');
    if(r.error){
      $('spend').closest('.field').classList.add('error');
      errEl.textContent = r.error==='spend_high'?'Ese monto parece anual o un error — ingrese su gasto MENSUAL.':
                          r.error==='no_rate'?'No tenemos esa combinación de tarifa/división; pruebe otra.':
                          'Ingrese su gasto mensual (mínimo $1,000 MXN).';
      errEl.hidden=false; return;
    }
    errEl.hidden=true; $('spend').closest('.field').classList.remove('error');
    // ahorro reconciliado: total mostrado = suma de componentes redondeados; % derivado del total
    const dS=round1k(r.demandSave), eS=round1k(r.energySave), mTot=dS+eS;
    const pctShown=spend>0?Math.round(mTot/spend*100):0;
    animateNum($('r-month'), mTot);
    $('r-sub').textContent=`${pctShown}% de su recibo · ahorro estimado al mes`;
    animateNum($('r-year'), round1k(mTot*12));
    animateNum($('r-ten'), round1k(r.tenYr));
    const sc=$('r-scope');
    sc.textContent = R.found ? `CP ${cp} · división ${o.div}${refined?` · tarifa ${o.t}`:' · tarifa estimada por consumo'} · CFE ${PERIOD}`
                             : 'Promedio nacional (base Bajío) — ingrese su código postal para la tarifa exacta de su división ↓';
    sc.className = 'r-scope '+(R.found?'refined':'generic');
    const tr=$('r-trust');
    if(tr){ if(R.found){ tr.innerHTML=`Calculado con la tarifa real de su división CFE (CP ${cp}), no un promedio nacional. <strong>Nadie más en el mercado lo hace así.</strong>`; tr.hidden=false; } else tr.hidden=true; }
    // comparativa hoy vs Newman
    const newmanRate=r.allIn*(1-pctShown/100);
    $('bar-cfe-val').textContent=r.allIn.toFixed(2)+' $/kWh';
    $('bar-nm').style.width=Math.max(8,newmanRate/r.allIn*100)+'%';
    $('bar-nm-val').textContent=newmanRate.toFixed(2)+' $/kWh';
    // composición de su recibo HOY (no del ahorro)
    const ds=Math.round(r.demandShare*100);
    $('bar-dem').style.width=ds+'%'; $('bar-ene').style.width=(100-ds)+'%';
    $('bar-comp-lbl').innerHTML=`Su recibo hoy: <strong>${ds}%</strong> cargo por demanda · ${100-ds}% energía y cargos`;
    // derivación reconciliable + supuestos a la vista
    const e=r.T.energia;
    const eRow=(typeof e==='object')?`base ${e.base.toFixed(2)} · interm. ${e.intermedio.toFixed(2)} · punta ${e.punta.toFixed(2)}`:e.toFixed(2);
    // sparkline: brecha de costo CFE vs Newman a 10 años (hace visible la escalación +5.8%/año)
    const YRS=10,SW=260,SH=54,SP=5,pp=r.pct/100,base=spend*12,cfeArr=[],nmArr=[];
    for(let y=0;y<YRS;y++){ const c=base*Math.pow(1+CFE_ESC,y), yp=Math.min(0.40,pp+y*0.006); cfeArr.push(c); nmArr.push(c*(1-yp)); }
    const maxV=cfeArr[YRS-1], sx=i=>SP+i*(SW-2*SP)/(YRS-1), sy=v=>SH-SP-(v/maxV)*(SH-2*SP);
    const spath=a=>a.map((v,i)=>`${i?'L':'M'}${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`).join(' ');
    const gap10=fmt(round1k((cfeArr[YRS-1]-nmArr[YRS-1])/12));
    const spark=`<div class="spark-wrap"><div class="spark-legend"><span class="dot cfe"></span>CFE <span class="dot nm"></span>Newman · su costo proyectado a 10 años</div>`+
      `<svg viewBox="0 0 ${SW} ${SH}" class="spark" role="img" aria-label="Costo CFE creciente vs Newman a 10 años; brecha al año 10 ${gap10} por mes">`+
      `<path d="${spath(cfeArr)}" fill="none" stroke="#cabfdd" stroke-width="2"/><path d="${spath(nmArr)}" fill="none" stroke="var(--accent)" stroke-width="2"/>`+
      `<circle cx="${sx(YRS-1).toFixed(1)}" cy="${sy(cfeArr[YRS-1]).toFixed(1)}" r="2.6" fill="#cabfdd"/><circle cx="${sx(YRS-1).toFixed(1)}" cy="${sy(nmArr[YRS-1]).toFixed(1)}" r="2.6" fill="var(--accent)"/></svg>`+
      `<p class="spark-cap">Al año 10: CFE ≈ ${fmt(round1k(cfeArr[YRS-1]/12))}/mes vs Newman ≈ ${fmt(round1k(nmArr[YRS-1]/12))}/mes — brecha de <strong>${gap10}/mes</strong>.</p></div>`;
    $('r-math-detail').innerHTML=
      `<table class="mtab"><tbody>`+
      `<tr><td>Energía CFE</td><td>${eRow} $/kWh</td></tr>`+
      `<tr><td>Demanda (cap.+distrib.)</td><td>${r.T.capacidad}+${r.T.distribucion}${r.demExact?' $/kW · su demanda contratada':` $/kW ÷ (720 h × factor de carga ${r.lf.toFixed(2)})`}</td></tr>`+
      `<tr><td>Transmisión+CENACE+conexos</td><td>${r.T.transmision}+${r.T.cenace}+${r.T.conexos} $/kWh</td></tr>`+
      `<tr><td><strong>All-in</strong></td><td><strong>≈ ${r.allIn.toFixed(2)} $/kWh</strong> · ${Math.round(r.kwh).toLocaleString('es-MX')} kWh/mes (inferido)</td></tr>`+
      `</tbody></table>`+
      `<p style="margin-top:8px">Cómo sale, con los supuestos a la vista:</p><ul class="mnote">`+
      `<li>BESS recorta ${r.capped?'parte de':'~45% de'} su cargo de demanda → <strong>${fmt(dS)}/mes</strong>${r.capped?' (limitado al tope honesto de 32%)':''}.</li>`+
      (eS>0?`<li>Solar (PPA ${PPA} $/kWh) cubre ~45% de su energía → <strong>${fmt(eS)}/mes</strong>.</li>`
           :`<li>A ${PPA} $/kWh el solar no abarata su energía aquí — el ahorro es por demanda.</li>`)+
      `<li>Proyección a 10 años: supone CFE +5.8%/año y ahorro creciente hasta 40%.</li>`+
      `</ul>`+(r.capped?`<p class="mnote-src">Su ahorro modelado supera el 32%; mostramos el tope conservador del 32% y repartimos demanda/energía proporcionalmente a ese tope.</p>`:'')+spark+
      `<p class="mnote-src">Fuentes: tarifas CFE del almacén Newman (CFE · CENACE · DOF, jun 2026); PPA solar ${PPA} $/kWh = rango de mercado para contratos C&I sin inversión inicial en México.</p>`+
      `<p><strong>Total: ${fmt(mTot)}/mes (${pctShown}%)</strong>. Sin pisos inflados; se valida con estudio de carga.</p>`;
    const sr=$('r-sr'); if(sr) sr.textContent=`Ahorro estimado ${fmt(mTot)} al mes, ${pctShown} por ciento de su recibo.`;
    const wa=$('wa-result'); if(wa) wa.href=`https://wa.me/525500000000?text=`+encodeURIComponent(`Hola, gasto CFE ${fmt(spend)}/mes, CP ${cp||'(s/n)'}, tarifa ${o.t}, división ${o.div}. Ahorro estimado: ${fmt(mTot)}/mes (${pctShown}%). Quiero mi desglose a 10 años.`);
    if(r.demHigh) $('r-math-detail').innerHTML+='<p class="mwarn">Su demanda contratada implica un costo inusual por kWh — vale la pena revisarla; lo confirmamos en el estudio de carga.</p>';
    $('calc-result').hidden=false;
    $('calc-result').scrollIntoView({behavior:RM?'auto':'smooth',block:'center'});
    if(window.gtag) gtag('event','result_shown',{spend,tariff:o.t,division:o.div,pct:Math.round(r.pct)});
    }catch(err){ const e=document.getElementById('calc-err'); if(e){e.textContent='Ocurrió un error al calcular. Escríbanos por WhatsApp y lo hacemos por usted.';e.hidden=false;} }
  }

  /* ---- base UI ---- */
  function initNav(){const nav=document.querySelector('.nav');if(!nav)return;let last=0;addEventListener('scroll',()=>{const y=scrollY;nav.classList.toggle('hidden',y>last&&y>140);last=y;},{passive:true});nav.querySelector('.burger')?.addEventListener('click',e=>{const o=nav.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(o));});document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(id.length<2)return;const el=document.querySelector(id);if(el){e.preventDefault();el.scrollIntoView({behavior:RM?'auto':'smooth'});nav.classList.remove('open');}}));}
  function initReveal(){const els=document.querySelectorAll('[data-reveal]');if(RM||!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add('in'));return;}const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.15});els.forEach(e=>io.observe(e));}
  function initAccordion(){document.querySelectorAll('.acc-head').forEach(h=>h.addEventListener('click',()=>{const o=h.getAttribute('aria-expanded')==='true';h.setAttribute('aria-expanded',String(!o));const b=h.nextElementSibling;b.style.maxHeight=o?'0px':b.scrollHeight+'px';}));}
  function fillSelect(id,entries,sel){const el=document.getElementById(id);if(!el)return;entries.forEach(([v,l])=>{const o=document.createElement('option');o.value=v;o.textContent=l;if(v===sel)o.selected=true;el.append(o);});}
  const isEmailOrPhone=v=>/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)||/^[\d+()\-\s]{8,}$/.test(v.replace(/\s/g,''));

  addEventListener('DOMContentLoaded',()=>{
    initNav(); initReveal(); initAccordion();
    fillSelect('tariff', Object.keys(TARIFFS).map(k=>[k,TARIFF_LABEL[k]]), 'GDMTH');
    fillSelect('giro', Object.keys(GIRO).map(k=>[k,GIRO[k].l]), 'manufactura');
    fillSelect('turno', Object.keys(TURNOS).map(k=>[k,TURNO_LABEL[k]]), '');
    const cpEl=document.getElementById('cp'); cpEl?.addEventListener('input',()=>{
      cpEl.value=cpEl.value.replace(/\D/g,'').slice(0,5);
      const echo=document.getElementById('cp-echo'); if(!echo)return;
      const d=CP2DIV[cpEl.value.slice(0,2)];
      if(cpEl.value.length>=2 && d){ echo.innerHTML=`→ División CFE: <strong>${d}</strong>`; echo.className='cp-echo ok'; }
      else { echo.textContent='Lo usamos para las tarifas CFE reales de su división — sin pedir nada más.'; echo.className='cp-echo'; }
    });
    const spendEl=document.getElementById('spend');
    spendEl?.addEventListener('input',()=>{const d=spendEl.value.replace(/[^\d]/g,'');spendEl.value=d?Number(d).toLocaleString('es-MX'):'';});
    document.getElementById('calc-run')?.addEventListener('click', runCalc);
    spendEl?.addEventListener('keydown', e=>{ if(e.key==='Enter') runCalc(); });
    const af=document.getElementById('afinar-toggle');
    af?.addEventListener('click',()=>{const p=document.getElementById('afinar');const open=p.hidden;p.hidden=!open;refined=open;af.setAttribute('aria-expanded',String(open));af.textContent=open?'− Menos detalle':'+ Afinar mi estimado (tarifa, giro, turnos, demanda)';});
    // collapse-math toggle
    document.getElementById('math-toggle')?.addEventListener('click',e=>{e.preventDefault();const m=document.getElementById('r-math');const open=m.hidden;m.hidden=!open;e.target.textContent=open?'Ocultar el cálculo':'Ver el cálculo y la proyección a 10 años →';});
    // email capture toggle
    document.getElementById('email-toggle')?.addEventListener('click',e=>{e.preventDefault();const c=document.getElementById('capture');c.hidden=false;e.target.style.display='none';c.querySelector('input')?.focus();});
    // form submit -> honest mailto (no false success)
    document.getElementById('capture')?.addEventListener('submit',e=>{
      e.preventDefault();
      const $=id=>document.getElementById(id);
      const name=($('c-name').value||'').trim(), emp=($('c-emp').value||'').trim(), con=($('c-contact').value||'').trim();
      let bad=false;
      [['c-name',!!name],['c-emp',!!emp],['c-contact',con&&isEmailOrPhone(con)]].forEach(([id,ok])=>{document.getElementById(id).closest('.field').classList.toggle('error',!ok);if(!ok)bad=true;});
      const ok=$('capture-ok'); const say=(t,err)=>{ok.textContent=t;ok.className='cap-msg'+(err?' err':'');};
      if(bad){ say('Revise los campos: nombre, empresa y un WhatsApp o correo válido.',true); return; }
      try{
        const cp=($('cp').value||'').replace(/\D/g,''), div=resolveDiv(cp).div;
        const body=encodeURIComponent(`Nombre: ${name}\nEmpresa: ${emp}\nContacto: ${con}\nGasto CFE: ${$('spend').value}\nCP: ${cp||'(s/n)'}\nTarifa/División: ${$('tariff').value} / ${div}`);
        window.location.href=`mailto:hola@newman.re?subject=${encodeURIComponent('Solicitud de desglose de ahorro')}&body=${body}`;
        if(window.gtag) gtag('event','lead_submit');
        say('Se abrió su correo — presione Enviar para mandárnoslo. Si no se abrió, escríbanos por WhatsApp.',false);
      }catch(err){ say('No pudimos abrir su correo automáticamente — escríbanos por WhatsApp y lo hacemos por usted.',true); }
    });
  });
  window.NewmanCalc = { compute, rates, TARIFFS, GIRO };
})();
