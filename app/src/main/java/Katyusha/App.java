package Katyusha;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

public class App {
    public static void main(String[] args) {
        Properties properties = new Properties();
        try {
            String configFileName = "src/.config";
            FileInputStream propertiesInput = new FileInputStream(configFileName);
            properties.load(propertiesInput);
            System.out.println(properties.getProperty("TOKEN"));
        } catch (FileNotFoundException e) {
            System.out.println("No .config file found.");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
