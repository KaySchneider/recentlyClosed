'use-strict';
var tempHistory=[];
var tempClosed=[];
var setupEvents = function() {
     var mytabs = [];
    chrome.tabs.onRemoved.addListener(function(removeInfo) {
        /**
         * remove the tab from the memory
         *
         */
        removeTabId(removeInfo);
    });
    chrome.tabs.onCreated.addListener(function(tabInfo) {
        mytabs.push(tabInfo);
        check(tabInfo);
    });

    chrome.tabs.onActivated.addListener(function(tabInfo) {
       getTabInfo(tabInfo.tabId);
    });

    chrome.tabs.onUpdated.addListener(function(tabInfo) {
        /**
         * when a tab was updated that can be different changes,
         * every load changes will cause here an action, so we has to
         * handle this events
         * we handle here only the tab id
         */
        getTabInfo(tabInfo);
    });

    var check = function(tabInfo) {
        
    };
    var getTabInfo= function(tabId) {
        chrome.tabs.get(tabId, function(tabInfo) {
            updateTabInfo(tabInfo);
            check(tabInfo);
       });
    };

    /**
     * the tabs wil be hold as an array
     * until an tabs closed then we write it down
     * to localStorage! Or the browser closed
     */
    var updateTabInfo = function(tabInfoObject) {
        var id = tabInfoObject.id;
        for(var tabInfo in mytabs) {
            if(mytabs[tabInfo].id === id) {
                mytabs[tabInfo] = tabInfoObject;
                return;
            }
        }
        mytabs.push(tabInfoObject);
    };

    var removeTabId = function(tabId) {
        for(var tabInfo in mytabs) {
            if(mytabs[tabInfo].id === tabId) {
                addClosedTabToStorage(mytabs[tabInfo]);
                mytabs.splice(tabInfo, 1);
            }
        }
    };

    var addClosedTabToStorage = function(tabObject) {
        if(tabObject.url.search('chrome-devtools://') != -1 || tabObject.url.search('chrome://') != -1 || tabObject.url.search('chrome-extension://') != -1)
            return;
        var closedTabs = localStorage.getItem('closedTabs');
        if(closedTabs === null) {
            closedTabs = [];
        } else {
            closedTabs = JSON.parse(closedTabs);
        }
        tempClosed = closedTabs;
        closedTabs.push(tabObject);
        closedTabs.reverse();
        closedTabs = closedTabs.slice(0,100);
        //store the updated object back to the closedtabs
        localStorage.setItem('closedTabs', JSON.stringify(closedTabs));
    };


};

setupEvents();

var getClosedTabs = function() {
    console.log(closedTabs)
    if(tempClosed.length==0) {
        var closedTabs = localStorage.getItem('closedTabs');
        if (closedTabs === null) {
            closedTabs = [];
        } else {
            closedTabs = JSON.parse(closedTabs);
        }
        return closedTabs;
    } else {
        return tempClosed;
    }
};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.command == "getClosed")
            sendResponse({tabs: getClosedTabs()});
});
