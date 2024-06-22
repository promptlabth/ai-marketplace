#!/bin/bash
echo "Running post-build script..."
# Add your custom commands here

#!/bin/bash
echo "Moving folders from .next/_next to .next..."


# Move all contents from .next/_next to .next
mv .next/_next/* .next/

echo "Folders moved successfully."
