---
title: Sync to Notion
---

```yml
name: Sync to Notion

on:
  push:
    paths:
      - 'notes/**.md'
      - 'sync_to_notion.py'
  schedule:
    - cron: '0 */12 * * *'

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install notion-client python-dotenv

      - name: Run sync script
        env:
          NOTION_API_KEY: ${{ secrets.NOTION_API_KEY }}
          DASHBOARD_PAGE_ID: ${{ secrets.DASHBOARD_PAGE_ID }}
          TOOLBOX_PAGE_ID: ${{ secrets.TOOLBOX_PAGE_ID }}
          PHILOSOPHY_PAGE_ID: ${{ secrets.PHILOSOPHY_PAGE_ID }}
          GROOMING_PAGE_ID: ${{ secrets.GROOMING_PAGE_ID }}
        run: python sync_to_notion.py
```