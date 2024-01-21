const Person = {
  createPerson: (name) => {
    return { 
      name: name || 'New Person', 
      Total: 0.0,
      items: [] // Initialize the items list as an empty array
    };
  },

  addItem: (person, newItem) => {
    // Add a new item to the person's items list
    person.items.push(newItem);
  },
  delItem: (person, delItem) => {
    person.items.delete(delItem);
  },
  addTotal: (person, cost) => {
    person.Total = person.Total + cost;
  },
  subTotal: (person, cost) => {
    person.Total = person.Total - cost;
  }
};

export default Person;
