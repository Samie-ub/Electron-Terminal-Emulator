"use strict";
const { userInfo } = require('os');
var shell = require('shelljs');
shell.config.execPath = shell.which('node').toString()

const p = document.createElement("p");
const div = document.createElement("div");

const termwindow = document.querySelector(".window");

const prompt_ = "$";
const path = "~ ";
let command = "";

// List of commands
function whoami(){
    termwindow.append(userInfo().username);
}
function exec(arg){
    termwindow.append(shell.exec(arg.join(" ")).stdout + "\n");
}
function pushd(arg){
    if (arg[0] === undefined){
        arg[0] = "-q";
    }
    if (arg[1] === undefined){
        arg[1] = shell.pwd();
    }
    shell.pushd(arg[0], arg[1]);
    if (shell.error() != null){
        termwindow.append(shell.error() + "\n");
    }
}
function popd(arg){
    if (arg[0] === undefined){
        arg[0] = "-q";
    }
    shell.popd(arg[0], arg[1]);
    if (shell.error() != null){
        termwindow.append(shell.error() + "\n");
    }
}
function dirs(arg){
    if (arg[0] === undefined){
        arg[0] = "-q";
    }
    shell.dirs(arg[0]).forEach(element => {
        element.split(",");
        termwindow.append(element + "\n");
    })
}
function touch(arg){
    if (arg[1] === undefined && arg[2] === undefined){
        termwindow.append(shell.touch(arg[0]));
    }
    else {
        termwindow.append(shell.touch(arg[0], arg[1], arg[2]));
    }
    if (shell.error() != null){
        termwindow.append(shell.error() + "\n");
    }
}
function test(arg){
    termwindow.append(shell.test(arg[0], arg[1]));
    if (shell.error() != null){
        termwindow.append(shell.error() + "\n");
    }
}
function sort(arg){
    termwindow.append(shell.sort(arg.join(" ")));
    if (shell.error() != null){
        termwindow.append(shell.error() + "\n");
    }
}
function mv(arg){
    termwindow.append(shell.mv(arg[0], arg[1]));
    if (shell.error() != null){
        termwindow.append(shell.error() + "\n");
    }
}
function grep(arg){
    if (arg[2] === undefined){
        termwindow.append(shell.grep(arg[0],arg[1]));
    }
    else {
        termwindow.append(shell.grep(arg[0],arg[1], arg[2]));
    }
    if (shell.error() != null){
        termwindow.append(shell.error() + "\n");
    }
}
function find(arg){
    termwindow.append(shell.find(arg[0]) + "\n");
    if (shell.error() != null){
        termwindow.append(shell.error() + "\n");
    }
}

function cat(arg){
    if (arg[1] === undefined){
        termwindow.append(shell.cat(arg[0]) + "\n");
    }
    else {
        termwindow.append(shell.cat(arg[0], arg[1]) + "\n");
    }
    if (shell.error() != null){
        termwindow.append(shell.error() + "\n");
    }
}
function rm(arg){
    process.noAsar = true
    if (arg[1] === undefined){
        shell.rm(arg[0]);
    }
    else {
        shell.rm(arg[0], arg[1]);
    }
    if (shell.error() != null){
        termwindow.append(shell.error() + "\n");
    }
}
function mkdir(arg){
    shell.mkdir(arg[0], arg[1]);
    termwindow.append("\n");
}
function pwd(){
    termwindow.append(shell.pwd() + "\n");
}
function cd(arg){
    shell.cd(arg[0]);
    if (shell.error() != null){
        termwindow.append(shell.error() + "\n");
    }
}
function ls(arg){
    shell.ls(arg.join(" ")).forEach(element => {
        termwindow.append(element + "\n");
    })
}
function clear(){
    termwindow_.textContent = "";
}
function echo(arg){
    if (arg.toString() === ""){
        termwindow.append("Echo....echo....echo...echo....");
    }
    termwindow.append(shell.echo(arg.join(" ")))
}
function help(){
    commands.forEach(element => {
        termwindow.append(element.name + " - " + element.description + "\n");
    });
}
function exit(){
    termwindow.append("Closing..." + "\n");
    window.close();
}
function whatis(args) {
    commands.forEach(element => {
        if (args == element.name){
            termwindow.append(element.name + " - " + element.description + "\n");
        }
    })
}
//#endregion

