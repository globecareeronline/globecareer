#!/usr/bin/env python3
"""
Create the single, authoritative GlobeCareer-GitHub-Cloudflare-Ready.zip package.
Outputs strictly ONE archive in the workspace root.
"""
import os
import zipfile

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
ZIP_FILENAME = "GlobeCareer-GitHub-Cloudflare-Ready.zip"
OUTPUT_ZIP_PATH = os.path.join(ROOT_DIR, ZIP_FILENAME)

EXCLUDE_DIRS = {
    'node_modules',
    '.git',
    '.aistudio',
    '__pycache__',
    '.vscode',
    '.idea'
}

EXCLUDE_FILES = {
    ZIP_FILENAME,
    '.DS_Store',
    'create_release_zip.py'
}

def should_exclude(rel_path):
    parts = rel_path.replace('\\', '/').split('/')
    for part in parts:
        if part in EXCLUDE_DIRS:
            return True
    if parts[-1] in EXCLUDE_FILES:
        return True
    if parts[-1].endswith('.tmp') or parts[-1].endswith('.log'):
        return True
    return False

def make_zip():
    # Remove existing zip if present
    if os.path.exists(OUTPUT_ZIP_PATH):
        os.remove(OUTPUT_ZIP_PATH)

    print(f"Packaging {ZIP_FILENAME}...")
    file_count = 0
    total_uncompressed_bytes = 0

    with zipfile.ZipFile(OUTPUT_ZIP_PATH, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as zipf:
        for root, dirs, files in os.walk(ROOT_DIR):
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
            
            for file in sorted(files):
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, ROOT_DIR)
                
                if should_exclude(rel_path):
                    continue
                
                # Archive name: place everything under 'GlobeCareer/' directory
                arcname = os.path.join("GlobeCareer", rel_path).replace('\\', '/')
                zipf.write(full_path, arcname)
                file_count += 1
                total_uncompressed_bytes += os.path.getsize(full_path)

    zip_size = os.path.getsize(OUTPUT_ZIP_PATH)
    print(f"[SUCCESS] Created single final deliverable: {OUTPUT_ZIP_PATH}")
    print(f"Total files in archive: {file_count}")
    print(f"Uncompressed size: {total_uncompressed_bytes / (1024*1024):.2f} MB ({total_uncompressed_bytes:,} bytes)")
    print(f"Compressed ZIP size: {zip_size / (1024*1024):.2f} MB ({zip_size:,} bytes)")

if __name__ == '__main__':
    make_zip()
