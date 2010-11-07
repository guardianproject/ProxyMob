/*
 * Developed by the Guardian Project :: https://guardianproject.info
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
//
//this whole code exists because we can't do integer settings in the options.xul file. lame.

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

		//monitor change events on this branch
		this.prefs.addObserver("", this, false);
		

		//get access to the primary network proxy preferences
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

		//get the string char value and then set the actual preference
		var prefVal = this.prefs.getCharPref(data);
       		this.prefs2.setIntPref(data, prefVal);

	}
	
}

// Install load and unload handlers

window.addEventListener("load", function(e) { proxymob.startup(); }, false);
window.addEventListener("unload", function(e) { proxymob.shutdown(); }, false);
