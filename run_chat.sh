#!/bin/bash

# Configuration for the LangGraph Local Server
export NEXT_PUBLIC_API_URL="http://localhost:2024"
export NEXT_PUBLIC_ASSISTANT_ID="test_engineer_agent"

# Optional: Disable any telemetry if the UI uses it
export TELEMETRY_DISABLED=1

echo "------------------------------------------------"
echo " Starting LangChain Chat UI..."
echo " Connecting to: $NEXT_PUBLIC_API_URL"
echo " Assistant ID: $NEXT_PUBLIC_ASSISTANT_ID"
echo "------------------------------------------------"

# Run the development server
pnpm dev