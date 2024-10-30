#!/bin/bash

# Ensure we're using Bash
if [ -z "$BASH_VERSION" ]; then
  echo "This script requires Bash."
  exit 1
fi

# Set the earliest and latest possible dates
earliest_date="2024-10-15"
latest_date="2024-10-28"

# Convert earliest and latest dates to Unix timestamps
earliest_timestamp=$(date -j -f "%Y-%m-%d %H:%M:%S" "$earliest_date 00:00:00" "+%s")
latest_timestamp=$(date -j -f "%Y-%m-%d %H:%M:%S" "$latest_date 23:59:59" "+%s")

# Step 1: Get the list of commits in reverse order (from oldest to newest)
commits=($(git rev-list --reverse HEAD))

# Arrays to store commit hashes and new dates
commit_hashes=()
new_dates=()

# Initial timestamp (starting point)
current_timestamp=$earliest_timestamp

# Function to generate a random number between two values (inclusive)
rand() {
  perl -e "print int($1 + rand($2 - $1 + 1))"
}

# Step 2: Generate new dates for each commit
for commit in "${commits[@]}"; do
  # Generate a random number between 1 and 4 days in seconds
  random_days=$(rand 1 4)
  random_seconds=$((random_days * 86400))

  # Increment the current timestamp
  current_timestamp=$((current_timestamp + random_seconds))

  # Ensure we do not go beyond the latest date
  if [ $current_timestamp -gt $latest_timestamp ]; then
    current_timestamp=$latest_timestamp
  fi

  # Store the commit hash and new date
  commit_hashes+=("$commit")
  new_dates+=("$current_timestamp")
done

# Step 3: Write the new dates to a temporary file
temp_file=$(mktemp)
for i in "${!commit_hashes[@]}"; do
  echo "${commit_hashes[$i]} ${new_dates[$i]}" >> "$temp_file"
done

# Step 4: Rewrite the commit history with new dates
git filter-branch -f --env-filter '
commit_hash=$GIT_COMMIT

# Read the new date from the temporary file
new_date_epoch=$(grep "^$commit_hash " '"$temp_file"' | cut -d" " -f2)

if [ ! -z "$new_date_epoch" ]; then
  # Convert the Unix timestamp back to the desired date format
  new_date_str=$(date -j -f "%s" "$new_date_epoch" "+%Y-%m-%d %H:%M:%S %z")

  # Set the new dates for the committer and author
  export GIT_COMMITTER_DATE="$new_date_str"
  export GIT_AUTHOR_DATE="$new_date_str"
fi
' --tag-name-filter cat -- --branches --tags

# Clean up the temporary file
rm "$temp_file"
