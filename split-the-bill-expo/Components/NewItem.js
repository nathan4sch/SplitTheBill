const NewItem = {
  createItem: (name,price) => {
    return { 
      name: name || 'New Item', 
      price: price || '0.0', 
      count: '0'
    };
  },
  increaseCount: (item) => {
    item.count = item.count + 1;
  },
  decreaseCount: (item) => {
    item.count = item.count - 1;
  },

};

export default NewItem;