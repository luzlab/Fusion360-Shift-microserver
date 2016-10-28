const commandId = 'FATHOM-Microservice';
const commandName = 'FATHOM Microservice';
const commandDescription = 'Executes a javascript job';

var app = adsk.core.Application.get();
var ui = app.userInterface;

function run(context) {
  "use strict";
  if (adsk.debug === true) {
    /*jslint debug: true*/
    debugger;
    /*jslint debug: false*/
  }

  try {
    var cmdDef = ui.commandDefinitions.itemById(commandId);
    if (cmdDef) {
      cmdDef.deleteMe();
    }
    cmdDef = ui.commandDefinitions.addButtonDefinition(commandId, commandName, commandDescription);
    cmdDef.commandCreated.add(createScriptCallback);
  } catch (e) {
    if (ui) {
      ui.messageBox('Failed : ' + (e.description ? e.description : e));
    }
  }
};

function createScriptCallback(args) {
  var command = args.command;
  var inputs = command.commandInputs;
  // var foo = inputs.addStringValueInput('foo', 'foo');
  // foo.isVisible = false;
  // var params = inputs.addStringValueInput('params', 'params');
  // params.isVisible = false;
  command.execute.add(executeScriptCallback);
  // command.isOKButtonVisible = false;
  // command.isCancelButtonVisible = false;

  var log = ''
  log += '**** Create callback\n';
  log += 'Num of inputs :' + inputs.count;
  ui.messageBox(log);
}

function executeScriptCallback(args) {
  var command = args.command;
  var inputs = command.commandInputs;
  
  var log = ''
  log += '**** Execute callback\n';
  log += 'Num of inputs :' + inputs.count;
  ui.messageBox(log);
}


function stop(context) {
  try {
    // ui.messageBox('Microservice client stopped');
  } catch (e) {
    if (ui) {
      ui.messageBox('Failed : ' + (e.description ? e.description : e));
    }
  }
};

