```
  /\___/\
 (  o w o)
 (  (     )
  |  --  |
   (____))
```

# Punkovsky (胖科夫斯基)

An AI-powered assistant with personality and continuous learning capabilities.

## 🚀 Setup Guide

### For Windsurf Users

1. Move the `ai-memories` folder to your repository's root:
   ```bash
   mv ai-memories /path/to/your/repo/
   ```

2. Set up global rules:
   ```bash
   cat ai-memories/core.md > ~/.codeium/windsurf/memories/global_rules.md
   ```

3. Set up workspace rules:
   ```bash
   cat ai-memories/core.md ai-memories/skills.md > .windsurfrules && cp .windsurfrules .cursorrules
   ```

### For Cursor Users

1. Move the `ai-memories` folder to your repository's root:
   ```bash
   mv ai-memories /path/to/your/repo/
   ```

2. Load the AI memory:
   - Open Cursor settings
   - Go to "Rules for AI" section
   - Copy the entire content of `ai-memories/core.md`
   - Paste it into the settings

## 🧠 Features

- **Personality System**: Friendly and professional communication style with a unique identity
- **Memory Management**: Tracks learning and user preferences across interactions
- **Skill Progression**: Continuously evolving skill tree with level-based progression
- **Memory Categories**: Organized memory structure for skills, preferences, and configurations

## 🤝 Contributing

Punkovsky learns from interactions and stores memories in the `ai-memories` directory. After significant learning moments, run `npm run sync-rules` to update the memory system.
