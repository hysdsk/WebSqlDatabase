
// name version description size
var db = openDatabase('localdb', '1.0', 'Local Database', 2 * 1024 * 1024)
db.transaction(function (tx) {
  tx.executeSql('create table if not exists todo (id integer primary key autoincrement, todo varchar)')
})

var insBtn = '<button type="button" onclick="insert()">登録</button>'
document.querySelector('#panel').innerHTML += insBtn

var findAll = function(){
  db.transaction(function (tx) {
    document.querySelector('#list').textContent = null
    tx.executeSql('select * from todo', [], function (tx, results) {
        for (i = 0; i < results.rows.length; i++){
          var id = results.rows.item(i).id
          var todo = results.rows.item(i).todo
          var updBtn = `<button type="button" onclick="update(${id})">更新</button>`
          var delBtn = `<button type="button" onclick="remove(${id})">削除</button>`
          document.querySelector('#list').innerHTML += `<li>${todo} ${updBtn} ${delBtn}</li>`
        }
    }, null)
  })
}

var insert = function(){
  var todo = document.getElementsByName('todo')[0].value
    db.transaction(function (tx) {
      tx.executeSql('insert into todo (todo) values (?)', [todo])
    })

  findAll()
}

var update = function(id){
  var todo = document.getElementsByName('todo')[0].value
  db.transaction(function (tx) {
    tx.executeSql('update todo set todo = ? where id = ?', [todo, id])
  })

  findAll()
}

var remove = function(id){
  db.transaction(function (tx) {
    tx.executeSql('delete from todo where id = ?', [id])
  })

  findAll()
}

findAll()