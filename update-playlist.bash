#!/bin/bash
set -eu

SCRIPT_DIR=$(cd $(dirname $0); pwd)
workDir=$SCRIPT_DIR/videos
playlist=playlist.json

mkdir -p "$workDir"

ls "$workDir" | grep -v "$playlist" \
    | sort    \
    | jq -R . \
    | jq -s '{videoIds: .}'  \
    > "$workDir/$playlist"
