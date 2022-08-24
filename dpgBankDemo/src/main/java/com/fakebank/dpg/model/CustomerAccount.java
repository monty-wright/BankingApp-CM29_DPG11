/**
 * 
 */
package com.fakebank.dpg.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

/**
 * @author CipherTrust.io
 *
 */

@DynamoDBDocument
@DynamoDBTable(tableName = "customer")
public class CustomerAccount {
	private String customerId;
	private String ssn;
	private String dob;
	private String fullName;
	private String userName;
	private String mobileNumber;
	private String ccNumber;
	private String ccCvv;
	private String ccExpiry;
	private long accountBalance;
	private String createDt;

	@DynamoDBHashKey(attributeName = "customerId")
	@DynamoDBAutoGeneratedKey
	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	@DynamoDBAttribute
	public String getSsn() {
		return ssn;
	}

	public void setSsn(String ssn) {
		this.ssn = ssn;
	}

	@DynamoDBAttribute
	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	@DynamoDBAttribute
	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	@DynamoDBAttribute
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@DynamoDBAttribute
	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	@DynamoDBAttribute
	public String getCcNumber() {
		return ccNumber;
	}

	public void setCcNumber(String ccNumber) {
		this.ccNumber = ccNumber;
	}

	@DynamoDBAttribute
	public String getCcCvv() {
		return ccCvv;
	}

	public void setCcCvv(String ccCvv) {
		this.ccCvv = ccCvv;
	}

	@DynamoDBAttribute
	public String getCcExpiry() {
		return ccExpiry;
	}

	public void setCcExpiry(String ccExpiry) {
		this.ccExpiry = ccExpiry;
	}

	@DynamoDBAttribute
	public long getAccountBalance() {
		return accountBalance;
	}

	public void setAccountBalance(long accountBalance) {
		this.accountBalance = accountBalance;
	}

	@DynamoDBAttribute
	public String getCreateDt() {
		return createDt;
	}

	public void setCreateDt(String createDt) {
		this.createDt = createDt;
	}

	@Override
	public String toString() {
		return "CustomerAccount [customerId=" + customerId + ", ssn=" + ssn + ", dob=" + dob + ", fullName=" + fullName
				+ ", userName=" + userName + ", mobileNumber=" + mobileNumber + ", ccNumber=" + ccNumber + ", ccCvv="
				+ ccCvv + ", ccExpiry=" + ccExpiry + ", accountBalance=" + accountBalance + ", createDt=" + createDt
				+ "]";
	}

	public CustomerAccount(String customerId, String ssn, String dob, String fullName, String userName,
			String mobileNumber, String ccNumber, String ccCvv, String ccExpiry, long accountBalance,
			String createDt) {
		super();
		this.customerId = customerId;
		this.ssn = ssn;
		this.dob = dob;
		this.fullName = fullName;
		this.userName = userName;
		this.mobileNumber = mobileNumber;
		this.ccNumber = ccNumber;
		this.ccCvv = ccCvv;
		this.ccExpiry = ccExpiry;
		this.accountBalance = accountBalance;
		this.createDt = createDt;
	}

	public CustomerAccount() {
		super();
		// TODO Auto-generated constructor stub
	}

}
