const Notification = ({ message }) => {
  if (message === null) return null;

  return <div className="msg_success">{message}</div>;
};

export default Notification;
