const CHARACTER_LEVEL = 80;

const BREAK_BASE_DAMAGE = 3767.5533;
const ELATION_BASE_DAMAGE = 7535.1070;


// ============================================================
// 격파 속성별 배율
// ============================================================

const BREAK_ELEMENT_MULTIPLIERS = {
  "물리": 2.0,
  "화염": 2.0,
  "얼음": 1.0,
  "번개": 1.0,
  "바람": 1.5,
  "양자": 0.5,
  "허수": 0.5
};


// ============================================================
// 공통 계수
// ============================================================

// ------------------------------------------------------------
// 방어력 계수
//
// (캐릭터 레벨 + 20)
// ----------------------------------------------
// (캐릭터 레벨 + 20)
// + (적 레벨 + 20) × (1 - 방어력 무시/관통)
//
// 방어력 무시 + 관통은 최대 100%
// ------------------------------------------------------------

function defenseMultiplier(
  enemyLevel,
  defenseIgnore,
  defensePenetration
) {
  const totalIgnore = Math.min(
    (defenseIgnore || 0) + (defensePenetration || 0),
    1.0
  );

  const numerator =
    CHARACTER_LEVEL + 20.0;

  const denominator =
    numerator +
    (enemyLevel + 20.0) *
    (1.0 - totalIgnore);

  return numerator / denominator;
}


// ------------------------------------------------------------
// 속성 저항 계수
//
// 1 - 적 속성 저항 + 속성 저항 관통
//
// 최대 2.0
// ------------------------------------------------------------

function resistanceMultiplier(
  resistance,
  penetration
) {
  const effectiveResistance =
    (resistance || 0) -
    (penetration || 0);

  return Math.min(
    1.0 - effectiveResistance,
    2.0
  );
}


// ------------------------------------------------------------
// 받는 피해 증가
//
// 최대 250%
// → 최대 배율 3.5
// ------------------------------------------------------------

function damageTakenIncrease(v) {
  return 1.0 + Math.min(
    v || 0,
    2.5
  );
}


// ------------------------------------------------------------
// 받는 피해 감소
//
// 예:
// 20% → 0.8
// 50% → 0.5
// ------------------------------------------------------------

function damageTakenReduction(v) {
  return 1.0 - (v || 0);
}


// ------------------------------------------------------------
// 확정 피해
//
// 예:
// 20% → ×1.2
// ------------------------------------------------------------

function confirmedDamageMultiplier(v) {
  return 1.0 + (v || 0);
}


// ------------------------------------------------------------
// 최종 피해 증가류
//
// 각각 독립이므로 곱연산
//
// (1 + 증가1)
// × (1 + 증가2)
// × (1 + 증가3)
// ------------------------------------------------------------

function finalDamageMultiplier(
  increase1,
  increase2,
  increase3
) {
  return (
    (1.0 + (increase1 || 0)) *
    (1.0 + (increase2 || 0)) *
    (1.0 + (increase3 || 0))
  );
}


// ============================================================
// 공통 계수 묶음
//
// 모든 데미지 타입에서 공통으로 사용하는 것
//
// 방어력
// 속성 저항
// 받는 피해 감소
// 확정 피해
// 최종 피해 증가류
// ============================================================

function commonMultipliers(
  enemy,
  finalMods,
  extras = {}
) {
  const defense = defenseMultiplier(
    enemy.level,
    enemy.defense_ignore,
    enemy.defense_penetration
  );

  const resistance = resistanceMultiplier(
    enemy.resistance,
    enemy.resistance_penetration
  );

  const damageReduction = damageTakenReduction(
    enemy.damage_taken_reduction
  );

  const confirmed = confirmedDamageMultiplier(
    finalMods.confirmed_damage
  );

  const finalDamage = finalDamageMultiplier(
    finalMods.increase_1,
    finalMods.increase_2,
    finalMods.increase_3
  );

  const multiplier =
    defense *
    resistance *
    damageReduction *
    confirmed *
    finalDamage;

  return {
    multiplier,

    defense_multiplier: defense,

    resistance_multiplier: resistance,

    damage_taken_reduction_multiplier:
      damageReduction,

    confirmed_damage_multiplier:
      confirmed,

    final_damage_multiplier:
      finalDamage
  };
}


// ============================================================
// 일반 / 치명타 데미지
//
// 기본 피해
// × 가하는 피해 증가
// × 받는 피해 증가
// × 공통 계수
//
// 공통 계수:
// 방어력
// × 속성 저항
// × 받는 피해 감소
// × 확정 피해
// × 최종 피해 증가류
// ============================================================

