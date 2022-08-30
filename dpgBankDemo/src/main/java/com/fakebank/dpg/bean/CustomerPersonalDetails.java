package com.fakebank.dpg.bean;

import java.util.Map;

public class CustomerPersonalDetails {
	private String userName;
	private Map<String, String> details;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Map<String, String> getDetails() {
		return details;
	}

	public void setDetails(Map<String, String> details) {
		this.details = details;
	}
}
