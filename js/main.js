  const hero = document.getElementById('hero');
  const creatureBand = document.getElementById('creatureBand');

  // ================= creature reveal: the only pointer-driven effect ========
  function updateCreatureReveal(clientX, clientY){
    const rect = creatureBand.getBoundingClientRect();
    document.documentElement.style.setProperty('--cx', (clientX - rect.left) + 'px');
    document.documentElement.style.setProperty('--cy', (clientY - rect.top) + 'px');
  }

  let ticking = false;
  function onPointerMove(clientX, clientY){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateCreatureReveal(clientX, clientY);
      ticking = false;
    });
  }

  hero.addEventListener('mousemove', e => onPointerMove(e.clientX, e.clientY));
  hero.addEventListener('touchmove', e => {
    if (e.touches[0]) onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
  }, {passive:true});

  // ================= UV / visible toggle =================
  (function initUVToggle(){
    const btn = document.getElementById('uvSwitch');
    const stage = document.getElementById('uvStage');
    const caption = document.getElementById('uvCaption');
    const labelLeft = document.getElementById('uvLabelLeft');
    const labelRight = document.getElementById('uvLabelRight');
    const scan = document.getElementById('uvScan');
    if (!btn) return;

    let isUV = false;
    let settleTimer = null;

    function setUV(next, isFirstPaint){
      isUV = next;
      stage.classList.toggle('is-uv', isUV);
      btn.classList.toggle('is-uv', isUV);
      btn.setAttribute('aria-checked', String(isUV));
      labelLeft.classList.toggle('is-active', !isUV);
      labelRight.classList.toggle('is-active', isUV);
      caption.textContent = isUV
        ? 'Ultraviolet: the band birds actually hunt in. The natural nanostructure scatters it almost completely.'
        : 'Visible light. Clearly visible to predators.';

      if (isFirstPaint) return;

      // brief blur/glow pulse on the crossfading photos
      stage.classList.add('is-transitioning');
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => stage.classList.remove('is-transitioning'), 900);

      // restart the scan-line sweep every time (re-trigger CSS animation)
      scan.classList.remove('is-sweeping');
      void scan.offsetWidth; // force reflow so the animation restarts
      scan.classList.add('is-sweeping');
    }

    btn.addEventListener('click', () => setUV(!isUV));
    setUV(false, true);
  })();

  // ================= procedural background grain (one-time) =================
  (function paintGrain(){
    const el = document.getElementById('grain');
    const c = document.createElement('canvas');
    c.width = 160; c.height = 160;
    const ctx = c.getContext('2d');
    const imgData = ctx.createImageData(160,160);
    for (let i=0; i<imgData.data.length; i+=4){
      const v = Math.random()*255;
      imgData.data[i] = imgData.data[i+1] = imgData.data[i+2] = v;
      imgData.data[i+3] = 255;
    }
    ctx.putImageData(imgData,0,0);
    const dataUrl = `url(${c.toDataURL()})`;
    el.style.backgroundImage = dataUrl;
    el.style.backgroundSize = '160px 160px';
    document.documentElement.style.setProperty('--grain-tex', dataUrl);
  })();

  // ================= realistic static scratch texture (one-time) =============
  (function paintScratchTexture(){
    const size = 320;
    const c = document.createElement('canvas');
    c.width = size; c.height = size;
    const ctx = c.getContext('2d');
    ctx.fillStyle = 'rgb(128,128,128)';
    ctx.fillRect(0,0,size,size);

    function curvedScratch(x, y, len, angleDeg, bow){
      const a = angleDeg * Math.PI/180;
      const x2 = x + Math.cos(a) * len;
      const y2 = y + Math.sin(a) * len;
      const mx = (x + x2)/2 - Math.sin(a) * bow;
      const my = (y + y2)/2 + Math.cos(a) * bow;
      const p = new Path2D();
      p.moveTo(x,y);
      p.quadraticCurveTo(mx,my,x2,y2);
      return p;
    }

    const grainCount = 85;
    for (let i=0; i<grainCount; i++){
      const x = Math.random() * size;
      const y = Math.random() * size;
      const len = 12 + Math.random() * 80;
      const crossGrain = Math.random() < 0.12;
      const angle = crossGrain
        ? (Math.random() * 50 + 25) * (Math.random() < 0.5 ? 1 : -1)
        : (Math.random() * 22 - 11);
      const bow = (Math.random() - 0.5) * 4;
      const width = 0.4 + Math.random() * 1.1;
      const paired = Math.random() < 0.4;

      if (paired){
        const shadowPath = curvedScratch(x, y+0.6, len, angle, bow);
        ctx.strokeStyle = `rgba(60,60,60,${(0.12 + Math.random()*0.13).toFixed(2)})`;
        ctx.lineWidth = width;
        ctx.stroke(shadowPath);
        const litPath = curvedScratch(x, y-0.4, len, angle, bow);
        ctx.strokeStyle = `rgba(225,225,225,${(0.14 + Math.random()*0.16).toFixed(2)})`;
        ctx.lineWidth = Math.max(0.4, width - 0.3);
        ctx.stroke(litPath);
      } else {
        const bright = Math.random() > 0.5;
        const shade = bright ? (175 + Math.random()*65) : (95 - Math.random()*70);
        const alpha = 0.08 + Math.random() * 0.18;
        const path = curvedScratch(x, y, len, angle, bow);
        ctx.strokeStyle = `rgba(${shade|0},${shade|0},${shade|0},${alpha.toFixed(2)})`;
        ctx.lineWidth = width;
        ctx.stroke(path);
      }
    }

    for (let i=0; i<5; i++){
      const y = Math.random() * size;
      const x = Math.random() * size * 0.35;
      const len = 110 + Math.random() * 140;
      const angle = Math.random() * 8 - 4;
      const bow = (Math.random() - 0.5) * 6;
      const path = curvedScratch(x, y, len, angle, bow);
      ctx.strokeStyle = `rgba(215,215,215,${(0.10 + Math.random()*0.08).toFixed(2)})`;
      ctx.lineWidth = 0.6;
      ctx.stroke(path);
    }

    for (let i=0; i<260; i++){
      const x = Math.random() * size;
      const y = Math.random() * size;
      const v = Math.random() > 0.5 ? (150 + Math.random()*80) : (90 - Math.random()*60);
      ctx.fillStyle = `rgba(${v|0},${v|0},${v|0},${(0.04 + Math.random()*0.06).toFixed(2)})`;
      ctx.fillRect(x, y, 1, 1);
    }

    document.documentElement.style.setProperty('--scratch-tex', `url(${c.toDataURL()})`);
  })();
