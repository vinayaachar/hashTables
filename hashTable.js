function hashInt(s, size) {
  var hash = 17

  for (var i = 0; i < s.length; i++) {
      var id = (13 * hash * s[i].charCodeAt()) % size;
  }

  return id;
}



class HashTable {
  table = new Array(3);
  newItems = 0;



  resize() {
      var newTable = new Array(this.table.length * 2);

      this.table.forEach(item => {
          if (item) {
              item.forEach(([key, value]) => {
                  var idx = hashInt(key, newTable.length);
                  if (newTable[idx]) {
                      newTable[idx].push([key, value]);
                  } else {
                      newTable[idx] = [[key, value]]
                  }
              })
          }
      })

      this.table = newTable
  }


  // set items


  setItem = (key, value) => {

      this.newItems++;

      var load = this.newItems / this.table.length;

      if (load > 0.8) {
          //resize

          this.resize();


      }


      var idx = hashInt(key , this.table.length);

      if (this.table[idx]) {
          this.table[idx].push([key, value]);
      } else {
          this.table[idx] = [[key, value]];
      }
  }


  getItem = (key) => {
      var idx = hashInt(key, this.table.length);

      if (!this.table[idx]) {
          return null;
      }


      return this.table[idx].find(x => x[0] === key)[1]
  }
}


const myTable = new HashTable();

myTable.setItem('firstName', 'Vinay');
myTable.setItem('lastName', 'Byrasandra');
myTable.setItem("firstName2", "bob");
myTable.setItem("lastName2", "tim");
myTable.setItem("age", 5);
myTable.setItem("dob", "1/2/3");
myTable.setItem('age', 33);


console.log(myTable.table);

console.log(myTable.getItem('firstName2'));