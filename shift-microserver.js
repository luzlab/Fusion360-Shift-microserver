// Author Carlo Quinonez
// Description Start the Fusion360 Microserver for Shift.

import { config } from './config.json';

function run(context) {
    // create cookie for this agent.
    var dirPath = adsk.tempDirectory() + '/shift';
    var cookiePath = dirPath + '/cookie';

    if (!adsk.fileIsDirectory(dirPath)) {
        console.log('Creating Shift directory at ', shiftDir);
        adsk.createDiurectory(shiftDir + '/shift');
    }

    if (!adsk.fileExists(cookiePath)) {
        console.log('Creating cookie at ', cookiePath);
        adsk.writeFile(cookiePath, uuidv4());
    }

    var cookie = adsk.readFile(cookiePath);
    console.log('Cookie id ', cookie);

    var shiftURL = config.shiftURL + '?cookie=' + encodeURIComponent(cookie);
    console.log('Starting Shift microserver from URL ', shiftURL);

    window.setTimeout(startMicroserver, config.serverDelay)

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function startMicroserver() {
        window.location.assign(shiftURL);
    }
}