function normalDamage(
  character,
  enemy,
  skill,
  finalMods,
  extras = {}
) {
  const baseDamage =
    character.attack * (skill.attack_ratio || 0) +
    character.hp * (skill.hp_ratio || 0) +
    character.defense * (skill.defense_ratio || 0);

  // 일반 데미지 전용
  const dealtDamage =
    1.0 + (extras.dealt_damage_increase || 0);

  // 모든 데미지 타입에 적용
  const takenDamage =
    damageTakenIncrease(
      enemy.damage_taken_increase
    );

  const common =
    commonMultipliers(
      enemy,
      finalMods
    );

  const totalMultiplier =
    dealtDamage *
    takenDamage *
    common.multiplier;

  const normalDamageValue =
    baseDamage *
    totalMultiplier;

  // 치명타
  const critMultiplier =
    1.0 + (character.crit_damage || 0);

  const expectedCritMultiplier =
    1.0 +
    (character.crit_rate || 0) *
    (character.crit_damage || 0);

  const critDamage =
    normalDamageValue *
    critMultiplier;

  const expectedDamage =
    baseDamage *
    totalMultiplier *
    expectedCritMultiplier;

  return {
    base_damage: baseDamage,

    dealt_damage_multiplier:
      dealtDamage,

    damage_taken_increase_multiplier:
      takenDamage,

    defense_multiplier:
      common.defense_multiplier,

    resistance_multiplier:
      common.resistance_multiplier,

    damage_taken_reduction_multiplier:
      common.damage_taken_reduction_multiplier,

    confirmed_damage_multiplier:
      common.confirmed_damage_multiplier,

    final_damage_multiplier:
      common.final_damage_multiplier,

    common_multiplier:
      common.multiplier *
      dealtDamage *
      takenDamage,

    crit_multiplier:
      critMultiplier,

    expected_crit_multiplier:
      expectedCritMultiplier,

    normal_damage:
      normalDamageValue,

    crit_damage:
      critDamage,

    expected_damage:
      expectedDamage
  };
}


// ============================================================
// 격파 데미지
//
// 3767.5533
// × 강인성 계수
// × 격파 특수효과
// × 속성별 격파 배율
// × 받는 피해 증가
// × 공통 계수
// × 가하는 격파 피해 증가
//
// 공통 계수:
// 방어력
// × 속성 저항
// × 받는 피해 감소
// × 확정 피해
// × 최종 피해 증가류
// ============================================================

function breakDamage(
  bs,
  enemy,
  finalMods,
  extras = {}
) {
  // 기존 격파 강인성 계수
  const toughnessMultiplier =
    0.5 +
    (bs.max_toughness || 0) / 40.0;

  // 격파 특수효과
  const breakEffectMultiplier =
    1.0 +
    (bs.break_effect || 0);

  // 속성별 격파 배율
  const breakTypeMultiplier =
    BREAK_ELEMENT_MULTIPLIERS[
      bs.break_element
    ] ?? 1.0;

  // 모든 타입 공통
  const common =
    commonMultipliers(
      enemy,
      finalMods
    );

  // 모든 타입에 적용되는 적 받는 피해 증가
  const takenDamage =
    damageTakenIncrease(
      enemy.damage_taken_increase
    );

  // 격파 / 슈퍼 격파 전용
  const breakDamageIncrease =
    1.0 +
    (extras.break_damage_increase || 0);

  const finalDamage =
    BREAK_BASE_DAMAGE *
    toughnessMultiplier *
    breakEffectMultiplier *
    breakTypeMultiplier *
    takenDamage *
    common.multiplier *
    breakDamageIncrease;

  return {
    base_damage:
      BREAK_BASE_DAMAGE,

    toughness_multiplier:
      toughnessMultiplier,

    break_effect_multiplier:
      breakEffectMultiplier,

    break_type_multiplier:
      breakTypeMultiplier,

    damage_taken_increase_multiplier:
      takenDamage,

    defense_multiplier:
      common.defense_multiplier,

    resistance_multiplier:
      common.resistance_multiplier,

    damage_taken_reduction_multiplier:
      common.damage_taken_reduction_multiplier,

    confirmed_damage_multiplier:
      common.confirmed_damage_multiplier,

    final_damage_multiplier:
      common.final_damage_multiplier,

    break_damage_increase_multiplier:
      breakDamageIncrease,

    common_multiplier:
      common.multiplier *
      takenDamage,

    final_damage:
      finalDamage
  };
}


