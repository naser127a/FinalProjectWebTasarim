const eventSchema = new mongoose.Schema({
    title: String,
    time: String,
    day: Number,
    month: Number,
    year: Number,
  });
  
  const Event = mongoose.model("Event", eventSchema,"etkinlikler");

  module.exports = Event