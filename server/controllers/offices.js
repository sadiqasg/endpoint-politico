const fs = require('fs');

/* declare function to avoid repetition i*/
const fetchOffices = () => {
  try {
    let officesString = fs.readFileSync('officedb.js');
    return JSON.parse(officesString);
  }

  catch (e) {}
};

const saveOffices = (offices) => {
  fs.writeFileSync('officedb.js', JSON.stringify(offices));  
};

/* endpoints */
const addOffice = (title, body) => {
  let offices = fetchOffices();
  let office = {
    title,
    body
  }
  let duplicateOffices = offices.filter((office) => office.title === title);

  if (duplicateOffices.length === 0) {
    offices.push(office);
    saveOffices(offices);
    return office;
  }
}

const getAll = () => {
  return fetchOffices();
}

const getOffice = (title) => {
  let offices = fetchOffices();
  let office = offices.filter((office) => office.title === title);
  return office[0];
}

const removeOffice = (title) => {
  let offices = fetchOffices();
  let newOffices = offices.filter((office) => office.title !== title);
  saveOffices(newOffices);

  return offices.length !== newOffices.length;
}

module.exports = {addOffice, getAll, getOffice, removeOffice};
