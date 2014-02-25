/**
 * Assemble
 *
 * Assemble <http://assemble.io>
 * Created and maintained by Jon Schlinkert and Brian Woodward
 *
 * Copyright (c) 2013 Upstage.
 * Licensed under the MIT License (MIT).
 */

var expect = require('chai').expect;
var logger = require('../lib/assemble').utils.log;
var streams = require('memory-streams');
var _ = require('lodash');

var runLogs = function(options) {
  var writer = new streams.WritableStream();
  options = _.extend({ stream: writer, theme: 'minimalistic' }, options);
  var log = new logger(options);
  log.debug('debug');
  log.info('info');
  log.warning('warning');
  log.error('error');
  log.critical('critical');
  log.inspect({foo: 'bar'});

  return writer.toString();
};

describe('log', function() {

  it('should log out error and critical messages', function() {
    var expected = 'info: error\ncritical: critical\n';
    var actual = runLogs();
    expect(actual).to.eql(expected);
  });

  it('should log out every message', function() {
    var expected = 'debug: debug\ninfo: info\ninfo: warning\ninfo: error\ncritical: critical\ndebug: { \u001b[1mfoo\u001b[22m: \u001b[32m\'bar\'\u001b[36m }\u001b[39m\n';
    var actual = runLogs({level: logger.levels.debug});
    expect(actual).to.eql(expected);
  });

});