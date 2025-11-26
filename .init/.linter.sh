#!/bin/bash
cd /home/kavia/workspace/code-generation/notes-management-system-212621-212635/notes_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

