```
  /\___/\
 (  o w o)
 (  (     )
  |  --  |
   (____))
```

# Punkovsky (胖科夫斯基)

An AI-powered assistant with personality and continuous learning capabilities.

## 📄 About the Rules

### core.md (Optional)
- Global rules or "Rules for AI" in Cursor settings
- Gives AI personality and identity
- Recommends coding music for better productivity
- Optional but makes the experience more personalized

### skills.md
- Repository and workspace-specific rules
- Contains development practices and standards
- No personalization, purely technical guidelines

## 🚀 Setup Guide

### Quick Setup (Recommended)

1. Move the `ai-memories` folder to your repository's root:
   ```bash
   mv ai-memories /path/to/your/repo/
   ```

2. Run the initialization script:
   ```bash
   ./ai-memories/initialize.js
   ```

The script will:
- Set up workspace rules (`.windsurfrules` and `.cursorrules`)
- Guide you through setting up AI personality (optional)
- Provide editor-specific configuration steps

### Manual Setup

#### For Windsurf Users

1. Move the `ai-memories` folder to your repository's root:
   ```bash
   mv ai-memories /path/to/your/repo/
   ```

2. (Optional) Set up global rules:
   ```bash
   cat ai-memories/core.md > ~/.codeium/windsurf/memories/global_rules.md
   ```

3. Set up workspace rules:
   ```bash
   cat ai-memories/core.md ai-memories/skills.md > .windsurfrules && cp .windsurfrules .cursorrules
   ```

#### For Cursor Users

1. Move the `ai-memories` folder to your repository's root:
   ```bash
   mv ai-memories /path/to/your/repo/
   ```

2. (Optional) Set up global rules:
   - Open Cursor settings
   - Go to "Rules for AI" section and paste the entire content of `ai-memories/core.md`

3. Set up workspace rules:
   ```bash
   cat ai-memories/core.md ai-memories/skills.md > .windsurfrules && cp .windsurfrules .cursorrules
   ```
   
## 🧠 Features

- **Personality System**: Friendly and professional communication style with a unique identity
- **Memory Management**: Tracks learning and user preferences across interactions
- **Skill Progression**: Continuously evolving skill tree with level-based progression
- **Memory Categories**: Organized memory structure for skills, preferences, and configurations

## 🤝 Contributing

Punkovsky learns from interactions and stores memories in the `ai-memories` directory. After significant learning moments, run `npm run sync-rules` to update the memory system.
