// ============================================================
// 속도 / 행동 수치 계산
// ============================================================

function clamp(value, min, max) {
  const n = Number(value);

  if (!Number.isFinite(n)) return min;
  return Math.min(Math.max(n, min), max);
}

function toFraction(value) {
  const n = Number(value);

  if (!Number.isFinite(n)) return 0;

  // 20 -> 0.20, 0.2 -> 0.20
  return Math.abs(n) > 1
    ? clamp(n / 100, 0, 1)
    : clamp(n, 0, 1);
}


// ============================================================
// 최종 속도
//
// (기초 속도 + 기초 속도 증가) × (1 + 속도%) + 깡 속도
// ============================================================

function finalSpeed(
  baseSpeed,
  speedPercent = 0,
  flatSpeed = 0,
  baseSpeedIncrease = 0
) {
  const base = Number(baseSpeed);
  const pct = Number(speedPercent);
  const flat = Number(flatSpeed);
  const baseIncrease = Number(baseSpeedIncrease);

  if (!Number.isFinite(base) || base <= 0) {
    return 0;
  }

  return (
    (base + (Number.isFinite(baseIncrease) ? baseIncrease : 0)) *
      (1 + (Number.isFinite(pct) ? pct : 0)) +
    (Number.isFinite(flat) ? flat : 0)
  );
}


// ============================================================
// 행동 수치
//
// 첫 행동 또는 특정 행동 앞에 적용되는 게이지 당김:
// (10000 × (1 - 증가율)) / 속도
// ============================================================

function calculateActionValue(speed, actionGaugeIncrease = 0) {
  const s = Number(speed);

  if (!Number.isFinite(s) || s <= 0) {
    return 0;
  }

  const gauge = toFraction(actionGaugeIncrease);

  return (10000 * (1 - gauge)) / s;
}

function getBaseActionInterval(speed) {
  const s = Number(speed);

  if (!Number.isFinite(s) || s <= 0) {
    return 0;
  }

  return 10000 / s;
}


// ============================================================
// 캐릭터 데이터 정규화
// ============================================================

function normalizeActor(actor, index = 0) {
  const speed = Number(actor?.speed);

  return {
    id: String(actor?.id ?? index + 1),
    name: String(actor?.name ?? actor?.id ?? `캐릭터 ${index + 1}`),
    speed: Number.isFinite(speed) ? speed : 0,
    initialGauge: toFraction(actor?.initialGauge ?? 0),
    order: Number.isFinite(Number(actor?.order)) ? Number(actor.order) : index
  };
}


// ============================================================
// 행동게이지 효과
//
// actorId + action 조합으로 한 턴에 적용할 값을 관리한다.
// 같은 턴에 다시 입력하면 기존 값을 교체한다.
// ============================================================

function normalizeGaugeEffects(effects = []) {
  const map = new Map();

  for (const effect of effects) {
    const actorId = String(effect?.actorId ?? "");
    const action = Math.floor(Number(effect?.action));

    if (!actorId || !Number.isFinite(action) || action < 1) {
      continue;
    }

    const amount = clamp(
      Number(effect?.amount) || 0,
      0,
      100
    );

    map.set(`${actorId}::${action}`, amount / 100);
  }

  return map;
}

function getGaugeEffect(effectMap, actorId, action) {
  return effectMap.get(`${actorId}::${action}`) || 0;
}


// ============================================================
// 캐릭터 1명의 행동 타임라인
//
// 첫 행동:
//   interval × (1 - 시작 게이지)
//
// 이후 행동:
//   직전 행동 시점 + interval × (1 - 해당 행동의 게이지)
//
// 따라서 A2가 20% 당겨지면 A2가 앞당겨지고,
// A3/A4/A5...도 A2의 새로운 시점을 기준으로 계속 이어진다.
// ============================================================

function calculateActorActions(actor, maxAV, effectMap) {
  const normalized = normalizeActor(actor, actor?.order ?? 0);
  const interval = getBaseActionInterval(normalized.speed);

  if (interval <= 0 || maxAV < 0) {
    return [];
  }

  const actions = [];
  let action = 1;
  let currentAV = 0;

  while (action <= 1000) {
    const gauge =
      action === 1
        ? normalized.initialGauge
        : getGaugeEffect(effectMap, normalized.id, action);

    if (action === 1) {
      currentAV = interval * (1 - gauge);
    } else {
      currentAV += interval * (1 - gauge);
    }

    if (currentAV > maxAV + 1e-9) {
      break;
    }

    actions.push({
      actorId: normalized.id,
      actorName: normalized.name,
      order: normalized.order,
      action,
      av: currentAV,
      gaugeIncrease: gauge * 100,
      speed: normalized.speed
    });

    action += 1;
  }

  return actions;
}


// ============================================================
// 전체 타임라인
// ============================================================

function calculateTimeline(actors = [], maxAV = 300, gaugeEffects = []) {
  const safeMaxAV = Math.max(0, Number(maxAV) || 0);
  const normalizedActors = actors
    .map((actor, index) => normalizeActor(actor, index))
    .filter(actor => actor.speed > 0);

  const effectMap = normalizeGaugeEffects(gaugeEffects);
  const timeline = [];

  for (const actor of normalizedActors) {
    timeline.push(
      ...calculateActorActions(actor, safeMaxAV, effectMap)
    );
  }

  // 같은 AV라면 입력 순서가 빠른 캐릭터가 위쪽.
  timeline.sort((a, b) => {
    const avDiff = a.av - b.av;

    if (Math.abs(avDiff) > 1e-9) {
      return avDiff;
    }

    const orderDiff = a.order - b.order;
    if (orderDiff !== 0) {
      return orderDiff;
    }

    return a.action - b.action;
  });

  return timeline;
}


