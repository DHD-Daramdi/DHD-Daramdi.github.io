from dataclasses import dataclass
from enum import Enum


# ============================================================
# 기본 상수
# ============================================================

CHARACTER_LEVEL = 80

BREAK_BASE_DAMAGE = 3767.5533
ELATION_BASE_DAMAGE = 7535.1070


# ============================================================
# 데미지 타입
# ============================================================

class DamageType(Enum):
    NORMAL = "일반 / 치명타"
    BREAK = "격파"
    ELATION = "환락"
    SUPER_BREAK = "슈퍼 격파"


# ============================================================
# 적 스탯
# ============================================================

@dataclass
class EnemyStats:

    level: int = 95

    # 속성 저항
    resistance: float = 0.0

    # 속성 저항 관통
    resistance_penetration: float = 0.0

    # 방어력 무시
    defense_ignore: float = 0.0

    # 방어력 관통
    defense_penetration: float = 0.0

    # 적 받는 피해 증가
    damage_taken_increase: float = 0.0

    # 적 받는 피해 감소
    damage_taken_reduction: float = 0.0


# ============================================================
# 최종 데미지 증가
# ============================================================

@dataclass
class FinalDamageModifiers:

    increase_1: float = 0.0
    increase_2: float = 0.0
    increase_3: float = 0.0

    # 확정 피해: 모든 데미지 타입에 적용
    confirmed_damage: float = 0.0

    # 증소: 환락 데미지에만 적용
    elation_increase: float = 0.0

    # 가하는 격파 피해 증가: 격파 / 슈퍼 격파에 적용
    break_damage_increase: float = 0.0


# ============================================================
# 일반 / 치명타
# ============================================================

@dataclass
class CharacterStats:

    attack: float = 0.0
    hp: float = 0.0
    defense: float = 0.0

    crit_rate: float = 0.0
    crit_damage: float = 0.0


@dataclass
class SkillScaling:

    attack_ratio: float = 0.0
    hp_ratio: float = 0.0
    defense_ratio: float = 0.0

    damage_bonus: float = 0.0


# ============================================================
# 격파
# ============================================================
class BreakElement(Enum):
    PHYSICAL = "물리"
    FIRE = "화염"
    ICE = "얼음"
    LIGHTNING = "번개"
    WIND = "바람"
    QUANTUM = "양자"
    IMAGINARY = "허수"


BREAK_ELEMENT_MULTIPLIERS = {
    BreakElement.PHYSICAL.value: 2.0,
    BreakElement.FIRE.value: 2.0,
    BreakElement.ICE.value: 1.0,
    BreakElement.LIGHTNING.value: 1.0,
    BreakElement.WIND.value: 1.5,
    BreakElement.QUANTUM.value: 0.5,
    BreakElement.IMAGINARY.value: 0.5,
}

@dataclass
class BreakStats:

    break_effect: float = 0.0

    toughness_damage: float = 0.0

    max_toughness: float = 0.0

    super_break_multiplier: float = 0.0

    break_element: str = "물리"



# ============================================================
# 환락
# ============================================================

@dataclass
class ElationStats:

    # 환락 스킬 계수
    skill_multiplier: float = 1.0

    # 환락도
    elation_level: float = 0.0

    # 웃음 포인트
    laugh_points: float = 0.0

    # 치명타 확률
    crit_rate: float = 0.0

    # 치명타 피해
    crit_damage: float = 0.0


# ============================================================
# 공통 계산
# ============================================================

