new Vue({
  el: "#app",
  data: {
    player_health: 100,
    monster_health: 100,
    is_on: false,
    logs: [],
  },
  methods: {
    start_game: function () {
      this.is_on = true;
    },
    attack: function () {
      var damage = Math.ceil(Math.floor(Math.random() * 10) + 1);
      this.monster_health -= damage;
      this.add_log({ turn: "p", text: "Player Attack (" + damage + ") " });
      this.monster_attack();
    },
    special_attack: function () {
      var damage = Math.ceil(Math.floor(Math.random() * 25) + 1);
      this.monster_health -= damage;
      this.add_log({
        turn: "p",
        text: "Player Super Attack (" + damage + ") ",
      });
      this.monster_attack();
    },
    heal: function () {
      var health = Math.ceil(Math.floor(Math.random() * 15) + 1);
      this.player_health += health;
      this.add_log({ turn: "p", text: "Player Heal (" + health + ") " });
      this.monster_attack();
    },
    give_up: function () {
      this.player_health = 0;
    },
    monster_attack: function () {
      var damage = Math.ceil(Math.floor(Math.random() * 15) + 1);
      this.player_health -= damage;
      this.add_log({ turn: "m", text: "Monster Attack (" + damage + ") " });
    },
    add_log: function (data) {
      this.logs.push(data);
    },
    remove_log: function () {
      this.logs = [];
    },
  },
  watch: {
    player_health: function (value) {
      if (value <= 0) {
        this.player_health = 0;
        if (confirm("Oyunu KAYBETTIN..Tekrar?")) {
          this.player_health = 100;
          this.monster_health = 100;
          this.remove_log();
        }
      } else if (value > 100) {
        this.player_health = 100;
      }
    },
    monster_health: function (value) {
      if (value <= 0) {
        this.monster_health = 0;
        if (confirm("Oyunu KAZANDIN..Tekrar?")) {
          this.player_health = 100;
          this.monster_health = 100;
          this.remove_log();
        }
      }
    },
  },
});
