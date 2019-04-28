package projectTestPackage;

import java.text.Normalizer;
import java.text.Normalizer.Form;
import java.util.List;
import java.util.Random;

import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Point;
import org.openqa.selenium.Rectangle;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class AdditionalLoginTests {
	private static final String url = "http://192.168.1.73:3000/";
	private static final int waitTime = 1500;
	public static WebDriver driver;

	public AdditionalLoginTests() {
		// TODO Auto-generated constructor stub
	}
	
	private static void testWrapper(LoginTest loginTest) throws InterruptedException {
		while (loginTest.i < loginTest.testInputs.length) {
			driver.get(url);
			try {
				((FirefoxDriver) driver).getSessionStorage().clear();
				((FirefoxDriver) driver).getLocalStorage().clear();
				driver.get(url);
			}
			catch (Exception e) {
				
			}
			Thread.sleep(waitTime);
			
			WebElement usernameField = driver.findElement(By.id("username"));
			WebElement passwordField = driver.findElement(By.id("password"));
			WebElement loginButton = driver.findElement(By.xpath("//*[contains(text(), 'Submit')]"));
			
			loginTest.before(usernameField, passwordField, loginButton);
			
			loginButton.click();
			Thread.sleep(waitTime);
			
			loginTest.after(driver);
		}	
	}

	public static void main(String[] args) throws InterruptedException {
		System.setProperty("webdriver.gecko.driver","C:\\Users\\hyl0oh\\Desktop\\sc\\problem sets\\geckodriver-v0.24.0-win64\\geckodriver.exe");
		driver = new FirefoxDriver();
		
		LoginTest test = new FuzzingTest();
		testWrapper(test);
	}

}

abstract class LoginTest {
	String[][] testInputs;
	int i = 0;
	/*
	 * (non-Javadoc)
	 * emptyFields
	 * maxLength
	 * arbitrary code execution
	 * case sensitivity
	 * fuzzing
	 * @see projectTestPackage.LoginTest#before(org.openqa.selenium.WebElement, org.openqa.selenium.WebElement, org.openqa.selenium.WebElement)
	 */
	public abstract void before(WebElement usernameField, WebElement passwordField, WebElement loginButton);
	
	public abstract void after(WebDriver driver);
}

class EmptyFieldsTest extends LoginTest {  // fault-based testing
	
	EmptyFieldsTest() {
		String[][] testInputs = {
				{"", ""},
				{RandomString.getAlphaNumericString(32), ""},
				{"", RandomString.getAlphaNumericString(32)},
		};
		int i = 0;
		
		this.testInputs = testInputs;
		this.i = i;
	}
	
	@Override
	public void before(WebElement usernameField, WebElement passwordField, WebElement loginButton) {
		if (i == testInputs.length) {
			throw new  IndexOutOfBoundsException();
		}
		
		usernameField.sendKeys(testInputs[i][0]);
		passwordField.sendKeys(testInputs[i][1]);
		
		i += 1;
	}

	@Override
	public void after(WebDriver driver) {
		try {
			WebElement snackBar = driver.findElement(By.id("client-snackbar"));
//			String message = snackBar.getText();
//			System.out.println(message);
		}
		catch (Exception e) {
			System.out.println("Error: EmptyFieldsTest @ index " + i);
		}
	}
	
}

class TooLongEntriesTest extends LoginTest {  // fault-based testing, test for correct capture of entries longer than 128
	TooLongEntriesTest() {
		String[][] testInputs = {
				{RandomString.getAlphaNumericString(130), RandomString.getAlphaNumericString(130)},
				{RandomString.getAlphaNumericString(130), ""},
				{"", RandomString.getAlphaNumericString(130)},
		};
		int i = 0;
		
		this.testInputs = testInputs;
		this.i = i;
	}
	
	@Override
	public void before(WebElement usernameField, WebElement passwordField, WebElement loginButton) {
		if (i == testInputs.length) {
			throw new  IndexOutOfBoundsException();
		}
		
		usernameField.sendKeys(testInputs[i][0]);
		passwordField.sendKeys(testInputs[i][1]);
		
		i += 1;
	}

	@Override
	public void after(WebDriver driver) {
		try {
			WebElement snackBar = driver.findElement(By.id("client-snackbar"));  // snackbar opened
//			String message = snackBar.getText();
//			System.out.println(message);
		}
		catch (Exception e) {
			System.out.println("Error: TooLongEntriesTest @ index " + i);
		}
	}
	
}