class CommonMultipliers:

    # --------------------------------------------------------
    # 방어력 계수
    # --------------------------------------------------------

    @staticmethod
    def defense(
        enemy_level: int,
        defense_ignore: float,
        defense_penetration: float,
    ) -> float:

        # 방어력 무시 + 방어력 관통
        total_ignore = (
            defense_ignore
            + defense_penetration
        )

        # 최대 100%
        total_ignore = min(
            total_ignore,
            1.0
        )

        numerator = (
            CHARACTER_LEVEL + 20.0
        )

        denominator = (
            numerator
            + (enemy_level + 20.0)
            * (1.0 - total_ignore)
        )

        return numerator / denominator

    # --------------------------------------------------------
    # 속성 저항 계수
    # --------------------------------------------------------

    @staticmethod
    def resistance(
        resistance: float,
        resistance_penetration: float,
    ) -> float:

        effective_resistance = (
            resistance
            - resistance_penetration
        )

        coefficient= (1.0-effective_resistance)

        return min(coefficient, 2.0)

    # --------------------------------------------------------
    # 최종 데미지 증가
    #
    # 각각 독립이므로 곱연산
    # --------------------------------------------------------

    @staticmethod
    def final_damage_increase(
        increase_1: float,
        increase_2: float,
        increase_3: float,
    ) -> float:

        return (
            (1.0 + increase_1)
            * (1.0 + increase_2)
            * (1.0 + increase_3)
        )

    # --------------------------------------------------------
    # 확정 피해
    # --------------------------------------------------------

    @staticmethod
    def confirmed_damage(value: float) -> float:
        return 1.0 + value

    # --------------------------------------------------------
    # 증소 (환락 전용)
    # --------------------------------------------------------

    @staticmethod
    def elation_increase(value: float) -> float:
        return 1.0 + value

    # --------------------------------------------------------
    # 가하는 격파 피해 증가 (격파 / 슈퍼 격파)
    # --------------------------------------------------------

    @staticmethod
    def break_damage_increase(value: float) -> float:
        return 1.0 + value

    # --------------------------------------------------------
    # 적 받는 피해 증가
    # --------------------------------------------------------

    @staticmethod
    def damage_taken_increase(
        value: float,
    ) -> float:
        value = min(value, 2.5)

        return 1.0 + value

    # --------------------------------------------------------
    # 적 받는 피해 감소
    # --------------------------------------------------------

    @staticmethod
    def damage_taken_reduction(
        value: float,
    ) -> float:

        return 1.0 - value

    # --------------------------------------------------------
    # 공통 계수 전체
    # --------------------------------------------------------

    @staticmethod
    def all_common_multipliers(
        enemy: EnemyStats,
        final_modifiers: FinalDamageModifiers,
    ) -> float:

        defense = CommonMultipliers.defense(
            enemy.level,
            enemy.defense_ignore,
            enemy.defense_penetration,
        )

        resistance = CommonMultipliers.resistance(
            enemy.resistance,
            enemy.resistance_penetration,
        )

        final_damage = (
            CommonMultipliers.final_damage_increase(
                final_modifiers.increase_1,
                final_modifiers.increase_2,
                final_modifiers.increase_3,
            )
        )

        damage_taken_increase = (
            CommonMultipliers.damage_taken_increase(
                enemy.damage_taken_increase
            )
        )

        damage_taken_reduction = (
            CommonMultipliers.damage_taken_reduction(
                enemy.damage_taken_reduction
            )
        )

        return (
            defense
            * resistance
            * final_damage
            * damage_taken_increase
            * damage_taken_reduction
        )


# ============================================================
# 일반 / 치명타 데미지
# ============================================================

