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
      that.health = defense;
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
        return store.getState().CHARACTER.currentEnemies;
      };

      function assignUserCharacter() {
        return store.getState().CHARACTER.userCharacter;
      };
      /**
      * this is where we actually create the image for the page and appened the
      * image to the target element
      @param targetEl the targetEl we want the picture to end up on
      @param imagePath the imagePath
      @param characterName pretty self explanatory
      @param dataName data-name attribute value associated to the element as its spelled correctly for the if check.
      */
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
            enemyAttack = value.health;
          }
        });
        if (currentCharacter.name === dataName) {
          characterAttack.text(currentCharacter.health)
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
        imageContainer.addClass('character');
        characterAttack.text(enemyAttack);
        characterTitle.text(characterName);
        characterTitle.css({ margin: 0 })
        $(imageContainer).append(characterTitle);
        anchor.append(img);
        imageContainer.append(anchor);
        $(characterAttack).appendTo(imageContainer);
        targetEl.append(imageContainer);
      };
      // testing out different way of passing arguments... spreadddd it
      function testingSpread(func, arguments) {
        func(...arguments);
      }

      /**
      * this is where we create our images
      @param el the html element we want to add a picture too
      @param character the charater name we run our switch statement with
      */
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
      // Sweet little intro scene function to animate our logos
      // and update sessionStorage with our chosen team.
      that.fireIntro = () => {
        slide(jediStartLogo, '+=200px', '+=500px', '');
        slide(empireStartLogo, '+=200px', '','-=500px');
        jediStartLogo.click(function() {
          let jedi = $(this).attr('value');
          sessionStorage.setItem('teamChosen', jedi)
        });
        empireStartLogo.click(function() {
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
        luke = Character("luke", lukeEl, 20, 120);
        yoda = Character("yoda", yodaEl, 50, 170);
        obiwan = Character("obiwan", obiwanEl, 30, 160);
        darthMaul = Character("darthmaul", darthMaulEl,30, 160);
        countDooku = Character("countdooku", countDookuEl, 30, 160);
        palpatine = Character("palpatine", palpatineEl, 40, 170);

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

        if (chosenTeam === 'jedi') {
          $('#availableJedi').css({ display: 'block'});
          let sith = $('#sithCharacters').children();
          enemies = enemyArray(sith);
          sessionStorage.setItem('currentEnemies', JSON.stringify(enemies))
        } else {
          $('#availableSith').css({ display: 'block'});
          let jedi = $('#jediCharacters').children();
          enemies = enemyArray(jedi);
          sessionStorage.setItem('currentEnemies', JSON.stringify(enemies))
        };
      }

      // We will create our game board HERE
      // basically get all the character data from our store and create images
      // for each character
      that.createGameBoard = () => {
        currentEnemies = assembleEnemies();
        userCharacter  = assignUserCharacter();
        currentEnemies.map(enemy => {
          createImages('#enemies',enemy.name.toLowerCase())
        });
        createImages('#userCharacter',userCharacter.name.toLowerCase());

      };
      // figures out who our selected enemy is so we can use the right values for
      // calculating damage
      that.selectedEnemy = (selectedEnemy) => {
        let currentEnemy = store.getState().CHARACTER.currentEnemies
        Object.values(currentEnemy).map((enemy) => {
          if (enemy.name === selectedEnemy) {
            store.dispatch(gameActions.updateEnemySelected(enemy));
          }
        });
        $('#statements').css({ top: '0px'})
      };
      function removeEnemies(enemyName, remainingEnemies){
        return remainingEnemies.filter((value, index) => {
          if (value.name !== enemyName) {
            return value
          }
        })
      }
      // this is our attack method here
      // calculate the damage for each player and update the html with the new Health re
      // remaining and update our store with our new attackPower;
      that.attack = () => {
        let defender = store.getState().GAME.currentEnemy;
        let defenderName = $('.selectedEnemy').children('a').attr('data-name');
        let attacker = store.getState().CHARACTER.userCharacter;
        let enemiesRemaining = store.getState().CHARACTER.currentEnemies;
        let damageToDefender = defender.health - attacker.attackPower;
        console.log(' WHAT ARE THE POWERRRRSSSSS', store.getState().CHARACTER,  store.getState().GAME);
        let damageToAttacker = attacker.health - defender.attackPower;
        let attackerAttackText = `You attacked ${defender.name} for ${attacker.attackPower}`;
        let defenderAttackText = `${defender.name} Attacked you for ${defender.attackPower}`;
        let attackEl = $('#attackStatments');
        let defenderEl = $('#defenderStatments');
        let selectedEnemy = $('.selectedEnemy');
        let currentCharacter = $('#userCharacter');
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
        if (damageToDefender <= 0) {
          enemiesRemaining = removeEnemies(defenderName, enemiesRemaining);
          console.log(' ENEMEIES REMAINGING!!!!!', enemiesRemaining);
          store.dispatch(characterActions.setEnemies(enemiesRemaining))
          selectedEnemy.css({ display: 'none'}).removeClass('selectedEnemy');
          attackEl.html(`You defeated ${defender.name.toUpperCase()} ! Choose another enemy to test your skill!`)
          if (enemiesRemaining.length == 0) {
            attackEl.html(`You Won!!! `)
          }
          return defenderEl.html('');
        } else if (damageToAttacker <= 0) {
          currentCharacter.css({ display: 'none'}).removeClass('selectedEnemy');
          defenderEl.html('');
          return attackEl.html(`You Lost! ${defender.name.toUpperCase()} defeated you ! <a href="./index.html">PlayAgain?</a>`);

        }else {
          attackEl.html(attackerAttackText);
          defenderEl.html(defenderAttackText);
          $('#statements').css({
            height: '70px',
            'background-color': '#444',
            'z-index': '9999',
            position: 'relative',
          });
          $('.selectedEnemy .attackPower').html(damageToDefender);
          $('#userCharacter .attackPower').html(damageToAttacker);

        }

        let powerUpgrade = attacker.attackPower + 10;
        store.dispatch(characterActions.updateCharacterAttack(powerUpgrade));
        store.dispatch(gameActions.updateEnemyHealth(damageToDefender));
        store.dispatch(characterActions.updateCharacterHealth(damageToAttacker));
      }

      that.fireGameLoss = () => {

      };
      that.fireGameWin = () => {

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
        if (currentCharacter !== previousCharacter) {
         sessionStorage.setItem('userCharacter', JSON.stringify(currentCharacter));
      };
    };
    let teamHandler = store.subscribe(() => choseTeamHandler());
    let handleCharacterSelection = store.subscribe(() => characterHandler());
    /////////////////////////////////////

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
      let usersCharacter = JSON.parse(sessionStorage.getItem('userCharacter'));
      let currentEnemies = JSON.parse(sessionStorage.getItem('currentEnemies'));
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
      $('#attack').click(function() {
        game.attack()
      });

    }

});
