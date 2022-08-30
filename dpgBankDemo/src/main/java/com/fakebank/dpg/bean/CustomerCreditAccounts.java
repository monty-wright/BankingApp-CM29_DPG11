/**
 * 
 */
package com.fakebank.dpg.bean;

import java.util.Map;

/**
 * @author CipherTrust.io
 *
 */
public class CustomerCreditAccounts {
	private String userName;
	private Map<String, Map<String, String>> accounts;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Map<String, Map<String, String>> getAccounts() {
		return accounts;
	}

	public void setAccounts(Map<String, Map<String, String>> accounts) {
		this.accounts = accounts;
	}
}
