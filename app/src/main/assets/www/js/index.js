/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        console.log("-------------------init Action bar -------------------------");

        var ActionBar = window.plugins.actionbar;
        				// Set navigation mode to NAVIGATION_MODE_LIST (for the drop down)
        				ActionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_LIST);

        				ActionBar.setListNavigation([
        				    { text: 'Inbox', click: function() {  } },
        				    { text: 'Outbox', click: function() {  } }
        				]);

        				// Show Logo / Title
        				ActionBar.setDisplayOptions(ActionBar.DISPLAY_SHOW_HOME | ActionBar.DISPLAY_USE_LOGO);
        				ActionBar.setHomeButtonEnabled(true);

        				// Set navigation mode (NAVIGATION_MODE_STANDARD is the default)
        				// ActionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_STANDARD);
        				ActionBar.setHomeCallback(function() { alert('Go up / home'); });

        				// Set menu items
        				ActionBar.setMenu([
        				    { icon: 'img/new.png', text: 'New File', show: ActionBar.SHOW_AS_ACTION_ALWAYS | ActionBar.SHOW_AS_ACTION_WITH_TEXT, click: function() { alert('Create new file'); } },
        				    { icon: 'img/save.png', text: 'Save',
        				      header: { icon: 'img/save.png', text: 'Save as...' },
        				      items: [
        				        { text: 'PNG', click: function() { alert('Save PNG'); } },
        				        { text: 'JPEG', click: function() { alert('Save JPEG'); } }
        				      ]
        				    },
        				    { icon: 'img/search.png', text: 'Search' }
        				]);

         app.receivedEvent('deviceready');

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};