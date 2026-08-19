const FIELD_GROUPS = {
  // ============================================================
  // 적
  // ============================================================

  enemy: [
    ["level", "적 레벨", "number", 95],
    ["resistance", "속성 저항 (%)", "percent", 0],
    ["resistance_penetration", "속성 저항 관통/감소 (%)", "percent", 0],
    ["defense_ignore", "방어력 무시 (%)", "percent", 0],
    ["defense_penetration", "방어력 감소 (%)", "percent", 0],
    ["damage_taken_increase", "받는 피해 증가 (%)", "percent", 0],

    ["damage_taken_reduction", "받는 피해 감소 1 (%)", "percent", 0],
    ["damage_taken_reduction_2", "받는 피해 감소 2 (%)", "percent", 0],
    ["damage_taken_reduction_3", "받는 피해 감소 3 (%)", "percent", 0],

    ["dealt_damage_reduction_1", "가하는 피해 감소 1 (%)", "percent", 0],
    ["dealt_damage_reduction_2", "가하는 피해 감소 2 (%)", "percent", 0],
    ["dealt_damage_reduction_3", "가하는 피해 감소 3 (%)", "percent", 0],

    ["is_broken", "약점 격파 상태", "select", "NO"]
  ],

  // ============================================================
  // 캐릭터 1 : 공통
  // ============================================================

  char1_common: [
    ["attack_base", "캐릭터 기초 공격력", "number", 0],
    ["hp_base", "캐릭터 기초 HP", "number", 0],
    ["defense_base", "캐릭터 기초 방어력", "number", 0],

    ["lightcone_attack_base", "광추 기초 공격력", "number", 0],
    ["lightcone_hp_base", "광추 기초 HP", "number", 0],
    ["lightcone_defense_base", "광추 기초 방어력", "number", 0],

    ["attack_percent", "공격력 (%)", "percent", 0],
    ["hp_percent", "HP (%)", "percent", 0],
    ["defense_percent", "방어력 (%)", "percent", 0],

    ["attack_flat", "깡 공격력", "number", 0],
    ["hp_flat", "깡 HP", "number", 0],
    ["defense_flat", "깡 방어력", "number", 0],

    ["crit_rate", "치명타 확률 (%)", "percent", 0],
    ["crit_damage", "치명타 피해 (%)", "percent", 0],

    ["damage_taken_increase", "적 받는 피해 증가 (%)", "percent", 0],

    ["defense_ignore", "방어력 무시 (%)", "percent", 0],
    ["defense_penetration", "방어력 감소 (%)", "percent", 0],
    ["resistance_penetration", "속성 저항 관통/감소 (%)", "percent", 0],

    ["confirmed_damage", "확정 피해 (%)", "percent", 0]
  ],

  // ============================================================
  // 캐릭터 1 : 일반
  // ============================================================

  char1_normal: [
    ["dealt_damage_increase", "가하는 피해 증가 (%)", "percent", 0]
  ],

  // ============================================================
  // 캐릭터 1 : 격파 / 슈퍼 격파
  // ============================================================

  char1_break: [
    ["super_break_multiplier", "슈퍼 격파 계수 (%)", "percent", 0],
    ["break_damage_increase", "가하는 격파 피해 증가 (%)", "percent", 0],
    ["break_effect", "격파 특수효과 (%)", "percent", 0]
  ],

  // ============================================================
  // 캐릭터 1 : 환락
  // ============================================================

  char1_elation: [
    ["elation_increase", "증소 (%)", "percent", 0],
    ["elation", "환락도 (%)", "percent", 0],
    ["laugh_points", "웃음 포인트", "number", 0]
  ],

  // ============================================================
  // 캐릭터 2~4 : 공통
  // ============================================================

  buff_common: [
    ["attack_percent", "공격력 (%)", "percent", 0],
    ["hp_percent", "HP (%)", "percent", 0],
    ["defense_percent", "방어력 (%)", "percent", 0],

    ["attack_flat", "깡 공격력", "number", 0],
    ["hp_flat", "깡 HP", "number", 0],
    ["defense_flat", "깡 방어력", "number", 0],

    ["crit_rate", "치명타 확률 (%)", "percent", 0],
    ["crit_damage", "치명타 피해 (%)", "percent", 0],

    ["damage_taken_increase", "받는 피해 증가 (%)", "percent", 0],

    ["defense_ignore", "방어력 무시 (%)", "percent", 0],
    ["defense_penetration", "방어력 감소 (%)", "percent", 0],
    ["resistance_penetration", "속성 저항 관통/감소 (%)", "percent", 0],

    ["confirmed_damage", "확정 피해 (%)", "percent", 0]
  ],

  // ============================================================
  // 캐릭터 2~4 : 일반
  // ============================================================

  buff_normal: [
    ["dealt_damage_increase", "가하는 피해 증가 (%)", "percent", 0]
  ],

  // ============================================================
  // 캐릭터 2~4 : 격파 / 슈퍼 격파
  // ============================================================

  buff_break: [
    ["super_break_multiplier", "슈퍼 격파 계수 (%)", "percent", 0],
    ["break_damage_increase", "가하는 격파 피해 증가 (%)", "percent", 0],
    ["break_effect", "격파 특수효과 (%)", "percent", 0]
  ],

  // ============================================================
  // 캐릭터 2~4 : 환락
  // ============================================================

  buff_elation: [
    ["elation_increase", "증소 (%)", "percent", 0],
    ["elation", "환락도 (%)", "percent", 0],
    ["laugh_points", "웃음 포인트", "number", 0]
  ],

  // ============================================================
  // 데미지 설정
  // ============================================================

  damage: [
    ["damageType", "데미지 타입", "select", "NORMAL"],

    ["attack_ratio", "공격력 계수 (%)", "percent", 100],
    ["hp_ratio", "HP 계수 (%)", "percent", 0],
    ["defense_ratio", "방어력 계수 (%)", "percent", 0],

    ["break_element", "격파 속성", "select", "물리"],
    ["toughness_damage", "강인성 감소 수치", "number", 0],
    ["max_toughness", "적 최대 강인성", "number", 20],

    ["skill_multiplier", "환락 스킬 계수 (%)", "percent", 100],

    ["final_damage_increase_1", "최종 피해 증가 1 (%)", "percent", 0],
    ["final_damage_increase_2", "최종 피해 증가 2 (%)", "percent", 0],
    ["final_damage_increase_3", "최종 피해 증가 3 (%)", "percent", 0]
  ]
};


