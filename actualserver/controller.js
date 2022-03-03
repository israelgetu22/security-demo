const bcryptjs = require("bcryptjs");
const chats = [];

module.exports = {
  createMessage: (req, res) => {
    console.log(req.body);
    const { pin, message } = req.body;

    for (let i = 0; i < chats.length; i++) {
      const existingPin = bcryptjs.compareSync(pin, chats[i].pinHash); // checking 123

      if (existingPin) {
        chats[i].messages.push(message);

        let secretMessage = { ...chats[i] };

        delete secretMessage.pinHash;
        return res.status(200).send(secretMessage);
      }
    }

    // const pin = req.body.pin
    // const  message = req.body.message

    const salt = bcryptjs.genSaltSync(5); // 1
    const pinHash = bcryptjs.hashSync(pin, salt); //2
    console.log(pinHash); //3

    let msgObj = {
      pinHash,
      messages: [message],
    };

    chats.push(msgObj);

    let securedMessage = { ...msgObj };
    delete securedMessage.pinHash;
    res.status(200).send(securedMessage);

    // console.log(pin);
    // console.log(salt);
    // console.log(pinHash);
  },
};
