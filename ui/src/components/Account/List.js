import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";

export default function Fetch() {
    const { state } = useLocation();
    const [accounts, setAccounts] = useState("");
    let token = sessionStorage.getItem('token');
    var decodedToken = jwt_decode(token);

    useEffect(() => {
        axios
          .get('http://'+process.env.REACT_APP_BACKEND_IP_ADDRESS+':8081/api/proxy/accounts/all/'+decodedToken.preferred_username)
          .then((res) => {
            console.log(res.data.accounts);
            setAccounts(res.data.accounts);
          })
          .catch((err) => console.log(err));
      }, []);  

    return(
      <div className="container px-6 mx-auto">
        {/* Remove class [ h-64 ] when adding a card block */}
        <div className="rounded shadow relative bg-white z-10 -mt-8 mb-8 w-full">
        <div className="w-full flex items-center justify-center">
          <h3 className="bg-blue-100 text-black justify-center items-center">Customers</h3>
        </div>
        <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8">
            {
                Object.entries(accounts).map((account, i) => { 
                    console.log(account);
                    const key = account[0];
                    const details = account[1].details;
                    const username = account[1].userName
                    return (
                        <>
                        <div className="rounded border-gray-300  dark:border-gray-700 border-dashed border-2 p-1">
                            <b>Name:</b> {details.name}
                            <hr />
                            <b>SSN:</b> {details.ssn}
                            <hr />
                            <b>Action: </b><a href={"/auth/admin/fetch?user=" + username + "&meta=" + btoa(details.name)}>View Cards</a>
                        </div>
                        </>
                    );
                }
            )}
        </div>
      </div></div>
    )
}