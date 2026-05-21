#!/usr/bin/env python3
"""
Cache-buster: stamps all HTML files with current datetime as the CSS version.
Run this any time you make a CSS/JS change you need users to see immediately.
Usage:          python3 bump_version.py
"""

import os
import re
import datetime

def main():
    version = datetime.datetime.now().strftime("%Y%m%d%H%M")
    pattern = re.compile(r'style\.css\?v=\d+')
    replacement = f'style.css?v={version}'
    
    html_files = []
    for root, dirs, files in os.walk('.'):
        # Skip git or dependency directories if any
        if '.git' in root or '.vscode' in root or '.gemini' in root:
            continue
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
                
    for filepath in html_files:
        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            updated = re.sub(pattern, replacement, content)
            
            if content != updated:
                with open(filepath, 'w', encoding='utf-8', newline='') as f:
                    f.write(updated)
                print(f"Updated: {os.path.basename(filepath)}")
            else:
                print(f"Skipped (no version string found): {os.path.basename(filepath)}")
        except Exception as e:
            print(f"Error processing {os.path.basename(filepath)}: {e}")
            
    print(f"\nAll files stamped with v={version}. Remember to git commit, push, then purge Cloudflare cache.")

if __name__ == '__main__':
    main()