const commands = [{
    "name": "clear",
    "function": clear,
    "description": "Clears the terminal"
}, {
    "name": "help",
    "function": help,
    "description": "Displays commands"
}, {
    "name": "echo",
    "function": echo,
    "description": "Returns string given"
}, {
    "name": "exit",
    "function": exit,
    "description": "Exits the application"
}, {
    "name": "whatis",
    "function": whatis,
    "description": "Displays help about a single command"
}, {
    "name": "pwd",
    "function": pwd,
    "description": "Returns current directory"
}, {
    "name": "cd",
    "function": cd,
    "description": "Change to given directory. If no directory is given returns to current directory"
}, {
    "name": "ls",
    "function": ls,
    "description": "Lists files in current directory"
}, {
    "name": "mkdir",
    "function": mkdir,
    "description": "Makes a new directory"
}, {
    "name": "rm",
    "function": rm,
    "description": "Remove a directory"
}, {
    "name": "cat",
    "function": cat,
    "description": "Opens files"
}, {
    "name": "find",
    "function": find,
    "description": "Lists files via directory"
}, {
    "name": "test",
    "function": test,
    "description": "Evaluates expression using the available primaries and returns corresponding boolean value"
}, {
    "name": "touch",
    "function": touch,
    "description": "Create a file"
}, {
    "name": "sort",
    "function": sort,
    "description": "Returns sorted files"
}, {
    "name": "mv",
    "function": mv,
    "description": "Move a file to given destination or rename the file"
}, {
    "name": "grep",
    "function": grep,
    "description": "Search for parameter inside file"
}, {
    "name": "pushd",
    "function": pushd,
    "description": "Saves directory to the stack"
}, {
    "name": "popd",
    "function": popd,
    "description": "Gets the top most directory and removes it from the stack"
}, {
    "name": "dirs",
    "function": dirs,
    "description": "Returns list of directories in the stack"
}, {
    "name": "./",
    "function": exec,
    "description": "Execute a program"
}, {
    "name": "whoami",
    "function": whoami,
    "description": "Returns username"
}];
let commandHistory = [];
let historyIndex = 0;

function processcommand(){
    let isValid = false;

    let args = command.split(" ");
    let cmd = args[0];
    args.shift();

    // Iterate through the available commands to find a match.
    // Then call that command and pass in any arguments.
    for (let i = 0; i < commands.length; i++) {
        if (cmd === commands[i].name) {
            commands[i].function(args);
            isValid = true;
            break;
        }
    }

    if (!isValid){
        termwindow.append("Command not found: " + command);
    }

    // Add to command history and clean up.
	commandHistory.push(command);
	historyIndex = commandHistory.length;
	command = "";
}

let onlinestatus = navigator.onLine ? 'Online\n' : 'Offline\n'; // gets whether app is online or not
let status = 'Emulator Status: ' + onlinestatus;

function startterminal(){
    termwindow.append("Terminal Emulator - Electron " + process.versions.electron + "\n");
    termwindow.append(status + "\n");
    displayprompt();
}

// Displays "$ ~ in the console (default)"
function displayprompt(){
    termwindow.append(prompt_);
    termwindow.append(path);
}

function appendcommand(str){
    termwindow.append(str);
    command += str;
}

function erase(n){
    command = command.slice(0, -n);
    termwindow.textContent.slice(0, -n);
}

document.addEventListener("keydown", function(e){
    e = e || window.Event;
    let key = typeof e.which === "number" ? e.which : e.key;
    if (key == 8){
        console.log(command)
        e.preventDefault();
        erase(1);
    }
})

// Allows typing to go brr (except erasing for no fucking reason)
document.addEventListener("keypress", function(e){
    e = e || window.Event;
    let key = typeof e.which === "number" ? e.which : e.key;
    switch (key){
        case 13:
            appendcommand(" \n");
            if (command.trim().length !== 0){
                processcommand();
            }
            displayprompt();
            break;
        default:
            e.preventDefault();
            appendcommand(String.fromCharCode(key));
    }
})

// Some startup stuffs
startterminal();