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
      that.clickHandler = () => {
        store.dispatch(that.actions.selectedCharacter(that));
        // retrieveStorage()
      }
      that.el.click(that.clickHandler);
      return that
    };
    /**
    * @const Init {Function} returns that with all of our gameSpecific methods

    */
    const Init = () => {
      const that = {};
      let currentEnemies,
          userCharacter;
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
        console.log(' WHAT ARE THE PARSED ENEMIES',enemies);
        return enemies;
      };

      function assignUserCharacter() {
        userCharacter = store.getState().CHARACTER.userCharacter;
        return userCharacter;
      };

      function createCharacterImage(targetEl, imagePath, characterName, dataName) {
        let img = $('<img>');
        let anchor = $('<a>');
        let imageContainer = $('<div>');
        let characterTitle = $('<p>');
        let characterAttack = $('<p>');
        let enemies = store.getState().CHARACTER.currentEnemies;
        let currentCharacter = store.getState().CHARACTER.userCharacter;
        let enemyAttack;
        let userAttack;
        Object.values(enemies).map((value) => {
          if(value.name === dataName) {
            enemyAttack = value.defensePower;
          }
        });
        if (currentCharacter.name === dataName) {
          characterAttack.text(currentCharacter.defensePower)
        }
        img.addClass('img-thumbnail');
        img.attr({
          src: imagePath,
          title: characterName
        });
        anchor.attr({
          'data-name': dataName,
        })
        characterAttack.addClass('attackPower');
        characterAttack.text(enemyAttack);
        imageContainer.addClass('character');
        characterTitle.text(characterName);
        characterTitle.css({ margin: 0 })
        $(imageContainer).append(characterTitle);
        anchor.append(img);
        imageContainer.append(anchor);
        $(characterAttack).appendTo(imageContainer);
        targetEl.append(imageContainer);
      };
      function testingSpread(func, arguments) {
        func(...arguments);
      }
      function createImages(el,character) {
        switch (character) {
          case 'darthmaul': {
            testingSpread(createCharacterImage, [$(el), './assets/images/Darth_Maul_200px.jpg', 'Darth-Maul', 'darthmaul'])
            // createCharacterImage($(el), './assets/images/Darth_Maul_200px.jpg', 'Darth-Maul', 'darthmaul');
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
          // store.dispatch(updateSideChosen($(this).attr('value')))
          let jedi = $(this).attr('value');
          sessionStorage.setItem('teamChosen', jedi)
        });
        empireStartLogo.click(function() {
          // store.dispatch(updateSideChosen($(this).attr('value')));
          let sith = $(this).attr('value');
          sessionStorage.setItem('teamChosen', sith)
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
        let chosenTeam = sessionStorage.getItem('teamChosen');
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
        luke = Character("luke", lukeEl, 30, 120);
        yoda = Character("yoda", yodaEl, 80, 170);
        obiwan = Character("obiwan", obiwanEl, 70, 160);
        darthMaul = Character("darthmaul", darthMaulEl,60, 160);
        countDooku = Character("countdooku", countDookuEl, 70, 160);
        palpatine = Character("palpatine", palpatineEl, 80, 170);

        let charactersArray = [luke, yoda, obiwan, darthMaul, countDooku, palpatine]
        let enemyArray = (elements) => {
          let id = [];
          elements.map((index, el) => {
             $(el).children().map((index, subEl) => {
                charactersArray.map((character) => {
                  let obj = {};
                  let elId = $(subEl).attr('data-name');
                  if (character.name === elId) {
                    id.push(character);
                  }
                });
            });
          });
          return id;
        };

        console.log(' CHOOSEN TEAMMMMMM', chosenTeam);
        if (chosenTeam === 'jedi') {
          $('#availableJedi').css({ display: 'block'});
          let sith = $('#sithCharacters').children();
          enemies = enemyArray(sith);
          // store.dispatch(characterActions.setEnemies(enemies));
          sessionStorage.setItem('currentEnemies', JSON.stringify(enemies))
        } else {
          $('#availableSith').css({ display: 'block'});
          let jedi = $('#jediCharacters').children();
          enemies = enemyArray(jedi);
          sessionStorage.setItem('currentEnemies', JSON.stringify(enemies))
        };
      }
      that.createGameBoard = () => {
        currentEnemies = assembleEnemies();
        userCharacter  = assignUserCharacter();
        currentEnemies.map(enemy => {
          createImages('#enemies',enemy.name.toLowerCase())
        });
        createImages('#userCharacter',userCharacter.name.toLowerCase());

      };
      that.startGame = () => {

      }
      that.selectedEnemy = (selectedEnemy) => {
        let currentEnemy = store.getState().CHARACTER.currentEnemies
        Object.values(currentEnemy).map((enemy) => {
          if (enemy.name === selectedEnemy) {
            store.dispatch(gameActions.updateEnemySelected(enemy));
          }
        })
      };
      that.attack = () => {
        // console.log(' STOREEEEE STATE', store.getState().CHARACTER.userCharacter);
        let defender = store.getState().GAME.currentEnemy;
        let attacker = store.getState().CHARACTER.userCharacter;
        let damageToDefender = defender.defensePower - attacker.attackPower;
        console.log(' WHAT ARE THE POWERRRRSSSSS',defender,  attacker);
        let damageToAttacker = attacker.defensePower - defender.attackPower;
        let attackerAttackText = `You attacked ${defender.name} for ${attacker.attackPower}`;
        let defenderAttackText = `${defender.name} Attacked you for ${defender.attackPower}`;
        let attackEl = $('#attackStatments');
        let defenderEl = $('#defenderStatments');
        attackEl.css({
         'font-size': '20px',
          color: '#fff',
          position: 'relative',
          left: '300px',
        });
        defenderEl.css({
         'font-size': '20px',
          color: '#fff',
          position: 'relative',
          left: '300px',
        });
        $('#defender').css({
          top: '-50px',
        });
        attackEl.html(attackerAttackText);
        defenderEl.html(defenderAttackText);
        $('#statements').css({
          height: '70px',
        });
        $('.selectedEnemy .attackPower').html(damageToDefender);
        // let test = $('. selectedEnemy .attackPower');
        // console.log(' WAHT IS OUR TEST TTTETETE', test);
        store.dispatch(characterActions.updateCharacterAttack(attacker.attackPower));
      }
      return that;
    };

    /**
      Set all our state handlers here. We are using session storage to keep game state as
      we go through the different pages.
    */
    let select = (state) => state;
    let choseTeamHandler = () => {
      let previousTeam = currentTeam;
      currentTeam = select(store.getState().GAME.teamChosen);
      // console.log(' HELLO TEAMMMMMM', currentTeam);
      if (currentTeam !== previousTeam) {
        sessionStorage.setItem('userTeam', currentTeam);
      };
    }

    let characterHandler = () => {
      let currentCharacter;
      let previousCharacter = currentCharacter;
      currentCharacter = select(store.getState().CHARACTER.userCharacter);
      // console.log(' currentCharacter HANDLEER FIRE!!!@!@!@!@!@!', currentCharacter, sessionStorage);
      // let parsedCharacter = JSON.parse(currentCharacter);
        if (currentCharacter !== previousCharacter) {
         sessionStorage.setItem('userCharacter', JSON.stringify(currentCharacter));
        //  currentCharacter = JSON.parse(sessionStorage.getItem('userCharacter'))
        //  store.dispatch(characterActions.selectedCharacter(currentCharacter))
      };
    };
    let enemiesHandler = () => {
      let currentEnemies;
      let previousEnemies = currentEnemies;
      currentEnemies = select(store.getState().CHARACTER.currentEnemies);
      if (currentEnemies !== previousEnemies) {
        // sessionStorage.setItem('currentEnemies', JSON.stringify(currentEnemies))
      }
    };
    let currentEnemyHandler = () => {
      let currentEnemy;
      let previousEnemy = currentEnemy;
      currentEnemy = select(store.getState().GAME.currentEnemy);
      if (currentEnemy !== previousEnemy){
      }
     }
    let teamHandler = store.subscribe(() => choseTeamHandler());
    let handleCharacterSelection = store.subscribe(() => characterHandler());
    let enemyHandler = store.subscribe(() => enemiesHandler());
    let defendingEnemyHandler = store.subscribe(() => currentEnemyHandler());
    function retrieveStorage(prop) {
    // let userCharacter = JSON.parse(sessionStorage.getItem('userCharacter'))
    // let teamChosen = sessionStorage.getItem('teamChosen');
      // store.dispatch(characterActions.selectedCharacter(userCharacter));
      // store.dispatch(gameActions.updateSideChosen(teamChosen));
      // console.log(' WHAT IS THE CURRENTSTATE????', userCharacter, teamChosen);
    }

    /////////////////////////////////////
    // let test = JSON.parse(select(store.getState().CHARACTER.userCharacter));
    // console.log(' WHAT IS THE TEST!!!!!!', test);
    if ($('body').hasClass('gameIntro')) {
      // Our logos on the initial start
      jediStartLogo = $('#jediStartLogo');
      empireStartLogo = $('#empireStartLogo');

      game = Init();
      game.fireIntro();
    }

    if ($('body').hasClass('selectCharacters')){
      let teamChosen = sessionStorage.getItem('teamChosen');
      store.dispatch(gameActions.updateSideChosen(teamChosen));

      game = Init();
      game.setUpCharacterSelection();
        ///////////////////////////////////////////////
    }

    if ($('body').hasClass('game-board')) {
      // retrieveStorage();
      let usersCharacter = JSON.parse(sessionStorage.getItem('userCharacter'));
      let currentEnemies = JSON.parse(sessionStorage.getItem('currentEnemies'));
      // console.log(' WHHHHHHHHATTTTTT ARE THE ENEMIES?????', currentEnemies);
      store.dispatch(characterActions.selectedCharacter(usersCharacter));
      store.dispatch(characterActions.setEnemies(currentEnemies));
      game = Init();
      game.createGameBoard();

      $('#enemies .character a').click(function() {
        game.selectedEnemy($(this).attr('data-name'));
        $(this).parent().addClass('selectedEnemy');
        $(this).parent('.character').css({ position: 'relative'}).animate({
          top: '300px',

        });
      });
      // let parsed = JSON.parse(sessionStorage.getItem('userCharacter'))
      // console.log(' WHAT IS OUR SESSION STORAGE????', parsed);
      $('#attack').click(function() {
        game.attack()
      });
    }

});
