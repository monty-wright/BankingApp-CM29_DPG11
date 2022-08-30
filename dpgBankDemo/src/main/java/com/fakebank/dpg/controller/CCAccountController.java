/**
 * 
 */
package com.fakebank.dpg.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fakebank.dpg.bean.CustomerAccountBean;
import com.fakebank.dpg.bean.CustomerCreditAccounts;
import com.fakebank.dpg.bean.CustomerPersonalDetails;
import com.fakebank.dpg.model.CustomerAccountMongoDocumentBean;
import com.fakebank.dpg.repository.CustomerAccountMongoRepository;


/**
 * @author CipherTrust.io
 *
 */
@RestController
public class CCAccountController {

	@Autowired
	private CustomerAccountMongoRepository mongoCustomerAccountRepo;
	//private AccountRepository accountRepository;
	
	@CrossOrigin(origins = "*")
	@PostMapping("/api/fakebank/account")
	public String saveAccount(@RequestBody CustomerAccountBean bean) {
		//MongoDb: Add the customer details to the DB
		Optional<CustomerAccountMongoDocumentBean> existingUser = mongoCustomerAccountRepo.findById(bean.getUserName());
		if(existingUser.isPresent()) {
			CustomerAccountMongoDocumentBean user = existingUser.get();
			Map<String, String> personal = new HashMap<>();
			personal.put("name", bean.getFullName());
			personal.put("dob", bean.getDob());
			personal.put("mobile", bean.getMobileNumber());
			personal.put("ssn", bean.getSsn());
			personal.put("thalesId", bean.getIntCmId());
			user.setPersonalDetails(personal);
			
			Map<String, String> account = new HashMap<>();
			account.put("CCNumber", bean.getCcNumber());
			account.put("cvv", bean.getCcCvv());
			account.put("CCExpiryDate", bean.getCcExpiry());
			account.put("accountBalance", "0");
			Map<String,Map<String, String>> accounts = user.getAccounts();
			accounts.put(bean.getAccFriendlyName(), account);
			
			mongoCustomerAccountRepo.save(user);
		}
		else {
			CustomerAccountMongoDocumentBean accountBody = new CustomerAccountMongoDocumentBean();
			Map<String, String> personal = new HashMap<>();
			Map<String, String> account = new HashMap<>();
			
			accountBody.setUserName(bean.getUserName());
			
			personal.put("name", bean.getFullName());
			personal.put("dob", bean.getDob());
			personal.put("mobile", bean.getMobileNumber());
			personal.put("ssn", bean.getSsn());
			personal.put("thalesId", bean.getIntCmId());
			
			account.put("CCNumber", bean.getCcNumber());
			account.put("cvv", bean.getCcCvv());
			account.put("CCExpiryDate", bean.getCcExpiry());
			account.put("accountBalance", "0");
			
			Map<String,Map<String, String>> accounts = new HashMap<String,Map<String, String>>();
			accounts.put(bean.getAccFriendlyName(), account);
			
			accountBody.setAccounts(accounts);
			accountBody.setPersonalDetails(personal);
			accountBody.setCreationDate(bean.getCreateDt());
			
			CustomerAccountMongoDocumentBean res = mongoCustomerAccountRepo.save(accountBody);
		}
		
		
		/*CustomerAccount newAccount = new CustomerAccount();
		
		newAccount.setAccountBalance(0);
		newAccount.setCcCvv(bean.getCcCvv());
		newAccount.setCcNumber(bean.getCcNumber());
		newAccount.setCcExpiry(bean.getCcExpiry());
		newAccount.setFullName(bean.getFullName());
		newAccount.setDob(bean.getDob());
		newAccount.setSsn(bean.getSsn());
		newAccount.setMobileNumber(bean.getMobileNumber());
		newAccount.setUserName(bean.getUserName());
		newAccount.setCustomerCmId(bean.getIntCmId());
		
		CustomerAccount createdAccount = accountRepository.createAccount(newAccount);*/
		return "new credit account added succesfully";
	}
	
	@GetMapping("/api/fakebank/accounts/{id}")
	public CustomerCreditAccounts getAccountsById(@PathVariable("id") String id) {
		Optional<CustomerAccountMongoDocumentBean> acc = mongoCustomerAccountRepo.findById(id);
		CustomerCreditAccounts res = new CustomerCreditAccounts();
		res.setUserName(acc.get().getUserName());
		res.setAccounts(acc.get().getAccounts());
		return res;
	}
	
	@GetMapping("/api/fakebank/details/{id}")
	public CustomerPersonalDetails getAccountDetailsById(@PathVariable("id") String id) {
		Optional<CustomerAccountMongoDocumentBean> acc = mongoCustomerAccountRepo.findById(id);
		CustomerPersonalDetails res = new CustomerPersonalDetails();
		res.setUserName(acc.get().getUserName());
		res.setDetails(acc.get().getPersonalDetails());
		return res;
	}
	
}
