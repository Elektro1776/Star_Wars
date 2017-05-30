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
    };
    const randomizer = (length) => {
      let numbers = Array.apply(null, {length: length });
      let randomIndex = Math.floor(Math.random() * numbers.length);
      return randomIndex;
    };

    // I initialze my actions on everypage just so i have access no matter WHAT

    const gameActions = GameActions();
    const characterActions = CharacterActions();


    /**
    * @const Init {Function} returns that with all of our gameSpecific methods

    */
    const Init = () => {
      const that = {};

      function slide(el, top,left,right) {
        el.animate({
          top: top,
          left: left,
          right: right,
          opacity: '1',
        }, 2100)
      };

      function assembleEnemies(chosenTeam) {
        enemies = store.getState().CHARACTER.currentEnemies;
        return JSON.parse(enemies);
      };

      function assignUserCharacter() {
        userCharacter = store.getState().CHARACTER.userCharacter;
        return JSON.parse(userCharacter);
      };

      function createCharacterImage(targetEl, imagePath, characterName, dataName) {
        let img = $('<img>');
        let anchor = $('<a>');
        let imageContainer = $('<div>');
        let characterTitle = $('<p>');
        img.addClass('img-circle');
        img.attr({
          src: imagePath,
          title: characterName
        });
        anchor.attr({
          href: '#',
          'data-name': dataName,
        })
        imageContainer.addClass('character');
        characterTitle.text(characterName);
        anchor.append(img);
        imageContainer.append(anchor);
        $(characterTitle).appendTo(imageContainer);
        targetEl.append(imageContainer);
      };

      function createImages(el,character) {
        switch (character) {
          case 'darthmaul': {
            createCharacterImage($(el), './assets/images/Darth_Maul_200px.jpg', 'Darth-Maul', 'darthmaul');
          }
          break;
          case 'countdooku': {
            createCharacterImage($(el), './assets/images/Dooku_shrek.jpg', 'Count Dooku', 'countdooku');
          }
            break;
          case 'palpatine': {
            createCharacterImage($(el), './assets/images/200px-Palpatine.jpg', 'Senator Palpatine', 'palpatine');

          }
          break;
          case 'luke': {
            createCharacterImage($(el), './assets/images/Luke-200px.png', 'Luke Sky-Walker', 'luke')
          }
          break;
          case 'yoda': {
            createCharacterImage($(el), './assets/images/yoda-200px.png', 'Yoda', 'yoda')

          }
          break;
          case 'obiwan': {
            createCharacterImage($(el), './assets/images/Masterobiwan.jpg', 'Obi-Wan Kenobi', 'obiwan')

          }
          break;
          default:
          return
        }
      }
      that.fireIntro = () => {
        slide(jediStartLogo, '+=200px', '+=500px', '');
        slide(empireStartLogo, '+=200px', '','-=500px');

        let { updateSideChosen } = GameActions();

        jediStartLogo.click(function() {
          store.dispatch(updateSideChosen($(this).attr('value')))
        });
        empireStartLogo.click(function() {
          store.dispatch(updateSideChosen($(this).attr('value')));
        });
        let audioObj = {
          src: './assets/sounds/informant.mp3',
          autoplay: true,
        };
        let audioIntroEl = $('<audio>');
        audioIntroEl.attr(audioObj);
        $(audioIntroEl).appendTo("body");
      };
      that.setUpCharacterSelection = () => {
        /**
        All our characterImages to choose from
        */
        let chosenTeam = store.getState().GAME.userTeam;
        const lukeEl = $('#luke');
        const yodaEl = $('#yoda');
        const obiwanEl = $('#obiwan');
        const darthMaulEl = $('#darthMaul');
        const countDookuEl = $('#countDooku');
        const palpatineEl = $('#palpatine');
        const characterAudio = {
          jedi: {
            src: './assets/sounds'
          }
        }
        luke = Character("luke", lukeEl, 30, 20);
        yoda = Character("yoda", yodaEl, 80, 70);
        obiwan = Character("obiwan", obiwanEl, 70, 60);
        darthMaul = Character("darthMaul", darthMaulEl,60, 60);
        countDooku = Character("countDooku", countDookuEl, 70, 60);
        palpatine = Character("palpatine", palpatineEl, 80, 70);

        let enemyArray = (elements) => {
          let id = [];
          elements.map((index, el) => {
             $(el).children().map((index, subEl) => {
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
      }
      that.createGameBoard = () => {
        let currentEnemies = assembleEnemies();
        let { userCharacter } = assignUserCharacter();
        currentEnemies.map(enemy => createImages('#enemies',enemy.toLowerCase()));
        createImages('#userCharacter',userCharacter.toLowerCase());

      };
      that.startGame = () => {

      }
      that.select
      return that;
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
      we go through the different pages.
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
      currentCharacter = select(store.getState().CHARACTER);
      if (currentCharacter !== previousCharacter) {
         sessionStorage.setItem('userCharacter', JSON.stringify(currentCharacter));
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
      game = Init();
      game.setUpCharacterSelection();
        ///////////////////////////////////////////////
    }

    if ($('body').hasClass('game-board')) {
      game = Init();
      game.createGameBoard();

      $('#enemies .character a').click(function() {
        console.log(' WHAT IS THE THIS VALUE??????', $(this).attr('data-name'));
      })
    }

});
