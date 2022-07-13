/* eslint-disable */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({});

  const hChange = (evt) => {
    const { name, value, type, checked, files } = evt.target;
    let newValue = null;
    switch (type) {
      case "checkbox":
        newValue = checked;
        break;
      case "file":
        [newValue] = files;
        break;
      default:
        newValue = value;
    }
    setFormData({ ...formData, [name]: newValue });
  };

  const hSubmit = (evt) => {
    evt.preventDefault();

    const finalData = Object.keys(formData).reduce((accu, key) => {
      accu.append(key, formData[key]);
      return accu;
    }, new FormData());

    axios
      .post("http://localhost:5000/songs", finalData)
      .then(({ data }) => {
        setFormData(data.label);
        toast("Good job!");
      })
      .catch(() => {
        toast.error("Bad Job!");
      });
  };

  return (
    <div className="App">
      <form method="post" encType="multipart/form-data" onSubmit={hSubmit}>
        <label htmlFor="file" className="label-file">
          Sélectionner un fichier...
        </label>
        <input
          id="file"
          className="input-file"
          type="file"
          name="label"
          onChange={hChange}
        />
        <input type="submit" value="Envoyer" />
      </form>
      {console.log(formData)}
    </div>
  );
}

export default App;
