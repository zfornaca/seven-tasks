import React, { useEffect, useState } from "react";

const DEFAULT_NAMES_BY_ID = {
  101: {
    name: "Hans",
    surname: "Emil"
  },
  102: {
    name: "Max",
    surname: "Mustermann"
  },
  103: {
    name: "Roman",
    surname: "Tisch"
  }
};
let lastIdUsed = 103;


const CRUD = () => {
  const [filter, setFilter] = useState("");
  const [nameField, setNameField] = useState("");
  const [surnameField, setSurnameField] = useState("");
  const [namesById, setNamesById] = useState(DEFAULT_NAMES_BY_ID);
  const [selectedId, setSelectedId] = useState(null);
  const [listOptions, setListOptions] = useState(getListOptions(namesById))

  const handleFilterChange = (evt) => {
    const filterString = evt.target.value;
    setFilter(filterString);
  };

  const handleSelection = (id) => {
    setSelectedId(selectedId == id ? null : id);
  }

  function getListOptions(namesById) {
    return Object.entries(namesById).map(([id, data]) => {
      return <option id={id} key={id} label={`${data.surname}, ${data.name}`} onClick={()=>handleSelection(id)}>{`${data.surname}, ${data.name}`}</option>
    })
  }

  useEffect(() => {
    if (filter.length === 0) {
      setListOptions(getListOptions(namesById));
    } else {
      const filtered = Object.keys(namesById)
      .filter(key => namesById[key].surname.toLowerCase().startsWith(filter.toLowerCase()))
      .reduce((acc, key) => {
        acc[key] = namesById[key];
        return acc;
      }, {});

      setListOptions(getListOptions(filtered));
    }

  }, [filter, namesById, selectedId])

  const handleNameFieldChange = (evt) => setNameField(evt.target.value);
  const handleSurnameFieldChange = (evt) => setSurnameField(evt.target.value);

  function handleCreate() {
    lastIdUsed++;
    setNamesById({...namesById, [lastIdUsed]: {name: nameField, surname: surnameField}});
    setNameField("");
    setSurnameField("");
  };

  function handleUpdate() {
    setNamesById({...namesById, [selectedId]: {name: nameField, surname: surnameField}});
    setNameField("");
    setSurnameField("");
  };

  function handleDelete() {
    const namesByIdCopy = {...namesById};
    delete namesByIdCopy[selectedId]
    setNamesById(namesByIdCopy);

  };

  return <div>
    <div className="card-row">
      <div className="card-row-element card-column">
        <div className="card-column-element">
          <span className="card-input-label">Filter: </span>
          <input value={filter} onChange={handleFilterChange} />
        </div>
        <select size="2" className="card-listbox card-column-element">
          {listOptions}
        </select>
      </div>
      <div className="card-row-element card-column">
        <div className="card-column-element">
          <span className="card-input-label">Name: </span>
          <input value={nameField} onChange={handleNameFieldChange} />
        </div>
        <div className="card-column-element">
          <span className="card-input-label">Surname: </span>
          <input value={surnameField} onChange={handleSurnameFieldChange} />
        </div>
      </div>
    </div>
    <div className="card-column">
      <div className="card-row">
        <button className="card-row-element" onClick={handleCreate} disabled={nameField.length === 0 || surnameField.length === 0}>Create</button>
        <button className="card-row-element" onClick={handleUpdate} disabled={selectedId === null || nameField.length === 0 || surnameField.length === 0}>Update</button>
        <button className="card-row-element" onClick={handleDelete} disabled={selectedId === null}>Delete</button>
      </div>
    </div>
  </div>
}

export default CRUD;