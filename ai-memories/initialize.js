#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const os = require('os');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function copyAiMemories() {
  const targetDir = path.join(process.cwd(), 'ai-memories');
  if (fs.existsSync(targetDir)) {
    console.error('❌ ai-memories directory already exists');
    return false;
  }

  try {
    fs.mkdirSync(targetDir);
    const files = ['core.md', 'skills.md'];
    
    for (const file of files) {
      const sourceFile = path.join(__dirname, file);
      const targetFile = path.join(targetDir, file);
      if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, targetFile);
      }
    }
    return true;
  } catch (error) {
    console.error('❌ Error copying ai-memories:', error.message);
    return false;
  }
}

async function main() {
  console.log('\n🐱 Welcome to Punkovsky (胖科夫斯基) Initialization!\n');

  // Copy ai-memories first
  const copied = await copyAiMemories();
  if (!copied) {
    process.exit(1);
  }
  console.log('✅ Created ai-memories directory\n');
  
  // Ask about editor preference first
  console.log('Which editor(s) do you use?');
  console.log('1. Windsurf');
  console.log('2. Cursor');
  console.log('3. Both');
  
  const editorChoice = await question('\nEnter your choice (1-3): ');
  if (!['1', '2', '3'].includes(editorChoice)) {
    console.error('❌ Invalid choice. Please run the script again.');
    process.exit(1);
  }

  // Ask about workspace rules
  const setupWorkspace = await question('\nWould you like to set up workspace rules (.windsurfrules and .cursorrules)? (Y/n): ');
  
  if (setupWorkspace.toLowerCase() !== 'n') {
    console.log('\nSetting up workspace rules...');
    try {
      const skillsContent = fs.readFileSync(path.join(process.cwd(), 'ai-memories/skills.md'), 'utf8');
      const hasCoreRules = fs.existsSync(path.join(process.cwd(), 'ai-memories/core.md'));
      const coreContent = hasCoreRules ? fs.readFileSync(path.join(process.cwd(), 'ai-memories/core.md'), 'utf8') : '';
      
      // For Windsurf: include both core and skills
      if (['1', '3'].includes(editorChoice)) {
        const windsurfContent = [coreContent, skillsContent].filter(Boolean).join('\n\n');
        fs.writeFileSync('.windsurfrules', windsurfContent);
        console.log('✅ Created .windsurfrules with core and skills rules');
      }
      
      // For Cursor: only include skills (core goes in settings)
      if (['2', '3'].includes(editorChoice)) {
        fs.writeFileSync('.cursorrules', skillsContent);
        console.log('✅ Created .cursorrules with skills rules');
      }
      
      // Remind about core rules for Cursor
      if (['2', '3'].includes(editorChoice) && hasCoreRules) {
        console.log('\nNote: For Cursor, personality rules from core.md should be added to settings');
      }
      
      console.log('\n✅ Workspace rules setup complete!\n');
    } catch (error) {
      console.error('❌ Error setting up workspace rules:', error.message);
      process.exit(1);
    }
  }

  // Ask about personality setup
  const setupPersonality = await question('\nWould you like to set up AI personality (global rules)? (y/N): ');
  
  if (setupPersonality.toLowerCase() === 'y') {
    try {
      if (['1', '3'].includes(editorChoice)) {
        // Windsurf setup
        const coreContent = fs.readFileSync(path.join(process.cwd(), 'ai-memories/core.md'), 'utf8');
        const windsurfPath = path.join(os.homedir(), '.codeium/windsurf/memories');
        if (!fs.existsSync(windsurfPath)) {
          fs.mkdirSync(windsurfPath, { recursive: true });
        }
        fs.writeFileSync(path.join(windsurfPath, 'global_rules.md'), coreContent);
        console.log('✅ Windsurf global rules configured!');
      }
      
      if (['2', '3'].includes(editorChoice)) {
        // Cursor setup instructions
        console.log('\nTo complete Cursor setup:');
        console.log('1. Open Cursor settings');
        console.log('2. Go to "Rules for AI" section');
        console.log('3. Copy the content from:', path.join(process.cwd(), 'ai-memories/core.md'));
        console.log('4. Paste it into the settings');
      }
    } catch (error) {
      console.error('❌ Error setting up personality:', error.message);
    }
  }

  console.log('\n🎉 Initialization complete! Enjoy coding with Punkovsky!\n');
  rl.close();
}

main();
