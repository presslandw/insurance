#!/usr/bin/env python3
"""Pre-deploy content verification for chriswalkerinsurance.ca.

Run by both the local pre-push hook (.githooks/pre-push) and CI
(.github/workflows/verify.yml). Exits non-zero on any finding.

Checks:
  1. Placeholder text that should never ship: [NUMBER]-style tokens, lorem ipsum.
  2. Every JSON-LD <script> block parses as valid JSON.
  3. Internal links, images, and srcset entries resolve to real files.
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
HTML_FILES = sorted(p for p in ROOT.glob("*.html") if p.name != "google10a4d81a71c07441.html")

PLACEHOLDER_RE = re.compile(r"\[[A-Z][A-Z0-9_]{2,}\]|lorem ipsum", re.IGNORECASE)
COMMENT_RE = re.compile(r"<!--.*?-->", re.DOTALL)
JSONLD_RE = re.compile(
    r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', re.DOTALL
)
ATTR_RE = re.compile(r'\b(?:href|src)=["\']([^"\']+)["\']')
SRCSET_RE = re.compile(r'\bsrcset=["\']([^"\']+)["\']')

SKIP_PREFIXES = ("http://", "https://", "mailto:", "tel:", "#", "data:", "//", "/cdn-cgi/")

errors = []


def check_file(path: Path) -> None:
    raw = path.read_text(encoding="utf-8")
    visible = COMMENT_RE.sub("", raw)  # placeholders inside HTML comments are allowed

    # 1. Placeholders
    for m in PLACEHOLDER_RE.finditer(visible):
        line = visible[: m.start()].count("\n") + 1
        errors.append(f"{path.name}:{line}: placeholder text {m.group(0)!r}")

    # 2. JSON-LD validity
    for i, m in enumerate(JSONLD_RE.finditer(raw), 1):
        try:
            json.loads(m.group(1))
        except json.JSONDecodeError as e:
            errors.append(f"{path.name}: JSON-LD block #{i} invalid: {e}")

    # 3. Internal references resolve
    targets = ATTR_RE.findall(visible)
    for srcset in SRCSET_RE.findall(visible):
        targets += [part.strip().split()[0] for part in srcset.split(",") if part.strip()]
    for t in targets:
        if t.startswith(SKIP_PREFIXES) or not t:
            continue
        local = t.split("#")[0].split("?")[0]
        if not local:
            continue
        if local.startswith("/"):
            local = local.lstrip("/") or "index.html"
        if not (ROOT / local).exists():
            errors.append(f"{path.name}: broken internal reference {t!r}")


def main() -> int:
    if not HTML_FILES:
        print("verify.py: no HTML files found — wrong directory?")
        return 1
    for f in HTML_FILES:
        check_file(f)
    if errors:
        print(f"FAIL — {len(errors)} issue(s):")
        for e in errors:
            print(f"  {e}")
        return 1
    print(f"OK — {len(HTML_FILES)} HTML files: no placeholders, valid JSON-LD, no broken internal links.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
