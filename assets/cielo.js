/* Cielo Krimelh: estrellas que titilan suave y estrellas fugaces púrpura neón con cola de fuego.
   Sin dependencias. Se inserta solo; respeta "reducir movimiento". */
(function(){
  if(window.__cielo) return; window.__cielo=true;
  var tema=(document.currentScript&&document.currentScript.dataset.tema)||'purpura';
  var css=
  '.cielo{position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:-1}'+
  '.cielo .st{position:absolute;border-radius:50%;opacity:.12;animation:cieloTit var(--d,8s) ease-in-out var(--l,0s) infinite alternate}'+
  '.cielo .cr{position:absolute;opacity:.1;animation:cieloTit var(--d,12s) ease-in-out var(--l,0s) infinite alternate}'+
  '.cielo .cr:before,.cielo .cr:after{content:"";position:absolute;left:50%;top:50%;background:var(--c,#d9a8ff);border-radius:2px;box-shadow:0 0 6px var(--c,#d9a8ff)}'+
  '.cielo .cr:before{width:1.5px;height:100%;transform:translate(-50%,-50%)}'+
  '.cielo .cr:after{width:100%;height:1.5px;transform:translate(-50%,-50%)}'+
  '@keyframes cieloTit{0%{opacity:.08;transform:scale(.8)}100%{opacity:.85;transform:scale(1.15)}}'+
  '.cielo .fz{position:absolute;left:0;top:0;width:0;height:0;will-change:transform,opacity}'+
  '.cielo .fz .cola{position:absolute;right:0;top:-2px;height:4px;transform-origin:100% 50%;border-radius:3px;'+
    'background:linear-gradient(90deg,rgba(198,28,242,0),rgba(198,28,242,.35) 45%,rgba(255,107,255,.9) 88%,#fff 100%)}'+
  '.cielo .fz .llama{position:absolute;right:0;top:-8px;height:16px;transform-origin:100% 50%;border-radius:16px;opacity:.8;'+
    'background:linear-gradient(90deg,rgba(255,60,200,0),rgba(214,60,255,.35) 60%,rgba(255,140,255,.6));animation:cieloLlama .14s ease-in-out infinite alternate}'+
  '@keyframes cieloLlama{0%{transform:scaleY(.55) scaleX(.94)}100%{transform:scaleY(1.15) scaleX(1.04)}}'+
  '.cielo .fz .cab{position:absolute;right:-3px;top:-3px;width:7px;height:7px;border-radius:50%;background:#fff;'+
    'box-shadow:0 0 8px 3px #ff6bff,0 0 22px 9px rgba(198,28,242,.8)}'+
  '.cielo .fz .asc{position:absolute;width:2px;height:2px;border-radius:50%;background:#ff9bff;box-shadow:0 0 4px #ff6bff}'+
  '.cielo.gris .fz .cola{background:linear-gradient(90deg,rgba(190,190,205,0),rgba(190,190,205,.28) 45%,rgba(225,225,235,.8) 88%,#fff 100%)}'+
  '.cielo.gris .fz .llama{background:linear-gradient(90deg,rgba(200,200,215,0),rgba(190,190,205,.25) 60%,rgba(225,225,235,.45));opacity:.6}'+
  '.cielo.gris .fz .cab{box-shadow:0 0 8px 3px rgba(235,235,245,.85),0 0 20px 8px rgba(160,160,180,.45)}'+
  '.cielo.gris .fz .asc{background:#dcdce6;box-shadow:0 0 4px #c8c8d4}'+
  '.cielo .gal{position:absolute;inset:-6%;opacity:1;animation:cieloGal 110s ease-in-out infinite alternate;'+
    'background:radial-gradient(ellipse 62% 16% at 28% 38%,rgba(200,200,218,.07),transparent 72%),radial-gradient(ellipse 48% 13% at 72% 66%,rgba(170,170,192,.06),transparent 72%),'+
    'linear-gradient(118deg,transparent 36%,rgba(190,190,210,.03) 45%,rgba(220,220,235,.07) 50%,rgba(190,190,210,.03) 55%,transparent 64%)}'+
  '@keyframes cieloGal{0%{transform:translate(-3%,2%) rotate(-1.2deg) scale(1.02)}100%{transform:translate(3%,-2%) rotate(1.2deg) scale(1.08)}}'+
  '.cielo .polvo{position:absolute;left:0;top:0;width:1px;height:1px;border-radius:50%;animation:cieloPolvo 11s ease-in-out infinite alternate}'+
  '@keyframes cieloPolvo{0%{opacity:.3}100%{opacity:.75}}'+
  '@media (prefers-reduced-motion:reduce){.cielo .st,.cielo .cr{animation:none;opacity:.35}}';
  var s=document.createElement('style'); s.textContent=css; document.head.appendChild(s);

  var box=document.createElement('div'); box.className='cielo'+(tema==='gris'?' gris':''); box.setAttribute('aria-hidden','true');
  document.body.insertBefore(box,document.body.firstChild);
  var rnd=function(a,b){return a+Math.random()*(b-a)};
  var cols=tema==='gris'?['#d8d8e0','#bcbcc8','#a4a4b2','#eeeef4','#8f8f9c']:['#f3e6ff','#d9a8ff','#c61cf2','#ff6bff','#ffffff'];
  var small=Math.min(innerWidth,innerHeight)<600;
  var n=tema==='gris'?(small?40:84):(small?26:46), i, el;
  if(tema==='gris'){
    var g=document.createElement('div'); g.className='gal'; box.appendChild(g);
    var sh=[],pc=['rgba(220,220,232,.9)','rgba(180,180,196,.8)','rgba(150,150,165,.7)'],m=small?70:150;
    for(var q0=0;q0<m;q0++) sh.push((Math.random()*innerWidth|0)+'px '+(Math.random()*innerHeight|0)+'px 0 0 '+pc[q0%3]);
    var pv=document.createElement('i'); pv.className='polvo'; pv.style.boxShadow=sh.join(','); box.appendChild(pv);
  }
  for(i=0;i<n;i++){
    el=document.createElement('i'); el.className='st';
    var z=rnd(1,2.6), c=cols[(Math.random()*cols.length)|0];
    el.style.cssText='left:'+rnd(0,100)+'%;top:'+rnd(0,100)+'%;width:'+z+'px;height:'+z+'px;background:'+c+';box-shadow:0 0 '+(z*3)+'px '+c+';--d:'+rnd(5,12)+'s;--l:-'+rnd(0,12)+'s';
    box.appendChild(el);
  }
  for(i=0;i<(small?4:7);i++){
    el=document.createElement('i'); el.className='cr';
    var q=rnd(9,15), c2=cols[(tema==='gris'?0:1)+((Math.random()*3)|0)];
    el.style.cssText='left:'+rnd(3,97)+'%;top:'+rnd(3,97)+'%;width:'+q+'px;height:'+q+'px;--c:'+c2+';--d:'+rnd(9,17)+'s;--l:-'+rnd(0,15)+'s';
    box.appendChild(el);
  }
  if(matchMedia('(prefers-reduced-motion:reduce)').matches||!Element.prototype.animate) return;

  var vivas=0;
  function fugaz(){
    if(document.hidden||vivas>=2) return;
    vivas++;
    var W=innerWidth,H=innerHeight;
    var len=small?rnd(70,120):rnd(120,220);
    var ang=rnd(18,38)*(Math.random()<.5?1:-1)*Math.PI/180;      // inclinación de la caída
    var dir=Math.random()<.5?1:-1;                                // izquierda→derecha o al revés
    var x0=dir>0?rnd(-.05,.55)*W:rnd(.45,1.05)*W, y0=rnd(.02,.5)*H;
    var dist=rnd(.45,.8)*Math.max(W,H)*.9;
    var dx=dir*Math.cos(Math.abs(ang))*dist, dy=Math.sin(Math.abs(ang))*dist;
    var rot=Math.atan2(dy,dx)*180/Math.PI;
    var f=document.createElement('div'); f.className='fz';
    f.innerHTML='<div class="llama" style="width:'+len*.8+'px;left:-'+len*.8+'px"></div><div class="cola" style="width:'+len+'px;left:-'+len+'px"></div><div class="cab"></div>';
    for(var k=0;k<4;k++){var a=document.createElement('i');a.className='asc';a.style.cssText='left:-'+rnd(len*.25,len*.95)+'px;top:'+rnd(-7,7)+'px;opacity:'+rnd(.4,.9);f.appendChild(a);}
    f.style.transform='translate('+x0+'px,'+y0+'px) rotate('+rot+'deg)';
    box.appendChild(f);
    var dur=rnd(1100,1900);
    var an=f.animate([
      {transform:'translate('+x0+'px,'+y0+'px) rotate('+rot+'deg)',opacity:0},
      {opacity:1,offset:.12},
      {opacity:1,offset:.7},
      {transform:'translate('+(x0+dx)+'px,'+(y0+dy)+'px) rotate('+rot+'deg)',opacity:0}
    ],{duration:dur,easing:'cubic-bezier(.35,.1,.6,1)',fill:'forwards'});
    an.onfinish=function(){f.remove();vivas--;};
  }
  (function ciclo(){ setTimeout(function(){fugaz(); if(Math.random()<.25) setTimeout(fugaz,rnd(250,700)); ciclo();},rnd(3200,8500)); })();
  setTimeout(fugaz,900);
})();
