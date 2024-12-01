package coffee_manage.utils;

import javax.swing.*;
import java.awt.event.*;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateTimeUpdater {
    
    public static void startUpdatingDateTime(JLabel label) {
        Timer timer = new Timer(1000, new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                // Format the date-time
                SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss | dd-MM-yyyy");
                String dateTime = sdf.format(new Date());
                
                // Update the label text with the formatted date-time
                label.setText(dateTime);
            }
        });
        timer.start();  // Start the timer to update every second
    }
}
