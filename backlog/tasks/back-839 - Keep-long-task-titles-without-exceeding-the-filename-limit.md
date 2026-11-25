---
id: BACK-839
title: Keep long task titles without exceeding the filename limit
status: Done
assignee:
  - '@hermes'
created_date: '2026-11-25T03:38:00Z'
updated_date: '2026-11-25T03:41:00Z'
labels: []
dependencies: []
references:
  - https://github.com/MrLesk/Backlog.md/issues/1184
  - src/file-system/operations.ts
  - src/test/filesystem.test.ts
modified_files:
  - src/test/filesystem.test.ts
  - src/file-system/operations.ts
type: bug
ordinal: 438000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Task creation fails with ENAMETOOLONG when the title produces an oversized filename. The filename is a storage detail and should not limit the title stored in Markdown.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Creating a task with an overlong title succeeds with a filename no longer than 255 UTF-8 bytes and preserves the complete Markdown title.
- [x] #2 Truncation preserves the file ID and extension and does not split a Unicode code point; short filenames stay unchanged.
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 bun run check:types passes when TypeScript touched
- [x] #2 bun run check . passes when formatting/linting touched
- [x] #3 bun test (or scoped test) passes
<!-- DOD:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Reproduce the failure in filesystem coverage with ASCII and multibyte titles.
2. Bound the sanitized title portion in the shared task write-target resolver.
3. Verify title round-tripping, existing paths and CLI behavior, then run repository checks.
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Fit sanitized task filenames within 255 UTF-8 bytes without modifying the Markdown title. The ASCII and multibyte regressions failed before the fix and pass with it. All 99 focused tests, the type check and Biome passed. A CLI smoke test confirmed create, read-back and rename.
<!-- SECTION:FINAL_SUMMARY:END -->
