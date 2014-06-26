


setPourcentage = function(number) {
    chrome.browserAction.setBadgeText({text:number.toString()});
}

setPourcentage(60);

chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var newURL = "http://share:1337";
    chrome.tabs.create({ url: newURL });
});


Dropzone.autoDiscover = false;

$( document ).ready(function() {

    var dropzone = new Dropzone('.dropzone', {
        url: 'http://share:1337/upload/',
        createImageThumbnails: false
    });



    chrome.runtime.onMessageExternal.addListener(
      function(request, sender, sendResponse) {
        console.log(request.file);
        dropzone.addFile(request.file);
      }
    );
});

