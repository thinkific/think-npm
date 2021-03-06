const should = require('should');
const rewire = require('rewire');
const sinon = require('sinon');

const think = rewire('../think');

describe('thinkcli', () => {
  before((beforeCb) => {
    think.__set__('print', () => {});
    beforeCb();
  });

  it('can be exported', () => {
    should.exist(think);
  });

  it('calls help if no command is understood', () => {
    const helpers = {
      validateCommand() {
        return false;
      },
      runCommand(command) {
        command.should.be.equal('help');
      },
    }
    think.__set__('helpers', helpers);

    // should try to load the help function
    think(['wrong-command']);
  });

  it('calls appropriate command', () => {
    const command = 'hello-world';
    const helpers = {
      validateCommand() {},
      runCommand(cmd) {
        cmd.should.be.equal(command);
      },
    }
    think.__set__('helpers', helpers);

    // should try to load the help function
    think([command]);
  });

  it('calls help if no command was passed', () => {
    // overwrite runner
    const helpers = {
      runCommand: sinon.spy(),
    }
    think.__set__('helpers', helpers);

    // should try to load the help function
    think([]);

    // should try to load the help function
    helpers.runCommand.calledWithExactly('help');
  });

  it('handles exceptions gracefully', () => {
    const helpers = {
      validateCommand() {
        throw Error('Something went wrong');
      },
      runCommand() {},
    }
    think.__set__('helpers', helpers);
    should.throws(() => {
      think(['some-command']);
    });
  });
});
