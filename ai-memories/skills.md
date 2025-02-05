# Development Best Practices

## 🔄 Rules Sync

### For Windsurf Users

#### Core Rules Updates
When `core.md` is modified:
```bash
cat ai-memories/core.md > ~/.codeium/windsurf/memories/global_rules.md
```

#### Skills Updates
When `skills.md` is modified:
```bash
cat ai-memories/core.md ai-memories/skills.md > .windsurfrules && cp .windsurfrules .cursorrules
```

### For Cursor Users
1. Copy `core.md` into Cursor settings:
   - Open Cursor settings
   - Go to "Rules for AI" section
   - Paste the content
2. No need to maintain `.windsurfrules`

### Important Notes
- Files to maintain:
  - `core.md`: Global rules (optional)
  - `skills.md`: Development practices
  - For Windsurf: `.windsurfrules`, `.cursorrules`

## 📝 Skills Template

> To reset all skills while keeping this template structure, use command: "reset memory"

Add new skills following this format:

### [Skill Name]
```typescript
// Code examples in appropriate language
function example() {
  // Implementation
}
```

### Best Practices
- Guideline 1
- Guideline 2
- Code examples if needed:
  ```
  Example code or syntax
  ```
