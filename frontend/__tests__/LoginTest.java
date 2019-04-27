//package ticketingApp; // change package name is needed

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginTest {
	
	/*
	 * Valid username and passwords
	 * ** passwords are the same for all accounts
	 */
	static String myUserName = "adminOne";
	// static String myUserName = "adminTwo";
	// static String myUserName = "userOne";
	// static String myUserName = "userTwo";
	static String myPassword = "password";

	public static void main(String[] args) throws InterruptedException {		

		// TODO: Change driver if needed
		System.setProperty("webdriver.gecko.driver","D:/SUTD/Softwares/geckodriver-v0.24.0-win64/geckodriver.exe");
		WebDriver driver = new FirefoxDriver();
		
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
		WebElement nextButton = driver.findElement(By.id("loginSubmit"));	
		nextButton.click();
		
		// test of all links work
		// FindAndClickAllLink(driver);
		
		// test for valid new ticket fields
		TestNewTickectInputs(driver);
		TestNoCat(driver); 
		
	}
	
	static void FindAndClickAllLink(WebDriver driver) throws InterruptedException{
		
		System.out.println("Checking all the links works");
		
		// WebDriverWait wait = new WebDriverWait(driver, 100);
		Thread.sleep(3000);
		
		// java.util.List<WebElement> links  = wait.until(ExpectedConditions.elementToBeClickable(By.tagName("a")));
		java.util.List<WebElement> links = driver.findElements(By.tagName("a"));
		System.out.println(links.size());
				
		// print all the links
		for (int i = 0; i < links.size(); i=i+1) {
			System.out.println(i + " " + links.get(i).getText());
			System.out.println(i + " " + links.get(i).getAttribute("href"));
		}
		
		// maximize the browser window
		driver.manage().window().maximize();
		
		// click all links in a web page
		for(int i = 0; i < links.size(); i++)
		{
			System.out.println("*** Navigating to" + " " + links.get(i).getAttribute("href"));
			if (links.get(i).getAttribute("href") == null)
				continue;
			boolean staleElementLoaded = true;
			while(staleElementLoaded) {
				try {
					driver.navigate().to(links.get(i).getAttribute("href"));
					Thread.sleep(3000);
					driver.navigate().back();
					links = driver.findElements(By.tagName("a"));
					System.out.println("*** Navigated to" + " " + links.get(i).getAttribute("href"));
					staleElementLoaded = false;
				} catch (StaleElementReferenceException e) {
					staleElementLoaded = true;
				}
			}
		}
	}
	
	static void TestNewTickectInputs(WebDriver driver) throws InterruptedException{
		System.out.println("Checking inputs of messages");
		Thread.sleep(3000);
		driver.get("http://localhost:3000/NewTicket");
		
		// Test 1 - when there are no inputs, error message should show
		WebDriverWait wait = new WebDriverWait(driver, 100);
		WebElement submitButton = wait.until(ExpectedConditions.elementToBeClickable(By.id("submit_button")));
		submitButton.click();
		
		Thread.sleep(2000);
		try {
			// String alertText = driver.switchTo().alert().getText();	
			driver.switchTo().alert().accept();
			// assert(alertText).equals("Please fill in all the required fills.");
		}catch(Exception e) {
			System.out.println("UI Warning. Alert not showing");
		}
		
		
		try {
			WebElement titleError = driver.findElement(By.xpath("//*[contains(text(), 'Please fill in a title')]"));
			WebElement categoryError = driver.findElement(By.xpath("//*[contains(text(), 'Please fill in a category')]"));
			WebElement messageError = driver.findElement(By.xpath("//*[contains(text(), 'Please fill in a message')]"));
			WebElement emailError = driver.findElement(By.xpath("//*[contains(text(), 'Please fill in a email')]"));
		}catch(Exception e) {
			System.out.println("UI Warning. Error text not showing");
		}
		
	}
	
	static void TestNoCat(WebDriver driver) throws InterruptedException {
		System.out.println("Checking inputs of messages");
		Thread.sleep(3000);
		
		// Test 1 - when there are no inputs, error message should show
		driver.get("http://localhost:3000/NewTicket");
		WebDriverWait wait = new WebDriverWait(driver, 100);
		WebElement submitButton = wait.until(ExpectedConditions.elementToBeClickable(By.id("submit_button")));
		// submitButton.click();
		
		
		// common input fields for all tests
		String titleInput = "";
		String categoryInput = "";
		String messageInput = "";
		String emailInput = "";
		
		// Test 1
		// driver.navigate().refresh();
		titleInput = "Hello this is a new message";
		categoryInput = "Others";
		messageInput = "I need help please help me";
		emailInput = "10003031@mymail.sutd.edu.sg";
		
		// WebDriverWait wait = new WebDriverWait(driver, 100);
		try {
			WebElement title = wait.until(ExpectedConditions.elementToBeClickable(By.name("title")));
			title.sendKeys(titleInput);
			// Select cat = new Select(wait.until(ExpectedConditions.elementToBeClickable(By.id("category"))));
			// cat.selectByVisibleText(categoryInput);
			// cat.sendKeys(categoryInput);
			WebElement msg = wait.until(ExpectedConditions.elementToBeClickable(By.name("message")));
			msg.sendKeys(messageInput);
			WebElement email = wait.until(ExpectedConditions.elementToBeClickable(By.name("email")));
			email.sendKeys(emailInput);
			
		}catch(Exception e) {
			System.out.println("UI Warning. Cannot type for test2");
		}
		Thread.sleep(1000);
		submitButton.click();
		Thread.sleep(1000);
		try {
			// String alertText = driver.switchTo().alert().getText();	
			driver.switchTo().alert().accept();
			// assert(alertText).equals("Please fill in all the required fills.");
		}catch(Exception e) {
			System.out.println("UI Warning. Alert not showing");
		}
		
		
		try {
			WebElement categoryError = driver.findElement(By.xpath("//*[contains(text(), 'Please fill in a category')]"));
		}catch(Exception e) {
			System.out.println("UI Warning. Error text not showing for category in test 2.");
		}
		
		
	}
}

