const mongoose = require('mongoose');

const connect = () => {
  mongoose.connect(
    'mongodb+srv://swapnil:swapnil1234@cluster0.csexg.mongodb.net/todoapp?retryWrites=true&w=majority'
  );
};

module.exports = connect;
