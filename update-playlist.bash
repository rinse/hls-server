#!/bin/bash
set -eu

SCRIPT_DIR=$(cd $(dirname $0); pwd)
workDir=$SCRIPT_DIR/public/video
playlist=playlist.json

mkdir -p "$workDir"

ls "$workDir" | grep -v "$playlist" \
    | jq -R .               \
    | jq -sc '{videos: .}'  \
    > "$workDir/$playlist"
