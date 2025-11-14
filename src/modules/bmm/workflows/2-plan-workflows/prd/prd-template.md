# {{project_name}} - 제품 요구사항 문서

**작성자:** {{user_name}}
**날짜:** {{date}}
**버전:** 1.0

---

## 요약

{{vision_alignment}}

### 이것을 특별하게 만드는 것

{{product_magic_essence}}

---

## 프로젝트 분류

**기술 유형:** {{project_type}}
**도메인:** {{domain_type}}
**복잡도:** {{complexity_level}}

{{project_classification}}

{{#if domain_context_summary}}

### 도메인 컨텍스트

{{domain_context_summary}}
{{/if}}

---

## 성공 기준

{{success_criteria}}

{{#if business_metrics}}

### 비즈니스 지표

{{business_metrics}}
{{/if}}

---

## 제품 범위

### MVP - 최소 기능 제품

{{mvp_scope}}

### 성장 기능 (Post-MVP)

{{growth_features}}

### 비전 (미래)

{{vision_features}}

---

{{#if domain_considerations}}

## 도메인별 요구사항

{{domain_considerations}}

이 섹션은 아래의 모든 기능 및 비기능 요구사항을 형성합니다.
{{/if}}

---

{{#if innovation_patterns}}

## 혁신 및 새로운 패턴

{{innovation_patterns}}

### 검증 접근 방식

{{validation_approach}}
{{/if}}

---

{{#if project_type_requirements}}

## {{project_type}} 특정 요구사항

{{project_type_requirements}}

{{#if endpoint_specification}}

### API 사양

{{endpoint_specification}}
{{/if}}

{{#if authentication_model}}

### 인증 및 권한 부여

{{authentication_model}}
{{/if}}

{{#if platform_requirements}}

### 플랫폼 지원

{{platform_requirements}}
{{/if}}

{{#if device_features}}

### 장치 기능

{{device_features}}
{{/if}}

{{#if tenant_model}}

### 다중 테넌시 아키텍처

{{tenant_model}}
{{/if}}

{{#if permission_matrix}}

### 권한 및 역할

{{permission_matrix}}
{{/if}}
{{/if}}

---

{{#if ux_principles}}

## 사용자 경험 원칙

{{ux_principles}}

### 주요 상호작용

{{key_interactions}}
{{/if}}

---

## 기능 요구사항

{{functional_requirements_complete}}

---

## 비기능 요구사항

{{#if performance_requirements}}

### 성능

{{performance_requirements}}
{{/if}}

{{#if security_requirements}}

### 보안

{{security_requirements}}
{{/if}}

{{#if scalability_requirements}}

### 확장성

{{scalability_requirements}}
{{/if}}

{{#if accessibility_requirements}}

### 접근성

{{accessibility_requirements}}
{{/if}}

{{#if integration_requirements}}

### 통합

{{integration_requirements}}
{{/if}}

{{#if no_nfrs}}
_이 프로젝트 유형에 대해 식별된 특정 비기능 요구사항이 없습니다._
{{/if}}

---

## 구현 기획

### 에픽 분해 필요

요구사항은 에픽과 작은 스토리로 분해되어야 합니다 (200k 컨텍스트 제한).

**다음 단계:** `workflow epics-stories`를 실행하여 구현 분해를 생성하세요.

---

## 참조

{{#if product_brief_path}}

- 제품 브리프: {{product_brief_path}}
  {{/if}}
  {{#if domain_brief_path}}
- 도메인 브리프: {{domain_brief_path}}
  {{/if}}
  {{#if research_documents}}
- 리서치: {{research_documents}}
  {{/if}}

---

## 다음 단계

1. **에픽 & 스토리 분해** - 실행: `workflow epics-stories`
2. **UX 디자인** (UI가 있는 경우) - 실행: `workflow ux-design`
3. **아키텍처** - 실행: `workflow create-architecture`

---

_이 PRD는 {{project_name}}의 본질을 포착합니다 - {{product_magic_summary}}_

_{{user_name}}과 AI 촉진자 간의 협력적 발견을 통해 생성되었습니다._
