#!/bin/bash
set -eu
SCRIPT_DIR=$(cd $(dirname $0); pwd)

INPUT_FILE="$1"
OUTPUT_FOLDER_NAME=$(basename "$INPUT_FILE")

echo INPUT_FILE: $INPUT_FILE
echo OUTPUT_FOLDER_NAME: $OUTPUT_FOLDER_NAME

"$SCRIPT_DIR/toHLS.bash" "$INPUT_FILE" "$SCRIPT_DIR/public/video/$OUTPUT_FOLDER_NAME"
"$SCRIPT_DIR/update-playlist.bash"
