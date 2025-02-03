import { useState, useEffect } from "react";
import "./App.css";

function AddAccount(){
    const [siteName, setSiteName] = useState("");
    const [siteUrl, setSiteUrl] = useState("");
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [showTextFields, setShowTextFields] = useState(false);
    
    const [accounts, setAccounts] = useState(() => {
        const storedAccounts = JSON.parse(localStorage.getItem("accounts"));
        return storedAccounts || [];
      });

    useEffect(() => {
        const storedAccounts = JSON.parse(localStorage.getItem("accounts"));
        console.log("Loaded Accounts From Local Storage", storedAccounts);
        if (storedAccounts) {
            setAccounts(storedAccounts);
        }
    }, []);

    useEffect(() => {
        console.log("Saved Accounts to Local Storage", accounts);
        localStorage.setItem("accounts", JSON.stringify(accounts));
    }, [accounts]);

    function handleButtonClick(){
        setShowTextFields(true);
    }

    function handleButtonSubmit(){
        if(!siteName || !siteUrl || !Username || !Password){
            alert("Please fill out all fields");
            return;
        }
        setAccounts([{siteName, siteUrl, Username, Password}, ...accounts]);
        setSiteName("")
        setSiteUrl("");
        setUsername("");
        setPassword("");
        setShowTextFields(false);
    }

    function handleDelete(index){
        const newAccounts = accounts.filter((_, i) => i !== index);
        setAccounts(newAccounts);
    }
    function handleEdit(index){
        const account = accounts[index];
        setSiteName(account.siteName);
        setSiteUrl(account.siteUrl);
        setUsername(account.Username);
        setPassword(account.Password);
        setShowTextFields(true);
        handleDelete(index);
    }

    return(
        <>
        <button onClick={handleButtonClick} className="addAccountButton">Click to Add Account</button>
        {showTextFields && (
            <div className="infoFields">
            <input className ="infoinput" type="text" placeholder="Site Name" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
            <input className ="infoinput" type="text" placeholder="Site URL: Enter full url, including https or www" value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} />
            <input className ="infoinput" type="text" placeholder="Username" value={Username} onChange={(e) => setUsername(e.target.value)} />
            <input className ="infoinput" type="text" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)} />
            <div className="accountButtons">
            <button className="submitButton"onClick={handleButtonSubmit}>Add Account</button>
            <button className="cancelButton" onClick={() => setShowTextFields(false)}>Cancel</button>
            </div>
            </div>
        )}
        {accounts.map((account, index) => (
            <div className="accountsContainer" key={index}>
            <h2>{account.siteName}</h2>
            <p>Url: {account.siteUrl}</p> 
            <p>Username: {account.Username}</p>
            <p>Password: {account.Password}</p>
            <div className="accountButtons">
            <button className="submitButton" onClick={() => handleEdit(index)}>Edit</button>
            <button className="submitButton" onClick={() => handleDelete(index)}>Delete</button>
            </div>
            </div>
        ))}
        </>
    )
}

export default AddAccount;