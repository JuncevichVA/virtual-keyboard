const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false,
    shift:false
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
   // this.elements.main = document.createElement("textarea");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    //const keyLayout = [
   //   "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
   //   "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
   //   "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
   //   "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
   //   "space"
   // ];




   const keyLayout = [

    "`","1","2", "3","4", "5","6", "7","8", "9","0","-","=","backspace",
    "tab","q","w", "e","r", "t","y", "u","i", "o","p","[","]","del",
    "caps","a", "s","d", "f","g", "h","j", "k","l",";","''","enter",
    "shift","z", "x","c", "v","b", "n","m", ",",".","/",
    "win","alt","space","alt","ctrl"
  ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "del", "enter", "/","ctrl"].indexOf(key) !== -1;


      console.log(key);
    

      document.addEventListener('keyup', keydown );          //при нажатии
  
        function keydown(event) {
    
     
        if(key===event.key){
         // alert('Yes'+ event.key+key);
          //keyElement.classList.add("keyboard__key")
          keyElement.classList.add("keyboard__key-keydown");
          //document.getElementsByTagName("body")[0].style.background = "#8ce2bd";
            setTimeout(function(){
            keyElement.classList='keyboard__key';
          },100)
        }
        
    
     return event.key;
  
  }

  /*btn.addEventListener('click', e => {
    el.classList = 'active'
  
    setTimeout(function(){
      el.classList = ''
    }, 1000)
  
  })
  
  
  document.addEventListener('keyup', keyup );
  
    function keyup(event) {
    
     
        if(key===event.key){
          alert('no');
          //keyElement.classList.add("keyboard__key")
           keyElement.classList.remove("keyboard__key-keydown");
          //document.getElementsByTagName("keyboard__key")[0].style.background = "#ff6100";
        }
    
     return event.key;
  
  } */

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent("oninput");
          });

          break;

        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

          case "shift":
            keyElement.classList.add("keyboard__key--wide");
            keyElement.innerHTML = createIconHTML("shift");
  
            keyElement.addEventListener("click", () => {
              this._toggleEng_RusLock();
              this._triggerEvent("oninput");
            });
  
            break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            this._triggerEvent("oninput");
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  _toggleEng_RusLock() {
    this.properties.shift = !this.properties.shift;

    for (const key of this.elements.keys) 
      if (key.childElementCount === 0) {
        key.textContent = this.properties.shift ? key.textContent.toRus() : key.textContent.toRus();
      }
    
    function toRus () {
      const keyLayout_rus = [
        "ё","1","2", "3","4", "5","6", "7","8", "9","0","-","=","backspace",
        "tab","й","ц", "у","к", "е","н", "г","ш", "щ","з","х","ъ","del",
        "caps","ф", "ы","в", "а","п", "р","о", "л","д","ж","э","enter",
        "shift","я", "ч","с", "м","и", "т","ь","б","ю",".",
        "win","alt","space","alt","ctrl"
        ];
      
      for(let i=0;i<keyLayout_rus.length;i++){
    
      }
      return keyLayout_rus[i];
    
    }
  },



  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});






























