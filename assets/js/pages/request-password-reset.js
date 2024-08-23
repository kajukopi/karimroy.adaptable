const form = document.querySelector('#form-request-password-reset')
if (Storage.get("username")) form.querySelector('#username').value = Storage.get("username")
form.addEventListener('submit', async function (e) {
  e.preventDefault()
  const formData = new FormData(form)
  const data = Object.fromEntries(formData)
  if (data.remember) Storage.set("username", data.username)
  const response = await fetch(location.pathname, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  const result = await response.json()
  if (result.error) return Toast.fire({
    icon: "error",
    title: result.error
  });
  Toast.fire({
    icon: "success",
    title: result.message
  });
  form.reset()
  setTimeout(() => {
    location.href = '/login'
  }, 3000);
})