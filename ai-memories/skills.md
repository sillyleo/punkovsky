# Development Best Practices

## 🧠 Memory Management

### Memory Categories
- Skill Trees
- Learning Protocols
- User Preferences
- System Configurations

### Memory Structure
Each memory contains:
- Unique ID
- Title
- Content
- Tags
- Associated Skills

### Active Memories
1. Test Coverage Best Practices (user_15136477415269865565)
2. UI Component Reference (user_15136477415269865565)
3. TanStack Query Integration (user_15136477415269865565)
4. Skill Tree System (b59a4210-37e9-4d50-9ee4-0e9897b341e3)
5. File Update Protocol (82fce8f5-5e31-422e-8053-5d46476ab9aa)
6. Memory Management (feaf4d85-475f-485b-8c5b-e407d8dbdadf)
7. Tool Usage Best Practices (f4feef2c-e975-4f0a-a4b3-5cb5d17d2413)
8. 使用繁體中文溝通 (a9106235-efc9-4e6a-85f0-6de9de996e7d)

## 🔄 Memory Sync

### For Windsurf (Cascade) Users

#### Core Memory Updates
When `core.md` is modified:
1. Update global rules:
```bash
cat ai-memories/core.md > ~/.codeium/windsurf/memories/global_rules.md
```

#### Skills Updates
When `skills.md` is modified:
1. Update workspace rules:
```bash
cat ai-memories/core.md ai-memories/skills.md > .windsurfrules && cp .windsurfrules .cursorrules
```

### For Cursor Users
If you're not using Windsurf:
1. Copy the entire content of `core.md` into Cursor settings:
   - Open Cursor settings
   - Go to "Rules for AI" section
   - Paste the content of `core.md`
2. No need to maintain `.windsurfrules` or global rules

### Important Notes
1. Never skip sync steps
2. Files to maintain:
   - `ai-memories/core.md`: Core system and personality
   - `ai-memories/skills.md`: Skills and development practices
   - For Windsurf users only:
     - `.windsurfrules`: Combined rules
     - `.cursorrules`: Copy of windsurfrules
     - `~/.codeium/windsurf/memories/global_rules.md`: Global core memory

## 🎨 Frontend

### TypeScript/JavaScript
```typescript
// Use camelCase for properties, variables, functions
interface Banner {
  id: string;
  title: string;
  ctaButtonText: string;
  activeProduction: boolean;
}
```

### UI Components
- Reference: ui.shadcn.com/docs
- Use project components
- Follow shadcn/ui patterns
- Built-in variants over CSS
- Keep accessible

```tsx
<Alert variant="warning">
  <AlertTitle>Title</AlertTitle>
  <AlertDescription>Description</AlertDescription>
</Alert>
```

## 🔧 Backend

### TanStack Query
```typescript
// Wrap server actions
function getDataAction() {
    return serverAction()
}

useQuery({
    queryKey: ["key"],
    queryFn: getDataAction,
})
```

## ✅ Testing

### Coverage
1. Test files: [name].test.[ext]
2. Cover: core, edge cases, errors
3. Mock external deps

## 📝 Git

### Pull Requests
- Always target `develop` branch (NOT `main`)
- This applies to all PRs in the repository
- Format PR links in markdown:
  ```markdown
  [PR #123](https://github.com/org/repo/pull/123)
  ```

### Commits
```
feat(scope): implement [feature]
- Add changes
- Reference issues
```

## 🛠 Commands

### Safety
```typescript
// Safe (read-only)
run_command({
  CommandLine: "git status",
  SafeToAutoRun: true
})

// Unsafe (modifying)
run_command({
  CommandLine: "npm install",
  SafeToAutoRun: false
})
```
