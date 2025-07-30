#!/bin/bash
# Script to fix common Git issues with Docker

echo "🔧 Fixing Git configuration for Docker compatibility..."

# Disable file mode tracking (fixes permission changes)
git config core.fileMode false
echo "✅ Disabled file mode tracking"

# Set line ending handling for macOS/Linux compatibility
git config core.autocrlf input
echo "✅ Set autocrlf to input"

# Ensure consistent line endings
git config core.eol lf
echo "✅ Set line endings to LF"

# Reset any staged changes
echo "🔄 Resetting staged changes..."
git reset HEAD .

# Check current status
echo "📊 Current Git status:"
git status --porcelain

echo ""
echo "🏁 Git configuration updated!"
echo "Now run: chmod +x fix-git-issues.sh && ./fix-git-issues.sh"
