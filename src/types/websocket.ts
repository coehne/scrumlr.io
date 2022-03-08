import {Board} from "./board";
import {Column} from "./column";
import {Participant} from "./participant";
import {Note} from "./note";
import {Vote} from "./vote";
import {Voting} from "./voting";

export interface BoardInitEvent {
  type: "INIT";
  data: {
    board: Board;
    columns: Column[];
    notes?: Note[];
    votings?: Voting[];
    votes?: Vote[];
    participants: Participant[];
    requests?: Request[];
  };
}

export interface BoardUpdateEvent {
  type: "BOARD_UPDATED";
  data: Board;
}

export interface BoardDeletedEvent {
  type: "BOARD_DELETED";
}

export interface UpdatedColumnsEvent {
  type: "COLUMNS_UPDATED";
  data: Column[];
}

export interface UpdatedNotesEvent {
  type: "NOTES_UPDATED";
  data: Note[];
}

export interface RequestCreatedEvent {
  type: "REQUEST_CREATED";
  data: Request;
}

export interface RequestUpdatedEvent {
  type: "REQUEST_UPDATED";
  data: Request;
}

export interface ParticipantCreatedEvent {
  type: "PARTICIPANT_CREATED";
  data: Participant;
}

export interface ParticipantUpdatedEvent {
  type: "PARTICIPANT_UPDATED";
  data: Participant;
}

export interface ParticipantsUpdatedEvent {
  type: "PARTICIPANTS_UPDATED";
  data: Participant[];
}

export interface VotingCreatedEvent {
  type: "VOTING_CREATED";
  data: Voting;
}

export interface VotingUpdatedEvent {
  type: "VOTING_UPDATED";
  data: Voting;
}

export type ServerEvent =
  | BoardInitEvent
  | BoardUpdateEvent
  | BoardDeletedEvent
  | UpdatedColumnsEvent
  | UpdatedNotesEvent
  | RequestCreatedEvent
  | RequestUpdatedEvent
  | ParticipantCreatedEvent
  | ParticipantUpdatedEvent
  | ParticipantsUpdatedEvent
  | VotingCreatedEvent
  | VotingUpdatedEvent;
