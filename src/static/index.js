let ws = new WebSocket('ws://localhost:3000')
let randomName = Math.random().toString(36).substring(6)
let input = document.getElementById('input-box')
let btn = document.getElementById('send-btn')

input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    btn.click()
    input.value = ''
  }
})
btn.addEventListener('click', () => {
  const inputText = input.value
  ws.send(JSON.stringify({ name: randomName, text: inputText }))
  input.value = ''
})
ws.onopen = () => {
  console.log('open connection')
}
ws.onclose = () => {
  console.log('close connection')
}
ws.onmessage = (event) => {
  const room = document.getElementById('chatroom')
  const message = document.createElement('p')
  const { name, text } = JSON.parse(event.data)
  if (name !== randomName) {
    message.innerHTML = `<span>${text}</span><span style="color: gray;">... sent by ${name}</span>`
  } else {
    message.innerHTML = `<span style="color: #23b6bc;">${text}</span><span style="color: gray;">... sent by ${name}</span>`
  }
  message.setAttribute('style', 'display: flex; justify-content: space-between; margin: 10px 0;')
  room.appendChild(message)
}
