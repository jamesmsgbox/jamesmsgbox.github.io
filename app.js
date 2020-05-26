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
  },{
    front: '如果他認真讀書，他考試就會考得很好。',
    back: 'If he had studied hard, he would have done well on the test.',
    flipped: false,
  },{
    front: '如果這裡沒有鳥跟花，我就會覺得很無聊',
    back: 'If there were no birds and flowers, I would feel bored.',
    flipped: false,
  },{
    front: '如果我現在沒有很忙，我就會幫你。',
    back: 'If I were not so busy now, I would help you.',
    flipped: false,
  },{
    front: '如果你學習更小心，你可以避免犯相同的錯。',
    back: 'If you study more carefully, you can avoid making the same mistake.',
    flipped: false,
  },{
    front: 'Cherry不擅長韓文。她多希望她韓文很好。',
    back: 'Cherry isn\'t good at Korean. How she wishes she were good at it.',
    flipped: false,
  },{
    front: '如果我昨天有時間，我就能和你出去逛街了。',
    back: 'If I had had time yesterday, I could have gone shopping with you.',
    flipped: false,
  },{
    front: '如果當時我們沒在十點前離開，我們可能就錯過班機了。',
    back: 'If we hadn\'t before left ten o\'clock at that time, we could have missed　the fight.',
    flipped: false,
  },{
    front: '如果我是老闆，我就會幫大家加薪(give everyone a raise)。',
    back: 'If I were a boss, I would give everyone a raise.',
    flipped: false,
  },{
    front: 'Mary現在很窮，她希望她可以中樂透(win the lottery)',
    back: 'Mary is very poor now, she wishes she could win the lottery.',
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
