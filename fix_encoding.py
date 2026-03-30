import os

# Define the exact corrupted strings and their HTML entity replacements
replacements = {
    'â€¢': '&bull;',   # Bullet
    'â€“': '&ndash;',  # En Dash
    'â€”': '&mdash;',  # Em Dash
    'â€™': '&rsquo;',  # Smart Apostrophe
    'â€œ': '&ldquo;',  # Smart Quote Left
    'â€': '&rdquo;',  # Smart Quote Right
    'â€': '&rsquo;'    # Generic Smart apostrophe / quote variant
}

def fix_file(filepath):
    # Read the file as raw bytes to avoid further encoding issues
    with open(filepath, 'rb') as f:
        content = f.read()
    
    modified = False
    new_content = content
    
    # Perform replacements on bytes
    for old, new in replacements.items():
        old_bytes = old.encode('utf-8') # These strings themselves are UTF-8 representations of the corruption
        # Wait, if they are already corrupted in the file, we should use their literal bytes
        # In PowerShell UTF-8 output of a misinterpreted bullet, it's often these specific bytes:
        # â€¢ is C3 A2 E2 80 A2
        
        if old_bytes in new_content:
            new_content = new_content.replace(old_bytes, new.encode('utf-8'))
            modified = True
            
    if modified:
        with open(filepath, 'wb') as f:
            f.write(new_content)
        return True
    return False

# List of files to process
html_files = [f for f in os.listdir('.') if f.endswith('.html')]

print(f"Checking {len(html_files)} HTML files...")

for filename in html_files:
    if fix_file(filename):
        print(f"Fixed: {filename}")
    else:
        print(f"No corruption found or already fixed: {filename}")
