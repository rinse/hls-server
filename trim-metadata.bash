#!/bin/bash

# INPUT='[Ohys-Raws] Bocchi the Rock! - 01 (BS11 1280x720 x264 AAC)'
cat | sed -e 's/^\(\[.*\]\s*\)//g' -e 's/\s*(.*)$//g'
