package projectTestPackage;

//Java program generate a random AlphaNumeric String 
//using CharSet method 

import java.util.*;
import java.nio.charset.*;

class RandomString {

	static String getAlphaNumericString(int targetStringLength) {
		int leftLimit = 97; // letter 'a'
		int rightLimit = 122; // letter 'z'
		Random random = new Random();
		StringBuilder buffer = new StringBuilder(targetStringLength);
		for (int i = 0; i < targetStringLength; i++) {
			int randomLimitedInt = leftLimit + (int) (random.nextFloat() * (rightLimit - leftLimit + 1));
			buffer.append((char) randomLimitedInt);
		}
		String generatedString = buffer.toString();

		return generatedString;
	}

	public static void main(String[] args) {
		// size of random alphanumeric string
		int n = 20;

		// Get and display the alphanumeric string
		System.out.println(getAlphaNumericString(n));
	}
}