// ============================================================
// 환락 데미지
//
// 7535.1070
// × 환락 스킬 계수
// × (1 + 환락도)
// × 웃음 포인트 계수
// × 치명타
// × 받는 피해 증가
// × 공통 계수
// × 증소
//
// 가하는 피해 증가 X
// ============================================================

function elationDamage(
  es,
  enemy,
  finalMods,
  extras = {}
) {
  // 웃음 포인트 계수
  const laughMultiplier =
    es.laugh_points <= 0
      ? 0.0
      : 1.0 +
        (
          5.0 *
          es.laugh_points /
          (es.laugh_points + 240.0)
        );

  // 치명타
  const critMultiplier =
    1.0 +
    (es.crit_rate || 0) *
    (es.crit_damage || 0);

  // 환락도
  const elationMultiplier =
    1.0 +
    (es.elation_level || 0);

  // 공통
  const common =
    commonMultipliers(
      enemy,
      finalMods
    );

  // 받는 피해 증가
  const takenDamage =
    damageTakenIncrease(
      enemy.damage_taken_increase
    );

  // 환락 전용
  const elationIncrease =
    1.0 +
    (extras.elation_increase || 0);

  const finalDamage =
    ELATION_BASE_DAMAGE *
    (es.skill_multiplier || 0) *
    elationMultiplier *
    laughMultiplier *
    critMultiplier *
    takenDamage *
    common.multiplier *
    elationIncrease;

  return {
    base_damage:
      ELATION_BASE_DAMAGE,

    skill_multiplier:
      es.skill_multiplier || 0,

    elation_multiplier:
      elationMultiplier,

    laugh_multiplier:
      laughMultiplier,

    crit_multiplier:
      critMultiplier,

    damage_taken_increase_multiplier:
      takenDamage,

    defense_multiplier:
      common.defense_multiplier,

    resistance_multiplier:
      common.resistance_multiplier,

    damage_taken_reduction_multiplier:
      common.damage_taken_reduction_multiplier,

    confirmed_damage_multiplier:
      common.confirmed_damage_multiplier,

    final_damage_multiplier:
      common.final_damage_multiplier,

    elation_increase_multiplier:
      elationIncrease,

    common_multiplier:
      common.multiplier *
      takenDamage,

    final_damage:
      finalDamage
  };
}


// ============================================================
// 슈퍼 격파 데미지
//
// 3767.5533
// × (1 + 격파 특수효과)
// × 강인성 감소 수치 / 10
// × (1 + 슈퍼 격파 계수)
// × 받는 피해 증가
// × 공통 계수
// × 가하는 격파 피해 증가
//
// 가하는 피해 증가 X
//
// 공통 계수:
// 방어력
// × 속성 저항
// × 받는 피해 감소
// × 확정 피해
// × 최종 피해 증가류
// ============================================================

function superBreakDamage(
  bs,
  enemy,
  finalMods,
  extras = {}
) {
  // 격파 특수효과
  const breakEffectMultiplier =
    1.0 +
    (bs.break_effect || 0);

  // 강인성 감소 수치 / 10
  const toughnessMultiplier =
    (bs.toughness_damage || 0) / 10.0;

  // 슈퍼 격파 계수
  const superBreakMultiplier =
    1.0 +
    (bs.super_break_multiplier || 0);

  // 공통
  const common =
    commonMultipliers(
      enemy,
      finalMods
    );

  // 받는 피해 증가
  const takenDamage =
    damageTakenIncrease(
      enemy.damage_taken_increase
    );

  // 격파 / 슈퍼 격파 공통
  const breakDamageIncrease =
    1.0 +
    (extras.break_damage_increase || 0);

  const finalDamage =
    BREAK_BASE_DAMAGE *
    breakEffectMultiplier *
    toughnessMultiplier *
    superBreakMultiplier *
    takenDamage *
    common.multiplier *
    breakDamageIncrease;

  return {
    base_damage:
      BREAK_BASE_DAMAGE,

    break_effect_multiplier:
      breakEffectMultiplier,

    toughness_multiplier:
      toughnessMultiplier,

    super_break_multiplier:
      superBreakMultiplier,

    damage_taken_increase_multiplier:
      takenDamage,

    defense_multiplier:
      common.defense_multiplier,

    resistance_multiplier:
      common.resistance_multiplier,

    damage_taken_reduction_multiplier:
      common.damage_taken_reduction_multiplier,

    confirmed_damage_multiplier:
      common.confirmed_damage_multiplier,

    final_damage_multiplier:
      common.final_damage_multiplier,

    break_damage_increase_multiplier:
      breakDamageIncrease,

    common_multiplier:
      common.multiplier *
      takenDamage,

    final_damage:
      finalDamage
  };
}
