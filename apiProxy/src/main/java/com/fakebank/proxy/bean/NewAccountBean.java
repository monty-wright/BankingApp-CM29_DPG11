package com.fakebank.proxy.bean;

public class NewAccountBean {
	private String username;
	private String password;
	private AccountDetailsUpdateRequestBean personal;
	private ExistingCardBean card;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public AccountDetailsUpdateRequestBean getPersonal() {
		return personal;
	}

	public void setPersonal(AccountDetailsUpdateRequestBean personal) {
		this.personal = personal;
	}

	public ExistingCardBean getCard() {
		return card;
	}

	public void setCard(ExistingCardBean card) {
		this.card = card;
	}

	public NewAccountBean() {
		super();
		// TODO Auto-generated constructor stub
	}

	public NewAccountBean(String username, String password, AccountDetailsUpdateRequestBean personal,
			ExistingCardBean card) {
		super();
		this.username = username;
		this.password = password;
		this.personal = personal;
		this.card = card;
	}

	@Override
	public String toString() {
		return "NewAccountBean [username=" + username + ", password=" + password + ", personal=" + personal + ", card="
				+ card + "]";
	}
}
