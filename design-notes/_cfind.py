from pathlib import Path
root = Path(r"C:\Users\User\.cursor\projects\c-Users-User-OneDrive-Desktop-AAAMT-1\agent-transcripts")
needles = ["How Can We Help", "Let's start a conversation", "Visit AAAMT", "Send enquiry", "contact screenshot", "Contact Us"]
for p in root.rglob("*.md"):
    t = p.read_text(encoding="utf-8", errors="replace")
    if "contact" in t.lower() and "screenshot" in t.lower():
        print(p.name, t.lower().count("contact"))
