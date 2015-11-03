#!/usr/bin/env node

var parseArgs = require('minimist'),
    moment = require('moment'),
    path = require('path'),
    fs = require('fs');

var cli = {
  string: ['filepath'],
  boolean: ['force'],
  alias: {
    'f': 'filepath'
  },
  default: {
    'filepath': process.cwd(),
    'force': false
  }
};

var args = parseArgs(process.argv, cli);

var format = 'YYYY-MM-DD';

var weekNum, adjustedWeek, start, end, year, title;

if (args._.length > 2) {
  weekNum = args._[2];
} else {
  console.error('No week number given')
  process.exit(1);
}

if (args._.length > 3) {
  title = args._.slice(3).join(' ');
} else {
  title = "";
}

adjustedWeek = weekNum + 1;

var today = moment();
var year = today.year();

start = moment(`${year}-W${adjustedWeek}`);
end = start.clone().add(6, 'days');

var data = {
  number: weekNum,
  title: title,
  start: f(start),
  end: f(end)
};

var filename = `${f(today)}-week-${weekNum}.markdown`;
var filepath = path.join(args.filepath, filename);
var contents = template(data);

if (fs.existsSync(filepath) && args.force !== true) {
  console.error('File already exists, will not overwrite without --force:');
  console.error('', filepath);
  process.exit();
}

console.log(`Writing ${filepath}...`);

fs.writeFileSync(filepath, contents);

console.log(`... done`);

function f(date) {
  return date.format(format);
}

function template(week) {
  return `---

published: true
title: Week ${week.number}
summary: ${week.title}
start: ${week.start}
end: ${week.end}
tags: weeknotes

---

`;
}
