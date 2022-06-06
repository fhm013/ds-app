import React, { useState } from "react";
import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import axios from "axios";

function App({ signOut, user }) {
  const myAPI =
    "https://05dvurz1mh.execute-api.ap-southeast-1.amazonaws.com/v1";
  const path = "/users";
  const pathUpload = "/user/image-upload";

  const [input, setInput] = useState("");
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    // handle validations
    const file = e.target.files[0];
    if (file.size < 2048) setSelectedFile(file);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file upload", selectedFile, selectedFile.name);
    await axios
      .post(myAPI + pathUpload, formData)
      .then((res) => {
        alert("File Upload success");
        this.setSelectedFile(null);
        this.setName("");
      })
      .catch((err) => {
        console.log(err);
        alert("File Upload Error");
      });
    console.log(formData);
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  function getUsers(e) {
    axios.defaults.baseURL = myAPI;
    axios
      .get(path)
      .then((response) => response.data)
      .then(data => {
        console.log(data);
        let newCustomers = data.Items;
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
              <input type="file" onChange={handleFileInput} />
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
              <div key={thisCustomer.id}>
                <span>
                  <b>CustomerId:</b> {thisCustomer.id} - <b>CustomerName</b>
                  : {thisCustomer.name}
                </span>
              </div>
            );
          })}
        </section>
      </article>
      <footer>
        <div>
          <button onClick={signOut}>SignOut</button>
        </div>
      </footer>
    </div>
  );
}

export default withAuthenticator(App);
