#!/usr/bin/env python3
"""Resolve the wallet source from the package manifest; fail on drift."""
import argparse
import json
from pathlib import Path
import re
import subprocess


def revision(manifest, checkout=None):
    text = Path(manifest).read_text()
    matches = re.findall(r"\bGIT_HASH\s*:\s*'([0-9a-f]{40})'", text)
    if len(matches) != 1 or len(re.findall(r'\bGIT_HASH\s*:', text)) != 1:
        raise ValueError('Manifest must contain exactly one full pinned wallet commit')
    expected = matches[0]
    if checkout is not None:
        actual = subprocess.check_output(['git', '-C', str(checkout), 'rev-parse', 'HEAD'], text=True).strip()
        if actual != expected:
            raise ValueError('Wallet checkout does not match the package manifest; refusing to build')
        if subprocess.check_output(['git', '-C', str(checkout), 'status', '--porcelain', '--untracked-files=no'], text=True).strip():
            raise ValueError('Wallet checkout has tracked modifications; refusing to build')
    return expected


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--checkout', type=Path)
    parser.add_argument('--provenance', action='store_true')
    args = parser.parse_args()
    source = revision('startos/manifest/index.ts', args.checkout)
    if args.provenance:
        wrapper = subprocess.check_output(['git', 'rev-parse', 'HEAD'], text=True).strip()
        print(json.dumps({'wallet_revision': source, 'wrapper_revision': wrapper}, indent=2))
    else:
        print(source)
