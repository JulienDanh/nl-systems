#!/usr/bin/env python3
"""Build the single-file systems.html from source files in src/.

Usage: python3 src/build.py
Output: systems.html (in repo root)
"""
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"

def read(path):
    return path.read_text(encoding="utf-8")

# Page order in the output
PAGE_ORDER = [
    "primer", "s1", "s2", "s3", "s4", "s5", "s6",
    "s7", "s8", "s9", "s10", "s11", "s12", "conclusion",
]

def build():
    parts = []
    parts.append(read(SRC / "head.html"))
    for name in PAGE_ORDER:
        p = SRC / "pages" / f"{name}.html"
        if not p.exists():
            raise FileNotFoundError(f"Missing page: {p}")
        parts.append(read(p))
    parts.append(read(SRC / "foot.html"))
    # Inline JS
    js = "\n".join(read(SRC / "js" / f) for f in ["nav.js", "data.js", "app.js"])
    parts.append(f"<script>\n{js}\n</script>\n</body>\n</html>\n")

    output = "\n".join(parts)
    out_path = ROOT / "systems.html"
    out_path.write_text(output, encoding="utf-8")
    print(f"Built {out_path.relative_to(ROOT)} ({len(output)} bytes)")

if __name__ == "__main__":
    build()
