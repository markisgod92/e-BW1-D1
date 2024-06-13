const promise = document.getElementById("promise")
const proceed = document.getElementById("proceed")

promise.addEventListener("change", () => {
    if (promise.checked){
        proceed.disabled = false;
        proceed.classList.add("enabled")
    } else {
        proceed.disabled = true;
        proceed.classList.remove("enabled")
    }
})

