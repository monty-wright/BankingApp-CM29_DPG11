/**
 * 
 */
package com.fakebank.dpg.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fakebank.dpg.bean.CustomerCreditAccounts;
import com.fakebank.dpg.bean.CustomerPersonalAccounts;
import com.fakebank.dpg.bean.CustomerPersonalDetails;
import com.fakebank.dpg.bean.NewCreditCardBean;
import com.fakebank.dpg.model.CustomerAccountCard;
import com.fakebank.dpg.model.CustomerAccountMongoDocumentBean;
import com.fakebank.dpg.model.CustomerAccountPersonal;
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
	@PostMapping("/api/fakebank/account/card")
	public String saveCreditAccount(@RequestBody NewCreditCardBean bean) {
		//MongoDb: Add the customer details to the DB
		Optional<CustomerAccountMongoDocumentBean> existingUser = mongoCustomerAccountRepo.findById(bean.getUserName());
		if(existingUser.isPresent()) {
			CustomerAccountMongoDocumentBean user = existingUser.get();
			CustomerAccountCard newCardDetails = new CustomerAccountCard();
			newCardDetails.setCcNumber(bean.getCcNumber());
			newCardDetails.setCvv(bean.getCvv());
			newCardDetails.setFriendlyName(bean.getFriendlyName());
			newCardDetails.setExpDate(bean.getExpDate());
			newCardDetails.setBalance("0");
			List<CustomerAccountCard> cards = user.getCards();
			cards.add(newCardDetails);
			user.setCards(cards);
			
			mongoCustomerAccountRepo.save(user);
		}
		else {
			CustomerAccountMongoDocumentBean accountBody = new CustomerAccountMongoDocumentBean();
			accountBody.setUserName(bean.getUserName());
			CustomerAccountCard newCardDetails = new CustomerAccountCard();
			newCardDetails.setCcNumber(bean.getCcNumber());
			newCardDetails.setCvv(bean.getCvv());
			newCardDetails.setFriendlyName(bean.getFriendlyName());
			newCardDetails.setExpDate(bean.getExpDate());
			newCardDetails.setBalance("0");
			List<CustomerAccountCard> cards = new ArrayList<CustomerAccountCard>();
			cards.add(newCardDetails);
			accountBody.setCards(cards);
			
			mongoCustomerAccountRepo.save(accountBody);
		}
		return "new credit account added succesfully";
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping("/api/fakebank/account/personal")
	public String saveAccountDetails(@RequestBody CustomerPersonalDetails bean) {
		//MongoDb: Add the customer details to the DB
		Optional<CustomerAccountMongoDocumentBean> existingUser = mongoCustomerAccountRepo.findById(bean.getUserName());
		if(existingUser.isPresent()) {
			CustomerAccountMongoDocumentBean user = existingUser.get();
			CustomerAccountPersonal userPersonalDetails = bean.getDetails();
			user.setDetails(userPersonalDetails);
			
			mongoCustomerAccountRepo.save(user);
		}
		else {
			CustomerAccountMongoDocumentBean accountBody = new CustomerAccountMongoDocumentBean();
			accountBody.setUserName(bean.getUserName());
			CustomerAccountPersonal userPersonalDetails = bean.getDetails();
			accountBody.setDetails(userPersonalDetails);
			
			mongoCustomerAccountRepo.save(accountBody);
		}
		return "user details added succesfully";
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("/api/fakebank/account/personal/{id}")
	public CustomerPersonalDetails getAccountDetails(@PathVariable("id") String id) {
		Optional<CustomerAccountMongoDocumentBean> acc = mongoCustomerAccountRepo.findById(id);
		CustomerPersonalDetails customer = new CustomerPersonalDetails();
		if(acc.isPresent()) {
			customer.setUserName(acc.get().getUserName());
			CustomerAccountPersonal personalDetails = acc.get().getDetails();
			customer.setDetails(personalDetails);
		}
		return customer;
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("/api/fakebank/accounts/{id}")
	public CustomerCreditAccounts getAccountsById(@PathVariable("id") String id) {
		Optional<CustomerAccountMongoDocumentBean> acc = mongoCustomerAccountRepo.findById(id);
		CustomerCreditAccounts res = new CustomerCreditAccounts();
		res.setUserName(acc.get().getUserName());
		res.setAccounts(acc.get().getCards());
		return res;
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("/api/fakebank/account/holders")
	public CustomerPersonalAccounts getAccountHolders() {
		List<CustomerAccountMongoDocumentBean> accounts = mongoCustomerAccountRepo.findAll();
		ArrayList<CustomerPersonalDetails> list = new ArrayList<CustomerPersonalDetails>();
		CustomerPersonalAccounts res = new CustomerPersonalAccounts();
		for (int i = 0; i < accounts.size(); i++) {
			CustomerPersonalDetails cust = new CustomerPersonalDetails();
			cust.setUserName(accounts.get(i).getUserName());
			cust.setDetails(accounts.get(i).getDetails());
			list.add(cust);
		}
		res.setAccounts(list);
		return res;
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("/api/fakebank/details/{id}")
	public CustomerPersonalDetails getAccountDetailsById(@PathVariable("id") String id) {
		Optional<CustomerAccountMongoDocumentBean> acc = mongoCustomerAccountRepo.findById(id);
		CustomerPersonalDetails res = new CustomerPersonalDetails();
		res.setUserName(acc.get().getUserName());
		res.setDetails(acc.get().getDetails());
		return res;
	}
	
}
