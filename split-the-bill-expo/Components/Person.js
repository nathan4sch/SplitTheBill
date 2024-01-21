const Person = {
  createPerson: (name, itemListLength) => {
    return { 
      name: name || 'New Person', 
      Total: 0.0,
      items: Array(itemListLength).fill(false) // Initialize the items list with false booleans
    };
  },

  /*addItem: (person, newItem) => {
    // Add a new item to the person's items list
    person.items.push(newItem);
  },
  delItem: (person, delItem) => {
    // To delete an item, find its index and use splice
    const index = person.items.indexOf(delItem);
    if (index !== -1) {
      person.items.splice(index, 1);
    }
  },
  */
  addTotal: (person, cost) => {
    person.Total = person.Total + cost;
  },
  subTotal: (person, cost) => {
    person.Total = person.Total - cost;
  }
};

export default Person;
