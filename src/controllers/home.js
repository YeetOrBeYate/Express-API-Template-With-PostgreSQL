import Model from '../models/models';

const messages = new Model('messages');

const home = {
  indexPage: (req, res) => res.status(200).json({ message: 'Index page' }),
  aboutPage: (req, res) => res.status(200).json({ message: 'About page' }),
  messagesPage: async (req, res) => {
    try {
      const data = await messages.select('name, message');
      res.status(200).json({ messages: data.rows });
    } catch (err) {
      res.status(200).json({ messages: err.stack });
    }
  },
  addMessage: async (req, res) => {
    const { name, message } = req.body;
    const columns = 'name, message';
    const values = `'${name}', '${message}'`;

    try {
      const data = await messages.insertWithReturnId(columns, values);
      res.status(201).json({ messages: data.rows });
    } catch (err) {
      res.status(200).json({ messages: err.stack });
    }
  },
};

export default home;
