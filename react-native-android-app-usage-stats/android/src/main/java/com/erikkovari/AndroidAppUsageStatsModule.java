// ToastModule.java

package com.erikkovari;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import android.app.usage.UsageEvents;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.content.pm.ApplicationInfo;
import android.util.Log;
import android.provider.Settings;
import android.net.Uri;

import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

import java.util.Map;

import java.util.HashMap;

import com.facebook.react.bridge.Callback;

public class AndroidAppUsageStatsModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    AndroidAppUsageStatsModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "AndroidAppUsageStats";
    }

    @ReactMethod
    public void getUsageListForPeriod(String period, Callback finishedCallback) {

        long start;
        Calendar calendar = Calendar.getInstance();
        long end = calendar.getTimeInMillis();

        switch (period) {
        case "day":
            calendar.add(Calendar.DAY_OF_MONTH, -1);
            start = calendar.getTimeInMillis();

            break;
        case "week":
            calendar.add(Calendar.DAY_OF_MONTH, -7);
            start = calendar.getTimeInMillis();

            break;
        default:
            calendar.add(Calendar.DAY_OF_MONTH, -1);
            start = calendar.getTimeInMillis();

            break;
        }

        // query the data
        UsageStatsManager statsManager = (UsageStatsManager) reactContext.getSystemService("usagestats");
        Map<String, UsageStats> stats = statsManager.queryAndAggregateUsageStats(start, end);

        if (stats.size() == 0) {
            // User hasn't granted access to usage stats - opening settings
            Intent intent = new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK); // needed because android >9 won't let an intent launch if
                                                            // not in an actrivity
            reactContext.startActivity(intent);
        } else {
            // List<UsageStats> cannot be converted to JS array, usign WritableArray and
            // WritableMap instead from react
            WritableArray returnData = new WritableNativeArray();
            PackageManager packageManager = reactContext.getPackageManager(); // changed

            for (Map.Entry<String, UsageStats> entry : stats.entrySet()) {

                String packageName = entry.getValue().getPackageName();

                WritableMap statData = new WritableNativeMap();
                statData.putString("packageName", packageName);
                statData.putString("time_foreground", Long.toString(entry.getValue().getTotalTimeInForeground()));

                ApplicationInfo applicationInfo = null;
                try {
                    applicationInfo = packageManager.getApplicationInfo(packageName, 0);
                } catch (final NameNotFoundException e) {
                }

                String appName = (String) ((applicationInfo != null)
                        ? packageManager.getApplicationLabel(applicationInfo)
                        : "???");
                statData.putString("name", appName);

                // Drawable appLogo = (Drawable)
                // packageManager.getApplicationLogo(applicationInfo);
                /*
                 * URI path = Uri .parse("android.resource://" +
                 * entry.getValue().getPackageName() + "/" + appLogo.toString());
                 * statData.putString("logo", path.toString());
                 */

                returnData.pushMap(statData);
            }

            finishedCallback.invoke(returnData);
        }

    }

    @ReactMethod
    public int show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
        return 2;
    }

}