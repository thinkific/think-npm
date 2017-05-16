'use strict'

var should = require('should');
var themes = require('../../src/core/services/themes');
var helpers = require('../../src/core/helpers');

describe('themes command', function() {

  it('should retrieve a module', function() {
    should.exist(themes);
  });

  it('shouldn\' throw errors when valid subcommands are passed', function() {
    should.doesNotThrow(function(){
      wizard.options.validate_args(['list']);
    });
  });

  it('should throw errors when invalid subcommands are passed', function() {
    should.throws(function(){
      wizard.options.validate_args(['invalid']);
    })
  });

  it('should throw errors when no subcommands are passed', function() {
    should.throws(function(){
      wizard.options.validate_args([]);
    })
  });

});