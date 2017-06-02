const initialCharacterState = {
  userCharacter: {},
};

const initialGameState = {
  teamChosen: '',
  currentEnemies: [],
  selectedEnemy: '',
  wins: 0,
  losses: 0,
}






/**
*         OUR ACTION TYPES TO RUN OUR GAME STATE
* ----------------------------------------
*/
const CHARACTER_ACTIONS = {
    SET_USER_CHARACTER: 'SET_USER_CHARACTER',
    SET_ENIMIES: 'SET_ENIMIES',
    UPDATE_CURRENT_ENEMY: 'UPDATE_CURRENT_ENEMY',
    UPDATE_CHARACTER_HEALTH: 'UPDATE_CHARACTER_HEALTH',
    UPDATE_CHARACTER_ATTACK: 'UPDATE_CHARACTER_ATTACK',

}
const GAME_ACTIONS = {
    START_GAME: 'START_GAME',
    END_GAME: 'END_GAME',
    UPDATE_WINS: 'UPDATE_WINS',
    UPDATE_LOSSES: 'UPDATE_LOSSES',
    UPDATE_SIDE_CHOSEN: 'UPDATE_SIDE_CHOSEN',
    UPDATE_ENEMY_SELECTED: 'UPDATE_ENEMY_SELECTED',
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
  },
  updateObjectProp: (oldState, newState) => {
    // console.log(' OLD STATE!@!!!!!!', JSON.parse(oldState));
    console.log('NEW STATE @!@!@!@!', oldState, newState);
      let updatedProp = Object.assign({}, oldState, newState);
      console.log(' UPDATED OBJJJJJJJJ', updatedProp);
      return updatedProp;
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
      console.log(' HOW ARE THE CHARACTER PROPS GETTING SET?????', name, HP, attackPower, defensePower);
      return {
         type: 'SET_USER_CHARACTER', name, HP, attackPower, defensePower
       }
     };
    that.setEnemies = (enemies) => ({ type: 'SET_ENIMIES', enemies });
    that.updateCurrentEnemy = (currentEnemy) => ({ type: 'UPDATE_CURRENT_ENEMY', currentEnemy })
    that.updateCharacterAttack = (attack) => {
      attack += 10;
      return {
        type: 'UPDATE_CHARACTER_ATTACK',
        attack,
      }
    }
    return that;
}
const GameActions = () => {
  const that = {};
  that.updateSideChosen = (sideChosen) => {
      return { type: 'UPDATE_SIDE_CHOSEN', sideChosen}
    };
  that.updateEnemySelected = (currentEnemy) => (
    { type: 'UPDATE_ENEMY_SELECTED', currentEnemy }
  );
  return that;
}
/**
*      OUR REDUCER HANDLERS GO HERE
* -------------------------------------------------
*/
// let test = sessionStorage.getItem('userCharacter');
const CHARACTER = ELEKTRO.createReducer(initialCharacterState, {
    [CHARACTER_ACTIONS.SET_USER_CHARACTER](state,action) {
      console.log(' DOES THIS SET CHARACTER FIRE?????', action, state);
          const { name, attackPower, defensePower, HP } = action;
          return Object.assign({}, state, {userCharacter: {
            name,
            attackPower,
            defensePower,
            HP,
          }});
    },
    [CHARACTER_ACTIONS.SET_ENIMIES](state,action) {
        return Object.assign({}, state, { currentEnemies: action.enemies})
    },
    [CHARACTER_ACTIONS.UPDATE_CHARACTER_ATTACK](state, action) {
        let character = ELEKTRO.updateObjectProp(state.userCharacter, { attackPower: action.attack})

        let test = Object.assign({}, state, {userCharacter: character});
        console.log(' WHAT IS THE TES////STSTS/TSTST', test);
        return Object.assign({}, state, {userCharacter: character});
    }
});

const GAME = ELEKTRO.createReducer(initialGameState, {
  [GAME_ACTIONS.UPDATE_SIDE_CHOSEN](state, action) {
      return Object.assign({}, state, { teamChosen: action.sideChosen})
  },
  [GAME_ACTIONS.UPDATE_ENEMY_SELECTED](state, action) {
      return Object.assign({}, state, { currentEnemy: action.currentEnemy });
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
