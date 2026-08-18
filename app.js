
const FIELD_GROUPS = {
  enemy: [
    ["level","적 레벨","number",95],
    ["resistance","속성 저항 (%)","percent",0],
    ["resistance_penetration","속성 저항 관통 (%)","percent",0],
    ["defense_ignore","방어력 무시 (%)","percent",0],
    ["defense_penetration","방어력 관통 (%)","percent",0],
    ["damage_taken_increase","받는 피해 증가 (%)","percent",0],
    ["damage_taken_reduction","받는 피해 감소 (%)","percent",0]
  ],

  // 실제 계산 대상 캐릭터 1의 본체 스탯
  char1: [
    ["attack_base","캐릭터 기초 공격력","number",0],
    ["hp_base","캐릭터 기초 HP","number",0],
    ["defense_base","캐릭터 기초 방어력","number",0],
    ["lightcone_attack_base","광추 기초 공격력","number",0],
    ["lightcone_hp_base","광추 기초 HP","number",0],
    ["lightcone_defense_base","광추 기초 방어력","number",0],
    ["attack_percent","공격력 (%)","percent",0],
    ["hp_percent","HP (%)","percent",0],
    ["defense_percent","방어력 (%)","percent",0],
    ["attack_flat","깡 공격력","number",0],
    ["hp_flat","깡 HP","number",0],
    ["defense_flat","깡 방어력","number",0],
    ["crit_rate","치명타 확률 (%)","percent",0],
    ["crit_damage","치명타 피해 (%)","percent",0],
    ["dealt_damage_increase","가하는 피해 증가 (%)","percent",0],
    ["normal_damage_increase","일반 공격 피해 증가 (%)","percent",0],
    ["skill_damage_increase","전투 스킬 피해 증가 (%)","percent",0],
    ["ultimate_damage_increase","필살기 피해 증가 (%)","percent",0],
    ["follow_up_damage_increase","추가 공격 피해 증가 (%)","percent",0],
    ["additional_damage_increase","기타 피해 증가 (%)","percent",0],
    ["damage_taken_increase","적 받는 피해 증가 (%)","percent",0],
    ["defense_ignore","방어력 무시 (%)","percent",0],
    ["defense_penetration","방어력 관통 (%)","percent",0],
    ["resistance_penetration","속성 저항 관통 (%)","percent",0],
    ["confirmed_damage","확정 피해 (%)","percent",0],
    ["elation_increase","증소 (%)","percent",0],
    ["break_damage_increase","가하는 격파 피해 증가 (%)","percent",0],
    ["break_effect","격파 특수효과 (%)","percent",0],
    ["elation","환락도 (%)","percent",0],
    ["laugh_points","웃음 포인트","number",0]
  ],

  // 버프 캐릭터 2~4: 기초/광추 기초 스탯은 제외하고,
  // 실제 파티에 제공할 수 있는 % 스탯/깡 스탯 및 전투 버프만 입력한다.
  buff: [
    ["attack_percent","공격력 (%)","percent",0],
    ["hp_percent","HP (%)","percent",0],
    ["defense_percent","방어력 (%)","percent",0],
    ["attack_flat","깡 공격력","number",0],
    ["hp_flat","깡 HP","number",0],
    ["defense_flat","깡 방어력","number",0],

    ["crit_rate","치명타 확률 (%)","percent",0],
    ["crit_damage","치명타 피해 (%)","percent",0],
    ["dealt_damage_increase","가하는 피해 증가 (%)","percent",0],
    ["normal_damage_increase","일반 공격 피해 증가 (%)","percent",0],
    ["skill_damage_increase","전투 스킬 피해 증가 (%)","percent",0],
    ["ultimate_damage_increase","필살기 피해 증가 (%)","percent",0],
    ["follow_up_damage_increase","추가 공격 피해 증가 (%)","percent",0],
    ["additional_damage_increase","기타 피해 증가 (%)","percent",0],
    ["damage_taken_increase","받는 피해 증가 (%)","percent",0],
    ["defense_ignore","방어력 무시 (%)","percent",0],
    ["defense_penetration","방어력 관통 (%)","percent",0],
    ["resistance_penetration","속성 저항 관통 (%)","percent",0],
    ["confirmed_damage","확정 피해 (%)","percent",0],
    ["elation_increase","증소 (%)","percent",0],
    ["break_damage_increase","가하는 격파 피해 증가 (%)","percent",0],
    ["break_effect","격파 특수효과 (%)","percent",0],
    ["elation","환락도 (%)","percent",0],
    ["laugh_points","웃음 포인트","number",0]
  ],

  damage: [
    ["damageType","데미지 타입","select", "NORMAL"],
    ["attack_ratio","공격력 계수 (%)","percent",100],
    ["hp_ratio","HP 계수 (%)","percent",0],
    ["defense_ratio","방어력 계수 (%)","percent",0],
    ["damage_bonus","스킬 피해 증가 (%)","percent",0],
    ["break_element","격파 속성","select","물리"],
    ["toughness_damage","강인성 감소 수치","number",0],
    ["max_toughness","적 최대 강인성","number",20],
    ["super_break_multiplier","슈퍼 격파 계수 (%)","percent",0],
    ["skill_multiplier","환락 스킬 계수 (%)","percent",100]
  ]
};

