//package SeleniumTests; // change package name is needed

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TicketLimitTest {
    static String myUserName = "userTwo";
    static String myPassword = "password";
    static String myEmail = ""; // enter you own email

    public static void main(String[] args) throws InterruptedException {

        //login
        System.setProperty("webdriver.chrome.driver","/Users/junhan/eclipse-workspace/chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:3000");
        WebDriverWait wait = new WebDriverWait(driver, 100);
        wait.until(ExpectedConditions.elementToBeClickable(By.id("username"))).sendKeys(myUserName);
//        Thread.sleep(1000);
        driver.findElement(By.id("password")).sendKeys(myPassword);
//        Thread.sleep(1000);
        driver.findElement(By.id("loginSubmit")).click();
        System.out.println("Logging in...");

        //create new ticket x4
        for (int i= 0; i < 4; i++) {
            wait.until(ExpectedConditions.presenceOfElementLocated(By.id("logout")));
            driver.navigate().to("http://localhost:3000/NewTicket");

            System.out.println("Attempting to create ticket " + (i+1));
            wait.until(ExpectedConditions.elementToBeClickable(By.name("title"))).sendKeys("Ticket limit test");
            driver.findElement(By.id("select-category")).click();
            new Actions(driver).sendKeys(Keys.ENTER).perform();
            driver.findElement(By.name("message")).sendKeys("I am having some problems with login. My password and username is correct but they say its wrong. Now my account is locked. Can you help me reset my password.");
            driver.findElement(By.name("email")).sendKeys(myEmail);
            driver.findElement(By.id("submit_button")).click();

            wait.until(ExpectedConditions.alertIsPresent());
            Alert alert = driver.switchTo().alert();
            String alertText = alert.getText();
            System.out.println("Alert: " + alertText);
            if (alertText.contains("created")) {
                alert.accept();
            }
            else {
                if (alertText.contains("Exceeded")) {
                    System.out.println("3 ticket limit test complete.");
                }
                break;
            }

        }
    }
}
