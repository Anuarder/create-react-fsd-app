export function generateCommitMsgHook(): string {
  return `#!/usr/bin/env sh
#
# Git Hook: commit-msg
# Validates commit message length
#

set -e

if [ -z "$1" ]; then
  echo "❌ Error: Commit message file not provided"
  exit 1
fi

COMMIT_MSG_FILE=$1

# Check if we're in a rebase state - skip validation during rebases
GIT_DIR=$(git rev-parse --git-dir 2>/dev/null)
if [ -d "$GIT_DIR/rebase-merge" ] || [ -d "$GIT_DIR/rebase-apply" ]; then
  exit 0
fi

# Read the commit message
COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")

# Skip validation for merge commits
if echo "$COMMIT_MSG" | grep -qE "^Merge "; then
  exit 0
fi

# Get the first line (header)
HEADER=$(echo "$COMMIT_MSG" | head -n 1)
HEADER_LENGTH=\${#HEADER}

# Minimum length check (at least 3 characters for meaningful message)
if [ $HEADER_LENGTH -lt 3 ]; then
  echo "❌ Commit message is too short!"
  echo ""
  echo "Minimum length: 3 characters"
  echo "Your message length: $HEADER_LENGTH characters"
  echo ""
  echo "Please provide a more descriptive commit message."
  echo ""
  echo "Your commit message:"
  echo "  $HEADER"
  exit 1
fi

# Maximum length check (100 characters for better readability)
if [ $HEADER_LENGTH -gt 100 ]; then
  echo "❌ Commit message is too long!"
  echo ""
  echo "Maximum length: 100 characters"
  echo "Your message length: $HEADER_LENGTH characters"
  echo ""
  echo "Please keep your commit message concise."
  echo ""
  echo "Your commit message:"
  echo "  $HEADER"
  exit 1
fi

exit 0
`;
}

export function generatePreCommitHook(): string {
  return `#!/usr/bin/env sh
#
# Git Hook: pre-commit
# Runs linting and formatting on staged files
#

# Get the root directory of the git repository
ROOT_DIR=$(git rev-parse --show-toplevel 2>/dev/null)

if [ -z "$ROOT_DIR" ]; then
  echo "❌ Error: Not in a git repository"
  exit 1
fi

# Get staged files (excluding git-hooks directory)
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -v "^git-hooks/" | grep -E "\\.(ts|js|tsx)$" || true)

if [ -n "$STAGED_FILES" ]; then
  # Convert to space-separated list
  FILES=$(echo "$STAGED_FILES" | tr '\\n' ' ')

  # Only run linting if we have files
  if [ -n "$FILES" ] && [ "$FILES" != " " ]; then
    # Call the lint utility with project directory and files
    "$ROOT_DIR/git-hooks/utils/lint.sh" "$ROOT_DIR" $FILES
    EXIT_CODE=$?

    if [ $EXIT_CODE -ne 0 ]; then
      exit $EXIT_CODE
    fi

    # Re-stage formatted files
    echo "$STAGED_FILES" | tr '\\n' '\\0' | xargs -0 git add
  fi
fi

exit 0
`;
}

