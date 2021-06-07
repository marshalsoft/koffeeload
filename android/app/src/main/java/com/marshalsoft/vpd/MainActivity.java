package com.koffeeload;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import android.widget.Toast;  
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "koffeeload";
    }
 @Override
protected ReactActivityDelegate createReactActivityDelegate() {
   return new ReactActivityDelegate(this, getMainComponentName()) {
    @Override
    protected ReactRootView createRootView() {
    // Toast.makeText(MainActivity.this,"initializing view",Toast.LENGTH_SHORT).show();
   return new RNGestureHandlerEnabledRootView(MainActivity.this);
   }
  };
  }
  
}
