/**
 * 
 */
package com.fakebank.dpg.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fakebank.dpg.bean.AccountCreateRequestBean;
import com.fakebank.dpg.model.CustomerAccount;
import com.fakebank.dpg.repository.AccountRepository;


/**
 * @author CipherTrust.io
 *
 */
@RestController
public class CCAccountController {

	@Autowired
	private AccountRepository accountRepository;
	
	@CrossOrigin(origins = "*")
	@PostMapping("/api/fakebank/account")
	public CustomerAccount saveAccount(@RequestBody AccountCreateRequestBean bean) {
		CustomerAccount newAccount = new CustomerAccount();
		
		int cvv = ThreadLocalRandom.current().nextInt(100, 999);
		String ccNumber = String.valueOf(ThreadLocalRandom.current().nextInt(1000, 9999)) + "-"
				+ String.valueOf(ThreadLocalRandom.current().nextInt(1000, 9999)) + "-"
						+ String.valueOf(ThreadLocalRandom.current().nextInt(1000, 9999)) + "-"
								+ String.valueOf(ThreadLocalRandom.current().nextInt(1000, 9999));
		
		Calendar c = Calendar.getInstance();
		c.setTime(c.getTime());
		c.add(Calendar.YEAR, 3);
		DateFormat dateFormat = new SimpleDateFormat("mm/dd/yyyy");  
        String expDate = dateFormat.format(c.getTime());
		
		//newAccount.setCustomerId(UUID.randomUUID().toString());
        newAccount.setAccountBalance(0);
		newAccount.setCcCvv(String.valueOf(cvv));
		newAccount.setCcNumber(ccNumber);
		newAccount.setCcExpiry(expDate);
		newAccount.setFullName(bean.getFullName());
		newAccount.setDob(bean.getDob());
		newAccount.setSsn(bean.getSsn());
		newAccount.setMobileNumber(bean.getMobileNumber());
		newAccount.setUserName(bean.getUserName());
		
		return accountRepository.createAccount(newAccount);
	}
	
	@GetMapping("/api/fakebank/accounts/{id}")
	public CustomerAccount getAccountById(@PathVariable("id") String customerId) {
		return accountRepository.getCustomerById(customerId);
	}
	
}
