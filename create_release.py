#!/usr/bin/env python
"""
Create v1.0 release tag for C3 Notes application
Run: python create_release.py
"""

import subprocess
import sys
from datetime import datetime

def run_command(cmd, description):
    """Run a shell command and report status"""
    print(f"\n{'='*60}")
    print(f"📦 {description}")
    print(f"{'='*60}")
    print(f"Running: {cmd}")
    
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    
    if result.returncode == 0:
        print(f"✅ SUCCESS")
        if result.stdout:
            print(result.stdout)
        return True
    else:
        print(f"❌ FAILED")
        if result.stderr:
            print(f"Error: {result.stderr}")
        return False

def main():
    print("\n" + "="*60)
    print("🚀 C3 NOTES v1.0 RELEASE TAG CREATION")
    print("="*60)
    
    # Step 1: Check if on main branch
    branch_cmd = 'git rev-parse --abbrev-ref HEAD'
    result = subprocess.run(branch_cmd, shell=True, capture_output=True, text=True)
    current_branch = result.stdout.strip()
    
    if current_branch != "main":
        print(f"\n❌ ERROR: You must be on 'main' branch to create release tag")
        print(f"Current branch: {current_branch}")
        print(f"\nSwitch to main:")
        print(f"  git checkout main")
        sys.exit(1)
    
    print(f"✅ On main branch")
    
    # Step 2: Create annotated tag
    tag_date = datetime.now().strftime("%Y-%m-%d")
    tag_message = f"Release v1.0 - MVP complete - {tag_date}"
    
    tag_cmd = f'git tag -a v1.0 -m "{tag_message}"'
    if not run_command(tag_cmd, "Creating v1.0 tag"):
        sys.exit(1)
    
    # Step 3: Verify tag created
    verify_cmd = 'git tag -l v1.0'
    if not run_command(verify_cmd, "Verifying tag"):
        sys.exit(1)
    
    # Step 4: Show tag info
    show_cmd = 'git show v1.0'
    if not run_command(show_cmd, "Showing tag details"):
        sys.exit(1)
    
    # Step 5: Push tag to GitHub
    print(f"\n{'='*60}")
    print("⚠️  IMPORTANT: Push tag to GitHub")
    print(f"{'='*60}")
    print(f"\nRun this command to push the tag:")
    print(f"  git push origin v1.0")
    
    # Optional: auto-push if user confirms
    try:
        response = input("\nPush tag to GitHub now? (y/n): ").lower().strip()
        if response == 'y':
            push_cmd = 'git push origin v1.0'
            if run_command(push_cmd, "Pushing tag to GitHub"):
                print(f"\n✅ Tag pushed successfully!")
                print(f"\nView on GitHub:")
                print(f"  https://github.com/synochan/C3-Notes-Web-App/releases/tag/v1.0")
            else:
                print(f"\n⚠️  Tag created locally but not pushed")
                print(f"Push manually with: git push origin v1.0")
    except KeyboardInterrupt:
        print(f"\n\nSkipped auto-push. Push manually with: git push origin v1.0")
    
    print(f"\n{'='*60}")
    print("✅ v1.0 RELEASE TAG CREATED")
    print(f"{'='*60}")
    print(f"\nNext steps:")
    print(f"  1. Verify tag on GitHub")
    print(f"  2. Create GitHub release page")
    print(f"  3. Add release notes")
    print(f"  4. Celebrate! 🎉")

if __name__ == "__main__":
    main()
