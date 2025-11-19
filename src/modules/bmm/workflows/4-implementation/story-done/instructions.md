# 스토리 승인됨 워크플로우 지침 (DEV 에이전트)

<critical>워크플로우 실행 엔진은 다음에 의해 관리됩니다: {project-root}/{bmad_folder}/core/tasks/workflow.xml</critical>
<critical>다음을 이미 로드하고 처리했어야 합니다: {installed_path}/workflow.yaml</critical>
<critical>모든 응답을 {communication_language}로 통신합니다</critical>

<workflow>

<critical>이 워크플로우는 사용자가 스토리가 승인되었음을 확인한 후 (완료 정의가 완료됨) DEV 에이전트에 의해 실행됩니다</critical>
<critical>워크플로우: 스토리 파일 상태를 Done으로 업데이트</critical>

<step n="1" goal="Find reviewed story to mark done" tag="sprint-status">

<check if="{story_path} is provided">
  <action>Use {story_path} directly</action>
  <action>Read COMPLETE story file and parse sections</action>
  <action>Extract story_key from filename or story metadata</action>
  <action>Verify Status is "review" - if not, HALT with message: "Story status must be 'review' to mark as done"</action>
</check>

<check if="{story_path} is NOT provided">
  <critical>MUST read COMPLETE sprint-status.yaml file from start to end to preserve order</critical>
  <action>Load the FULL file: {output_folder}/sprint-status.yaml</action>
  <action>Read ALL lines from beginning to end - do not skip any content</action>
  <action>Parse the development_status section completely</action>

<action>Find FIRST story (reading in order from top to bottom) where: - Key matches pattern: number-number-name (e.g., "1-2-user-auth") - NOT an epic key (epic-X) or retrospective (epic-X-retrospective) - Status value equals "review"
</action>

  <check if="no story with status 'review' found">
    <output>📋 No stories with status "review" found

All stories are either still in development or already done.

**Next Steps:**

1. Run `dev-story` to implement stories
2. Run `code-review` if stories need review first
3. Check sprint-status.yaml for current story states
   </output>
   <action>HALT</action>
   </check>

<action>Use the first reviewed story found</action>
<action>Find matching story file in {story_dir} using story_key pattern</action>
<action>Read the COMPLETE story file</action>
</check>

<action>Extract story_id and story_title from the story file</action>

<action>Find the "Status:" line (usually at the top)</action>
<action>Update story file: Change Status to "done"</action>

<action>Add completion notes to Dev Agent Record section:</action>
<action>Find "## Dev Agent Record" section and add:

```
### Completion Notes
**Completed:** {date}
**Definition of Done:** All acceptance criteria met, code reviewed, tests passing
```

</action>

<action>Save the story file</action>
</step>

<step n="2" goal="Update sprint status to done" tag="sprint-status">
<action>Load the FULL file: {output_folder}/sprint-status.yaml</action>
<action>Find development_status key matching {story_key}</action>
<action>Verify current status is "review" (expected previous state)</action>
<action>Update development_status[{story_key}] = "done"</action>
<action>Save file, preserving ALL comments and structure including STATUS DEFINITIONS</action>

<check if="story key not found in file">
  <output>⚠️ Story file updated, but could not update sprint-status: {story_key} not found

Story is marked Done in file, but sprint-status.yaml may be out of sync.
</output>
</check>

</step>

<step n="3" goal="Confirm completion to user">

<output>**Story Approved and Marked Done, {user_name}!**

✅ Story file updated → Status: done
✅ Sprint status updated: review → done

**Completed Story:**

- **ID:** {story_id}
- **Key:** {story_key}
- **Title:** {story_title}
- **Completed:** {date}

**Next Steps:**

1. Continue with next story in your backlog
   - Run `create-story` for next backlog story
   - Or run `dev-story` if ready stories exist
2. Check epic completion status
   - Run `retrospective` workflow to check if epic is complete
   - Epic retrospective will verify all stories are done
     </output>

</step>

</workflow>
```
