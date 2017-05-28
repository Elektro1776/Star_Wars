$(document).ready(function() {



    let game,
        enemies,
        playerCharacter;

    let luke,
        yoda,
        obiwan,
        darthMaul,
        palpatine,
        countDooku,
        currentTeam,
        jediStartLogo,
        empireStartLogo;

    let initialGameState = {
      userCharacter: '',
      enimies: [],
      userLife: 100,
      computerLife: 100,
      wins: 0,
      losses: 0,


    }
    const gameActions = GameActions();
    const characterActions = CharacterActions();
    const Init = () => {
      const that = {};

      function slide(el, top,left,right) {
        el.animate({
          top: top,
          left: left,
          right: right,
          opacity: '1',
        }, 1000)
      };
      function assembleEnemies(chosenTeam) {
        enemies = store.getState().CHARACTER.currentEnemies;
        return JSON.parse(enemies);
      }
      that.fireIntro = () => {
        slide(jediStartLogo, '+=100px', '+=500px', '');
        slide(empireStartLogo, '+=100px', '','-=500px');

        let { updateSideChosen } = GameActions();

        jediStartLogo.click(function() {
          store.dispatch(updateSideChosen($(this).attr('value')))
        });
        empireStartLogo.click(function() {
          store.dispatch(updateSideChosen($(this).attr('value')));
        })
      };
      that.createGameBoard = () => {
        let currentEnemies = assembleEnemies();
        console.log(' WHAT IS THE ENEMIESSSSS', currentEnemies);
        currentEnemies.map((enemy) => {
          console.log(' ENENENENENE', enemy);
          switch (enemy) {
            case 'darthMaul': {
              let darthImage = $('<img>');
              darthImage.addClass('img-responsive');
              darthImage.attr('src', './assets/images/Darth_Maul_200px.jpg')
              $('#enemies').append(darthImage)
            }
            break;
            case 'countDooku': {
              console.log(':memwiowjeiwoiew');
              let dookuImage = $('<img>');
              dookuImage.addClass('img-responsive');
              dookuImage.attr('src', './assets/images/Dooku_shrek.jpg');
              $('#enemies').append(dookuImage);
            }
              break;
            case 'palpatine': {

            }
            break;
            case 'luke': {

            }
            break;
            case 'yoda': {

            }
            break;
            case 'obiWan': {

            }
            break;
            default:

          }
        })

      };

      return that;
    };

    const randomizer = (length) => {
      let numbers = Array.apply(null, {length: length });
      let randomIndex = Math.floor(Math.random() * numbers.length);
      return randomIndex;
    };

    /**
    @const Character A function that returns our Character{Object}
    @param name name of the character the user selectedCharacter
    @param el the element attached the users character selection
    @param power the strength of the attack of the character
    @param defense the defense strength of the character
    */
    const Character = (name, el, power, defense, ) => {
      var that = {};
      that.actions = CharacterActions();
      that.name = name;
      that.el = el;
      that.attackPower = power;
      that.defensePower = defense;
      that.HP = 100;
      that.clickHandler = () => store.dispatch(that.actions.selectedCharacter(that))
      that.el.click(that.clickHandler);
      return that
    };

    /**
      Set all our state handlers here. We are using session storage to keep game state as
      we go through the different.
    */
    let select = (state) => state;
    let choseTeamHandler = () => {
      let previousTeam = currentTeam;
      currentTeam = select(store.getState().GAME.teamChosen);

      if (currentTeam !== previousTeam) {
        sessionStorage.setItem('userTeam', currentTeam);
      };
    }

    let characterHandler = () => {
      let currentCharacter;
      let previousCharacter = currentCharacter;
      currentCharacter = select(store.getState().CHARACTER.userCharacter);
      if (currentCharacter !== previousCharacter) {
         sessionStorage.setItem('userCharacter', currentCharacter);
      };
    }
    let enemiesHandler = () => {
      let currentEnemies;
      let previousEnemies = currentEnemies;
      currentEnemies = select(store.getState().CHARACTER.currentEnemies);
      if (currentEnemies !== previousEnemies) {
        sessionStorage.setItem('currentEnemies', JSON.stringify(currentEnemies))
      }
    }
    let teamHandler = store.subscribe(() => choseTeamHandler());
    let handleCharacterSelection = store.subscribe(() => characterHandler());
    let enemyHandler = store.subscribe(() => enemiesHandler());

    /////////////////////////////////////

    if ($('body').hasClass('gameIntro')) {
      // Our logos on the initial start
      jediStartLogo = $('#jediStartLogo');
      empireStartLogo = $('#empireStartLogo');

      game = Init();
      game.fireIntro();
    }

    if ($('body').hasClass('selectCharacters')){
      /**
      All our characterImages to choose from
      */
      let chosenTeam = store.getState().GAME.userTeam;
      const lukeEl = $('#luke');
      const yodaEl = $('#yoda');
      const obiWanEl = $('#obiWan');
      const darthMaulEl = $('#darthMaul');
      const countDookuEl = $('#countDooku');
      const palpatineEl = $('#palpatine');

      luke = Character("Luke", lukeEl, 30, 20);
      yoda = Character("Yoda", yodaEl, 80, 70);
      obiWan = Character("ObiWan", obiWanEl, 70, 60);
      darthMaul = Character("Darth-Maul", darthMaulEl,60, 60);
      countDooku = Character("Count-Dooku", countDookuEl, 70, 60);
      palpatine = Character("Palpatine", palpatineEl, 80, 70);

      let enemyArray = (elements) => {
        let id = [];
        elements.map((index, el) => {
          return $(el).children().map((index, subEl) => {
            id.push($(subEl).attr('id'));
          });
        });
        return id;
      };

      if (chosenTeam === 'jedi') {
        $('#availableSith').css({ display: 'none'});
        let sith = $('#sithCharacters').children();

        enemies = enemyArray(sith);
        store.dispatch(characterActions.setEnemies(enemies));
      } else {
        $('#availableJedi').css({ display: 'none'});
        let jedi = $('#jediCharacters').children();
        enemies = enemyArray(jedi);
        store.dispatch(characterActions.setEnemies(enemies));
      };

        ///////////////////////////////////////////////
    }

    if ($('body').hasClass('gameBoard')) {
      game = Init();
      game.createGameBoard();
    }


});
