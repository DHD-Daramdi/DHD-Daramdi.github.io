
function num(v) {
  const x = parseFloat(v);
  return Number.isFinite(x) ? x : 0;
}
function pct(v) { return num(v) / 100; }

function makePool() {
  return {
    attack_base:0, hp_base:0, defense_base:0,
    attack_percent:0, hp_percent:0, defense_percent:0,
    attack_flat:0, hp_flat:0, defense_flat:0,
    crit_rate:0, crit_damage:0,
    dealt_damage_increase:0,
    damage_taken_increase:0,
    normal_damage_increase:0, skill_damage_increase:0,
    defense_ignore:0, defense_penetration:0,
    resistance_penetration:0,
    confirmed_damage:0,
    elation_increase:0,
    break_damage_increase:0,
    break_effect:0, elation:0, laugh_points:0
  };
}
function addPool(a,b) {
  for (const k of Object.keys(a)) a[k] += num(b[k]);
}
function finalStats(pool) {
  return {
    attack:pool.attack_base*(1+pool.attack_percent)+pool.attack_flat,
    hp:pool.hp_base*(1+pool.hp_percent)+pool.hp_flat,
    defense:pool.defense_base*(1+pool.defense_percent)+pool.defense_flat,
    crit_rate:pool.crit_rate,
    crit_damage:pool.crit_damage
  };
}
function buildFinalPool(data) {
  const p = makePool();
  addPool(p, data.character1);
  if (data.buff2Enabled) addPool(p, data.character2);
  if (data.buff3Enabled) addPool(p, data.character3);
  if (data.buff4Enabled) addPool(p, data.character4);
  return p;
}
