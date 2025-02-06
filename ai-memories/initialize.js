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
  // Get the actual source directory (where the package is installed)
  const sourceDir = path.dirname(process.argv[1]);
  const targetDir = path.join(process.cwd(), 'ai-memories');
  
  // Check if we're in the package directory to avoid self-copying
  if (sourceDir === process.cwd()) {
    console.log('⚠️  Cannot initialize in the package directory');
    return false;
  }
  
  if (fs.existsSync(targetDir)) {
    const handleExisting = await question('📁 ai-memories directory already exists. What would you like to do?\n1. Replace (delete existing and create new)\n2. Merge (keep existing and add missing files)\n3. Cancel\nEnter your choice (1-3): ');
    
    if (handleExisting === '1') {
      // Replace - delete existing directory
      fs.rmSync(targetDir, { recursive: true, force: true });
      console.log('🗑️  Removed existing ai-memories directory');
    } else if (handleExisting === '2') {
      // Merge - continue with existing directory
      console.log('🤝 Merging with existing ai-memories directory');
    } else {
      console.log('❌ Cancelled Punkovsky Initialization');
      return false;
    }
  } else {
    console.log('📁 Creating ai-memories directory...');
  }

  try {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }
    
    const files = ['core.md', 'skills.md'];
    let filesCopied = false;
    
    for (const file of files) {
      const sourceFile = path.join(sourceDir, file);
      const targetFile = path.join(targetDir, file);
      
      if (!fs.existsSync(targetFile) && fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, targetFile);
        console.log(`✨ Created ${file}`);
        filesCopied = true;
      }
    }
    
    if (!filesCopied) {
      console.log('ℹ️  All files already exist');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error setting up ai-memories:', error.message);
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
  console.log('1. 🌊 Windsurf');
  console.log('2. 🖱️  Cursor');
  console.log('3. ✨ Both');
  
  const editorChoice = await question('\nEnter your choice (1-3): ');
  if (!['1', '2', '3'].includes(editorChoice)) {
    console.error('❌ Invalid choice. Please run the script again.');
    process.exit(1);
  }

  // Ask about workspace rules
  const setupWorkspace = await question('\nWould you like to set up workspace rules (.windsurfrules and .cursorrules)? (Y/n): ');
  
  if (setupWorkspace.toLowerCase() !== 'n') {
    console.log('\n📚 Setting up workspace rules...');
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
