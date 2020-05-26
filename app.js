const cards = [
  {
    front: '到了電影院，電影已經開始了。',
    back: 'Ada Lovelace',
    flipped: false,
  },
  {
    front: '如果我很有錢，我會買很多汽車給你',
    back: 'Edith Clarke',
    flipped: false,

  },
  // {
  //   front: 'Famous World War II Enigma code breaker',
  //   back: 'Alan Turing',
  //   flipped: false,
  // },
  // {
  //   front: 'Created satellite orbit analyzation software for NASA',
  //   back: 'Dr. Evelyn Boyd Granville',
  //   flipped: false,
  // },
  //   {
  //       front: 'The "First Computer Programmer"',
  //       back: 'Ada Lovelace',
  //       flipped: false,
  //   },
  //   {
  //       front: 'Invented the "Clarke Calculator"',
  //       back: 'Edith Clarke',
  //       flipped: false,
  //
  //   },
  //   {
  //       front: 'Famous World War II Enigma code breaker',
  //       back: 'Alan Turing',
  //       flipped: false,
  //   },
  //   {
  //       front: 'Created satellite orbit analyzation software for NASA',
  //       back: 'Dr. Evelyn Boyd Granville',
  //       flipped: false,
  //   },
  //   {
  //       front: 'The "First Computer Programmer"',
  //       back: 'Ada Lovelace',
  //       flipped: false,
  //   },
  //   {
  //       front: 'Invented the "Clarke Calculator"',
  //       back: 'Edith Clarke',
  //       flipped: false,
  //
  //   },
  //   {
  //       front: 'Famous World War II Enigma code breaker',
  //       back: 'Alan Turing',
  //       flipped: false,
  //   },
  //   {
  //       front: 'Created satellite orbit analyzation software for NASA',
  //       back: 'Dr. Evelyn Boyd Granville',
  //       flipped: false,
  //   },
];

new Vue({
  el: '#flashcard-app',
  data: {
    mCount: 10,
    cards: cards,
    newFront: '',
    newBack: '',
    allcontent: '',
    questioncode: '',
    error: false,
    isShow: true,
  },
  methods: {
    toggleCard: function(card){
      card.flipped = !card.flipped;
        // console.log(JSON.stringify(this.allcontent));
    },
    addNew: function(){
      // !this.newFront || !this.newBack also works
      if(!this.newFront.length || !this.newBack.length){
        this.error = true;
      } else {
        this.cards.push({
          front: this.newFront,
          back: this.newBack,
          flipped: false
        });
        this.newFront = '';
        this.newBack = '';
        this.error = false;
        this.questioncode = JSON.stringify(this.cards);
      }
    },
    keepContent: function(index){
        localStorage.setItem("keep"+index, JSON.stringify(this.cards));
        this.questioncode = JSON.stringify(this.cards);
    },
    GetContent: function(index){
        this.cards = "";
        this.cards = this.shuffle(JSON.parse(localStorage.getItem("keep"+index)));
        this.questioncode = JSON.stringify(this.cards);

    },
    Loading: function(){
        this.cards = "";
        this.cards = this.shuffle(JSON.parse(this.allcontent));
        this.questioncode = JSON.stringify(this.cards);
    },
    getShow: function(){
      this.isShow = !this.isShow;
    },
    shuffle: function(sourceArray){
        for (var i = 0; i < sourceArray.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (sourceArray.length - i));

            var temp = sourceArray[j];
            sourceArray[j] = sourceArray[i];
            sourceArray[i] = temp;
        }
        return sourceArray;
    }
  }
});
