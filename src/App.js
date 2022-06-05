import React, { useState } from "react";
import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";

function App({ signOut, user }) {
  const myAPI = "userApi";
  const path = "/users";

  const [input, setInput] = useState("");
  const [customers, setCustomers] = useState([]);

  //Function to fetch from our backend and update customers array
  function getCustomer(e) {
    let customerId = e.input;
    API.get(myAPI, path + "/" + customerId)
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
      <h1>Super Simple React App</h1>
      <div>
        <input
          placeholder="customer id"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <br />
      <button onClick={() => getCustomer({ input })}>
        Get Customer From Backend
      </button>

      <h2 style={{ visibility: customers.length > 0 ? "visible" : "hidden" }}>
        Response
      </h2>
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
      <div>
      <div>
        <button onClick={signOut}>Signout</button>
      </div>
      </div>
    </div>
  );

  // const [name, setName] = useState("");
  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileInput = (e) => {
  //   // handle validations
  //   const file = e.target.files[0];
  //   if (file.size < 1024) setSelectedFile(e.target.files[0]);
  // };

  // const submitForm = async () => {
  //   const formData = new FormData();
  //   formData.append("name", name);
  //   formData.append("file", selectedFile);

  //   const payload = await API.post("employee", "add", formData);
  //   // axios
  //   //   .post(UPLOAD_URL, formData)
  //   //   .then((res) => {
  //   //     alert("File Upload success");
  //   //   })
  //   //   .catch((err) => alert("File Upload Error"));
  // };
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <h1>Serverless App</h1>
  //     </header>
  //     <article>
  //       <section>
  //         <form>
  //           <div>
  //             <input
  //               type="text"
  //               placeholder="File title"
  //               value={name}
  //               onChange={(e) => setName(e.target.value)}
  //             />
  //             <input
  //               type="file"
  //               value={selectedFile}
  //               onChange={handleFileInput}
  //             />
  //           </div>
  //           <div>
  //             <button onClick={submitForm}>Upload</button>
  //           </div>
  //         </form>
  //       </section>
  //     </article>
  //     <footer>
  //       <div>
  //         <button onClick={signOut}>Signout</button>
  //       </div>
  //     </footer>
  //   </div>
  // );
}

export default withAuthenticator(App);