// ============================================================
// 입력 필드 생성
// ============================================================

function createFields(containerId, fields, prefix) {
  const root = document.getElementById(containerId);
  if (!root) return;

  root.innerHTML = "";

  for (const [key, label, type, def] of fields) {
    const row = document.createElement("div");
    row.className = "field";

    const lab = document.createElement("label");
    lab.textContent = label;

    let input;

    if (type === "select") {
      input = document.createElement("select");

      if (key === "damageType") {
        [
          ["NORMAL", "일반 / 치명타"],
          ["BREAK", "격파"],
          ["SUPER_BREAK", "슈퍼 격파"],
          ["ELATION", "환락"]
        ].forEach(([value, text]) => {
          const option = document.createElement("option");
          option.value = value;
          option.textContent = text;
          input.appendChild(option);
        });

      } else if (key === "is_broken") {
        [
          ["NO", "X"],
          ["YES", "O"]
        ].forEach(([value, text]) => {
          const option = document.createElement("option");
          option.value = value;
          option.textContent = text;
          input.appendChild(option);
        });

      } else {
        [
          "물리",
          "화염",
          "얼음",
          "번개",
          "바람",
          "양자",
          "허수"
        ].forEach(value => {
          const option = document.createElement("option");
          option.value = value;
          option.textContent = value;
          input.appendChild(option);
        });
      }

    } else {
      input = document.createElement("input");
      input.type = "number";
      input.step = "any";
      input.value = def;
    }

    input.id = `${prefix}_${key}`;

    row.append(lab, input);
    root.appendChild(row);
  }
}


// ============================================================
// 캐릭터 섹션 필드 생성
// ============================================================

