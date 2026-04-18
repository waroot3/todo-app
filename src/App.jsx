import { useState } from 'react'

const FILTERS = [
  { label: 'すべて', value: 'all' },
  { label: '未完了', value: 'active' },
  { label: '完了', value: 'completed' },
]

export default function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState('')

  const addTodo = () => {
    const text = input.trim()
    if (!text) {
      setError('タスクを入力してください')
      return
    }
    setTodos([...todos, { id: Date.now(), text, completed: false }])
    setInput('')
    setError('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.completed))
  }

  const filteredTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const activeCount = todos.filter((t) => !t.completed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8 tracking-tight">
          ToDoアプリ
        </h1>

        {/* 入力エリア */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError('') }}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="タスクを入力..."
            className={`flex-1 px-4 py-3 rounded-xl border shadow-sm focus:outline-none focus:ring-2 bg-white ${
              error ? 'border-red-400 focus:ring-red-400' : 'border-indigo-200 focus:ring-indigo-400'
            }`}
          />
          <button
            onClick={addTodo}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow transition-colors"
          >
            追加
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-xs mb-4 px-1">{error}</p>
        )}

        {/* フィルター */}
        <div className="flex gap-2 mb-4">
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === value
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ToDoリスト */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {filteredTodos.length === 0 ? (
            <p className="text-center text-gray-400 py-10 text-sm">タスクがありません</p>
          ) : (
            <ul>
              {filteredTodos.map((todo, i) => (
                <li
                  key={todo.id}
                  className={`flex items-center gap-3 px-4 py-3 ${
                    i !== filteredTodos.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5 accent-indigo-600 cursor-pointer flex-shrink-0"
                  />
                  <span
                    className={`flex-1 text-sm ${
                      todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
                    aria-label="削除"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* フッター */}
        {todos.length > 0 && (
          <div className="flex justify-between items-center mt-4 text-xs text-gray-500 px-1">
            <span>{activeCount} 件残っています</span>
            {todos.some((t) => t.completed) && (
              <button
                onClick={clearCompleted}
                className="text-indigo-400 hover:text-indigo-600 transition-colors"
              >
                完了済みを削除
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
