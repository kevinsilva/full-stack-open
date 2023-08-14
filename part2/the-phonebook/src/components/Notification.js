const Notification = ({ message }) => {
  if (!message) return null;
  return <p className="success-msg">{message}</p>;
};
export default Notification;
