package SeleniumTests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DeleteRowTest {
    static String myUserName = "userOne";
    static String myPassword = "password";
    static int NUMBER_DELETIONS = 1;

    public static void main(String[] args) throws InterruptedException{
        System.setProperty("webdriver.chrome.driver","D:\\Down\\Term 5\\Elements of Software Construction\\ESC_IntelliJ\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();

        driver.get("http://localhost:3000");

        login(driver);

        Thread.sleep(2000);

        for (int i = 0; i < NUMBER_DELETIONS; i++) {
            WebDriverWait wait = new WebDriverWait(driver, 100);
            WebElement delete = wait.until(ExpectedConditions.elementToBeClickable(By.id("Delete")));
            delete.click();
            Thread.sleep(1000);
            driver.switchTo().alert().accept();
            Thread.sleep(2000);
        }
    }

    public static void  login(WebDriver driver)throws InterruptedException {
        WebDriverWait wait = new WebDriverWait(driver, 100);
        // get the user name field of the account page
        WebElement username = wait.until(ExpectedConditions.elementToBeClickable(By.id("username")));

        // send my user name to fill up the box
        username.sendKeys(myUserName);

        Thread.sleep(1000);

        // now locate the password field in the current page
        WebElement password = driver.findElement(By.id("password"));

        // send password
        password.sendKeys(myPassword);

        Thread.sleep(1000);

        // login
        WebElement loginSubmit = driver.findElement(By.id("loginSubmit"));
        loginSubmit.click();

    }
}
