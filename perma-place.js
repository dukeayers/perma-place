(function() {

  var input = {
    init: function(item) {
      if (item.attributes.required) {
        this.createCSS(item);
      } else {
        var initPlaceholder = this.createCSS(item); // Create the placeholder and return it.
        if (item.nodeName == "INPUT") {
          this.createJs(item, initPlaceholder, "oninput");
        } else {
          this.createJs(item, initPlaceholder, "onchange");
        }
      }
    },

    createCSS: function(item) {
      // Create the initial elements
      var parent = item.parentElement;
      parent.style.position = 'relative';
      var ph = document.createElement('div');
      ph.innerHTML = item.dataset.permanentPlaceholder;
      ph.className += 'permanent-placeholder';
      parent.appendChild(ph);

      position.positionInit(item, ph);

      return ph;
    },

    createJs: function(item, place, event) {
      if (item.value) {
        place.style.display = "block";
      }
      // Check for the keyup on input change to determine if we need to show the placeholder
      item[event] = function() {
        if (item.value) {
          place.style.display = "block";
        } else {
          place.style.display = "none";
        }
      }
    },

  }

  var position = {
    positionInit: function(item, placeholder) {
      // Check for position
      var pos = item.dataset.permanentPosition;
      var posR = item.dataset.permanentPosR;
      var posL = item.dataset.permanentPosL;
      var posT = item.dataset.permanentPosT;
      var posB = item.dataset.permanentPosB;
      var posV = item.dataset.permanentPosVertical

      if (posV) {
        this.positionVCenter(placeholder);
        this.assignPosition(placeholder, posR, "right");
        this.assignPosition(placeholder, posL, "left");
      } else {
        if (posR || posL || posT || posB) {
          this.assignPosition(placeholder, posR, "right");
          this.assignPosition(placeholder, posL, "left");
          this.assignPosition(placeholder, posT, "top");
          this.assignPosition(placeholder, posB, "bottom");
        } else {
          this.positionDefault(placeholder);
        }
      }
    },

    positionDefault: function(placeholder) {
      placeholder.style.right = "20px";
      placeholder.style.bottom = "2px";
    },

    assignPosition: function(item, value, pos) {
      if (value)
        item.style.setProperty(pos, value + "px", "important");
    },

    positionVCenter: function(item) {
      item.className += " permanent-h-center";
    }
  }


  var items = document.querySelectorAll('[data-permanent-placeholder]');

  for (var i = 0; i < items.length; i++) {
    input.init(items[i]);
  }

})();
