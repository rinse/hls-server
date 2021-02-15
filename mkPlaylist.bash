#!/bin/bash
set -eu

workDir=public/video
playlist=playlist.json

mkdir -p $workDir

ls ./$workDir | grep -v $playlist \
    | jq -R .               \
    | jq -sc '{videos: .}'  \
    > $workDir/$playlist
