#!/usr/bin/env node
'use strict';

const argv = require('./src/arguments');
const tasks = require('./src/tasks');

tasks({argv});
