#!/bin/bash

# Git Authentication Setup Script
# This sets up multiple authentication methods for reliable Git operations

echo "🔧 Setting Up Git Authentication"
echo "================================"

# Create .git-auth directory for secure storage
mkdir -p ~/.git-auth

# Method 1: Setup Git credential helper
echo "📝 Setting up Git credential helper..."
git config --global credential.helper store

# Method 2: Create SSH config for GitHub
echo "🔑 Setting up SSH configuration..."
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Create SSH config
cat > ~/.ssh/config << 'EOF'
# GitHub configuration
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/deployment_key
    IdentitiesOnly yes
    StrictHostKeyChecking no
EOF

chmod 600 ~/.ssh/config

# Method 3: Setup Git environment variables
echo "🌍 Setting up Git environment..."
cat > ~/.git-auth/env.sh << 'EOF'
#!/bin/bash
export GIT_AUTHOR_NAME="Family Newsletter Admin"
export GIT_AUTHOR_EMAIL="admin@myfamilynewsletter.com"
export GIT_COMMITTER_NAME="Family Newsletter Admin"
export GIT_COMMITTER_EMAIL="admin@myfamilynewsletter.com"
export GIT_SSH_COMMAND="ssh -i ~/.ssh/deployment_key -o StrictHostKeyChecking=no"
EOF

chmod +x ~/.git-auth/env.sh

# Method 4: Create a secure git push wrapper
echo "📦 Creating git push wrapper..."
cat > ~/.git-auth/git-push.sh << 'EOF'
#!/bin/bash

# Git Push Wrapper with Multiple Authentication Methods

echo "🚀 Attempting Git Push with Multiple Methods..."

# Method 1: Try standard push
echo "📍 Method 1: Standard HTTPS push..."
if git push origin main 2>/dev/null; then
    echo "✅ Standard push successful!"
    exit 0
fi

# Method 2: Try with token from environment
echo "📍 Method 2: Token-based push..."
if [ -n "$GITHUB_TOKEN" ]; then
    git push https://$GITHUB_TOKEN@github.com/wesleyfarnam/family-newsletter.git main
    if [ $? -eq 0 ]; then
        echo "✅ Token push successful!"
        exit 0
    fi
fi

# Method 3: Try SSH push
echo "📍 Method 3: SSH push..."
if git push git@github.com:wesleyfarnam/family-newsletter.git main 2>/dev/null; then
    echo "✅ SSH push successful!"
    exit 0
fi

echo "❌ All authentication methods failed"
echo "Please check your GitHub credentials"
exit 1
EOF

chmod +x ~/.git-auth/git-push.sh

# Method 5: Create a git alias for easy pushing
git config --global alias.push-all '!~/.git-auth/git-push.sh'

echo "✅ Git authentication setup complete!"
echo ""
echo "📋 Available commands:"
echo "  git push-all           # Try all authentication methods"
echo "  ~/.git-auth/git-push.sh # Direct script execution"
echo ""
echo "🔑 Next steps:"
echo "1. Add your Personal Access Token to GITHUB_TOKEN environment variable"
echo "2. Or add SSH key to GitHub account"
echo "3. Or configure Git credentials with: git config credential.helper store"