class NormalDamageCalculator:

    @staticmethod
    def calculate_base_damage(
        character: CharacterStats,
        skill: SkillScaling,
    ) -> float:

        return (
            character.attack
            * skill.attack_ratio

            + character.hp
            * skill.hp_ratio

            + character.defense
            * skill.defense_ratio
        )

    # --------------------------------------------------------

    @staticmethod
    def calculate_crit_multiplier(
        crit_damage: float,
    ) -> float:

        return 1.0 + crit_damage

    # --------------------------------------------------------

    @staticmethod
    def calculate_expected_crit_multiplier(
        crit_rate: float,
        crit_damage: float,
    ) -> float:

        return (
            1.0
            + crit_rate
            * crit_damage
        )

    # --------------------------------------------------------

    @classmethod
    def calculate(
        cls,
        character: CharacterStats,
        enemy: EnemyStats,
        skill: SkillScaling,
        final_modifiers: FinalDamageModifiers,
    ) -> dict:

        base_damage = (
            cls.calculate_base_damage(
                character,
                skill,
            )
        )

        crit_multiplier = (
            cls.calculate_crit_multiplier(
                character.crit_damage
            )
        )

        expected_crit_multiplier = (
            cls.calculate_expected_crit_multiplier(
                character.crit_rate,
                character.crit_damage,
            )
        )

        skill_damage_multiplier = (
            1.0 + skill.damage_bonus
        )

        defense = CommonMultipliers.defense(
            enemy.level,
            enemy.defense_ignore,
            enemy.defense_penetration,
        )

        resistance = CommonMultipliers.resistance(
            enemy.resistance,
            enemy.resistance_penetration,
        )

        final_damage_increase = (
            CommonMultipliers.final_damage_increase(
                final_modifiers.increase_1,
                final_modifiers.increase_2,
                final_modifiers.increase_3,
            )
        )

        damage_taken_increase = (
            CommonMultipliers.damage_taken_increase(
                enemy.damage_taken_increase
            )
        )

        damage_taken_reduction = (
            CommonMultipliers.damage_taken_reduction(
                enemy.damage_taken_reduction
            )
        )

        confirmed_damage_multiplier = (
            CommonMultipliers.confirmed_damage(
                final_modifiers.confirmed_damage
            )
        )

        common_multiplier = (
            defense
            * resistance
            * final_damage_increase
            * damage_taken_increase
            * damage_taken_reduction
            * confirmed_damage_multiplier
        )

        normal_damage = (
            base_damage
            * skill_damage_multiplier
            * common_multiplier
        )

        crit_damage = (
            normal_damage
            * crit_multiplier
        )

        expected_damage = (
            base_damage
            * skill_damage_multiplier
            * expected_crit_multiplier
            * common_multiplier
        )

        return {

            "base_damage": base_damage,

            "normal_damage": normal_damage,

            "crit_damage": crit_damage,

            "expected_damage": expected_damage,

            "crit_multiplier": crit_multiplier,

            "expected_crit_multiplier":
                expected_crit_multiplier,

            "defense_multiplier":
                defense,

            "resistance_multiplier":
                resistance,

            "final_damage_multiplier":
                final_damage_increase,

            "damage_taken_increase":
                damage_taken_increase,

            "damage_taken_reduction":
                damage_taken_reduction,
        }


# ============================================================
# 격파 데미지
# ============================================================

class BreakDamageCalculator:

    @classmethod
    def calculate(
        cls,
        break_stats: BreakStats,
        enemy: EnemyStats,
        final_modifiers: FinalDamageModifiers,
    ) -> dict:

        base_damage = BREAK_BASE_DAMAGE

  

        toughness_multiplier = (
            0.5
            + break_stats.max_toughness / 40.0
        )

        break_effect_multiplier = (
            1.0
            + break_stats.break_effect
        )
        break_type_multiplier = (
            BREAK_ELEMENT_MULTIPLIERS[
                 break_stats.break_element
                  ]
        )

        defense = CommonMultipliers.defense(
            enemy.level,
            enemy.defense_ignore,
            enemy.defense_penetration,
        )

        resistance = CommonMultipliers.resistance(
            enemy.resistance,
            enemy.resistance_penetration,
        )

        final_damage_increase = (
            CommonMultipliers.final_damage_increase(
                final_modifiers.increase_1,
                final_modifiers.increase_2,
                final_modifiers.increase_3,
            )
        )

        damage_taken_increase = (
            CommonMultipliers.damage_taken_increase(
                enemy.damage_taken_increase
            )
        )

        damage_taken_reduction = (
            CommonMultipliers.damage_taken_reduction(
                enemy.damage_taken_reduction
            )
        )

        confirmed_damage_multiplier = (
            CommonMultipliers.confirmed_damage(
                final_modifiers.confirmed_damage
            )
        )

        break_damage_increase_multiplier = (
            CommonMultipliers.break_damage_increase(
                final_modifiers.break_damage_increase
            )
        )

        common_multiplier = (
            defense
            * resistance
            * final_damage_increase
            * damage_taken_increase
            * damage_taken_reduction
            * confirmed_damage_multiplier
            * break_damage_increase_multiplier
        )

        final_damage = (
            base_damage
            * toughness_multiplier
            * break_effect_multiplier
            * break_type_multiplier
            * common_multiplier
        )

        return {

            "base_damage":
                base_damage,
                
            "break_type_multiplier":
                 break_type_multiplier,

            "toughness_multiplier":
                toughness_multiplier,

            "break_effect_multiplier":
                break_effect_multiplier,

            "defense_multiplier":
                defense,

            "resistance_multiplier":
                resistance,

            "final_damage_multiplier":
                final_damage_increase,

            "damage_taken_increase":
                damage_taken_increase,

            "damage_taken_reduction":
                damage_taken_reduction,

            "final_damage":
                final_damage,
        }


