/**
 * 
 */
package com.fakebank.proxy.bean;

/**
 * @author CipherTrust.io
 *
 */
public class AccountCreateRequestBean {
	private String ssn;
	private String fullName;
	private String userName;
	private String mobileNumber;
	private String dob;

	public String getSsn() {
		return ssn;
	}

	public void setSsn(String ssn) {
		this.ssn = ssn;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public AccountCreateRequestBean() {
		super();
		// TODO Auto-generated constructor stub
	}

	public AccountCreateRequestBean(String ssn, String fullName, String userName, String mobileNumber, String dob) {
		super();
		this.ssn = ssn;
		this.fullName = fullName;
		this.userName = userName;
		this.mobileNumber = mobileNumber;
		this.dob = dob;
	}

	@Override
	public String toString() {
		return "AccountCreateRequestBean [ssn=" + ssn + ", fullName=" + fullName + ", userName=" + userName
				+ ", mobileNumber=" + mobileNumber + ", dob=" + dob + "]";
	}

}
