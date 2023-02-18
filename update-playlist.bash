#!/bin/bash
set -eu

SCRIPT_DIR=$(cd $(dirname $0); pwd)
workDir=$SCRIPT_DIR/public/videos
playlist=playlist.json

mkdir -p "$workDir"

ls "$workDir" | grep -v "$playlist" \
    | jq -R .               \
    | jq -s '{videos: .}'  \
    > "$workDir/$playlist"
