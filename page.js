(() => {
const $=id=>document.getElementById(id);
const data=window.NL_DATA;
const esc=NL.esc;
function personCard(p){return `<article class="card"><div class="person-card"><div class="avatar">${esc(p.name.split(" ").map(x=>x[0]).slice(0,2).join(""))}</div><div><h3>${esc(p.name)}</h3><p>${esc(p.role)}</p><p>${esc(p.region)} · ${esc(p.party)}</p></div></div><div style="margin-top:15px"><span class="pill gold">Demo profile</span> <span class="pill">${esc(p.disclosure)}</span></div><p class="muted small">${esc(p.focus)}</p><div class="card-actions"><a class="button small primary" href="leader-profile.html?id=${encodeURIComponent(p.id)}">Open profile ↗</a><button class="button small save-btn" data-save="${esc(p.id)}">${NL.isSaved(p.id)?"★ Saved":"☆ Save"}</button></div></article>`}
const leaderList=$("leader-list");
if(leaderList){
 const region=$("leader-region"),search=$("leader-search");[...new Set(data.leaders.map(p=>p.region))].forEach(r=>region.add(new Option(r,r)));
 let savedOnly=false;
 function render(){const q=search.value.toLowerCase().trim(),r=region.value;const rows=data.leaders.filter(p=>(!savedOnly||NL.isSaved(p.id))&&(!r||p.region===r)&&[p.name,p.party,p.region,p.focus].join(" ").toLowerCase().includes(q));leaderList.innerHTML=rows.length?rows.map(personCard).join(""):`<div class="empty">No matching profiles found.</div>`;leaderList.querySelectorAll("[data-save]").forEach(b=>b.addEventListener("click",()=>{NL.saveLeader(b.dataset.save);b.textContent=NL.isSaved(b.dataset.save)?"★ Saved":"☆ Save"}))}
 search.addEventListener("input",render);region.addEventListener("change",render);$("show-saved").addEventListener("click",()=>{savedOnly=true;render()});$("show-all").addEventListener("click",()=>{savedOnly=false;render()});render();
}
const profileSelect=$("profile-select"),profileDetail=$("profile-detail");
if(profileSelect){
 data.leaders.forEach(p=>profileSelect.add(new Option(p.name,p.id)));
 const chosen=new URLSearchParams(location.search).get("id");if(data.leaders.some(p=>p.id===chosen))profileSelect.value=chosen;
 function show(){const p=data.leaders.find(x=>x.id===profileSelect.value);if(!p)return;profileDetail.innerHTML=`<div class="person-card"><div class="avatar">${esc(p.name.split(" ").map(x=>x[0]).slice(0,2).join(""))}</div><div><h3>${esc(p.name)}</h3><p>${esc(p.role)}</p><span class="pill gold">Fictional demo record</span></div></div><p class="muted">${esc(p.bio)}</p><div class="table-wrap"><table><tbody><tr><th>Profile ID</th><td>${esc(p.id)}</td></tr><tr><th>Party / group</th><td>${esc(p.party)}</td></tr><tr><th>Region</th><td>${esc(p.region)}</td></tr><tr><th>Focus areas</th><td>${esc(p.focus)}</td></tr><tr><th>Activity index</th><td>${p.activity} / 100 (demo)</td></tr><tr><th>Attendance</th><td>${p.attendance}% (demo)</td></tr><tr><th>Questions</th><td>${p.questions} (demo)</td></tr><tr><th>Disclosure label</th><td>${esc(p.disclosure)}</td></tr></tbody></table></div><div class="card-actions"><button class="button" id="profile-save">${NL.isSaved(p.id)?"★ Saved":"☆ Save profile"}</button></div>`;$("profile-save").addEventListener("click",()=>{NL.saveLeader(p.id);$("profile-save").textContent=NL.isSaved(p.id)?"★ Saved":"☆ Save profile"});$("profile-notes").value=NL.get("notes-"+p.id,"")}
 profileSelect.addEventListener("change",show);show();
 $("save-profile-notes").addEventListener("click",()=>{NL.set("notes-"+profileSelect.value,$("profile-notes").value);$("notes-status").textContent="Saved in this browser."});
}
const perfRegion=$("performance-region");
if(perfRegion){
 [...new Set(data.leaders.map(p=>p.region))].forEach(r=>perfRegion.add(new Option(r,r)));
 function render(){const rows=data.leaders.filter(p=>!perfRegion.value||p.region===perfRegion.value);const bars=(key)=>rows.map(p=>`<div class="bar-item"><span>${esc(p.name.split(" ")[0])}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.max(0,Math.min(100,p[key]))}%"></div></div><b>${p[key]}${key==="attendance"?"%":""}</b></div>`).join("");$("attendance-bars").innerHTML=bars("attendance");$("questions-bars").innerHTML=rows.map(p=>`<div class="bar-item"><span>${esc(p.name.split(" ")[0])}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.min(100,p.questions/35*100)}%"></div></div><b>${p.questions}</b></div>`).join("");$("performance-table").innerHTML=rows.map(p=>`<tr><td>${esc(p.name)} <span class="pill gold">Demo</span></td><td>${p.activity}/100</td><td>${p.attendance}%</td><td>${p.questions}</td><td>${esc(p.disclosure)}</td></tr>`).join("")}
 perfRegion.addEventListener("change",render);render();
}
const disclosure=$("disclosure-table");
if(disclosure)disclosure.innerHTML=data.leaders.map(p=>`<tr><td>${esc(p.name)} <span class="pill gold">Demo</span></td><td>${esc(p.disclosure)}</td><td>Example label only; not a finding about a real person.</td><td>Locate the original affidavit or official filing and record its date and page.</td></tr>`).join("");
const sourceList=$("source-list");
if(sourceList)sourceList.innerHTML=data.sources.map(s=>`<article class="card"><div class="card-top"><span class="icon-tile">↗</span><span class="pill">External source</span></div><h3>${esc(s.name)}</h3><p class="muted small">${esc(s.type)}</p><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">Visit source ↗</a></article>`).join("");
const statementForm=$("statement-form"),statementList=$("statement-list");
if(statementForm){
 function render(){const rows=NL.get("statements",[]);statementList.innerHTML=rows.length?rows.map((x,i)=>`<article class="card" style="margin:12px 0"><div class="card-top"><span class="pill">${esc(x.status)}</span><button class="button small" data-delete-statement="${i}">Delete</button></div><h3>${esc(x.person)}</h3><p>${esc(x.text)}</p><p class="small muted">${esc(x.date||"Date not added")}</p>${x.url?`<a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">Open source ↗</a>`:`<span class="small muted">No source URL added</span>`}</article>`).join(""):`<div class="empty">No entries yet. Add your first research note.</div>`;statementList.querySelectorAll("[data-delete-statement]").forEach(b=>b.addEventListener("click",()=>{const a=NL.get("statements",[]);a.splice(Number(b.dataset.deleteStatement),1);NL.set("statements",a);render()}))}
 statementForm.addEventListener("submit",e=>{e.preventDefault();const a=NL.get("statements",[]);a.unshift({person:$("statement-person").value,text:$("statement-text").value,date:$("statement-date").value,url:$("statement-url").value,status:$("statement-status").value});NL.set("statements",a);statementForm.reset();render();NL.toast("Research entry saved locally")});render();
}
const issueForm=$("issue-form"),issueList=$("issue-list");
if(issueForm){
 function render(){const rows=NL.get("issues",[]);issueList.innerHTML=rows.length?rows.map((x,i)=>`<article class="card" style="margin:12px 0"><div class="card-top"><span class="pill">${esc(x.category)}</span><button class="button small" data-delete-issue="${i}">Delete</button></div><h3>${esc(x.title)}</h3><p class="small muted">${esc(x.area)}</p><p>${esc(x.description||"No description added.")}</p>${x.url?`<a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">Open source ↗</a>`:""}</article>`).join(""):`<div class="empty">No issues logged yet.</div>`;issueList.querySelectorAll("[data-delete-issue]").forEach(b=>b.addEventListener("click",()=>{const a=NL.get("issues",[]);a.splice(Number(b.dataset.deleteIssue),1);NL.set("issues",a);render()}))}
 issueForm.addEventListener("submit",e=>{e.preventDefault();const a=NL.get("issues",[]);a.unshift({title:$("issue-title").value,area:$("issue-area").value,category:$("issue-category").value,description:$("issue-description").value,url:$("issue-source").value});NL.set("issues",a);issueForm.reset();render();NL.toast("Issue note saved locally")});render();
}
})();
