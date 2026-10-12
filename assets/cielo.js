/* Cielo Krimelh: estrellas que titilan suave y estrellas fugaces púrpura neón con cola de fuego.
   Sin dependencias. Se inserta solo; respeta "reducir movimiento". */
(function(){
  if(window.__cielo) return; window.__cielo=true;
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
  '@media (prefers-reduced-motion:reduce){.cielo .st,.cielo .cr{animation:none;opacity:.35}}';
  var s=document.createElement('style'); s.textContent=css; document.head.appendChild(s);

  var box=document.createElement('div'); box.className='cielo'; box.setAttribute('aria-hidden','true');
  document.body.insertBefore(box,document.body.firstChild);
  var rnd=function(a,b){return a+Math.random()*(b-a)};
  var cols=['#f3e6ff','#d9a8ff','#c61cf2','#ff6bff','#ffffff'];
  var small=Math.min(innerWidth,innerHeight)<600;
  var n=small?26:46, i, el;
  for(i=0;i<n;i++){
    el=document.createElement('i'); el.className='st';
    var z=rnd(1,2.6), c=cols[(Math.random()*cols.length)|0];
    el.style.cssText='left:'+rnd(0,100)+'%;top:'+rnd(0,100)+'%;width:'+z+'px;height:'+z+'px;background:'+c+';box-shadow:0 0 '+(z*3)+'px '+c+';--d:'+rnd(5,12)+'s;--l:-'+rnd(0,12)+'s';
    box.appendChild(el);
  }
  for(i=0;i<(small?4:7);i++){
    el=document.createElement('i'); el.className='cr';
    var q=rnd(9,15), c2=cols[1+((Math.random()*3)|0)];
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
