/**
 * 
 */
package com.fakebank.proxy.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fakebank.proxy.bean.AccountCreateRequestBean;
import com.fakebank.proxy.bean.CreateCustomerResponseBean;
import com.fakebank.proxy.bean.CustomerAccountBean;


/**
 * @author CipherTrust.io
 *
 */
@RestController
public class CCAccountController {

	@Autowired
	private RestTemplate restTemplate;
	
	@CrossOrigin(origins = "*")
	@PostMapping(value = "/api/proxy/account", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public String saveAccount(@RequestBody AccountCreateRequestBean bean) {
		CustomerAccountBean newAccount = new CustomerAccountBean();
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
		
		newAccount.setAccountBalance(0);
		newAccount.setCcCvv(String.valueOf(cvv));
		newAccount.setCcNumber(ccNumber);
		newAccount.setCcExpiry(expDate);
		newAccount.setFullName(bean.getFullName());
		newAccount.setDob(bean.getDob());
		newAccount.setSsn(bean.getSsn());
		newAccount.setMobileNumber(bean.getMobileNumber());
		newAccount.setUserName(bean.getUserName());
		newAccount.setIntCmId(bean.getCmID());
		newAccount.setAccFriendlyName(bean.getAccFriendlyName());
		
		String dockerUri = "http://ciphertrust:9005/api/fakebank/account";
		String devUri = "http://localhost:8080/api/fakebank/account";
		String createResponse = restTemplate.postForObject(devUri, newAccount, String.class);
		
		return createResponse;
	}
}
