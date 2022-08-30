/**
 * 
 */
package com.fakebank.dpg.model;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author CipherTrust.io
 *
 */
@Document(collection = "accounts")
public class CustomerAccountMongoDocumentBean {

	@Id
	private String userName;
	private String creationDate;
	private Map<String, String> personalDetails = new HashMap<>();
	private Map<String,Map<String, String>> accounts = new HashMap<String, Map<String, String>>();

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(String creationDate) {
		this.creationDate = creationDate;
	}

	public Map<String, String> getPersonalDetails() {
		return personalDetails;
	}

	public void setPersonalDetails(Map<String, String> personalDetails) {
		this.personalDetails = personalDetails;
	}

	public Map<String, Map<String, String>> getAccounts() {
		return accounts;
	}

	public void setAccounts(Map<String, Map<String, String>> accounts) {
		this.accounts = accounts;
	}
}
