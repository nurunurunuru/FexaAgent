"""
Human-sounding demo voices (free, no API key) using Microsoft neural voices.

Setup (once):   pip install edge-tts
Run (project root):   python generate_voices.py

Reads every `script` in voiceData.js and creates
  public/audio/<slug>/1.mp3, 2.mp3, ...   (same order as the script lines)
The demo plays these files automatically. Missing file => browser voice fallback.
"""
import asyncio, glob, os, re, sys

AGENT_VOICE = "en-US-AriaNeural"     # try: en-US-JennyNeural, en-GB-SoniaNeural
CUSTOMER_VOICE = "en-US-GuyNeural"   # try: en-US-DavisNeural, en-US-RyanNeural (en-GB)
RATE = "-3%"                         # slightly slower = more natural

def find_data_file():
    hits = glob.glob("src/**/voiceData.js", recursive=True)
    if not hits:
        sys.exit("voiceData.js not found. Run this from the project root.")
    return hits[0]

def parse(path):
    src = open(path, encoding="utf-8").read()
    out = {}
    for chunk in src.split('slug: "')[1:]:
        slug = chunk.split('"', 1)[0]
        lines = re.findall(r'who:\s*"(customer|agent)",\s*text:\s*"((?:[^"\\]|\\.)*)"', chunk)
        out[slug] = [(w, t.replace('\\"', '"').replace("\\'", "'")) for w, t in lines]
    return out

async def main(dry):
    data = parse(find_data_file())
    if dry:
        for slug, lines in data.items():
            print(slug, len(lines), "lines")
        return
    import edge_tts
    for slug, lines in data.items():
        folder = os.path.join("public", "audio", slug)
        os.makedirs(folder, exist_ok=True)
        for i, (who, text) in enumerate(lines, 1):
            voice = AGENT_VOICE if who == "agent" else CUSTOMER_VOICE
            target = os.path.join(folder, f"{i}.mp3")
            await edge_tts.Communicate(text, voice, rate=RATE).save(target)
            print("saved", target)

asyncio.run(main("--dry" in sys.argv))