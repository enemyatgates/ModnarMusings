---
title: The Python Code
---

Start of the Code

```py
import os
import glob
from notion_client import Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

notion = Client(auth=os.getenv("NOTION_API_KEY"))

# Page ID mappings
PAGE_IDS = {
    "🏛️ Dashboard": os.getenv("DASHBOARD_PAGE_ID"),
    "🛠️ Toolbox & Tactics": os.getenv("TOOLBOX_PAGE_ID"),
    "🌀 Philosophical Constructs": os.getenv("PHILOSOPHY_PAGE_ID"),
    "👨‍👧 Grooming Legacy": os.getenv("GROOMING_PAGE_ID"),
}

def update_page_from_md(page_title, md_path):
    with open(md_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Truncate if over Notion block character limit
    content = content[:2000]

    # Convert markdown to Notion paragraph block
    blocks = [{
        "object": "block",
        "type": "paragraph",
        "paragraph": {
            "rich_text": [{
                "type": "text",
                "text": {"content": content}
            }]
        }
    }]

    print(f"Updating Notion page: {page_title}")
    notion.blocks.children.append(PAGE_IDS[page_title], children=blocks)

def sync_all_notes():
    for md_file in glob.glob("./notes/*.md"):
        title = os.path.basename(md_file).replace(".md", "")
        if title in PAGE_IDS:
            update_page_from_md(title, md_file)

if __name__ == "__main__":
    sync_all_notes()
```

End of the Code.