function createFields(containerId, fields, prefix) {
  const root=document.getElementById(containerId);
  root.innerHTML="";
  for(const [key,label,type,def] of fields) {
    const row=document.createElement("div");
    row.className="field";
    const lab=document.createElement("label");
    lab.textContent=label;
    let input;
    if(type==="select") {
      input=document.createElement("select");
      if(key==="damageType") {
        [["NORMAL","일반 / 치명타"],["BREAK","격파"],["SUPER_BREAK","슈퍼 격파"],["ELATION","환락"]]
          .forEach(([v,t])=>{const o=document.createElement("option");o.value=v;o.textContent=t;input.appendChild(o);});
      } else {
        ["물리","화염","얼음","번개","바람","양자","허수"].forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;input.appendChild(o);});
      }
    } else {
      input=document.createElement("input");
      input.type="number"; input.step="any"; input.value=def;
    }
    input.id=`${prefix}_${key}`;
    row.append(lab,input); root.appendChild(row);
  }
}
function readGroup(fields,prefix) {
  const out={};
  for(const [key,,type] of fields) {
    const el=document.getElementById(`${prefix}_${key}`);
    if(type==="select") out[key]=el.value;
    else out[key]=type==="percent" ? pct(el.value) : num(el.value);
  }
  return out;
}
function writeGroup(fields,prefix,obj) {
  for(const [key,,type,def] of fields) {
    const el=document.getElementById(`${prefix}_${key}`);
    if(!el) continue;
    const v=obj?.[key];
    if(v===undefined) { el.value=def; continue; }
    el.value=type==="percent" ? num(v)*100 : v;
  }
}
function collect() {
  const e=readGroup(FIELD_GROUPS.enemy,"enemy");
  const c1=readGroup(FIELD_GROUPS.char1,"c1");
  c1.attack_base += c1.lightcone_attack_base;
  c1.hp_base += c1.lightcone_hp_base;
  c1.defense_base += c1.lightcone_defense_base;

  const c2=readGroup(FIELD_GROUPS.buff,"c2");
  const c3=readGroup(FIELD_GROUPS.buff,"c3");
  const c4=readGroup(FIELD_GROUPS.buff,"c4");

  return {
    enemy:e, character1:c1, character2:c2, character3:c3, character4:c4,
    buff2Enabled:document.getElementById("buff2Enabled").checked,
    buff3Enabled:document.getElementById("buff3Enabled").checked,
    buff4Enabled:document.getElementById("buff4Enabled").checked,
    damage:readGroup(FIELD_GROUPS.damage,"dmg"),
    names: {
      enemy: document.getElementById("enemyName").value,
      character1: document.getElementById("char1Name").value,
      character2: document.getElementById("char2Name").value,
      character3: document.getElementById("char3Name").value,
      character4: document.getElementById("char4Name").value
    },
    saveName:document.getElementById("saveName").value
  };
}
function calculate() {
  const d=collect();
  const p=buildFinalPool(d);
  const s=finalStats(p);
  const e={...d.enemy};
  // Buffs can modify enemy/character-related values. The current UI uses
  // the shared pool for the character's final stats and penetration/specials.
  e.defense_ignore=Math.min(e.defense_ignore+p.defense_ignore,1);
  e.defense_penetration=Math.min(e.defense_penetration+p.defense_penetration,1);
  e.resistance_penetration+=p.resistance_penetration;
  e.damage_taken_increase=Math.min(e.damage_taken_increase+p.damage_taken_increase, 2.5);

  const f={increase_1:p.dealt_damage_increase+p.normal_damage_increase+p.skill_damage_increase+
      p.ultimate_damage_increase+p.follow_up_damage_increase+p.additional_damage_increase,
      increase_2:0,increase_3:0};

  const x=d.damage;
  let r;
  if(x.damageType==="NORMAL") {
    r=normalDamage(s,e,{attack_ratio:x.attack_ratio,hp_ratio:x.hp_ratio,
      defense_ratio:x.defense_ratio,damage_bonus:x.damage_bonus},p);
  } else if(x.damageType==="BREAK") {
    r=breakDamage({break_effect:p.break_effect,toughness_damage:x.toughness_damage,
      max_toughness:x.max_toughness,break_element:x.break_element},e,f,p);
  } else if(x.damageType==="SUPER_BREAK") {
    r=superBreakDamage({break_effect:p.break_effect,toughness_damage:x.toughness_damage,
      max_toughness:x.max_toughness,break_element:x.break_element,
      super_break_multiplier:x.super_break_multiplier},e,f,p);
  } else {
    r=elationDamage({skill_multiplier:x.skill_multiplier,elation_level:p.elation,
      laugh_points:x.laugh_points||p.laugh_points,crit_rate:p.crit_rate,
      crit_damage:p.crit_damage},e,f,p);
  }
  renderResult(r,s,p,x.damageType);
}
function fmt(x){ return Number(x||0).toLocaleString("ko-KR",{maximumFractionDigits:4}); }
function renderResult(r,s,p,type) {
  const main=r.expected_damage ?? r.final_damage ?? r.crit_damage ?? 0;
  const pct = x => `${(Number(x||0)*100).toFixed(2)}%`;
  const mult = x => `×${fmt(1+Number(x||0))}`;

  let typeLabel = {
    NORMAL:"일반 / 치명타",
    BREAK:"격파",
    SUPER_BREAK:"슈퍼 격파",
    ELATION:"환락"
  }[type] || type;

  let html=`<div class="result-main">${fmt(main)}</div>`;
  html+=`<div class="result-subtitle">${typeLabel}</div>`;

  html+=`<h3 class="result-section-title">최종 캐릭터 스탯</h3>
  <div class="result-grid">
    <div class="result-item"><span>공격력</span><strong>${fmt(s.attack)}</strong></div>
    <div class="result-item"><span>HP</span><strong>${fmt(s.hp)}</strong></div>
    <div class="result-item"><span>방어력</span><strong>${fmt(s.defense)}</strong></div>
    <div class="result-item"><span>치명타 확률</span><strong>${pct(p.crit_rate)}</strong></div>
    <div class="result-item"><span>치명타 피해</span><strong>${pct(p.crit_damage)}</strong></div>
  </div>`;

  html+=`<h3 class="result-section-title">공통 / 최종 버프</h3>
  <div class="result-grid">
    <div class="result-item"><span>가하는 피해 증가</span><strong>${pct(p.dealt_damage_increase)}</strong></div>
    <div class="result-item"><span>확정 피해</span><strong>${pct(p.confirmed_damage)} (${mult(p.confirmed_damage)})</strong></div>
    <div class="result-item"><span>적 받는 피해 증가</span><strong>${pct(p.damage_taken_increase)}</strong></div>
    <div class="result-item"><span>방어력 무시</span><strong>${pct(p.defense_ignore)}</strong></div>
    <div class="result-item"><span>방어력 관통</span><strong>${pct(p.defense_penetration)}</strong></div>
    <div class="result-item"><span>속성 저항 관통</span><strong>${pct(p.resistance_penetration)}</strong></div>
  </div>`;

  html+=`<h3 class="result-section-title">데미지 타입별 버프</h3>
  <div class="result-grid">
    <div class="result-item"><span>일반 공격 피해 증가</span><strong>${pct(p.normal_damage_increase)}</strong></div>
    <div class="result-item"><span>전투 스킬 피해 증가</span><strong>${pct(p.skill_damage_increase)}</strong></div>
    <div class="result-item"><span>필살기 피해 증가</span><strong>${pct(p.ultimate_damage_increase)}</strong></div>
    <div class="result-item"><span>추가 공격 피해 증가</span><strong>${pct(p.additional_damage_increase)}</strong></div>
    <div class="result-item"><span>추가 공격/후속 피해 증가</span><strong>${pct(p.follow_up_damage_increase)}</strong></div>
    <div class="result-item"><span>증소</span><strong>${pct(p.elation_increase)}</strong></div>
    <div class="result-item"><span>가하는 격파 피해 증가</span><strong>${pct(p.break_damage_increase)}</strong></div>
    <div class="result-item"><span>격파 특수효과</span><strong>${pct(p.break_effect)}</strong></div>
    <div class="result-item"><span>환락도</span><strong>${pct(p.elation)}</strong></div>
    <div class="result-item"><span>웃음 포인트</span><strong>${fmt(p.laugh_points)}</strong></div>
  </div>`;

  if (r.common_multiplier !== undefined) {
    html+=`<h3 class="result-section-title">적용된 계수</h3>
    <div class="result-grid">
      <div class="result-item"><span>공통 계수</span><strong>×${fmt(r.common_multiplier)}</strong></div>
      ${r.crit_multiplier!==undefined ? `<div class="result-item"><span>치명타 계수</span><strong>×${fmt(r.crit_multiplier)}</strong></div>` : ""}
      ${r.expected_crit_multiplier!==undefined ? `<div class="result-item"><span>기대 치명타 계수</span><strong>×${fmt(r.expected_crit_multiplier)}</strong></div>` : ""}
      ${r.break_type_multiplier!==undefined ? `<div class="result-item"><span>격파 속성 배율</span><strong>×${fmt(r.break_type_multiplier)}</strong></div>` : ""}
      ${r.elation_multiplier!==undefined ? `<div class="result-item"><span>환락도 계수</span><strong>×${fmt(r.elation_multiplier)}</strong></div>` : ""}
      ${r.elation_increase_multiplier!==undefined ? `<div class="result-item"><span>증소 계수</span><strong>×${fmt(r.elation_increase_multiplier)}</strong></div>` : ""}
      ${r.break_damage_increase_multiplier!==undefined ? `<div class="result-item"><span>격파 피해 증가 계수</span><strong>×${fmt(r.break_damage_increase_multiplier)}</strong></div>` : ""}
      <div class="result-item"><span>확정 피해 계수</span><strong>×${fmt(r.confirmed_damage_multiplier)}</strong></div>
    </div>`;
  }

  document.getElementById("result").innerHTML=html;
}
function saveList() {
  return JSON.parse(localStorage.getItem("sr_damage_saves")||"{}");
}
function refreshSaves() {
  const sel=document.getElementById("saveSelect");
  const saves=saveList(); sel.innerHTML="";
  for(const name of Object.keys(saves)) {
    const o=document.createElement("option"); o.value=name;o.textContent=name;sel.appendChild(o);
  }
}
function saveCurrent() {
  const name=document.getElementById("saveName").value.trim();
  if(!name){alert("세팅 이름을 입력하세요.");return;}
  const saves=saveList(); saves[name]=collect();
  localStorage.setItem("sr_damage_saves",JSON.stringify(saves));
  refreshSaves(); document.getElementById("saveSelect").value=name;
}
function loadCurrent() {
  const name=document.getElementById("saveSelect").value;
  const d=saveList()[name]; if(!d)return;
  writeGroup(FIELD_GROUPS.enemy,"enemy",d.enemy);
  writeGroup(FIELD_GROUPS.char1,"c1",d.character1);
  writeGroup(FIELD_GROUPS.buff,"c2",d.character2);
  writeGroup(FIELD_GROUPS.buff,"c3",d.character3);
  writeGroup(FIELD_GROUPS.buff,"c4",d.character4);
  writeGroup(FIELD_GROUPS.damage,"dmg",d.damage);
  const names = d.names || {};
  document.getElementById("enemyName").value = names.enemy || "";
  document.getElementById("char1Name").value = names.character1 || "";
  document.getElementById("char2Name").value = names.character2 || "";
  document.getElementById("char3Name").value = names.character3 || "";
  document.getElementById("char4Name").value = names.character4 || "";
  document.getElementById("buff2Enabled").checked=d.buff2Enabled;
  document.getElementById("buff3Enabled").checked=d.buff3Enabled;
  document.getElementById("buff4Enabled").checked=d.buff4Enabled;
  document.getElementById("saveName").value=name;
}
function deleteCurrent() {
  const name=document.getElementById("saveSelect").value;
  if(!name)return;
  const saves=saveList(); delete saves[name];
  localStorage.setItem("sr_damage_saves",JSON.stringify(saves)); refreshSaves();
}
function resetAll() { if(confirm("모든 입력을 초기화할까요?")) location.reload(); }

createFields("enemyFields",FIELD_GROUPS.enemy,"enemy");
createFields("char1Fields",FIELD_GROUPS.char1,"c1");
createFields("char2Fields",FIELD_GROUPS.buff,"c2");
createFields("char3Fields",FIELD_GROUPS.buff,"c3");
createFields("char4Fields",FIELD_GROUPS.buff,"c4");
createFields("damageFields",FIELD_GROUPS.damage,"dmg");
refreshSaves();

document.getElementById("calcBtn").onclick=calculate;
document.getElementById("saveBtn").onclick=saveCurrent;
document.getElementById("loadBtn").onclick=loadCurrent;
document.getElementById("deleteBtn").onclick=deleteCurrent;
document.getElementById("resetBtn").onclick=resetAll;
