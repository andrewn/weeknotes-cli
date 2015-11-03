weeknotes-cli
===

CLI to create empty weeknotes file.

Install
---

    npm install -g andrew/weeknotes-cli


Usage
---

    $ weeknotes <weeknumber> [<summary text>]

e.g.

    $ weeknotes 45

Create the following file called `2015-11-03-week-45.markdown` with the contents:

    ---

    published: true
    title: Week 45
    summary:
    start: 2015-11-09
    end: 2015-11-15
    tags: weeknotes

    ---

The week number is 1 week behind the calendar week because of when I started my weeknotes. Ooops.

### Summary text

    $ weeknotes 45 'A very interesting week'

Includes the summary text:

    ---

    published: true
    title: Week 45
    summary: A very interesting week
    start: 2015-11-09
    end: 2015-11-15
    tags: weeknotes

    ---