// ============================================================
// 1차 기본 타임라인
// ============================================================

function calculateBaseTimeline(actors = [], maxAV = 300) {
  return calculateTimeline(actors, maxAV, []);
}


// ============================================================
// 행동게이지 효과 추가/변경
// ============================================================

function setActionGaugeEffect(
  gaugeEffects = [],
  actorId,
  action,
  amount
) {
  const safeActorId = String(actorId ?? "");
  const safeAction = Math.max(1, Math.floor(Number(action) || 1));
  const safeAmount = clamp(Number(amount) || 0, 0, 100);

  const next = gaugeEffects.filter(
    effect => !(
      String(effect.actorId) === safeActorId &&
      Number(effect.action) === safeAction
    )
  );

  if (safeAmount > 0) {
    next.push({
      actorId: safeActorId,
      action: safeAction,
      amount: safeAmount
    });
  }

  return next;
}

function applyActionGaugeEffect(
  gaugeEffects = [],
  actorId,
  action,
  amount
) {
  return setActionGaugeEffect(
    gaugeEffects,
    actorId,
    action,
    amount
  );
}

function applyActionGaugeEffects(
  gaugeEffects = [],
  effects = []
) {
  let next = gaugeEffects.slice();

  for (const effect of effects) {
    next = setActionGaugeEffect(
      next,
      effect?.actorId,
      effect?.action,
      effect?.amount
    );
  }

  return next;
}


// ============================================================
// 2차 타임라인 재계산
// ============================================================

function recalculateTimeline(
  actors = [],
  maxAV = 300,
  gaugeEffects = []
) {
  return calculateTimeline(
    actors,
    maxAV,
    gaugeEffects
  );
}

function addGaugeEffectAndRecalculate(
  actors = [],
  maxAV = 300,
  currentGaugeEffects = [],
  newEffect
) {
  const gaugeEffects = applyActionGaugeEffect(
    currentGaugeEffects,
    newEffect?.actorId,
    newEffect?.action,
    newEffect?.amount
  );

  return {
    gaugeEffects,
    timeline: recalculateTimeline(
      actors,
      maxAV,
      gaugeEffects
    )
  };
}


// ============================================================
// AV별 행동 횟수
// ============================================================

function countActionsWithinAV(timeline = [], limits = [150, 300]) {
  const result = {};

  for (const limitValue of limits) {
    const limit = Number(limitValue);
    const counts = {};

    if (!Number.isFinite(limit) || limit < 0) {
      result[limitValue] = counts;
      continue;
    }

    for (const action of timeline) {
      if (action.av <= limit + 1e-9) {
        counts[action.actorId] =
          (counts[action.actorId] || 0) + 1;
      }
    }

    result[limitValue] = counts;
  }

  return result;
}


// ============================================================
// 캐릭터별 그룹화
// ============================================================

function groupTimelineByActor(timeline = []) {
  const grouped = {};

  for (const action of timeline) {
    if (!grouped[action.actorId]) {
      grouped[action.actorId] = [];
    }

    grouped[action.actorId].push(action);
  }

  return grouped;
}


// ============================================================
// 기본 / 수정 타임라인 비교
// ============================================================

function compareTimelines(baseTimeline = [], modifiedTimeline = []) {
  const baseMap = new Map();

  for (const action of baseTimeline) {
    baseMap.set(
      `${action.actorId}::${action.action}`,
      action.av
    );
  }

  return modifiedTimeline.map(action => {
    const baseAV = baseMap.get(
      `${action.actorId}::${action.action}`
    );

    return {
      ...action,
      baseAV: baseAV ?? null,
      avDifference:
        baseAV === undefined
          ? null
          : action.av - baseAV
    };
  });
}


// ============================================================
// 기존 함수 호환
// ============================================================

function calculateActionTimeline(
  speed,
  actionGaugeIncreases = []
) {
  const actor = {
    id: "actor",
    name: "actor",
    speed: Number(speed),
    initialGauge: 0,
    order: 0
  };

  const effects = actionGaugeIncreases.map((increase, index) => ({
    actorId: "actor",
    action: index + 2,
    amount: increase
  }));

  const timeline = calculateTimeline(
    [actor],
    300,
    effects
  );

  return timeline.map((action, index, arr) => ({
    action: action.action,
    actionValue:
      index === 0
        ? action.av
        : action.av - arr[index - 1].av,
    cumulativeActionValue: action.av,
    gaugeIncrease: action.gaugeIncrease
  }));
}

function calculateActionCount(
  speed,
  limit,
  actionGaugeIncrease = 0
) {
  const timeline = calculateTimeline(
    [{
      id: "actor",
      name: "actor",
      speed,
      initialGauge: actionGaugeIncrease
    }],
    limit,
    []
  );

  return timeline.length;
}

function calculateSimpleSpeedCycle(
  speed,
  entries = [],
  limits = [150, 300]
) {
  const effects = [];
  let action = 2;

  for (const entry of entries) {
    const count = Math.max(
      0,
      Math.floor(Number(entry?.count) || 0)
    );

    for (let i = 0; i < count; i++) {
      effects.push({
        actorId: "actor",
        action,
        amount: entry?.increase ?? 0
      });

      action += 1;
    }
  }

  const maxAV = Math.max(...limits, 0);
  const timeline = calculateTimeline(
    [{
      id: "actor",
      name: "actor",
      speed,
      initialGauge: 0
    }],
    maxAV,
    effects
  );

  return {
    timeline,
    actionsWithin: countActionsWithinAV(
      timeline,
      limits
    )
  };
}
