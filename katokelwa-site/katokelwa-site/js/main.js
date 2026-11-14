const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const PAL=[["#E6F2FA","#0B6FB5","#FF7A1A","#07456F"],["#FFF1E5","#FF7A1A","#0B6FB5","#22282E"],["#0B6FB5","#FFFFFF","#FF7A1A","#E6F2FA"]];
/* Placeholder visuals, drawn in SVG so they stay sharp and tiny. */
function art(cat,i=0){const p=PAL[i%3],o=`<svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Sample ${CATS[cat]} concept illustration"><rect width="200" height="150" fill="${p[0]}"/>`;
 if(cat==="graphic")return o+`<circle cx="85" cy="72" r="38" fill="${p[1]}"/><rect x="100" y="42" width="58" height="58" fill="${p[2]}" opacity=".92"/><path d="M30 120q18-14 35 0t35 0 35 0 35 0" fill="none" stroke="${p[3]}" stroke-width="5"/></svg>`;
 if(cat==="photo")return o+`<ellipse cx="100" cy="122" rx="54" ry="9" fill="#000" opacity=".16"/><rect x="72" y="40" width="56" height="82" rx="10" fill="${p[1]}"/><rect x="86" y="26" width="28" height="18" rx="4" fill="${p[2]}"/><rect x="80" y="64" width="40" height="30" fill="#fff" opacity=".88"/></svg>`;
 return o+`<rect x="22" y="20" width="156" height="110" rx="6" fill="#fff"/><rect x="22" y="20" width="156" height="14" rx="6" fill="${p[3]}"/><rect x="36" y="48" width="72" height="13" fill="${p[1]}"/><rect x="36" y="68" width="52" height="6" fill="#C9D4DB"/><rect x="36" y="80" width="62" height="6" fill="#C9D4DB"/><rect x="36" y="98" width="30" height="12" rx="6" fill="${p[2]}"/><rect x="120" y="48" width="44" height="64" fill="${p[2]}"/></svg>`}
const NAV=[["index.html","Home","home"],["about.html","About Us","about"],["services.html","Services","services"],["work.html","Our Work","work"],["contact.html","Contact","contact"]];
const page=document.body.dataset.page,wa=`https://wa.me/${SITE.whatsapp}`;
const mark=`<svg width="34" height="34" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="7" fill="#0B6FB5"/><path d="M4 21q6-7 12 0t12 0" fill="none" stroke="#fff" stroke-width="3"/><circle cx="22" cy="10" r="4" fill="#FF7A1A"/></svg>`;
$("#site-header").outerHTML=`<header class="hd"><div class="wrap"><a class="logo" href="index.html" aria-label="Katokelwa Holdings home"><img src="img/wordmark.png" alt="Katokelwa Holdings" width="720" height="80"></a>
<button class="tg" aria-expanded="false" aria-controls="nav">Menu</button>
<nav class="nav" id="nav" aria-label="Main">${NAV.map(n=>`<a href="${n[0]}"${n[2]===page?' aria-current="page"':""}>${n[1]}</a>`).join("")}<a class="btn btn-o" href="contact.html#enquiry">Start a Project</a></nav></div></header>`;
$("#site-footer").outerHTML=`<footer class="ft"><div class="wrap"><div><a class="flogo" href="index.html"><img src="img/logo-light.png" alt="Katokelwa Holdings. All in one. Done once. Done right." width="900" height="360" loading="lazy"></a><p style="margin-top:1rem">Graphic design, product photography and web design. Based in Namibia.</p></div>
<div><h3>Explore</h3><ul>${NAV.map(n=>`<li><a href="${n[0]}">${n[1]}</a></li>`).join("")}</ul></div>
<div><h3>Contact</h3><ul><li><a href="mailto:${SITE.email}">${SITE.email}</a></li><li><a href="${wa}" rel="noopener">WhatsApp</a></li><li><a href="${SITE.instagram}" rel="noopener">Instagram</a></li><li><a href="${SITE.facebook}" rel="noopener">Facebook</a></li><li><a href="${SITE.linkedin}" rel="noopener">LinkedIn</a></li></ul></div>
<p class="copy">&copy; <span id="yr"></span> Katokelwa Holdings. Namibia.</p></div></footer>`;
$("#yr").textContent=new Date().getFullYear();
const tg=$(".tg"),nav=$("#nav");
tg.onclick=()=>{const o=nav.classList.toggle("open");tg.setAttribute("aria-expanded",o);tg.textContent=o?"Close":"Menu"};
$$("#nav a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");tg.setAttribute("aria-expanded",false);tg.textContent="Menu"}));
$$("[data-art]").forEach(e=>e.innerHTML=art(e.dataset.art,+e.dataset.i||0));
$$("[data-contact]").forEach(a=>{const k=a.dataset.contact;a.href=k==="email"?`mailto:${SITE.email}`:k==="whatsapp"?wa:SITE[k];if(k!=="email")a.rel="noopener";if(!a.textContent.trim())a.textContent=SITE.email});
function card(p,i){const v=p.image?`<img src="${p.image}" alt="${p.title}" loading="lazy">`:art(p.category,i);
 return `<article class="card"><div class="ph">${v}</div><h3>${p.title}</h3><span class="tag">${p.concept?"Sample concept":"Client project"}</span><span class="cat">${CATS[p.category]}</span><p style="margin-top:.5rem">${p.blurb}</p></article>`}
const home=$('[data-work="home"]');
if(home)home.innerHTML=Object.keys(CATS).map(c=>PROJECTS.find(p=>p.category===c)).filter(Boolean).map((p,i)=>card(p,i)).join("");
const all=$('[data-work="all"]');
if(all){const draw=f=>{all.innerHTML=PROJECTS.filter(p=>f==="all"||p.category===f).map((p,i)=>card(p,i)).join("")};
 $$(".filters button").forEach(b=>b.onclick=()=>{$$(".filters button").forEach(x=>x.setAttribute("aria-pressed",x===b));draw(b.dataset.f)});draw("all")}
const f=$("#enquiry");
if(f){const q=new URLSearchParams(location.search).get("service");if(q)f.service.value=q;f.setAttribute("action",SITE.formEndpoint);
 f.addEventListener("submit",async e=>{e.preventDefault();const s=$("#form-status");
  if(SITE.formEndpoint.includes("YOUR_FORM_ID")){s.textContent="This form is not connected yet. Add your form endpoint in js/content.js, or email us directly.";s.className="st err";return}
  try{const r=await fetch(SITE.formEndpoint,{method:"POST",body:new FormData(f),headers:{Accept:"application/json"}});
   if(!r.ok)throw 0;f.reset();s.textContent="Your enquiry was sent. We will reply by email.";s.className="st ok"}
  catch{s.textContent="Your enquiry was not sent. Please try again or email us directly.";s.className="st err"}})}
