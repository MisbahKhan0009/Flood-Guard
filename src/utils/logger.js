// // src/utils/logger.js

const logger = (message, type = "log", options = {}) => {
  const { color = "#000", backgroundColor = "#fff", bold = false } = options;

  const style = `
      color: ${color};
      background-color: ${backgroundColor};
      padding: 5px;
      border-radius: 3px;
      font-weight: ${bold ? "bold" : "normal"};
      font-family: Arial, sans-serif;
    `;

  const formattedMessage = `%c${message}`;

  switch (type) {
    case "log":
      console.log(formattedMessage, style);
      break;
    case "info":
      console.info(formattedMessage, style);
      break;
    case "warn":
      console.warn(formattedMessage, style);
      break;
    case "error":
      console.error(formattedMessage, style);
      break;
    default:
      console.log(formattedMessage, style);
      break;
  }

  const styleString = `
      color: ${color};
      background-color: ${backgroundColor};
      ${bold ? "font-weight: bold;" : ""}
    `;

  if (typeof message === "object") {
    const jsonString = JSON.stringify(message, null, 2);
    console.log(`%c${jsonString}`, styleString);
  } else {
    console[level](`%c${message}`, styleString);
  }
};

export default logger;
