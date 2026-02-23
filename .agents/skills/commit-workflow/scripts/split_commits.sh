#!/usr/bin/env bash
set -euo pipefail

# Helper for staging a subset of files into a focused commit.
# Usage: ./split_commits.sh "commit message" file1 file2 ...

if [ "$#" -lt 2 ]; then
  echo "Usage: $0 \"commit message\" <file> [more files...]"
  exit 1
fi

message="$1"
shift

git add "$@"
git commit -m "$message"

echo "Committed: $message"
