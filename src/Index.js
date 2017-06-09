var TodoDao = require('./TodoDao')
var $ = require('./jquery-3.2.1.min')

// DAOインスタンス
var tododao = new TodoDao()

$(document).ready(function(){
  // イベントハンドラ登録
  $('input[name=todo]').keyup(function(v){
    $('button[name=register], button[name=edit]').prop('disabled', $(this).val() == 0)
  })
  $('button[name=register]').on('click', register)
  $('#table tbody').on('click', 'tr td button[name=edit]', edit)
  $('#table tbody').on('click', 'tr td button[name=remove]', remove)

  init()
})

// 初期化（全件表示）
var init = function(){
  // TODO表削除
  $('#table tbody').empty()
  // TODO表検索
  tododao.findAll(function(list){
    $.each(list, function(i, e) {
      var updBtn = `<button type="button" name="edit" value="${e.id}">更新</button>`
      var delBtn = `<button type="button" name="remove" value="${e.id}">削除</button>`
      $('#table tbody').append(`<tr><td>${i+1}</td><td>${e.todo}</td><td>${updBtn}</td><td>${delBtn}</td></tr>`);
    })

    // TODOテキストボックス、ボタン初期化
    $('input[name=todo]').val('').focus().keyup()
  })
}

// 登録
var register = function(){
  var todo = $('input[name=todo]').val()
  tododao.insert(todo, init)
}

// 更新
var edit = function(){
  var id = $(this).val()
  var todo = $('input[name=todo]').val()
  tododao.update(id, todo, init)
}

// 削除
var remove = function(){
  var id = $(this).val()
  tododao.remove(id, init)
}