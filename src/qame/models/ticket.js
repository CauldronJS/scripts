import dotenv from 'dotenv';

dotenv.config();

const { TRELLO_APIKEY } = process.env;

class Ticket {
  constructor(id) {
    this.id = id;
    this.completionStatus = Ticket.CompletionStatus.WAITING;
  }
}

Ticket.CompletionStatus = {
  WAITING: 0,
  IN_PROGRESS: 1,
  IN_QA: 2,
  COMPLETE: 3
};
