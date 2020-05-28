  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBHC3WdzMR_N6s4yvVY5siN6Mh75nCjaCM",
    authDomain: "superenglishbot.firebaseapp.com",
    databaseURL: "https://superenglishbot.firebaseio.com",
    projectId: "superenglishbot",
    storageBucket: "superenglishbot.appspot.com",
    messagingSenderId: "108690995851",
    appId: "1:108690995851:web:41c3011fad52bb0936728e",
    measurementId: "G-Y3HSP8TY0K"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.database();

const cards = [
  {
    front: '如果天塌下來，我就告訴你一個大秘密。',
    back: 'If the sky were to fall, I would tell you the biggest secret.',
    flipped: 1,
  },
  {
    front: '如果John 昨天晚上有穿外套，他今天就不會感冒了。',
    back: 'If John had worn a jacket last night, he wouldn\'t caught a cold now.',
    flipped: 1,

  },  {
    front: '如果你站在我的立場，你當時可能不會這樣說。',
    back: 'If you had been in my shoes, you might not have said so.',
    flipped: 1,
  },{
    front: '如果他認真讀書，他考試就會考得很好。',
    back: 'If he had studied hard, he would have done well on the test.',
    flipped: 1,
  },{
    front: '如果這裡沒有鳥跟花，我就會覺得很無聊',
    back: 'If there were no birds and flowers, I would feel bored.',
    flipped: 1,
  },{
    front: '如果我現在沒有很忙，我就會幫你。',
    back: 'If I were not so busy now, I would help you.',
    flipped: 1,
  },{
    front: '如果你學習更小心，你可以避免犯相同的錯。',
    back: 'If you study more carefully, you can avoid making the same mistake.',
    flipped: 1,
  },{
    front: 'Cherry不擅長韓文。她多希望她韓文很好。',
    back: 'Cherry isn\'t good at Korean. How she wishes she were good at it.',
    flipped: 1,
  },{
    front: '如果我昨天有時間，我就能和你出去逛街了。',
    back: 'If I had had time yesterday, I could have gone shopping with you.',
    flipped: 1,
  },{
    front: '如果當時我們沒在十點前離開，我們可能就錯過班機了。',
    back: 'If we hadn\'t before left ten o\'clock at that time, we could have missed　the fight.',
    flipped: 1,
  },{
    front: '如果我是老闆，我就會幫大家加薪(give everyone a raise)。',
    back: 'If I were a boss, I would give everyone a raise.',
    flipped: 1,
  },{
    front: 'Mary現在很窮，她希望她可以中樂透(win the lottery)',
    back: 'Mary is very poor now, she wishes she could win the lottery.',
    flipped: 1,
  },
];

const notYetCard = [
  {
    front: '尚無資料',
    back: 'Not yet',
    flipped: 1,
  },
];

var vm = new Vue({
  el: '#flashcard-app',
  data: {
    mCount: 10,
    cards: '',
    newFront: '',
    newBack: '',
    allcontent: '',
    questioncode: '',
    error: false,
    isShow: false,
    pickUpText: 'Pick Me',
    pickUpNumber: 0,
  },
  created: function () {
    this.cards = cards;
    this.randomNumber();
    console.log(this.pickUpNumber);
  },
  methods: {
    toggleCard: function(card){
      card.flipped = card.flipped + 1;
      if (card.flipped > 3) {
        card.flipped = 1;
      }
    },
    randomNumber: function(){
      this.pickUpNumber =Math.floor(Math.random()*this.cards.length);
      console.log(this.pickUpNumber);
    },
    addNew: function(){
      // !this.newFront || !this.newBack also works
      if(!this.newFront.length || !this.newBack.length){
        this.error = true;
      } else {
        this.cards.push({
          front: this.newFront,
          back: this.newBack,
          flipped: 1
        });
        this.newFront = '';
        this.newBack = '';
        this.error = false;
        this.questioncode = JSON.stringify(this.cards);
      }
    },
    keepContent: function(index){
        var itemName = "keep"+index;
        var mData = JSON.stringify(this.cards);
        // localStorage.setItem(itemName, mData);
        this.firebaseSet(itemName, mData);
        this.questioncode = JSON.stringify(this.cards);
    },
    GetContent: function(index){
        var itemName = "keep"+index;
        // var getData = localStorage.getItem(itemName);
        this.firebaseGet(itemName);
        this.questioncode = JSON.stringify(this.cards);
    },
    Loading: function(){
        this.setCards(JSON.parse(this.allcontent));
        this.questioncode = JSON.stringify(this.cards);
    },
    getShow: function(){
      this.isShow = !this.isShow;
    },
    setCards: function(data){
      this.cards = "";
      this.cards = this.shuffle(data);
    },
    shuffle: function(sourceArray){
        for (var i = 0; i < sourceArray.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (sourceArray.length - i));

            var temp = sourceArray[j];
            sourceArray[j] = sourceArray[i];
            sourceArray[i] = temp;
        }
        return sourceArray;
    },
    firebaseSet: function(itemName, data){
      db.ref("/"+itemName).set(data)
      .then(function () {
          alert("建立成功");
      }).catch(function () {
          alert("伺服器發生錯誤，請稍後再試");
      });
    },
    firebaseGet: function(itemName){
      db.ref("/"+itemName).once('value', function (snapshot) {
        var mVal = snapshot.val();
        if (mVal) {
          vm.setCards(JSON.parse(mVal));
        } else {
          vm.setCards(notYetCard);
        }
      });
    },
  }
});