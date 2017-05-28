/**
*         OUR ACTION TYPES TO RUN OUR GAME STATE
* ----------------------------------------
*/
const CHARACTER_ACTIONS = {
    SET_USER_CHARACTER: 'SET_USER_CHARACTER',
    SET_ENIMIES: 'SET_ENIMIES',
    UPDATE_CHARACTER_HEALTH: 'UPDATE_CHARACTER_HEALTH',

}
const GAME_ACTIONS = {
    START_GAME: 'START_GAME',
    END_GAME: 'END_GAME',
    UPDATE_WINS: 'UPDATE_WINS',
    UPDATE_LOSSES: 'UPDATE_LOSSES',
    UPDATE_SIDE_CHOSEN: 'UPDATE_SIDE_CHOSEN',
}
// ------------------------------------------
// ------------------------------------------

/**
*     HELPER FUNCTION TO GENERATE OUR REDUCERS
* -----------------------------------------------
*/
const ELEKTRO = {
  createReducer : (initialState, handlers) => {
      return function reducer(state = initialState, action) {
          if(handlers.hasOwnProperty(action.type)) {
              return handlers[action.type](state,action)
          } else {
            return state;
          }
      }
  }
};
// -------------------------------------------------
// -------------------------------------------------


/**
*     OUR ACTUAL ACTIONS TO CONTROL OUR GAME STATE
* --------------------------------------------------
*/
const CharacterActions = () => {
    const that = {};
    that.selectedCharacter = ({name, HP, attackPower, defensePower}) => {
      // console.log(' WHAT IS HAPPEINGIN IN OUR ACTIONS', name);
      return {
         type: 'SET_USER_CHARACTER', name, HP, attackPower, defensePower
       }
     };
    that.setEnemies = (enemies) => ({ type: 'SET_ENIMIES', enemies });
    return that;
}
const GameActions = () => {
  const that = {};
  that.updateSideChosen = (sideChosen) => {
      return { type: 'UPDATE_SIDE_CHOSEN', sideChosen}
    }
  return that;
}
/**
*      OUR REDUCER HANDLERS GO HERE
* -------------------------------------------------
*/
// let test = sessionStorage.getItem('userCharacter');
const CHARACTER = ELEKTRO.createReducer(sessionStorage, {
    [CHARACTER_ACTIONS.SET_USER_CHARACTER](state,action) {
          return Object.assign({}, state, {userCharacter: action.name, power: action.attackPower, defense: action.defensePower, HP: action.HP });
    },
    [CHARACTER_ACTIONS.SET_ENIMIES](state,action) {
        return Object.assign({}, state, { currentEnemies: action.enemies})
    },
});

const GAME = ELEKTRO.createReducer(sessionStorage, {
  [GAME_ACTIONS.UPDATE_SIDE_CHOSEN](state, action) {
      return Object.assign({}, state, { teamChosen: action.sideChosen})
  },
});
// ------------------------------------------------
// ------------------------------------------------
const reducers = Redux.combineReducers({
  CHARACTER,
  GAME,
 });
const store = Redux.createStore(
  reducers
  // GAME,
)
// console.log(' WHAT IS GAME???', store.getState());

// console.log(' DO WE HAVE REDUX?????',  store.getState());