class ArbitraryCodeExecutionTest extends LoginTest {  // fault-based testing, test for attempts to run arbitrary JavaScript
	ArbitraryCodeExecutionTest() {
		String[][] testInputs = {
				{"\uFE64" + "script" + "\uFE65" + "window.location.href = \"www.google.com\";" + "\uFE64" + "/script" + "\uFE65", RandomString.getAlphaNumericString(32)},
				{RandomString.getAlphaNumericString(32), "\uFE64" + "script" + "\uFE65" + "window.location.href = \"www.google.com\";" + "\uFE64" + "/script" + "\uFE65"}
		};
		int i = 0;
		
		this.testInputs = testInputs;
		this.i = i;
	}
	
	@Override
	public void before(WebElement usernameField, WebElement passwordField, WebElement loginButton) {
		if (i == testInputs.length) {
			throw new  IndexOutOfBoundsException();
		}
		
		String username = Normalizer.normalize(testInputs[i][0], Form.NFKC);
		String password = Normalizer.normalize(testInputs[i][1], Form.NFKC);
		
		usernameField.sendKeys(username);
		passwordField.sendKeys(password);
		
		i += 1;
	}

	@Override
	public void after(WebDriver driver) {
		try {
			WebElement snackBar = driver.findElement(By.id("client-snackbar"));  // snackbar opened
			assert (!driver.getCurrentUrl().contains("google.com"));
//			String message = snackBar.getText();
//			System.out.println(message);
		}
		catch (Exception e) {
			System.out.println("Error: ArbitraryCodeExecutionTest @ index " + i);
		}
	}
	
}

class CorrectLoginTest extends LoginTest {  // fault-based testing, test for page load
	CorrectLoginTest() {
		String[][] testInputs = {
				{"adminOne", "password"},
				{"adminTwo", "password"},
				{"userOne", "password"},
				{"userTwo", "password"},
		};
		int i = 0;
		
		this.testInputs = testInputs;
		this.i = i;
	}
	
	@Override
	public void before(WebElement usernameField, WebElement passwordField, WebElement loginButton) {
		if (i == testInputs.length) {
			throw new  IndexOutOfBoundsException();
		}
		
		usernameField.sendKeys(testInputs[i][0]);
		passwordField.sendKeys(testInputs[i][1]);
		
		i += 1;
	}

	@Override
	public void after(WebDriver driver) {
		try {
			WebElement snackBar = driver.findElement(By.id("logout"));  // page loaded (this assumes all page elements load correctly)
//			String message = snackBar.getText();
//			System.out.println(message);
		}
		catch (Exception e) {
			System.out.println("Error: CorrectLoginTest @ index " + i);
		}
	}
	
}

class CaseSensitivityTest extends LoginTest {  // fault-based testing, test for case sensitivity
	CaseSensitivityTest() {
		String[][] testInputs = {
				{"adminone", "password"},
				{"adminTwo", "Password"},
		};
		int i = 0;
		
		this.testInputs = testInputs;
		this.i = i;
	}
	
	@Override
	public void before(WebElement usernameField, WebElement passwordField, WebElement loginButton) {
		if (i == testInputs.length) {
			throw new  IndexOutOfBoundsException();
		}
		
		usernameField.sendKeys(testInputs[i][0]);
		passwordField.sendKeys(testInputs[i][1]);
		
		i += 1;
	}

	@Override
	public void after(WebDriver driver) {
		try {
			WebElement username = driver.findElement(By.id("username"));  // page loaded (this assumes all page elements load correctly)
//			String message = snackBar.getText();
//			System.out.println(message);
		}
		catch (Exception e) {
			System.out.println("Error: CorrectLoginTest @ index " + i);
		}
	}
	
}

class FuzzingTest extends LoginTest {  // fuzzing test (non optimal due to latency of the api)
	Random random = new Random();
	
	String lastUserName;
	String lastPassword;
	
	FuzzingTest() {
		String[][] testInputs = new String[100000][]; // number of times
		int i = 0;
		
		this.testInputs = testInputs;
		this.i = i;
	}
	
	@Override
	public void before(WebElement usernameField, WebElement passwordField, WebElement loginButton) {
		if (i == testInputs.length) {
			throw new  IndexOutOfBoundsException();
		}
		
		lastUserName = RandomString.getAlphaNumericString(random.nextInt(128));
		lastPassword = RandomString.getAlphaNumericString(random.nextInt(128));
		
		usernameField.sendKeys(lastUserName);
		passwordField.sendKeys(lastPassword);
		
		i += 1;
	}

	@Override
	public void after(WebDriver driver) {
		try {
			WebElement username = driver.findElement(By.id("logout"));  // page loaded (this assumes all page elements load correctly)
			System.out.println("Fuzzer Warning: Successfully logged in with this username and password " + lastUserName + "|" + lastPassword);
//			String message = snackBar.getText();
//			System.out.println(message);
		}
		catch (Exception e) {
			
		}
	}
	
}