function createCharacterFields(containerId, groups, prefix) {
  const root = document.getElementById(containerId);
  if (!root) return;

  root.innerHTML = "";

  const sections = [
    ["common", "공통", groups.common, true],
    ["normal", "일반", groups.normal, false],
    ["break", "격파 / 슈퍼 격파", groups.break, false],
    ["elation", "환락", groups.elation, false]
  ];

  for (const [key, title, fields, open] of sections) {
    const details = document.createElement("details");
    details.className = "character-section";
    details.dataset.section = key;
    details.open = open;

    const summary = document.createElement("summary");
    summary.textContent = title;

    const fieldsRoot = document.createElement("div");
    fieldsRoot.className = "section-fields";
    fieldsRoot.id = `${prefix}_${key}_fields`;

    details.append(summary, fieldsRoot);
    root.appendChild(details);

    createFields(
      fieldsRoot.id,
      fields,
      `${prefix}_${key}`
    );
  }
}


// ============================================================
// 데미지 타입에 따라 관련 섹션 자동 열기
// ============================================================

function updateCharacterSections() {
  const typeElement =
    document.getElementById("dmg_damageType");

  if (!typeElement) return;

  const type = typeElement.value;

  const openSection =
    type === "NORMAL"
      ? "normal"
      : type === "BREAK" || type === "SUPER_BREAK"
        ? "break"
        : "elation";

  [
    "char1Fields",
    "char2Fields",
    "char3Fields",
    "char4Fields"
  ].forEach(containerId => {
    const root = document.getElementById(containerId);
    if (!root) return;

    root.querySelectorAll(".character-section").forEach(section => {
      if (section.dataset.section === openSection) {
        section.open = true;
      }
    });
  });
}


// ============================================================
// 그룹 읽기
// ============================================================

function readGroup(fields, prefix) {
  const out = {};

  for (const [key, , type] of fields) {
    const el = document.getElementById(`${prefix}_${key}`);
    if (!el) continue;

    if (type === "select") {
      out[key] = el.value;
    } else {
      out[key] =
        type === "percent"
          ? pct(el.value)
          : num(el.value);
    }
  }

  return out;
}


// ============================================================
// 캐릭터 섹션 읽기
// ============================================================

function readCharacterGroup(groups, prefix) {
  return {
    ...readGroup(groups.common, `${prefix}_common`),
    ...readGroup(groups.normal, `${prefix}_normal`),
    ...readGroup(groups.break, `${prefix}_break`),
    ...readGroup(groups.elation, `${prefix}_elation`)
  };
}


// ============================================================
// 저장값 불러오기
// ============================================================

function writeGroup(fields, prefix, obj) {
  for (const [key, , type, def] of fields) {
    const el = document.getElementById(`${prefix}_${key}`);
    if (!el) continue;

    const value = obj?.[key];

    if (value === undefined) {
      el.value = def;
      continue;
    }

    el.value =
      type === "percent"
        ? num(value) * 100
        : value;
  }
}


// ============================================================
// 캐릭터 섹션 저장값 불러오기
// ============================================================

function writeCharacterGroup(groups, prefix, obj) {
  writeGroup(groups.common, `${prefix}_common`, obj);
  writeGroup(groups.normal, `${prefix}_normal`, obj);
  writeGroup(groups.break, `${prefix}_break`, obj);
  writeGroup(groups.elation, `${prefix}_elation`, obj);
}


// ============================================================
// 전체 입력값 수집
// ============================================================

