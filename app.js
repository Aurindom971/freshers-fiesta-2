const app = document.querySelector('#app');
const whatsapp = 'https://wa.me/00000000000';
const instagram = 'https://www.instagram.com/microsoftlearnstudentcommunity/';
let registration = null;

const landing = () => `<div class="page"><header class="topbar"><div class="brand">FF<span>2.0</span> / 2026</div><div class="status"><i class="dot"></i> REGISTRATION OPEN</div></header><section class="hero"><div><div class="eyebrow">[ A NEW CHAPTER BEGINS ]</div><h1>FRESHER'S<br><span>FIESTA</span> <em>2.0</em></h1><p class="intro">Your first campus memory starts here. Step into college life with music, fun, games, new friendships and unforgettable memories.</p></div><div class="hero-side"><p class="side-note">WELCOME TO THE<br>MAIN CHARACTER ERA.<br><br>// ALL FIRST YEARS INVITED</p><button class="button" data-action="register">Register now <span>→</span></button></div></section><section class="event-grid" aria-label="Event details"><div class="event-cell"><span class="label"> Date</span><span class="value">13.08.26</span></div><div class="event-cell"><span class="label">Time</span><span class="value">04:00 PM</span></div><div class="event-cell"><span class="label">Venue</span><span class="value">The Main Quad</span></div></section><section><div class="section-title">// What to expect</div><div class="expect-grid"><article class="expect"><span class="emoji">♫</span><p>Music &amp; Entertainment</p></article><article class="expect"><span class="emoji">✣</span><p>Games &amp; Activities</p></article><article class="expect"><span class="emoji">◉</span><p>Meet Your Batchmates</p></article><article class="expect"><span class="emoji">✦</span><p>Unforgettable Memories</p></article></div></section></div>`;

const form = () => `<div class="page"><header class="topbar"><div class="brand">FF<span>2.0</span> / REGISTER</div><div class="status">STEP 01 <span style="color:var(--pink)">/</span> 01</div></header><button class="back" data-action="home">← BACK TO EVENT</button><section class="form-shell"><div class="eyebrow">[ SECURE YOUR SPOT ]</div><h1 class="form-heading">JOIN THE FIESTA</h1><p class="subheading">Enter your details to reserve your spot at Fresher's Fiesta 2.0.</p><form class="form-card" id="registration-form" novalidate><div class="form-grid">${field('name','Full name','Enter your full name','text')} ${field('email','Email address','Enter your email address','email')} ${field('phone','Contact number (WhatsApp)','Enter your WhatsApp number','tel')} ${field('course','Course','Enter your course','text')} ${field('enrollment','Enrollment number','Enter your enrollment number','text')} ${selectField('year','Year of study',['Select your year','1st Year','2nd Year','3rd Year','4th Year'])} ${field('specialization','Specialization','Enter your specialization','text')}</div><label class="check-row"><input type="checkbox" id="confirm" /> <span>I confirm that the information provided is correct.</span></label><div class="form-foot"><button class="button pink" type="submit">Register for fiesta <span>→</span></button><div class="fineprint">Your information will only be used for event registration and communication.</div></div></form></section></div>`;
const field=(id,label,placeholder,type)=>`<div class="field"><label for="${id}">${label} <span class="required">*</span></label><input id="${id}" name="${id}" type="${type}" placeholder="${placeholder}" /><div class="error" data-error="${id}"></div></div>`;
const selectField=(id,label,options)=>`<div class="field"><label for="${id}">${label} <span class="required">*</span></label><select id="${id}" name="${id}">${options.map((x,i)=>`<option value="${i?x:''}">${x}</option>`).join('')}</select><div class="error" data-error="${id}"></div></div>`;

