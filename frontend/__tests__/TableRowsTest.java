package SeleniumTests;

import com.sun.istack.internal.Nullable;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;
import java.util.function.Predicate;

public class TableRowsTest {
    static String myUserName = "userOne";
    static String myPassword = "password";
    static String title = "Testing Ticket";
    static String message = "Hello, this is Sarthak Ganoorkar, I would like to register a complaint regarding on of your products."
            + " i am facing issues connecting to the server despite supplying the correct credentials to the server. Please advise";
    static String email = "sarthakganoorkar@@gmail.com";

    public static void main (String[] args) throws InterruptedException {
        System.setProperty("webdriver.chrome.driver","D:\\Down\\Term 5\\Elements of Software Construction\\ESC_IntelliJ\\chromedriver_win32\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();

        driver.get("http://localhost:3000");

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

        System.out.println("Moving to Open");

        Thread.sleep(2000);

        java.util.List<WebElement> links = driver.findElements(By.tagName("a"));
        System.out.println(links.size());

        for (int i = 0; i < links.size(); i=i+1) {
            System.out.println(i + " " + links.get(i).getText());
            System.out.println(i + " " + links.get(i).getAttribute("href"));

            if (links.get(i).getText().contains("Open") && myUserName.equals("adminOne")) {
                try {
                    driver.navigate().to(links.get(i).getAttribute("href"));
                    i = links.size();
                } catch (StaleElementReferenceException e) {
                    System.out.println("Error Whoops");
                }
            }
        }

        Thread.sleep(2000);
        JavascriptExecutor js = (JavascriptExecutor) driver;
        WebElement nextPageButton = driver.findElement(By.id("NextPageButton"));

        while (nextPageButton.isEnabled()) {
            List<WebElement> rows = driver.findElements(By.tagName("tr"));
            System.out.println("Rows Found " + rows.size());

            for (int i = 1; i < rows.size()-1; i++) {
                boolean staleElementLoaded = true;
                while(staleElementLoaded) {
                    try {
                        rows.get(i).click();
                        Thread.sleep(1000);

                        js.executeScript("window.scrollTo(0, document.body.scrollHeight)");
                        Thread.sleep(1000);

                        driver.navigate().back();
                        Thread.sleep(1000);

                        rows = driver.findElements(By.tagName("tr"));

                        System.out.println("*** Navigated to" + " " + rows.get(i).getText());
                        staleElementLoaded = false;
                    } catch (StaleElementReferenceException e) {
                        staleElementLoaded = true;
                    }
                }
            }
            nextPageButton = driver.findElement(By.id("NextPageButton"));
            nextPageButton.click();

            Thread.sleep(2000);
        }
		List<WebElement> rows = driver.findElements(By.tagName("tr"));
		System.out.println("Rows Found " + rows.size());

        for (int i = 1; i < rows.size()-1; i=i+1) {
            boolean staleElementLoaded = true;
            while(staleElementLoaded) {
                try {
                    rows.get(i).click();
                    Thread.sleep(2000);

                    js.executeScript("window.scrollTo(0, document.body.scrollHeight)");
                    Thread.sleep(1000);

                    driver.navigate().back();
                    Thread.sleep(1000);

                    rows = driver.findElements(By.tagName("tr"));

                    System.out.println("*** Navigated to" + " " + rows.get(i).getText());
                    staleElementLoaded = false;
                } catch (StaleElementReferenceException e) {
                    staleElementLoaded = true;
                }
            }
        }

        Thread.sleep(1000);


//        WebElement delete = driver.findElement(By.id("Delete"));
//        delete.click();
//
//        Thread.sleep(1000);
//
//        driver.switchTo().alert().dismiss();




    }
}

