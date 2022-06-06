import React, { useState } from "react";
import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import axios from "axios";

function App({ signOut, user }) {
  const myAPI =
    "https://05dvurz1mh.execute-api.ap-southeast-1.amazonaws.com/v1";
  const path = "/users";

  const [input, setInput] = useState("");
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    // handle validations
    const file = e.target.files[0];
    if (file.size < 1024) setSelectedFile(e.target.files[0]);
  };

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", selectedFile);

    const payload = await API.post("employee", "add", formData);
    // axios
    //   .post(UPLOAD_URL, formData)
    //   .then((res) => {
    //     alert("File Upload success");
    //   })
    //   .catch((err) => alert("File Upload Error"));
  };

  React.useEffect(() => {
    getUsers();
  }, [])
  

  //Function to fetch from our backend and update customers array
  function getUsers(e) {
    // let customerId = e.input;
    axios.defaults.baseURL = myAPI;
    // axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios
      .get(path, {
        headers: {
          "Content-Type": "application/json;",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        },
      })
      .then((response) => {
        console.log(response);
        let newCustomers = [...customers];
        newCustomers.push(response);
        setCustomers(newCustomers);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Serverless App</h1>
      </header>
      <article>
        <section>
          <h3>Upload profile picture</h3>
          <form>
            <div>
              <input
                type="text"
                placeholder="File title"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="file"
                value={selectedFile}
                onChange={handleFileInput}
              />
            </div>
            <div>
              <button onClick={submitForm}>Upload</button>
            </div>
          </form>
        </section>
        <section>
          <h3>Data</h3>
          {customers.map((thisCustomer, index) => {
            return (
              <div key={thisCustomer.userId}>
                <span>
                  <b>CustomerId:</b> {thisCustomer.userId} - <b>CustomerName</b>
                  : {thisCustomer.userName}
                </span>
              </div>
            );
          })}
        </section>
      </article>
      <footer>
        <div>
          <button onClick={signOut}>Signout</button>
        </div>
      </footer>
    </div>
  );
}

export default withAuthenticator(App);
