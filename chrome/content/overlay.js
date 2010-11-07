
var proxymob = {
	prefs: null,
        prefs2: null,
	
	// Initialize the extension
	
	startup: function()
	{
		// Register to receive notifications of preference changes
		this.prefs = Components.classes["@mozilla.org/preferences-service;1"]
         .getService(Components.interfaces.nsIPrefService)
         .getBranch("extensions.proxymob.network.proxy.");
     this.prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);		
		this.prefs.addObserver("", this, false);
		

		this.prefs2 = Components.classes["@mozilla.org/preferences-service;1"]
         .getService(Components.interfaces.nsIPrefService)
         .getBranch("network.proxy.");
	},
	
	// Clean up after ourselves and save the prefs
	
	shutdown: function()
	{
		this.prefs.removeObserver("", this);
	},
	
	// Called when events occur on the preferences
	
	observe: function(subject, topic, data)
	{
		if (topic != "nsPref:changed")
		{
			return;
		}
		alert(subject + ": " + topic + ": " + data);

		 var prefVal = this.prefs.getCharPref(data);
		 alert(data + ': '  + prefVal);
       		 this.prefs2.setIntPref(data, prefVal);

	}
	
}

// Install load and unload handlers

window.addEventListener("load", function(e) { proxymob.startup(); }, false);
window.addEventListener("unload", function(e) { proxymob.shutdown(); }, false);