# ============================================================
# 환락 데미지
# ============================================================

class ElationDamageCalculator:

    # --------------------------------------------------------
    # 웃음 포인트 계수
    #
    # (5 × 웃음 포인트)
    # -------------------
    # (웃음 포인트 + 240)
    # --------------------------------------------------------

    @staticmethod
    def calculate_laugh_multiplier(
        laugh_points: float,
    ) -> float:

        if laugh_points <= 0:
            return 0.0

        return (
            1.0+
            5.0
            * laugh_points
            / (laugh_points + 240.0)
        )

    # --------------------------------------------------------
    # 기대 치명타 계수
    # --------------------------------------------------------

    @staticmethod
    def calculate_crit_multiplier(
        crit_rate: float,
        crit_damage: float,
    ) -> float:

        return (
            1.0
            + crit_rate
            * crit_damage
        )

    # --------------------------------------------------------

    @classmethod
    def calculate(
        cls,
        elation_stats: ElationStats,
        enemy: EnemyStats,
        final_modifiers: FinalDamageModifiers,
    ) -> dict:

        # Lv.80 기본 환락 데미지
        base_damage = ELATION_BASE_DAMAGE

        # 환락 스킬 계수
        skill_multiplier = (
            elation_stats.skill_multiplier
        )

        # (1 + 환락도)
        elation_multiplier = (
            1.0
            + elation_stats.elation_level
        )

        # 웃음 포인트
        laugh_multiplier = (
            cls.calculate_laugh_multiplier(
                elation_stats.laugh_points
            )
        )

        # 치명타
        crit_multiplier = (
            cls.calculate_crit_multiplier(
                elation_stats.crit_rate,
                elation_stats.crit_damage,
            )
        )

        # ----------------------------------------------------
        # 공통 계수
        # ----------------------------------------------------

        defense = CommonMultipliers.defense(
            enemy.level,
            enemy.defense_ignore,
            enemy.defense_penetration,
        )

        resistance = CommonMultipliers.resistance(
            enemy.resistance,
            enemy.resistance_penetration,
        )

        final_damage_increase = (
            CommonMultipliers.final_damage_increase(
                final_modifiers.increase_1,
                final_modifiers.increase_2,
                final_modifiers.increase_3,
            )
        )

        damage_taken_increase = (
            CommonMultipliers.damage_taken_increase(
                enemy.damage_taken_increase
            )
        )

        damage_taken_reduction = (
            CommonMultipliers.damage_taken_reduction(
                enemy.damage_taken_reduction
            )
        )

        confirmed_damage_multiplier = (
            CommonMultipliers.confirmed_damage(
                final_modifiers.confirmed_damage
            )
        )

        elation_increase_multiplier = (
            CommonMultipliers.elation_increase(
                final_modifiers.elation_increase
            )
        )

        common_multiplier = (
            defense
            * resistance
            * final_damage_increase
            * damage_taken_increase
            * damage_taken_reduction
            * confirmed_damage_multiplier
            * elation_increase_multiplier
        )

        # ----------------------------------------------------
        # 최종 환락 데미지
        #
        # 7535.1070
        # × 스킬 계수
        # × (1 + 환락도)
        # × 웃음 포인트 계수
        # × 치명타
        # × 공통 계수
        # ----------------------------------------------------

        final_damage = (
            base_damage
            * skill_multiplier
            * elation_multiplier
            * laugh_multiplier
            * crit_multiplier
            * common_multiplier
        )

        return {

            "base_damage":
                base_damage,

            "skill_multiplier":
                skill_multiplier,

            "elation_multiplier":
                elation_multiplier,

            "laugh_multiplier":
                laugh_multiplier,

            "crit_multiplier":
                crit_multiplier,

            "defense_multiplier":
                defense,

            "resistance_multiplier":
                resistance,

            "final_damage_multiplier":
                final_damage_increase,

            "damage_taken_increase":
                damage_taken_increase,

            "damage_taken_reduction":
                damage_taken_reduction,

            "final_damage":
                final_damage,
        }



