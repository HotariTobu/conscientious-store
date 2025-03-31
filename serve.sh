#!/bin/bash
# Start serving the Next.js application with the latest code from the repository

# Change to the directory of the script
cd $(dirname $(readlink -f $0))

# Remove the old build artifacts
rm -rf ./node_modules
rm -rf ./.next

# Check if Node.js is installed
echo -n 'Node.js '
node -v
if [ $? -ne 0 ]; then
    echo "Node.js is not installed. Please install Node.js to run this script from https://nodejs.org."
    exit
fi

# Apply the latest code
git pull
npm install
npm run prisma:migrate

# Build and start the application
npm run build
npm run start