function collect() {
  const enemy = readGroup(
    FIELD_GROUPS.enemy,
    "enemy"
  );

  const character1 = readCharacterGroup(
    {
      common: FIELD_GROUPS.char1_common,
      normal: FIELD_GROUPS.char1_normal,
      break: FIELD_GROUPS.char1_break,
      elation: FIELD_GROUPS.char1_elation
    },
    "c1"
  );

  // 캐릭터 기초 스탯 + 광추 기초 스탯
  character1.attack_base +=
    character1.lightcone_attack_base;

  character1.hp_base +=
    character1.lightcone_hp_base;

  character1.defense_base +=
    character1.lightcone_defense_base;


  const character2 = readCharacterGroup(
    {
      common: FIELD_GROUPS.buff_common,
      normal: FIELD_GROUPS.buff_normal,
      break: FIELD_GROUPS.buff_break,
      elation: FIELD_GROUPS.buff_elation
    },
    "c2"
  );

  const character3 = readCharacterGroup(
    {
      common: FIELD_GROUPS.buff_common,
      normal: FIELD_GROUPS.buff_normal,
      break: FIELD_GROUPS.buff_break,
      elation: FIELD_GROUPS.buff_elation
    },
    "c3"
  );

  const character4 = readCharacterGroup(
    {
      common: FIELD_GROUPS.buff_common,
      normal: FIELD_GROUPS.buff_normal,
      break: FIELD_GROUPS.buff_break,
      elation: FIELD_GROUPS.buff_elation
    },
    "c4"
  );


  return {
    enemy,

    character1,
    character2,
    character3,
    character4,

    buff2Enabled:
      document.getElementById("buff2Enabled").checked,

    buff3Enabled:
      document.getElementById("buff3Enabled").checked,

    buff4Enabled:
      document.getElementById("buff4Enabled").checked,

    damage:
      readGroup(FIELD_GROUPS.damage, "dmg"),

    names: {
      enemy:
        document.getElementById("enemyName").value,

      character1:
        document.getElementById("char1Name").value,

      character2:
        document.getElementById("char2Name").value,

      character3:
        document.getElementById("char3Name").value,

      character4:
        document.getElementById("char4Name").value
    },

    saveName:
      document.getElementById("saveName").value
  };
}


// ============================================================
// 계산
// ============================================================

function calculate() {
  const data = collect();

  const pool =
    buildFinalPool(data);

  const stats =
    finalStats(pool);

  const damage =
    data.damage;

  const enemy = {
    ...data.enemy
  };


  // ==========================================================
  // 아군이 적에게 적용하는 효과
  // ==========================================================

  enemy.defense_ignore =
    Math.min(
      enemy.defense_ignore +
      pool.defense_ignore,
      1.0
    );

  enemy.defense_penetration =
    Math.min(
      enemy.defense_penetration +
      pool.defense_penetration,
      1.0
    );

  enemy.resistance_penetration =
    enemy.resistance_penetration +
    pool.resistance_penetration;

  enemy.damage_taken_increase =
    Math.min(
      enemy.damage_taken_increase +
      pool.damage_taken_increase,
      2.5
    );


  // ==========================================================
  // 최종 피해 증가
  // ==========================================================

  const finalMods = {
    increase_1:
      damage.final_damage_increase_1,

    increase_2:
      damage.final_damage_increase_2,

    increase_3:
      damage.final_damage_increase_3,

    confirmed_damage:
      pool.confirmed_damage
  };


  let result;


  // ==========================================================
  // 일반 / 치명타
  // ==========================================================

  if (damage.damageType === "NORMAL") {

    result = normalDamage(
      stats,
      enemy,
      {
        attack_ratio:
          damage.attack_ratio,

        hp_ratio:
          damage.hp_ratio,

        defense_ratio:
          damage.defense_ratio
      },
      finalMods,
      {
        dealt_damage_increase:
          pool.dealt_damage_increase
      }
    );

  }


  // ==========================================================
  // 격파
  // ==========================================================

  else if (damage.damageType === "BREAK") {

    result = breakDamage(
      {
        break_effect:
          pool.break_effect,

        max_toughness:
          damage.max_toughness,

        break_element:
          damage.break_element
      },
      enemy,
      finalMods,
      {
        break_damage_increase:
          pool.break_damage_increase
      }
    );

  }


  // ==========================================================
  // 슈퍼 격파
  // ==========================================================

  else if (damage.damageType === "SUPER_BREAK") {

    result = superBreakDamage(
      {
        break_effect:
          pool.break_effect,

        toughness_damage:
          damage.toughness_damage
      },
      enemy,
      finalMods,
      {
        super_break_multiplier:
          pool.super_break_multiplier,

        break_damage_increase:
          pool.break_damage_increase
      }
    );

  }


  // ==========================================================
  // 환락
  // ==========================================================

  else {

    result = elationDamage(
      {
        skill_multiplier:
          damage.skill_multiplier,

        elation_level:
          pool.elation,

        laugh_points:
          pool.laugh_points,

        crit_rate:
          pool.crit_rate,

        crit_damage:
          pool.crit_damage
      },
      enemy,
      finalMods,
      {
        elation_increase:
          pool.elation_increase
      }
    );
  }


  renderResult(
    result,
    stats,
    pool,
    enemy,
    damage.damageType
  );
}


