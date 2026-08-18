const FIELD_GROUPS = {
  enemy: [
    ["level","적 레벨","number",95],
    ["resistance","속성 저항 (%)","percent",0],
    ["resistance_penetration","속성 저항 관통/감소 (%)","percent",0],
    ["defense_ignore","방어력 무시 (%)","percent",0],
    ["defense_penetration","방어력 감소 (%)","percent",0],
    ["damage_taken_increase","받는 피해 증가 (%)","percent",0],
    ["damage_taken_reduction","받는 피해 감소 (%)","percent",0]
  ],

  // ============================================================
  // 캐릭터 1 : 실제 계산 대상
  // ============================================================

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

    // 일반 데미지 전용
    ["dealt_damage_increase","가하는 피해 증가 (%)","percent",0],

    // 적에게 적용되는 버프
    ["damage_taken_increase","적 받는 피해 증가 (%)","percent",0],

    ["defense_ignore","방어력 무시 (%)","percent",0],
    ["defense_penetration","방어력 감소 (%)","percent",0],
    ["resistance_penetration","속성 저항 관통/감소 (%)","percent",0],

    // 모든 데미지 타입
    ["confirmed_damage","확정 피해 (%)","percent",0],

    // 환락 전용
    ["elation_increase","증소 (%)","percent",0],

    // 격파 / 슈퍼 격파 전용
    ["super_break_multiplier","슈퍼 격파 계수 (%)","percent",0],
    ["break_damage_increase","가하는 격파 피해 증가 (%)","percent",0],
    ["break_effect","격파 특수효과 (%)","percent",0],

    // 환락
    ["elation","환락도 (%)","percent",0],
    ["laugh_points","웃음 포인트","number",0]
  ],

  // ============================================================
  // 캐릭터 2~4 : 버프 제공자
  // 기초/광추 기초 스탯은 입력하지 않음
  // ============================================================

  buff: [
    ["attack_percent","공격력 (%)","percent",0],
    ["hp_percent","HP (%)","percent",0],
    ["defense_percent","방어력 (%)","percent",0],

    ["attack_flat","깡 공격력","number",0],
    ["hp_flat","깡 HP","number",0],
    ["defense_flat","깡 방어력","number",0],

    ["crit_rate","치명타 확률 (%)","percent",0],
    ["crit_damage","치명타 피해 (%)","percent",0],

    // 일반 데미지 전용
    ["dealt_damage_increase","가하는 피해 증가 (%)","percent",0],

    // 적에게 적용되는 버프
    ["damage_taken_increase","받는 피해 증가 (%)","percent",0],

    ["defense_ignore","방어력 무시 (%)","percent",0],
    ["defense_penetration","방어력 감소 (%)","percent",0],
    ["resistance_penetration","속성 저항 관통/감소 (%)","percent",0],

    // 모든 데미지 타입
    ["confirmed_damage","확정 피해 (%)","percent",0],

    // 환락 전용
    ["elation_increase","증소 (%)","percent",0],

    // 격파 / 슈퍼 격파 전용
    ["super_break_multiplier","슈퍼 격파 계수 (%)","percent",0],
    ["break_damage_increase","가하는 격파 피해 증가 (%)","percent",0],
    ["break_effect","격파 특수효과 (%)","percent",0],

    // 환락
    ["elation","환락도 (%)","percent",0],
    ["laugh_points","웃음 포인트","number",0]
  ],

  // ============================================================
  // 데미지 설정
  // ============================================================

  damage: [
    ["damageType","데미지 타입","select","NORMAL"],

    ["attack_ratio","공격력 계수 (%)","percent",100],
    ["hp_ratio","HP 계수 (%)","percent",0],
    ["defense_ratio","방어력 계수 (%)","percent",0],

    ["break_element","격파 속성","select","물리"],
    ["toughness_damage","강인성 감소 수치","number",0],
    ["max_toughness","적 최대 강인성","number",20],


    ["skill_multiplier","환락 스킬 계수 (%)","percent",100]

    ["final_damage_increase_1","최종 피해 증가 1 (%)","percent",0],
    ["final_damage_increase_2","최종 피해 증가 2 (%)","percent",0],
    ["final_damage_increase_3","최종 피해 증가 3 (%)","percent",0],
  ]
};


// ============================================================
// 입력 필드 생성
// ============================================================

