#!/bin/bash

# React Jedi Release Script
# This script automates the release process for the react-jedi package

set -e # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}==>${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -p, --patch      Bump patch version (1.0.0 -> 1.0.1)"
    echo "  -m, --minor      Bump minor version (1.0.0 -> 1.1.0)"
    echo "  -M, --major      Bump major version (1.0.0 -> 2.0.0)"
    echo "  -h, --help       Show this help message"
    echo ""
    echo "Example:"
    echo "  $0 --patch       # Release a patch version"
    exit 1
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Parse command line arguments
VERSION_TYPE=""
while [[ $# -gt 0 ]]; do
    case $1 in
        -p|--patch)
            VERSION_TYPE="patch"
            shift
            ;;
        -m|--minor)
            VERSION_TYPE="minor"
            shift
            ;;
        -M|--major)
            VERSION_TYPE="major"
            shift
            ;;
        -h|--help)
            show_usage
            ;;
        *)
            print_error "Unknown option: $1"
            show_usage
            ;;
    esac
done

# Check if version type was specified
if [ -z "$VERSION_TYPE" ]; then
    print_error "Error: No version type specified."
    show_usage
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    print_error "Error: You have uncommitted changes. Please commit or stash them before releasing."
    exit 1
fi

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    print_warning "Warning: You are not on the main branch (current: $CURRENT_BRANCH)."
    read -p "Do you want to continue? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Release cancelled."
        exit 1
    fi
fi

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
print_step "Current version: $CURRENT_VERSION"

# Step 1: Clean previous builds
print_step "Cleaning previous builds..."
rm -rf dist
print_success "Clean complete"

# Step 2: Install dependencies
print_step "Installing dependencies..."
npm ci
print_success "Dependencies installed"

# Step 3: Run linting
print_step "Running linting..."
if npm run lint; then
    print_success "Linting passed"
else
    print_error "Linting failed. Please fix errors before releasing."
    exit 1
fi

# Step 4: Run type checking
print_step "Running type checking..."
if npm run typecheck; then
    print_success "Type checking passed"
else
    print_error "Type checking failed. Please fix errors before releasing."
    exit 1
fi

# Step 5: Run tests
print_step "Running tests..."
if npm run test:all; then
    print_success "All tests passed"
else
    print_error "Tests failed. Please fix failing tests before releasing."
    exit 1
fi

# Step 6: Build the project
print_step "Building the project..."
if npm run build; then
    print_success "Build successful"
else
    print_error "Build failed. Please fix build errors before releasing."
    exit 1
fi

# Step 7: Bump version
print_step "Bumping $VERSION_TYPE version..."
npm version $VERSION_TYPE --no-git-tag-version
NEW_VERSION=$(node -p "require('./package.json').version")
print_success "Version bumped from $CURRENT_VERSION to $NEW_VERSION"

# Step 8: Update lock file
print_step "Updating package-lock.json..."
npm install --package-lock-only
print_success "Lock file updated"

# Step 9: Commit version bump
print_step "Committing version bump..."
git add package.json package-lock.json
git commit -m "chore: bump version to v$NEW_VERSION"
print_success "Version bump committed"

# Step 10: Create git tag
print_step "Creating git tag v$NEW_VERSION..."
git tag -a "v$NEW_VERSION" -m "Release v$NEW_VERSION"
print_success "Git tag created"

# Final summary
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Release preparation complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Version: $CURRENT_VERSION → $NEW_VERSION"
echo ""
echo "Next steps:"
echo "1. Push changes and tags to remote:"
echo -e "   ${YELLOW}git push origin main${NC}"
echo -e "   ${YELLOW}git push origin v$NEW_VERSION${NC}"
echo ""
echo "2. Publish to npm:"
echo -e "   ${YELLOW}npm publish --access public${NC}"
echo ""
echo "3. Create a GitHub release (optional):"
echo "   Visit: https://github.com/alexberriman/react-jedi/releases/new"
echo "   Tag: v$NEW_VERSION"
echo ""
echo "Note: The package is scoped as @alexberriman/react-jedi"
echo "Make sure you're logged into npm with the correct account:"
echo -e "   ${YELLOW}npm whoami${NC}"
echo -e "   ${YELLOW}npm login${NC} (if needed)"