// ============================================================
// 숫자 표시
// ============================================================

function fmt(x) {
  return Number(x || 0)
    .toLocaleString(
      "ko-KR",
      {
        maximumFractionDigits: 4
      }
    );
}

function pctDisplay(x) {
  return `${(
    Number(x || 0) * 100
  ).toFixed(2)}%`;
}


// ============================================================
// 결과 표시
// ============================================================

function renderResult(
  result,
  stats,
  pool,
  enemy,
  type
) {
  const main =
    result.expected_damage ??
    result.final_damage ??
    result.crit_damage ??
    0;


  const typeLabel = {
    NORMAL:
      "일반 / 치명타",

    BREAK:
      "격파",

    SUPER_BREAK:
      "슈퍼 격파",

    ELATION:
      "환락"

  }[type] || type;


  let html = `
    <div class="result-main">
      ${fmt(main)}
    </div>

    <div class="result-subtitle">
      ${typeLabel}
    </div>
  `;


  // ==========================================================
  // 최종 캐릭터 스탯
  // ==========================================================

  html += `
    <h3 class="result-section-title">
      최종 캐릭터 스탯
    </h3>

    <div class="result-grid">

      <div class="result-item">
        <span>공격력</span>
        <strong>
          ${fmt(stats.attack)}
        </strong>
      </div>

      <div class="result-item">
        <span>HP</span>
        <strong>
          ${fmt(stats.hp)}
        </strong>
      </div>

      <div class="result-item">
        <span>방어력</span>
        <strong>
          ${fmt(stats.defense)}
        </strong>
      </div>

      <div class="result-item">
        <span>치명타 확률</span>
        <strong>
          ${pctDisplay(pool.crit_rate)}
        </strong>
      </div>

      <div class="result-item">
        <span>치명타 피해</span>
        <strong>
          ${pctDisplay(pool.crit_damage)}
        </strong>
      </div>

    </div>
  `;


  // ==========================================================
  // 공통 / 최종 버프
  // ==========================================================

  html += `
    <h3 class="result-section-title">
      공통 / 최종 버프
    </h3>

    <div class="result-grid">

      ${
        type === "NORMAL"
          ? `
            <div class="result-item">
              <span>가하는 피해 증가</span>
              <strong>
                ${pctDisplay(pool.dealt_damage_increase)}
              </strong>
            </div>
          `
          : ""
      }

      <div class="result-item">
        <span>확정 피해</span>
        <strong>
          ${pctDisplay(pool.confirmed_damage)}
        </strong>
      </div>

      <div class="result-item">
        <span>적 받는 피해 증가</span>
        <strong>
          ${pctDisplay(enemy.damage_taken_increase)}
        </strong>
      </div>

      <div class="result-item">
        <span>적 받는 피해 감소 1</span>
        <strong>
          ${pctDisplay(enemy.damage_taken_reduction)}
        </strong>
      </div>

      <div class="result-item">
        <span>적 받는 피해 감소 2</span>
        <strong>
          ${pctDisplay(enemy.damage_taken_reduction_2)}
        </strong>
      </div>

      <div class="result-item">
        <span>적 받는 피해 감소 3</span>
        <strong>
          ${pctDisplay(enemy.damage_taken_reduction_3)}
        </strong>
      </div>

      <div class="result-item">
        <span>방어력 무시</span>
        <strong>
          ${pctDisplay(enemy.defense_ignore)}
        </strong>
      </div>

      <div class="result-item">
        <span>방어력 관통</span>
        <strong>
          ${pctDisplay(enemy.defense_penetration)}
        </strong>
      </div>

      <div class="result-item">
        <span>속성 저항 관통</span>
        <strong>
          ${pctDisplay(enemy.resistance_penetration)}
        </strong>
      </div>

      <div class="result-item">
        <span>약점 격파 상태</span>
        <strong>
          ${enemy.is_broken === "YES" ? "O" : "X"}
        </strong>
      </div>

    </div>
  `;


  // ==========================================================
  // 일반 전용
  // ==========================================================

  if (type === "NORMAL") {
    html += `
      <h3 class="result-section-title">
        일반 / 치명타
      </h3>

      <div class="result-grid">

        <div class="result-item">
          <span>가하는 피해 감소 1</span>
          <strong>
            ${pctDisplay(enemy.dealt_damage_reduction_1)}
          </strong>
        </div>

        <div class="result-item">
          <span>가하는 피해 감소 2</span>
          <strong>
            ${pctDisplay(enemy.dealt_damage_reduction_2)}
          </strong>
        </div>

        <div class="result-item">
          <span>가하는 피해 감소 3</span>
          <strong>
            ${pctDisplay(enemy.dealt_damage_reduction_3)}
          </strong>
        </div>

      </div>
    `;
  }


  // ==========================================================
  // 격파 / 슈퍼 격파
  // ==========================================================

  if (
    type === "BREAK" ||
    type === "SUPER_BREAK"
  ) {
    html += `
      <h3 class="result-section-title">
        격파 / 슈퍼 격파
      </h3>

      <div class="result-grid">

        <div class="result-item">
          <span>가하는 격파 피해 증가</span>
          <strong>
            ${pctDisplay(pool.break_damage_increase)}
          </strong>
        </div>

        <div class="result-item">
          <span>격파 특수효과</span>
          <strong>
            ${pctDisplay(pool.break_effect)}
          </strong>
        </div>

        ${
          type === "SUPER_BREAK"
            ? `
              <div class="result-item">
                <span>슈퍼 격파 계수</span>
                <strong>
                  ${pctDisplay(pool.super_break_multiplier)}
                </strong>
              </div>
            `
            : ""
        }

      </div>
    `;
  }


  // ==========================================================
  // 환락
  // ==========================================================

  if (type === "ELATION") {
    html += `
      <h3 class="result-section-title">
        환락
      </h3>

      <div class="result-grid">

        <div class="result-item">
          <span>증소</span>
          <strong>
            ${pctDisplay(pool.elation_increase)}
          </strong>
        </div>

        <div class="result-item">
          <span>환락도</span>
          <strong>
            ${pctDisplay(pool.elation)}
          </strong>
        </div>

        <div class="result-item">
          <span>웃음 포인트</span>
          <strong>
            ${fmt(pool.laugh_points)}
          </strong>
        </div>

      </div>
    `;
  }


  // ==========================================================
  // 실제 적용된 계수
  // ==========================================================

  if (result.common_multiplier !== undefined) {

    html += `
      <h3 class="result-section-title">
        적용된 계수
      </h3>

      <div class="result-grid">

        <div class="result-item">
          <span>공통 계수</span>
          <strong>
            ×${fmt(result.common_multiplier)}
          </strong>
        </div>

        ${
          result.dealt_damage_multiplier !== undefined
            ? `
              <div class="result-item">
                <span>가하는 피해 증가 계수</span>
                <strong>
                  ×${fmt(result.dealt_damage_multiplier)}
                </strong>
              </div>
            `
            : ""
        }

        ${
          result.dealt_damage_reduction_multiplier !== undefined
            ? `
              <div class="result-item">
                <span>가하는 피해 감소 계수</span>
                <strong>
                  ×${fmt(result.dealt_damage_reduction_multiplier)}
                </strong>
              </div>
            `
            : ""
        }

        ${
          result.damage_taken_increase_multiplier !== undefined
            ? `
              <div class="result-item">
                <span>받는 피해 증가 계수</span>
                <strong>
                  ×${fmt(result.damage_taken_increase_multiplier)}
                </strong>
              </div>
            `
            : ""
        }

        ${
          result.defense_multiplier !== undefined
            ? `
              <div class="result-item">
                <span>방어력 계수</span>
                <strong>
                  ×${fmt(result.defense_multiplier)}
                </strong>
              </div>
            `
            : ""
        }

        ${
          result.resistance_multiplier !== undefined
            ? `
              <div class="result-item">
                <span>속성 저항 계수</span>
                <strong>
                  ×${fmt(result.resistance_multiplier)}
                </strong>
              </div>
            `
            : ""
        }

        ${
          result.damage_taken_reduction_multiplier !== undefined
            ? `
              <div class="result-item">
                <span>받는 피해 감소 계수</span>
                <strong>
                  ×${fmt(result.damage_taken_reduction_multiplier)}
                </strong>
              </div>
            `
            : ""
        }

        ${
          result.weakness_break_multiplier !== undefined
            ? `
              <div class="result-item">
                <span>격파 상태 계수</span>
                <strong>
                  ×${fmt(result.weakness_break_multiplier)}
                </strong>
              </div>
            `
            : ""
        }

        ${
          result.confirmed_damage_multiplier !== undefined
            ? `
              <div class="result-item">
                <span>확정 피해 계수</span>
                <strong>
                  ×${fmt(result.confirmed_damage_multiplier)}
                </strong>
              </div>
            `
            : ""
        }

        ${
          result.final_damage_multiplier !== undefined
            ? `
              <div class="result-item">
                <span>최종 피해 증가 계수</span>
                <strong>
                  ×${fmt(result.final_damage_multiplier)}
                </strong>
              </div>
            `
            : ""
        }

        ${
          result.break_type_multiplier !== undefined
            ? `
              <div class="result-item">
                <span>격파 속성 배율</span>
                <strong>
                  ×${fmt(result.break_type_multiplier)}
                </strong>
              </div>
            `
            : ""
        }

        ${
          result.break_damage_increase_multiplier !== undefined
            ? `
              <div class="result-item">
                <span>격파 피해 증가 계수</span>
                <strong>
                  ×${fmt(result.break_damage_increase_multiplier)}
                </strong>
              </div>
            `
            : ""
        }

        ${
          result.elation_multiplier !== undefined
            ? `
              <div class="result-item">
                <span>환락도 계수</span>
                <strong>
                  ×${fmt(result.elation_multiplier)}
                </strong>
              </div>
            `
            : ""
        }

        ${
          result.elation_increase_multiplier !== undefined
            ? `
              <div class="result-item">
                <span>증소 계수</span>
                <strong>
                  ×${fmt(result.elation_increase_multiplier)}
                </strong>
              </div>
            `
            : ""
        }

        ${
          result.crit_multiplier !== undefined
            ? `
              <div class="result-item">
                <span>치명타 계수</span>
                <strong>
                  ×${fmt(result.crit_multiplier)}
                </strong>
              </div>
            `
            : ""
        }

        ${
          result.expected_crit_multiplier !== undefined
            ? `
              <div class="result-item">
                <span>기대 치명타 계수</span>
                <strong>
                  ×${fmt(result.expected_crit_multiplier)}
                </strong>
              </div>
            `
            : ""
        }

      </div>
    `;
  }

  document.getElementById("result").innerHTML =
    html;
}