const success = data => `<div class="page"><header class="topbar"><div class="brand">FF<span>2.0</span> / CONFIRMED</div><div class="status"><i class="dot"></i> YOU'RE ON THE LIST</div></header><section class="success"><div class="eyebrow">[ REGISTRATION COMPLETE ]</div><div class="check">✓</div><h1>YOU'RE <span>IN!</span> ✦</h1><p class="success-sub">Your registration for Fresher's Fiesta 2.0 is confirmed.</p><div class="confirm">${[['Name',data.name],['Email address',data.email],['Contact number',data.phone],['Course name',data.course],['Enrollment number',data.enrollment],['Year of study',data.year],['Specialization',data.specialization],['Registration ID',data.id]].map(([k,v])=>`<div class="confirm-row"><span class="key">${k}</span><span class="${k==='Registration ID'?'regid':''}">${v}</span></div>`).join('')}</div><button class="button" data-action="community">Join the community <span>→</span></button><div class="community-title">THE FIESTA DOESN'T END HERE.</div><h2>Stay in the loop.</h2><div class="socials"><article class="social"><h3>◈ Join our WhatsApp group</h3><p>Get event announcements, reminders and important updates.</p><a class="button outline" href="${whatsapp}" target="_blank" rel="noreferrer">Join WhatsApp →</a></article><article class="social instagram"><h3>◎ Follow us on Instagram</h3><p>Get sneak peeks, announcements, reels and event updates.</p><a class="button outline" href="${instagram}" target="_blank" rel="noreferrer">Follow Instagram →</a></article></div><p class="footer-note">SEE YOU AT FRESHER'S FIESTA 2.0! <b>↗</b></p></section></div>`;

function render(view='home'){app.innerHTML=view==='home'?landing():view==='form'?form():success(registration); window.scrollTo({top:0,behavior:'smooth'}); setTimeout(()=>enhanceView(),0);}
function showError(id,msg){document.querySelector(`[data-error="${id}"]`).textContent=msg;}
document.addEventListener('click',e=>{const action=e.target.closest('[data-action]')?.dataset.action;if(action==='register')render('form');if(action==='home')render('home');if(action==='community')document.querySelector('.socials')?.scrollIntoView({behavior:'smooth'});});
document.addEventListener('submit',e=>{if(!e.target.matches('#registration-form'))return;e.preventDefault();const f=new FormData(e.target);const data=Object.fromEntries(f);let valid=true;['name','email','phone','course','enrollment','year','specialization'].forEach(id=>{if(!data[id]){showError(id,'This field is required');valid=false}else showError(id,'')});if(!/^\+?[\d\s()-]{10,}$/.test(data.phone||'')){showError('phone','Enter a valid contact number');valid=false}else showError('phone','');if(!/^\S+@\S+\.\S+$/.test(data.email||'')){showError('email','Enter a valid email address');valid=false}else showError('email','');if(!document.querySelector('#confirm').checked){document.querySelector('#confirm').parentElement.style.color='var(--pink)';valid=false}if(!valid)return;registration={...data,id:'FF2.0-'+Math.random().toString(36).slice(2,8).toUpperCase()};render('success');});
render();

// Keep the existing form markup lightweight while making the editable options easy to maintain.
function enhanceRegistrationForm(){
  const form=document.querySelector('#registration-form');
  if(!form)return;
  const year=form.querySelector('#year');
  year.innerHTML=['Select your batch','2027','2028','2029','2030'].map((x,i)=>`<option value="${i?x:''}">${x}</option>`).join('');
  year.closest('.field').querySelector('label').innerHTML='Batch / Year of study <span class="required">*</span>';
  const course=form.querySelector('#course');
  course.closest('.field').querySelector('label').innerHTML='Course <span class="required">*</span>';
  const old=form.querySelector('#specialization');
  if(old.tagName==='SELECT'){
    const input=document.createElement('input');
    input.id='specialization'; input.name='specialization'; input.type='text'; input.placeholder='Enter your specialization';
    old.replaceWith(input);
  }
}

