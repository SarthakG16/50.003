package SeleniumTests;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.ArrayList;

public class ReplyEmailNotifTest {
    static String myUserName = "adminOne";
    static String myPassword = "password";
    static String myEmail = "";
    static String myEmailPassword = "";

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

        //reply
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("logout")));
        driver.navigate().to("http://localhost:3000/Open");
        wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[@aria-label='Last Page']"))).click();
        driver.findElement(By.name("ticketTitle")).click();

        System.out.println("Attempting to reply");
        wait.until(ExpectedConditions.elementToBeClickable(By.name("Reply"))).sendKeys("Hi, an email has been sent containing a link to reset your password.");
        driver.findElement(By.id("submit_button")).click();

        wait.until(ExpectedConditions.alertIsPresent());
        Alert alert = driver.switchTo().alert();
        String alertText = alert.getText();
        System.out.println("Alert: " + alertText);
        alert.accept();

        //login to gmail
        ((JavascriptExecutor)driver).executeScript("window.open()");
        ArrayList<String> tabs = new ArrayList<String>(driver.getWindowHandles());
        driver.switchTo().window(tabs.get(1));
        driver.get("https://gmail.com/");
        System.out.println("Logging in to Gmail...");

        WebElement username = driver.findElement(By.name("identifier"));
        username.sendKeys(myEmail);
        WebElement nextButton = driver.findElement(By.id("identifierNext"));
        nextButton.click();

        wait.until(ExpectedConditions.elementToBeClickable(By.name("password"))); //important part

        WebElement password = driver.findElement(By.name("password"));
        password.sendKeys(myEmailPassword);
        nextButton = driver.findElement(By.id("passwordNext"));
        nextButton.click();
        System.out.println("Logged in.");

        //open mail
//        WebElement[] listOfEmailElements = driver.findElements(By.cssSelector('tbody > tr.zA'));
//        wait.until(ExpectedConditions.elementToBeClickable(By.id("2s"))).click();

    }

}