// ============================================================
// 저장
// ============================================================

function saveList() {
  return JSON.parse(
    localStorage.getItem("sr_damage_saves") ||
    "{}"
  );
}


function refreshSaves() {
  const select =
    document.getElementById("saveSelect");

  const saves =
    saveList();

  select.innerHTML = "";

  for (const name of Object.keys(saves)) {
    const option =
      document.createElement("option");

    option.value = name;
    option.textContent = name;

    select.appendChild(option);
  }
}


function saveCurrent() {
  const name =
    document.getElementById("saveName")
      .value
      .trim();

  if (!name) {
    alert("세팅 이름을 입력하세요.");
    return;
  }

  const saves =
    saveList();

  saves[name] =
    collect();

  localStorage.setItem(
    "sr_damage_saves",
    JSON.stringify(saves)
  );

  refreshSaves();

  document.getElementById(
    "saveSelect"
  ).value = name;
}


// ============================================================
// 불러오기
// ============================================================

function loadCurrent() {
  const name =
    document.getElementById("saveSelect")
      .value;

  const data =
    saveList()[name];

  if (!data) return;


  writeGroup(
    FIELD_GROUPS.enemy,
    "enemy",
    data.enemy
  );


  writeCharacterGroup(
    {
      common: FIELD_GROUPS.char1_common,
      normal: FIELD_GROUPS.char1_normal,
      break: FIELD_GROUPS.char1_break,
      elation: FIELD_GROUPS.char1_elation
    },
    "c1",
    data.character1
  );


  writeCharacterGroup(
    {
      common: FIELD_GROUPS.buff_common,
      normal: FIELD_GROUPS.buff_normal,
      break: FIELD_GROUPS.buff_break,
      elation: FIELD_GROUPS.buff_elation
    },
    "c2",
    data.character2
  );


  writeCharacterGroup(
    {
      common: FIELD_GROUPS.buff_common,
      normal: FIELD_GROUPS.buff_normal,
      break: FIELD_GROUPS.buff_break,
      elation: FIELD_GROUPS.buff_elation
    },
    "c3",
    data.character3
  );


  writeCharacterGroup(
    {
      common: FIELD_GROUPS.buff_common,
      normal: FIELD_GROUPS.buff_normal,
      break: FIELD_GROUPS.buff_break,
      elation: FIELD_GROUPS.buff_elation
    },
    "c4",
    data.character4
  );


  writeGroup(
    FIELD_GROUPS.damage,
    "dmg",
    data.damage
  );


  const names =
    data.names || {};


  document.getElementById(
    "enemyName"
  ).value =
    names.enemy || "";


  document.getElementById(
    "char1Name"
  ).value =
    names.character1 || "";


  document.getElementById(
    "char2Name"
  ).value =
    names.character2 || "";


  document.getElementById(
    "char3Name"
  ).value =
    names.character3 || "";


  document.getElementById(
    "char4Name"
  ).value =
    names.character4 || "";


  document.getElementById(
    "buff2Enabled"
  ).checked =
    data.buff2Enabled;


  document.getElementById(
    "buff3Enabled"
  ).checked =
    data.buff3Enabled;


  document.getElementById(
    "buff4Enabled"
  ).checked =
    data.buff4Enabled;


  document.getElementById(
    "saveName"
  ).value =
    name;

  updateCharacterSections();
}


