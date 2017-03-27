# =============================================================================
# Production Build Script
# =============================================================================
# This is the build script used to compile the production build.
# Once you've run this, you then need to do run-serve.sh.
# If the serve script is already running, you can leave it running
# while you run this script to rebuild to a newer version, and
# it will automatically overwrite and pick up the new build.

# =============================================================================
# Color Codes
# =============================================================================
RED="\033[31m"
YELLOW="\033[33m"
GREEN="\033[32m"
RESET="\033[0m"

# =============================================================================
# Script
# =============================================================================

echo "⌛ Preparing to build... (this should take a couple of minutes)"
API_URL=http://api.store.jgnieuwhof.xyz NODE_ENV=production webpack -p --config webpack.production.config.js
echo "New Build complete."
echo "Clearing old build..."
rm -rf dist
echo "Copying new build..."
mv temp-build dist
printf "$GREEN"
echo "✅ Build DONE!"

printf "$RESET"
