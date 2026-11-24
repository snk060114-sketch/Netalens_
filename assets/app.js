(() => {
const pages=[
 ["index.html","Overview"],["leaders.html","People"],["performance.html","Performance"],
 ["statements.html","Statements"],["transparency.html","Transparency"],["constituency.html","Constituency"],
 ["parties.html","Parties"],["sources.html","Sources"]
];
const current=location.pathname.split("/").pop()||"index.html";
const nav=pages.map(([href,label])=>`<a href="${href}" ${current===href?'aria-current="page"':""}>${label}</a>`).join("");
const header=`<header class="site-header"><a class="brand" href="index.html"><span class="brand-mark">N</span><span>NetaLens</span></a><nav class="nav" aria-label="Main navigation">${nav}</nav><div class="header-actions"><a class="button small" href="sources.html">Methodology ↗</a></div></header>`;
const mobile=`<nav class="mobile-nav" aria-label="Quick navigation"><a href="index.html">Home</a><a href="leaders.html">People</a><a href="performance.html">Data</a><a href="sources.html">Sources</a></nav>`;
const footer=`<footer class="footer"><div class="container footer-inner"><span>© 2026 NetaLens · Public information, carefully examined.</span><span><a href="sources.html">Sources & methodology</a> · <a href="transparency.html">Transparency</a></span></div></footer>`;
document.body.insertAdjacentHTML("afterbegin",header);
document.body.insertAdjacentHTML("beforeend",mobile+footer+'<div class="toast" id="toast" role="status" aria-live="polite"></div>');
window.NL={
 toast(message){const el=document.getElementById("toast");if(!el)return;el.textContent=message;el.classList.add("show");clearTimeout(this.toastTimer);this.toastTimer=setTimeout(()=>el.classList.remove("show"),2300)},
 get(key,fallback=[]){try{return JSON.parse(localStorage.getItem("nl:"+key))??fallback}catch{return fallback}},
 set(key,value){localStorage.setItem("nl:"+key,JSON.stringify(value))},
 esc(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))},
 saveLeader(id){let saved=this.get("saved",[]);saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];this.set("saved",saved);this.toast(saved.includes(id)?"Profile saved":"Removed from saved");return saved},
 isSaved(id){return this.get("saved",[]).includes(id)}
};
})();
