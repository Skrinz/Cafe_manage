/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package coffee_manage.utils;

/**
 *
 * @author Scyllus
 */
public class UserSession {
    private static int id;

    // Getter and Setter for role
    public static int getUserId() {
        return id;
    }

    public static void setUserId(int id) {
        UserSession.id = id;
    }

    // Clear session data
    public static void clearSession() {
        id = -1;
    }
}