export function generatePostCheckoutHook(ticketPrefix: string): string {
  return `#!/usr/bin/env sh
#
# Git Hook: post-checkout
# Validates branch names when creating new branches
# If invalid, deletes the branch and switches back to previous branch
#

# Arguments from git:
# $1 = ref of the previous HEAD
# $2 = ref of the new HEAD
# $3 = flag indicating whether it was a branch checkout (1) or file checkout (0)

PREV_HEAD=$1
NEW_HEAD=$2
BRANCH_CHECKOUT=$3

# Only run for branch checkouts
if [ "$BRANCH_CHECKOUT" != "1" ]; then
  exit 0
fi

# Get the current branch name
BRANCH_NAME=$(git symbolic-ref --short HEAD 2>/dev/null)

# Skip if we can't determine the branch name (detached HEAD state)
if [ -z "$BRANCH_NAME" ]; then
  exit 0
fi

# Skip validation for protected branches
if [ "$BRANCH_NAME" = "main" ] || [ "$BRANCH_NAME" = "master" ] || [ "$BRANCH_NAME" = "develop" ] || [ "$BRANCH_NAME" = "development" ]; then
  exit 0
fi

# Get the previous branch name (where we came from)
PREV_BRANCH=$(git reflog show --format="%gd %gs" | grep "checkout: moving from" | head -1 | sed 's/.*moving from \\([^ ]*\\) to.*/\\1/')

# Check if this is a new branch (doesn't exist on remote)
# We check if the branch exists on the remote to determine if it's newly created
REMOTE_BRANCH=$(git rev-parse --verify --quiet "origin/$BRANCH_NAME" 2>/dev/null)

# If the branch exists on remote, it's not a new branch - skip validation
if [ -n "$REMOTE_BRANCH" ]; then
  exit 0
fi

# Validate branch name format: (feature|feat|fix|hotfix|bugfix|maintenance|infra|epic)/${ticketPrefix}-<NUMBER>
PATTERN="^(feature|feat|hotfix|fix|bugfix|maintenance|infra|epic)/${ticketPrefix}-[0-9]+$"

if ! echo "$BRANCH_NAME" | grep -qE "$PATTERN"; then
  echo ""
  echo "❌ Invalid branch name: $BRANCH_NAME"
  echo ""
  echo "Branch name must follow the convention:"
  echo "  <type>/${ticketPrefix}-<number>"
  echo ""
  echo "Allowed types:"
  echo "  - feature (or feat)"
  echo "  - fix (or hotfix or bugfix)"
  echo "  - maintenance"
  echo "  - infra"
  echo "  - epic"
  echo ""
  echo "Examples of valid branch names:"
  echo "  ✅ feature/${ticketPrefix}-123"
  echo "  ✅ fix/${ticketPrefix}-0"
  echo "  ✅ epic/${ticketPrefix}-9999"
  echo "  ✅ infra/${ticketPrefix}-1325"
  echo ""
  echo "Examples of invalid branch names:"
  echo "  ❌ feature           (missing /${ticketPrefix}-<number>)"
  echo "  ❌ ${ticketPrefix}-123           (missing type prefix)"
  echo "  ❌ some-branch-name  (doesn't follow convention)"
  echo ""

  # Switch back to the previous branch
  if [ -n "$PREV_BRANCH" ]; then
    echo "⚠️  Switching back to: $PREV_BRANCH"
    git checkout -q "$PREV_BRANCH" 2>/dev/null

    # Delete the invalid branch
    git branch -D "$BRANCH_NAME" 2>/dev/null
    echo "🗑️  Deleted invalid branch: $BRANCH_NAME"
  else
    echo "⚠️  Please delete this branch manually:"
    echo "  git checkout <previous-branch>"
    echo "  git branch -D $BRANCH_NAME"
  fi

  echo ""
  echo "Please create a branch with the correct format:"
  echo "  git checkout -b <type>/${ticketPrefix}-<number>"
  echo ""
  exit 1
fi

exit 0
`;
}

export function generatePostCheckoutHookWithoutBranchNaming(): string {
  return `#!/usr/bin/env sh
#
# Git Hook: post-checkout
# This hook is intentionally empty but can be extended in the future
#

exit 0
`;
}

export function generateFrontendLintScript(): string {
  return `#!/usr/bin/env sh
#
# Linting and Formatting Script
# Runs ESLint and Prettier on provided files
#
# Usage: lint.sh <project-dir> <files...>
#   project-dir: Path to the project directory
#   files: Space-separated list of files to lint (relative to project-dir)
#

set -e

if [ -z "$1" ]; then
  echo "❌ Error: Project directory not provided"
  echo "Usage: lint.sh <project-dir> <files...>"
  exit 1
fi

if [ -z "$2" ]; then
  echo "No files to check."
  exit 0
fi

PROJECT_DIR=$1
shift
FILES="$*"

echo "Running linting and formatting on $(echo $FILES | wc -w | tr -d ' ') file(s)..."

# Check if project directory exists
if [ ! -d "$PROJECT_DIR" ]; then
  echo "❌ Error: Project directory does not exist: $PROJECT_DIR"
  exit 1
fi

# Check if dependencies are installed
ESLINT="\${PROJECT_DIR}/node_modules/.bin/eslint"
PRETTIER="\${PROJECT_DIR}/node_modules/.bin/prettier"

if [ ! -f "$ESLINT" ] || [ ! -f "$PRETTIER" ]; then
  echo "⚠️  Warning: Dependencies not found in $PROJECT_DIR"
  echo "Please run 'npm install' in the project directory to enable linting."
  echo "Skipping checks..."
  exit 0
fi

# Save current directory and navigate to project directory
ORIGINAL_DIR=$(pwd)
cd "$PROJECT_DIR" || exit 1

# Run eslint on provided files
echo "Running eslint..."
npx eslint --fix $FILES
LINT_EXIT_CODE=$?

if [ $LINT_EXIT_CODE -ne 0 ]; then
  echo "❌ Linting failed! Please fix the errors before committing."
  cd "$ORIGINAL_DIR"
  exit 1
fi

# Run prettier on provided files
echo "Running prettier..."
npx prettier --write $FILES
FORMAT_EXIT_CODE=$?

if [ $FORMAT_EXIT_CODE -ne 0 ]; then
  echo "❌ Formatting failed!"
  cd "$ORIGINAL_DIR"
  exit 1
fi

cd "$ORIGINAL_DIR"
echo "✅ All checks passed!"
`;
}

