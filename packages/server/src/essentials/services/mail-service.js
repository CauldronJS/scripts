import useStore from '@cauldronjs/store';

const [mailingProfiles, setMailingProfiles] = useStore('essentials-mail', {});

class MailingProfile {
  constructor(owner) {}
}

class Mail {
  constructor(senderId, sentAt, content) {
    this.senderId = senderId;
    this.sentAt = sentAt;
    this.content = content;
    this.isUnread = true;
  }
}

export function sendMailTo(sender, target, content) {}