// ============================================================
// 삭제
// ============================================================

function deleteCurrent() {
  const name =
    document.getElementById("saveSelect")
      .value;

  if (!name) return;

  const saves =
    saveList();

  delete saves[name];

  localStorage.setItem(
    "sr_damage_saves",
    JSON.stringify(saves)
  );

  refreshSaves();
}


// ============================================================
// 초기화
// ============================================================

function resetAll() {
  if (
    confirm(
      "모든 입력을 초기화할까요?"
    )
  ) {
    location.reload();
  }
}


// ============================================================
// 초기화 / 이벤트 연결
// ============================================================

createFields(
  "enemyFields",
  FIELD_GROUPS.enemy,
  "enemy"
);


createCharacterFields(
  "char1Fields",
  {
    common: FIELD_GROUPS.char1_common,
    normal: FIELD_GROUPS.char1_normal,
    break: FIELD_GROUPS.char1_break,
    elation: FIELD_GROUPS.char1_elation
  },
  "c1"
);


createCharacterFields(
  "char2Fields",
  {
    common: FIELD_GROUPS.buff_common,
    normal: FIELD_GROUPS.buff_normal,
    break: FIELD_GROUPS.buff_break,
    elation: FIELD_GROUPS.buff_elation
  },
  "c2"
);