class SuperBreakDamageCalculator:

    @classmethod
    def calculate(
        cls,
        break_stats: BreakStats,
        enemy: EnemyStats,
        final_modifiers: FinalDamageModifiers,
    ) -> dict:

        # ----------------------------------------------------
        # Lv.80 기본 격파 데미지
        # ----------------------------------------------------

        base_damage = BREAK_BASE_DAMAGE

        # ----------------------------------------------------
        # 격파 특수효과
        # ----------------------------------------------------

        break_effect_multiplier = (
            1.0
            + break_stats.break_effect
        )

        # ----------------------------------------------------
        # 강인성 감소 수치 / 10
        # ----------------------------------------------------

        toughness_multiplier = (
            break_stats.toughness_damage / 10.0
        )

        # ----------------------------------------------------
        # 슈퍼 격파 계수
        #
        # 예:
        # 150% → 1 + 1.5 = 2.5
        # ----------------------------------------------------

        super_break_multiplier = (
            1.0
            + break_stats.super_break_multiplier
        )

        # ----------------------------------------------------
        # 공통 계수
        # ----------------------------------------------------

        defense = CommonMultipliers.defense(
            enemy.level,
            enemy.defense_ignore,
            enemy.defense_penetration,
        )

        resistance = CommonMultipliers.resistance(
            enemy.resistance,
            enemy.resistance_penetration,
        )

        final_damage_increase = (
            CommonMultipliers.final_damage_increase(
                final_modifiers.increase_1,
                final_modifiers.increase_2,
                final_modifiers.increase_3,
            )
        )

        damage_taken_increase = (
            CommonMultipliers.damage_taken_increase(
                enemy.damage_taken_increase
            )
        )

        damage_taken_reduction = (
            CommonMultipliers.damage_taken_reduction(
                enemy.damage_taken_reduction
            )
        )

        confirmed_damage_multiplier = (
            CommonMultipliers.confirmed_damage(
                final_modifiers.confirmed_damage
            )
        )

        break_damage_increase_multiplier = (
            CommonMultipliers.break_damage_increase(
                final_modifiers.break_damage_increase
            )
        )

        common_multiplier = (
            defense
            * resistance
            * final_damage_increase
            * damage_taken_increase
            * damage_taken_reduction
            * confirmed_damage_multiplier
            * break_damage_increase_multiplier
        )

        # ----------------------------------------------------
        # 최종 슈퍼 격파 데미지
        # ----------------------------------------------------

        final_damage = (
            base_damage
            * break_effect_multiplier
            * toughness_multiplier
            * super_break_multiplier
            * common_multiplier
        )

        return {

            "base_damage":
                base_damage,

            "break_effect_multiplier":
                break_effect_multiplier,

            "toughness_multiplier":
                toughness_multiplier,

            "super_break_multiplier":
                super_break_multiplier,

            "defense_multiplier":
                defense,

            "resistance_multiplier":
                resistance,

            "final_damage_multiplier":
                final_damage_increase,

            "damage_taken_increase":
                damage_taken_increase,

            "damage_taken_reduction":
                damage_taken_reduction,

            "final_damage":
                final_damage,
        }
