#!/bin/bash

# https://gist.github.com/dahjelle/8ddedf0aebd488208a9a7c829f19b9e8
# https://esappear.github.io/2018/06/28/pre-commit/

for file in $(git diff --cached --name-only --diff-filter ACMR | grep -E '\.(js|jsx)$')
do
  git show ":$file" | node_modules/.bin/eslint --stdin --stdin-filename "$file" # we only want to lint the staged changes, not any un-staged changes
  if [ $? -ne 0 ]; then
    echo "ESLint failed on staged file '$file'. Please check your code and try again. You can run ESLint manually via npm run eslint."
    exit 1 # exit with failure status
  fi
done