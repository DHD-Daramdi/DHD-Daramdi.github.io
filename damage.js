
const CHARACTER_LEVEL = 80;
const BREAK_BASE_DAMAGE = 3767.5533;
const ELATION_BASE_DAMAGE = 7535.1070;

const BREAK_ELEMENT_MULTIPLIERS = {
  "물리": 2.0, "화염": 2.0, "얼음": 1.0, "번개": 1.0,
  "바람": 1.5, "양자": 0.5, "허수": 0.5
};

function defenseMultiplier(enemyLevel, defenseIgnore, defensePenetration) {
  let total = Math.min(defenseIgnore + defensePenetration, 1.0);
  const numerator = CHARACTER_LEVEL + 20.0;
  const denominator = numerator + (enemyLevel + 20.0) * (1.0 - total);
  return numerator / denominator;
}
function resistanceMultiplier(resistance, penetration) {
  const effective = resistance - penetration;
  return Math.min(1.0 - effective, 2.0);
}
function finalDamageMultiplier(a,b,c) {
  return (1+a)*(1+b)*(1+c);
}
function damageTakenIncrease(v) {
  return 1 + Math.min(v, 2.5);
}
function damageTakenReduction(v) {
  return 1 - v;
}
function commonMultipliers(enemy, finalMods) {
  return defenseMultiplier(enemy.level, enemy.defense_ignore, enemy.defense_penetration)
    * resistanceMultiplier(enemy.resistance, enemy.resistance_penetration)
    * finalDamageMultiplier(finalMods.increase_1, finalMods.increase_2, finalMods.increase_3)
    * damageTakenIncrease(enemy.damage_taken_increase)
    * damageTakenReduction(enemy.damage_taken_reduction);
}
function normalDamage(character, enemy, skill, finalMods, extras={}) {
  const base = character.attack*skill.attack_ratio
    + character.hp*skill.hp_ratio
    + character.defense*skill.defense_ratio;
  const crit = 1 + character.crit_damage;
  const expectedCrit = 1 + character.crit_rate*character.crit_damage;
  const skillMult = 1;
  const common = commonMultipliers(enemy, finalMods);
  const special = 1 + (extras.confirmed_damage || 0);
  const normal = base*skillMult*common*special;
  return {
    base_damage:base,
    normal_damage:normal,
    crit_damage:normal*crit,
    expected_damage:base*skillMult*expectedCrit*common*special,
    crit_multiplier:crit,
    expected_crit_multiplier:expectedCrit,
    common_multiplier:common,
    confirmed_damage_multiplier:special
  };
}
function breakDamage(bs, enemy, finalMods, extras={}) {
  const toughness = 0.5 + bs.max_toughness/40.0;
  const effect = 1 + bs.break_effect;
  const type = BREAK_ELEMENT_MULTIPLIERS[bs.break_element] ?? 1;
  const common = commonMultipliers(enemy, finalMods);
  const confirmed = 1 + (extras.confirmed_damage || 0);
  const breakIncrease = 1 + (extras.break_damage_increase || 0);
  const finalDamage = BREAK_BASE_DAMAGE*toughness*effect*type*common*confirmed*breakIncrease;
  return {base_damage:BREAK_BASE_DAMAGE,toughness_multiplier:toughness,
    break_effect_multiplier:effect,break_type_multiplier:type,common_multiplier:common,
    confirmed_damage_multiplier:confirmed,break_damage_increase_multiplier:breakIncrease,
    final_damage:finalDamage};
}
function elationDamage(es, enemy, finalMods, extras={}) {
  const laugh = es.laugh_points <= 0 ? 0 : 1 + 5*es.laugh_points/(es.laugh_points+240);
  const crit = 1 + es.crit_rate*es.crit_damage;
  const elation = 1 + es.elation_level;
  const common = commonMultipliers(enemy, finalMods);
  const confirmed = 1 + (extras.confirmed_damage || 0);
  const increase = 1 + (extras.elation_increase || 0);
  const finalDamage = ELATION_BASE_DAMAGE*es.skill_multiplier*elation*laugh*crit*common*confirmed*increase;
  return {base_damage:ELATION_BASE_DAMAGE,skill_multiplier:es.skill_multiplier,
    elation_multiplier:elation,laugh_multiplier:laugh,crit_multiplier:crit,
    common_multiplier:common,confirmed_damage_multiplier:confirmed,
    elation_increase_multiplier:increase,final_damage:finalDamage};
}
function superBreakDamage(bs, enemy, finalMods, extras={}) {
  const effect = 1 + bs.break_effect;
  const toughness = bs.toughness_damage/10.0;
  const superMult = 1 + bs.super_break_multiplier;
  const common = commonMultipliers(enemy, finalMods);
  const confirmed = 1 + (extras.confirmed_damage || 0);
  const breakIncrease = 1 + (extras.break_damage_increase || 0);
  const finalDamage = BREAK_BASE_DAMAGE*effect*toughness*superMult*common*confirmed*breakIncrease;
  return {base_damage:BREAK_BASE_DAMAGE,break_effect_multiplier:effect,
    toughness_multiplier:toughness,super_break_multiplier:superMult,common_multiplier:common,
    confirmed_damage_multiplier:confirmed,break_damage_increase_multiplier:breakIncrease,
    final_damage:finalDamage};
}
