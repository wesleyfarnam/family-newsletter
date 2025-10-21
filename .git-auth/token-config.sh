#!/bin/bash

# Token Configuration for Git Operations
# This manages GitHub Personal Access Tokens securely

echo "🔐 Configuring GitHub Token"
echo "=========================="

# Secure token storage
TOKEN_FILE="$HOME/.git-auth/github_token"

# Function to set token
set_token() {
    if [ -n "$1" ]; then
        echo "$1" > "$TOKEN_FILE"
        chmod 600 "$TOKEN_FILE"
        export GITHUB_TOKEN="$1"
        echo "✅ Token set successfully"
    else
        echo "❌ Please provide a token as argument"
        echo "Usage: ./token-config.sh YOUR_GITHUB_TOKEN"
        return 1
    fi
}

# Function to load token
load_token() {
    if [ -f "$TOKEN_FILE" ]; then
        GITHUB_TOKEN=$(cat "$TOKEN_FILE")
        export GITHUB_TOKEN
        echo "✅ Token loaded from storage"
        return 0
    else
        echo "⚠️  No token found in storage"
        return 1
    fi
}

# Function to test token
test_token() {
    if [ -n "$GITHUB_TOKEN" ]; then
        echo "🧪 Testing GitHub token..."
        response=$(curl -s -o /dev/null -w "%{http_code}" \
            -H "Authorization: token $GITHUB_TOKEN" \
            https://api.github.com/user)
        
        if [ "$response" = "200" ]; then
            echo "✅ Token is valid"
            return 0
        else
            echo "❌ Token is invalid (HTTP $response)"
            return 1
        fi
    else
        echo "❌ No token available to test"
        return 1
    fi
}

# Main execution
if [ "$1" = "set" ]; then
    set_token "$2"
elif [ "$1" = "load" ]; then
    load_token
elif [ "$1" = "test" ]; then
    test_token
elif [ "$1" = "show" ]; then
    if [ -n "$GITHUB_TOKEN" ]; then
        echo "🔑 Token is set: ${GITHUB_TOKEN:0:10}...${GITHUB_TOKEN: -10}"
    else
        echo "❌ No token is currently set"
    fi
else
    echo "🔧 GitHub Token Manager"
    echo "======================"
    echo ""
    echo "Usage:"
    echo "  $0 set YOUR_TOKEN    # Set and store a new token"
    echo "  $0 load              # Load token from storage"
    echo "  $0 test              # Test if token is valid"
    echo "  $0 show              # Show current token status"
    echo ""
    echo "Example:"
    echo "  $0 set ghp_xxxxxxxxxxxxxxxxxxxx"
fi