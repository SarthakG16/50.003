package SeleniumTests;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ReplyCharTest {
    static String myUserName = "userTwo";
    static String myPassword = "password";
    static String myEmail = "";

    public static void main(String[] args) throws InterruptedException {

        //login
        System.setProperty("webdriver.chrome.driver", "/Users/junhan/eclipse-workspace/chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:3000");
        WebDriverWait wait = new WebDriverWait(driver, 100);
        wait.until(ExpectedConditions.elementToBeClickable(By.id("username"))).sendKeys(myUserName);
//        Thread.sleep(1000);
        driver.findElement(By.id("password")).sendKeys(myPassword);
//        Thread.sleep(1000);
        driver.findElement(By.id("loginSubmit")).click();
        System.out.println("Logging in...");

        wait.until(ExpectedConditions.presenceOfElementLocated(By.name("ticketTitle")));
        driver.findElement(By.name("ticketTitle")).click();

        System.out.println("Attempting to reply");
        wait.until(ExpectedConditions.elementToBeClickable(By.name("Reply"))).sendKeys("Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply Test reply ");
        driver.findElement(By.id("submit_button")).click();

        wait.until(ExpectedConditions.alertIsPresent());
        Alert alert = driver.switchTo().alert();
        String alertText = alert.getText();
        System.out.println("Alert: " + alertText);
        if (alertText.contains("character")) {
            System.out.println("Reply character test complete.");
        }

    }

}
