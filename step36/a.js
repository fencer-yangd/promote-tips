var start = Date.now();

while (Date.now() - start < 2000) {}

var p = document.createElement("p");
p.innerHTML = "OK";
document.body.appendChild(p);
