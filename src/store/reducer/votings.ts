import {ActionType, ReduxAction} from "store/action";
import {VotingsState} from "types/voting";

/**
 * Default vote configuration if the state is undefined (e.g. no default vote configuration available in the database)
 */
const defaultVotingState: VotingsState = {open: undefined, past: []};

// eslint-disable-next-line default-param-last
export const votingReducer = (state: VotingsState = defaultVotingState, action: ReduxAction): VotingsState => {
  switch (action.type) {
    /**
     * If we receive a new vote configuration (e.g. we update the vote configuration or we receive the initial vote configuration), we need to update our state too.
     */
    case ActionType.InitializeVoteConfiguration:
    case ActionType.AddedVoteConfiguration: {
      return action.voteConfiguration;
    }
    /**
     * If we remove the vote configuration form our database, we don't need to remove it from the state too. The user can change the vote configuration
     * and can reuse the old state for the new vote configuration.
     */
    case ActionType.RemovedVoteConfiguration:
    default: {
      return state;
    }
  }
};