createCharacterFields(
  "char3Fields",
  {
    common: FIELD_GROUPS.buff_common,
    normal: FIELD_GROUPS.buff_normal,
    break: FIELD_GROUPS.buff_break,
    elation: FIELD_GROUPS.buff_elation
  },
  "c3"
);


createCharacterFields(
  "char4Fields",
  {
    common: FIELD_GROUPS.buff_common,
    normal: FIELD_GROUPS.buff_normal,
    break: FIELD_GROUPS.buff_break,
    elation: FIELD_GROUPS.buff_elation
  },
  "c4"
);


createFields(
  "damageFields",
  FIELD_GROUPS.damage,
  "dmg"
);


const damageTypeSelect =
  document.getElementById(
    "dmg_damageType"
  );

if (damageTypeSelect) {
  damageTypeSelect.addEventListener(
    "change",
    updateCharacterSections
  );
}


refreshSaves();
updateCharacterSections();


document.getElementById(
  "calcBtn"
).onclick =
  calculate;


document.getElementById(
  "saveBtn"
).onclick =
  saveCurrent;


document.getElementById(
  "loadBtn"
).onclick =
  loadCurrent;


document.getElementById(
  "deleteBtn"
).onclick =
  deleteCurrent;


document.getElementById(
  "resetBtn"
).onclick =
  resetAll;
