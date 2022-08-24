/**
 * 
 */
package com.fakebank.dpg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fakebank.dpg.bean.CreateCustomerResponseBean;
import com.fakebank.dpg.bean.CustomerAccountBean;
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
	public CreateCustomerResponseBean saveAccount(@RequestBody CustomerAccountBean bean) {
		CustomerAccount newAccount = new CustomerAccount();
		
		newAccount.setAccountBalance(0);
		newAccount.setCcCvv(bean.getCcCvv());
		newAccount.setCcNumber(bean.getCcNumber());
		newAccount.setCcExpiry(bean.getCcExpiry());
		newAccount.setFullName(bean.getFullName());
		newAccount.setDob(bean.getDob());
		newAccount.setSsn(bean.getSsn());
		newAccount.setMobileNumber(bean.getMobileNumber());
		newAccount.setUserName(bean.getUserName());
		
		CustomerAccount createdAccount = accountRepository.createAccount(newAccount);
		CreateCustomerResponseBean response = new CreateCustomerResponseBean();
		response.setCustomerId(createdAccount.getCustomerId());
		response.setFullName(createdAccount.getFullName());
		return response;
	}
	
	@GetMapping("/api/fakebank/accounts/{id}")
	public CustomerAccount getAccountById(@PathVariable("id") String customerId) {
		return accountRepository.getCustomerById(customerId);
	}
	
}
