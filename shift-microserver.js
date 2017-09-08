// Author Carlo Quinonez
// Description Start the Fusion360 Microserver for Shift.

function run(context) {
    // create unique dir for this agent.
    var adskEmail = adsk.core.Application.get().userName;
    var adskId = adsk.core.Application.get().userId;

    var cookie = uuidv4();
    var shiftDir = adsk.tempDirectory() + '/shift/' + '/' + cookie;
    adsk.createDirectory(shiftDir + '/shift');

    var shiftURL =
        Shift.config.shiftURL +
        '/' +
        Shift.config.agentRole +
        '?cookie=' +
        encodeURIComponent(cookie) +
        '&adskEmail=' +
        encodeURIComponent(adskEmail) +
        '&adskId=' +
        encodeURIComponent(adskId);

    console.log('Starting Shift microserver from URL ', shiftURL);

    window.setTimeout(startMicroserver, Shift.config.serverDelay);

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
            c
        ) {
            var r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    function startMicroserver() {
        window.location.assign(shiftURL);
    }
}
