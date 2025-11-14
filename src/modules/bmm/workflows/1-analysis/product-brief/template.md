# 제품 브리프: {{project_name}}

**날짜:** {{date}}
**작성자:** {{user_name}}
**컨텍스트:** {{context_type}}

---

## 요약

{{executive_summary}}

---

## 핵심 비전

### 문제 정의

{{problem_statement}}

{{#if problem_impact}}

### 문제 영향

{{problem_impact}}
{{/if}}

{{#if existing_solutions_gaps}}

### 기존 솔루션이 부족한 이유

{{existing_solutions_gaps}}
{{/if}}

### 제안된 솔루션

{{proposed_solution}}

{{#if key_differentiators}}

### 주요 차별화 요소

{{key_differentiators}}
{{/if}}

---

## 대상 사용자

### 주요 사용자

{{primary_user_segment}}

{{#if secondary_user_segment}}

### 보조 사용자

{{secondary_user_segment}}
{{/if}}

{{#if user_journey}}

### 사용자 여정

{{user_journey}}
{{/if}}

---

{{#if success_metrics}}

## 성공 메트릭

{{success_metrics}}

{{#if business_objectives}}

### 비즈니스 목표

{{business_objectives}}
{{/if}}

{{#if key_performance_indicators}}

### 핵심 성과 지표

{{key_performance_indicators}}
{{/if}}
{{/if}}

---

## MVP 범위

### 핵심 기능

{{core_features}}

{{#if out_of_scope}}

### MVP 범위 외

{{out_of_scope}}
{{/if}}

{{#if mvp_success_criteria}}

### MVP 성공 기준

{{mvp_success_criteria}}
{{/if}}

{{#if future_vision_features}}

### 미래 비전

{{future_vision_features}}
{{/if}}

---

{{#if market_analysis}}

## 시장 컨텍스트

{{market_analysis}}
{{/if}}

{{#if financial_considerations}}

## 재정 고려사항

{{financial_considerations}}
{{/if}}

{{#if technical_preferences}}

## 기술적 선호도

{{technical_preferences}}
{{/if}}

{{#if organizational_context}}

## 조직 컨텍스트

{{organizational_context}}
{{/if}}

{{#if risks_and_assumptions}}

## 위험 및 가정

{{risks_and_assumptions}}
{{/if}}

{{#if timeline_constraints}}

## 타임라인

{{timeline_constraints}}
{{/if}}

{{#if supporting_materials}}

## 지원 자료

{{supporting_materials}}
{{/if}}

---

_이 제품 브리프는 {{project_name}}에 대한 비전과 요구사항을 캡처합니다._

_협력적 발견을 통해 생성되었으며 이 {{context_type}} 프로젝트의 고유한 요구를 반영합니다._

{{#if next_workflow}}
_다음: {{next_workflow}}가 이 브리프를 자세한 계획 아티팩트로 변환합니다._
{{else}}
_다음: PRD 워크플로우를 사용하여 이 브리프에서 자세한 제품 요구사항을 생성합니다._
{{/if}}
