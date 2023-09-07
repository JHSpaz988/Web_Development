var listItem = document.querySelector("body > ul");
var thirdListItem = listItem.getElementsByTagName("li")[2];


thirdListItem.innerHTML = "Jaron";

var anchorTag = document.querySelector("ul li a");
anchorTag.style.color = "red";

var btn = document.querySelector("button");
btn.style.backgroundColor = "yellow";