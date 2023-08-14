const Notification = ({ style, message }) => {
  if (!message) return null;
  return <p className={style ? style : ''}>{message}</p>;
};
export default Notification;
