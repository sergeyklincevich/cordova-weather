package com.example.sergeyklincevich.cordovaphonegap;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.Window;
import org.apache.cordova.Config;
import org.apache.cordova.DroidGap;


public class MainActivity extends DroidGap
{

    @Override
    public void onCreate(Bundle savedInstanceState) {
		// Request action bar feature BEFORE onCreate (window features must be requested before the window is created)
		super.setBooleanProperty("showTitle", true);
//		requestWindowFeature(Window.FEATURE_ACTION_BAR);

        super.onCreate(savedInstanceState);
		super.init();
		// Set by <content src="index.html" /> in config.xml
		super.loadUrl(Config.getStartUrl());
		//super.loadUrl("file:///android_asset/www/index.html")

		// Artificially create our action bar (action bar won't be created until the first call to getActionBar)
		getActionBar();
	}


}
