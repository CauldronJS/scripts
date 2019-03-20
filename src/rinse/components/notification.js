const Notification = ({ target, children }) => {
  target.sendMessage(children);
}

export default Notification;
