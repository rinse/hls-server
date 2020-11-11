#!/bin/bash
set -eu

INPUT_FILE="$1"

if [ "$INPUT_FILE" = "" ] ; then
    echo "toHLS.bash INPUT_FILE_PATH [OUTPUT_DIR_PATH]"
    exit 1
fi

if [ ! -e "$INPUT_FILE" ] ; then
    echo "INPUT_FILE_PATH does not exist or it is not a file."
    exit 1
fi

BASE_OF_INPUT_FILE=$(basename "$INPUT_FILE")
OUTPUT_DIR=${2:-"${BASE_OF_INPUT_FILE%.*}"}

echo "InputFile: $INPUT_FILE"
echo "OutputDir: $OUTPUT_DIR"

mkdir -p "$OUTPUT_DIR"
ffmpeg -i "$INPUT_FILE" -c:v copy -c:a copy -f hls -hls_time 10 -hls_playlist_type vod -hls_segment_filename "$OUTPUT_DIR/segment_%3d.ts" "$OUTPUT_DIR/index.m3u8"
# Generates a thumbnail
ffmpeg -i "$INPUT_FILE" -ss 5 -vframes 1 -f image2 -s 320x240 "$OUTPUT_DIR/thumbnail.png"
