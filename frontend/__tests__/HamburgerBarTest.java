package ticketingApp;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.Point;
import org.openqa.selenium.Rectangle;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class HamburgerBarTest {
	private static WebDriver driver;

	public HamburgerBarTest() {
		// TODO Auto-generated constructor stub
	}

	public static void main(String[] args) throws InterruptedException {
		System.setProperty("webdriver.gecko.driver","D:/SUTD/Softwares/geckodriver-v0.24.0-win64/geckodriver.exe");
		
		driver = new FirefoxDriver();
		
		String url = "http://localhost:3000/";
		driver.get(url);
		
		Thread.sleep(2000);
		
		WebElement usernameField = driver.findElement(By.id("username"));
		WebElement passwordField = driver.findElement(By.id("password"));
		
		usernameField.sendKeys("adminOne");
		passwordField.sendKeys("password");
		
		WebElement submitButton = driver.findElement(By.xpath("//*[contains(text(), 'Submit')]"));
		submitButton.click();
		
		Thread.sleep(2000);
		
		WebElement drawerButton = driver.findElement(By.xpath("//button[@aria-label='Open drawer']"));
//		drawerButton.click();
		
		Dimension dimension = new Dimension(360, 720);
		driver.manage().window().setSize(dimension);
		
		WebElement titleText = driver.findElement(By.xpath("//*[contains(text(), 'Accenture Support')]"));
		Rectangle rt = titleText.getRect();
		
		WebElement usernameText = driver.findElement(By.xpath("//*[contains(text(), 'adminOne')]"));
		Rectangle rt2 = usernameText.getRect();
		
		int titleBorder = rt.getX() + rt.getWidth();
		int usernameBorder = rt2.getX();

		if (titleBorder - usernameBorder < 32) {
			System.out.println("UI Warning. Title and username textbox overlap. ");
		}
		
//		WebElement logoutText = driver.findElement(By.xpath("//*[contains(text(), '[LOGOUT]')]"));
		WebElement logoutText = driver.findElement(By.id("logout"));
		Rectangle rt3 = logoutText.getRect();
		
		if (rt3.getX() + rt3.getWidth() > dimension.width) {
			System.out.println("UI Warning. Logout button not properly wrapped. ");
		}
		
	}

}