function createFields(containerId, fields, prefix) {
  const root = document.getElementById(containerId);
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
// 그룹 읽기
// ============================================================

function readGroup(fields, prefix) {
  const out = {};

  for (const [key, , type] of fields) {
    const el = document.getElementById(`${prefix}_${key}`);

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
// 전체 입력값 수집
// ============================================================

function collect() {
  const enemy = readGroup(
    FIELD_GROUPS.enemy,
    "enemy"
  );

  const character1 = readGroup(
    FIELD_GROUPS.char1,
    "c1"
  );

  // 캐릭터 기초 스탯 + 광추 기초 스탯
  character1.attack_base +=
    character1.lightcone_attack_base;

  character1.hp_base +=
    character1.lightcone_hp_base;

  character1.defense_base +=
    character1.lightcone_defense_base;


  const character2 = readGroup(
    FIELD_GROUPS.buff,
    "c2"
  );

  const character3 = readGroup(
    FIELD_GROUPS.buff,
    "c3"
  );

  const character4 = readGroup(
    FIELD_GROUPS.buff,
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

  // 캐릭터 1~4의 버프 합산
  const pool = buildFinalPool(data);

  // 최종 캐릭터 스탯
  const stats = finalStats(pool);

  // 데미지 설정
  const damage = data.damage;

  // 적 스탯 복사
  const enemy = {
    ...data.enemy
  };

  // ==========================================================
  // 아군이 적에게 거는 효과
  // ==========================================================

  enemy.defense_ignore = Math.min(
    enemy.defense_ignore + pool.defense_ignore,
    1.0
  );

  enemy.defense_penetration = Math.min(
    enemy.defense_penetration + pool.defense_penetration,
    1.0
  );

  enemy.resistance_penetration =
    enemy.resistance_penetration +
    pool.resistance_penetration;

  // 받는 피해 증가 최대 250%
  enemy.damage_taken_increase = Math.min(
    enemy.damage_taken_increase +
    pool.damage_taken_increase,
    2.5
  );

  // ==========================================================
  // 최종 피해 증가류
  // 서로 독립이므로 damage.js에서 각각 곱연산
  // ==========================================================

  const finalMods = {
    increase_1: damage.final_damage_increase_1,
    increase_2: damage.final_damage_increase_2,
    increase_3: damage.final_damage_increase_3,

    confirmed_damage:
      pool.confirmed_damage
  };

  // ==========================================================
  // 데미지 계산
  // ==========================================================

  let result;

  // ----------------------------------------------------------
  // 일반 / 치명타
  // 가하는 피해 증가 적용
  // ----------------------------------------------------------

  if (damage.damageType === "NORMAL") {

    result = normalDamage(
      stats,
      enemy,
      {
        attack_ratio: damage.attack_ratio,
        hp_ratio: damage.hp_ratio,
        defense_ratio: damage.defense_ratio
      },
      finalMods,
      {
        dealt_damage_increase:
          pool.dealt_damage_increase
      }
    );

  }

  // ----------------------------------------------------------
  // 격파
  // 가하는 피해 증가 X
  // 가하는 격파 피해 증가 O
  // ----------------------------------------------------------

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

  // ----------------------------------------------------------
  // 슈퍼 격파
  // 가하는 피해 증가 X
  // 가하는 격파 피해 증가 O
  // 슈퍼 격파 계수는 캐릭터 1~4 버프
  // ----------------------------------------------------------

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

  // ----------------------------------------------------------
  // 환락
  // 가하는 피해 증가 X
  // 증소 O
  // ----------------------------------------------------------

  else if (damage.damageType === "ELATION") {

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
        <strong>${fmt(stats.attack)}</strong>
      </div>

      <div class="result-item">
        <span>HP</span>
        <strong>${fmt(stats.hp)}</strong>
      </div>

      <div class="result-item">
        <span>방어력</span>
        <strong>${fmt(stats.defense)}</strong>
      </div>

      <div class="result-item">
        <span>치명타 확률</span>
        <strong>${pctDisplay(pool.crit_rate)}</strong>
      </div>

      <div class="result-item">
        <span>치명타 피해</span>
        <strong>${pctDisplay(pool.crit_damage)}</strong>
      </div>

    </div>
  `;


  // ==========================================================
  // 공통 / 최종
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
        <span>적 받는 피해 감소</span>
        <strong>
          ${pctDisplay(enemy.damage_taken_reduction)}
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

    </div>
  `;


  // ==========================================================
  // 타입별 버프
  // ==========================================================

  html += `
    <h3 class="result-section-title">
      데미지 타입별 버프
    </h3>

    <div class="result-grid">
  `;


  if (
    type === "BREAK" ||
    type === "SUPER_BREAK"
  ) {
    html += `
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
    `;
  }


  if (type === "ELATION") {
    html += `
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
    `;
  }


  if (type === "SUPER_BREAK") {
    html += `
      <div class="result-item">
        <span>슈퍼 격파 계수</span>
        <strong>
          ${pctDisplay(damage.super_break_multiplier)}
        </strong>
      </div>
    `;
  }


  html += `
    </div>
  `;


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

  const saves = saveList();

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

  const saves = saveList();

  saves[name] = collect();

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

  writeGroup(
    FIELD_GROUPS.char1,
    "c1",
    data.character1
  );

  writeGroup(
    FIELD_GROUPS.buff,
    "c2",
    data.character2
  );

  writeGroup(
    FIELD_GROUPS.buff,
    "c3",
    data.character3
  );

  writeGroup(
    FIELD_GROUPS.buff,
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
  ).value = name;
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

createFields(
  "char1Fields",
  FIELD_GROUPS.char1,
  "c1"
);

createFields(
  "char2Fields",
  FIELD_GROUPS.buff,
  "c2"
);

createFields(
  "char3Fields",
  FIELD_GROUPS.buff,
  "c3"
);

createFields(
  "char4Fields",
  FIELD_GROUPS.buff,
  "c4"
);

createFields(
  "damageFields",
  FIELD_GROUPS.damage,
  "dmg"
);

refreshSaves();


document.getElementById(
  "calcBtn"
).onclick = calculate;


document.getElementById(
  "saveBtn"
).onclick = saveCurrent;


document.getElementById(
  "loadBtn"
).onclick = loadCurrent;


document.getElementById(
  "deleteBtn"
).onclick = deleteCurrent;


document.getElementById(
  "resetBtn"
).onclick = resetAll;