document.addEventListener('click',e=>{if(e.target.closest('[data-action="register"]'))setTimeout(enhanceRegistrationForm,0)});
document.addEventListener('submit',async e=>{
  if(!e.target.matches('#registration-form'))return;
  e.stopImmediatePropagation(); e.preventDefault();
  const form=e.target, data=Object.fromEntries(new FormData(form)); let valid=true;
  const required=['name','email','phone','enrollment','year','course','specialization'];
  required.forEach(id=>{if(!data[id]){showError(id,'This field is required');valid=false}else showError(id,'')});
  if(data.name && data.name.trim().length<2){showError('name','Please enter at least 2 characters');valid=false}
  if(data.email && !/^\S+@\S+\.\S+$/.test(data.email)){showError('email','Please enter a valid email address');valid=false}
  const digits=(data.phone||'').replace(/\D/g,'');
  if(digits && !/^(?:91)?[6-9]\d{9}$/.test(digits)){showError('phone','Enter a valid Indian WhatsApp number');valid=false}
  if(digits)data.phone=`+91 ${digits.slice(-10)}`;
  if(!document.querySelector('#confirm').checked){document.querySelector('.check-row').style.color='var(--pink)';valid=false}else document.querySelector('.check-row').style.color='';
  if(!valid)return;
  const button=form.querySelector('button[type="submit"]');button.disabled=true;button.classList.add('is-loading');button.innerHTML='Registering <span class="spinner"></span>';
  try{
    const response=await fetch('/api/registrations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,confirmed:true})});
    const result=await response.json();
    if(!response.ok){showError('enrollment',result.error||'Unable to save registration');button.disabled=false;button.classList.remove('is-loading');button.innerHTML='Register for fiesta <span>→</span>';return}
    registration={...result.registration,id:result.registration.registrationId};
    render('success');
  }catch(error){showError('enrollment','Server unavailable. Please try again.');button.disabled=false;button.classList.remove('is-loading');button.innerHTML='Register for fiesta <span>→</span>'}
},true);

function enhanceView(){
  document.querySelectorAll('.topbar').forEach(bar=>{
    if(bar.querySelector('.site-logo'))return;
    const logo=document.createElement('img');
    logo.className='site-logo'; logo.src='assets/image%20(1).png'; logo.alt="Fresher's Fiesta logo";
    logo.onerror=()=>{const fallback=document.createElement('span');fallback.className='logo-fallback';fallback.textContent='FF';logo.replaceWith(fallback)};
    bar.prepend(logo);
  });
  const hero=document.querySelector('.hero');
  if(hero && !document.querySelector('.chapter-section')){
    const section=document.createElement('section');
    section.className='chapter-section reveal';
    section.innerHTML='<div class="chapter-ghost">02</div><div class="chapter-copy"><div class="eyebrow">[ YOUR FIRST CHAPTER ]</div><h2>NEW FACES.<br><span>NEW FRIENDS.</span><br><em>NEW STORIES.</em></h2><p>Your first college celebration isn\'t just an event.<br>It\'s where the stories begin.</p></div><div class="fiesta-stage"><div class="sticker s1">🔥 MAIN CHARACTER ENERGY</div><div class="sticker s2">🎧 MUSIC ON</div><div class="sticker s3">✨ NEW BEGINNINGS</div><div class="sticker s4">🪩 FIESTA MODE</div><div class="sticker s5">🚀 LET\'S GOOO</div><div class="sticker s6">🤝 NEW FRIENDS</div><div class="core"><div class="core-orbit orbit-a"><span data-tip="01 / MUSIC — Turn the volume up.">01</span><span data-tip="02 / GAMES — Let\'s play.">02</span><span data-tip="03 / FRIENDS — Find your people.">03</span><span data-tip="04 / MEMORIES — Make it count.">04</span></div><div class="core-rings"><div class="core-inner">🎉<strong>FIESTA<br>MODE</strong><b>ON</b></div></div></div><div class="hud"><b>FIESTA SYSTEM</b><span>● ONLINE</span><label>MUSIC <i><u></u></i>100%</label><label>ENERGY <i><u></u></i>98%</label><label>VIBES <i><u></u></i>99%</label><small>STATUS: READY</small></div></div>';
    document.querySelector('.event-grid').after(section);
  }
  if(hero){
    const details=document.querySelector('.event-grid');
    details?.querySelectorAll('.event-cell').forEach(cell=>{const label=cell.querySelector('.label')?.textContent.trim().toLowerCase();if(label==='time')cell.querySelector('.value').textContent='2:30 PM';if(label==='venue')cell.querySelector('.value').textContent='To Be Announced Soon'});
    const chapter=document.querySelector('.chapter-section');
    if(chapter && details && chapter.previousElementSibling!==details)details.after(chapter);
    const expectHeading=[...document.querySelectorAll('.section-title')].find(el=>el.textContent.includes('What to expect'));
    expectHeading?.closest('section')?.remove();
  }
  if(!hero && chapterTemplate && !document.querySelector('.chapter-section')){
    const copy=chapterTemplate.cloneNode(true);
    copy.classList.remove('is-visible');
    copy.querySelector('.fiesta-stage')?.removeAttribute('data-interactive');
    const host=document.querySelector('.form-shell')||document.querySelector('.success');
    host?.before(copy);
  }
  document.querySelectorAll('.expect').forEach((card,index)=>{
    if(card.dataset.enhanced)return;
    card.dataset.enhanced='true';
    card.insertAdjacentHTML('afterbegin',`<span class="expect-number">0${index+1}</span>`);
    card.classList.add('reveal');
  });
  const form=document.querySelector('#registration-form');
  if(form && !document.querySelector('.form-progress')){
    form.insertAdjacentHTML('beforebegin','<div class="form-progress"><span class="active">01 <b>DETAILS</b></span><i></i><span>02 <b>CONFIRM</b></span><i></i><span>03 <b>YOU\'RE IN</b></span></div>');
    document.querySelector('.form-card')?.classList.add('reveal');
  }
  const successPage=document.querySelector('.success');
  if(successPage){
    successPage.querySelectorAll('.confirm-row').forEach(row=>{if(/Email address|Contact number|Year of study/i.test(row.textContent))row.remove()});
  }
  if(successPage && !document.querySelector('.final-statement')){
    const footer=successPage.querySelector('.footer-note');
    const closing=document.createElement('div');
    closing.className='final-statement reveal';
    closing.innerHTML='<div>SEE YOU AT</div><div><span>FRESHER\'S</span> <em>FIESTA</em> <b>2.0.</b></div><small>FF2.0 / 2026 &nbsp; REGISTRATION COMPLETE</small>';
    footer.before(closing);
  }
  document.querySelectorAll('.hero,.event-grid,.chapter-section,.expect-grid,.form-heading,.subheading,.success h1,.socials').forEach(el=>el.classList.add('reveal'));
  document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
  const stage=document.querySelector('.fiesta-stage');
  if(stage && !stage.dataset.interactive){
    stage.dataset.interactive='true';
    stage.addEventListener('mousemove',event=>{if(innerWidth<761)return;const box=stage.getBoundingClientRect();const x=(event.clientX-box.left)/box.width-.5,y=(event.clientY-box.top)/box.height-.5;stage.style.setProperty('--mx',`${x*8}px`);stage.style.setProperty('--my',`${y*8}px`)});
    stage.addEventListener('mouseleave',()=>{stage.style.setProperty('--mx','0px');stage.style.setProperty('--my','0px')});
    stage.querySelectorAll('[data-tip]').forEach(item=>item.addEventListener('mouseenter',()=>{item.setAttribute('title',item.dataset.tip)}));
  }
}

const revealObserver='IntersectionObserver' in window?new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}}),{threshold:.12}):{observe:el=>el.classList.add('is-visible'),unobserve:()=>{}};
let chapterTemplate=null;
enhanceView();
chapterTemplate=document.querySelector('.chapter-section')?.cloneNode(true)||null;
