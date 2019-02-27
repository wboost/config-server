//        .==.        .==.
//       //`^\\      //^`\\
//      // ^ ^\(\__/)/^ ^^\\
//	   //^ ^^ ^/6  6\ ^^ ^ \\
//	  //^ ^^ ^/( .. )\^ ^ ^ \\ 
//	 // ^^ ^/\| v""v |/\^ ^ ^\\
//	// ^^/\/ /  `~~`  \ \/\^ ^\\
//	-------------------------------------
///
/**
 * 常用javaClass
 * 1.HashMap			var map = new JavaClass.HashMap();
 * 2.SimpleDateFormat	var dateFormat = new JavaClass.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
 * @author sjw
 * @date 2016年8月15日 下午4:55:48
 */
var JavaClass = {

  /**************************HashMap****************************************/
  HashMap: function() {
    this.elements = new Array();

    //获取MAP元素个数
    this.size = function() {
      return this.elements.length;
    }

    //判断MAP是否为空
    this.isEmpty = function() {
      return (this.elements.length < 1);
    }

    //删除MAP所有元素
    this.clear = function() {
      this.elements = new Array();
    }

    //向MAP中增加元素（key, value) 
    this.put = function(_key, _value) {
      var val = this.get(_key);
      if (typeof(val) != "undefined" && val != null) {
        for (var i = 0; i < this.elements.length; i++) {
          if (this.elements[i].key == _key) {
            this.elements[i].value = _value;
            return;
          }
        }
      }
      this.elements.push({
        key: _key,
        value: _value
      });
    }

    //删除指定KEY的元素，成功返回True，失败返回False
    this.remove = function(_key) {
      var bln = false;
      try {
        for (var i = 0; i < this.elements.length; i++) {
          if (this.elements[i].key == _key) {
            this.elements.splice(i, 1);
            return true;
          }
        }
      } catch(e) {
        bln = false;
      }
      return bln;
    }

    //获取指定KEY的元素值VALUE，失败返回NULL
    this.get = function(_key) {
      try {
        for (var i = 0; i < this.elements.length; i++) {
          if (this.elements[i].key == _key) {
            return this.elements[i].value;
          }
        }
      } catch(e) {
        return null;
      }
    }

    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
    this.element = function(_index) {
      if (_index < 0 || _index >= this.elements.length) {
        return null;
      }
      return this.elements[_index];
    }

    //判断MAP中是否含有指定KEY的元素
    this.containsKey = function(_key) {
      var bln = false;
      try {
        for (var i = 0; i < this.elements.length; i++) {
          if (this.elements[i].key == _key) {
            bln = true;
          }
        }
      } catch(e) {
        bln = false;
      }
      return bln;
    }

    //判断MAP中是否含有指定VALUE的元素
    this.containsValue = function(_value) {
      var bln = false;
      try {
        for (var i = 0; i < this.elements.length; i++) {
          if (this.elements[i].value == _value) {
            bln = true;
          }
        }
      } catch(e) {
        bln = false;
      }
      return bln;
    }

    //获取MAP中所有VALUE的数组（ARRAY）
    this.values = function() {
      var arr = new Array();
      for (var i = 0; i < this.elements.length; i++) {
        arr.push(this.elements[i].value);
      }
      return arr;
    }

    //获取MAP中所有KEY的数组（ARRAY）
    this.keys = function() {
      var arr = new Array();
      for (var i = 0; i < this.elements.length; i++) {
        arr.push(this.elements[i].key);
      }
      return arr;
    }
  },

  /**************************SimpleDateFormat****************************************/
  SimpleDateFormat: function(pattern) {

    this.pattern = pattern;

    if ("undefined" == typeof(this.pattern)) {
      this.pattern = "yyyy-MM-dd HH:mm:ss";
    }
    if (this.pattern.length != 19 && this.pattern.length != 20 && this.pattern.length != 10 && this.pattern.length != 11) {
      alert(this.pattern.length);
      alert("时间格式暂时只支持yyyy?MM?dd?HH?mm?ss或yyyy?MM?dd?HH?mm?ss?或yyyy?MM?dd或yyyy-MM-dd?");
      return false;
    }

    this.beginOperator = this.pattern.charAt(4);
    this.twoOperator = this.pattern.charAt(7);
    this.middleOperator = this.pattern.charAt(10);
    this.fourOperator = this.pattern.charAt(13);
    this.fiveOperator = this.pattern.charAt(16);
    this.finalOperator = this.pattern.charAt(19);

    this.format = function(date) {

      var formatDate = new Date(date);
      var year = formatDate.getFullYear();
      var month = formatDate.getMonth() + 1;
      var day = formatDate.getDate();
      var hour = formatDate.getHours();
      var minute = formatDate.getMinutes();
      var second = formatDate.getSeconds();

      month = ((month < 10) ? '0': '') + month;
      day = ((day < 10) ? '0': '') + day;
      hour = ((hour < 10) ? '0': '') + hour;
      minute = ((minute < 10) ? '0': '') + minute;
      second = ((second < 10) ? '0': '') + second;
      if (this.pattern.length == 10 || this.pattern.length == 11) {
        return year + this.beginOperator + month + this.twoOperator + day + this.middleOperator
      } else {
        return year + this.beginOperator + month + this.twoOperator + day + this.middleOperator + hour + this.fourOperator + minute + this.fiveOperator + second + this.finalOperator;
      }
    };

    this.parse = function(stringDate) {
      var year = stringDate.substring(0, 4);
      var month = stringDate.substring(5, 7);
      var day = stringDate.substring(8, 10);
      var hour = stringDate.substring(11, 13);
      var minute = stringDate.substring(14, 16);
      var second = stringDate.substring(17, 19);
      return new Date(year, month, day, hour, minute, second);
    };

    this.formatLong = function(longDate) {
      var longDateInt = parseInt(longDate);

      if (longDateInt.toString().length == 10) {
        longDateInt = longDateInt * 1000;
      }
      var date = new Date(parseInt(longDateInt));
      return this.format(date);

    };

    this.parseLong = function(longDate) {
      var formatLong = this.formatLong(longDate);
      return this.parse(formatLong);
    };

    this.plusDays = function(longDay) {
      var n = longDay;
      var d = new Date();
      var year = d.getFullYear();
      var mon = d.getMonth() + 1;
      var day = d.getDate();
      if (day <= n) {
        if (mon > 1) {
          mon = mon - 1;
        } else {
          year = year - 1;
          mon = 12;
        }
      }
      d.setDate(d.getDate() - n);
      year = d.getFullYear();
      mon = d.getMonth() + 1;
      day = d.getDate();
      s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
      return s;
    };
    
    this.between = function(date1,date2) {
      var count = Math.abs((date1.getTime() - date2.getTime) / 1000 * 60 * 60 * 24);
      return count > 0 ? count : -count;
    }
  },
}
