$(document).ready(function() {

    const characters = {
      yoda: '',
      luke: '',
      obiWan: '',
      darthVader: '',
      darthMaul: '',
      darthSidious: '',
    };

    let playerCharacter,
        enemies;

    const jediStartLogo = $('#jediStartLogo');
    const empireStartLogo = $('#empireStartLogo');
    const init = () => {
      const that = {};
      function slide(el, top,left,right) {
        el.animate({
          top: top,
          left: left,
          right: right,
          opacity: '1',
        }, 1000)
      }
      that.startGame = () => {
      
        slide(jediStartLogo, '+=100px', '+=500px', '');
        slide(empireStartLogo, '+=100px', '','-=500px');
      }
      return that;
    };
    var game = init();
    game.startGame();
    console.log(' WHAT ARE THE LOGO ELSSS', jediStartLogo, "Im the empire", empireStartLogo);
});
