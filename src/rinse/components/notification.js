const Notification = (target, children) => {
  target.sendMessage(children.join('\n'));
}