const cards = [
  {
    front: '如果天塌下來，我就告訴你一個大秘密。',
    back: 'If the sky were to fall, I would tell you the biggest secret.',
    flipped: false,
  },
  {
    front: '如果John 昨天晚上有穿外套，他今天就不會感冒了。',
    back: 'If John had worn a jacket last night, he wouldn\'t caught a cold now.',
    flipped: false,

  },  {
    front: '如果你站在我的立場，你當時可能不會這樣說。',
    back: 'If you had been in my shoes, you might not have said so.',
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
    isShow: false,
  },
  methods: {
    toggleCard: function(card){
      card.flipped = !card.flipped;
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
