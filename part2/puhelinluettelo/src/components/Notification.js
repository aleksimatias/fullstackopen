const Notification = ({ message }) => {
  if (message === null) return null;

  if (message.includes("already been removed")) {
    return <div className="msg_error">{message}</div>;
  }

  return <div className="msg_success">{message}</div>;
};

export default Notification;
