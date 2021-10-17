mx=[]
rows = 4;
columns = 4;
rowIn = document.getElementById('rows-in');
colIn = document.getElementById('col-in');
rowIn.value=rows;
colIn.value=columns;

function generateMatrix(oldmx) {
    var mx = []
    for (i = 0; i < rows; i++) {
        mx.push([])
        for (j = 0; j < columns; j++) {
            val = 0;
            if (i < oldmx.length && j < oldmx[i].length) {
                val = oldmx[i][j];
            }
            mx[i].push(val);
        }
    }
    return mx;
}
function generateInputEl(val, i, j) {
    return `<input class="number-input" type="number" value=${val} id="input-${i}-${j}" onChange="changeInput(${i}, ${j}, this.value)" />`;
}
function generateHtml(mx) {
    /* = "<div class=\"matrix-labels\">";
    
    for (j = 0; j < columns-1; j++) {
        htmlEl+=`<div class="xn">x<sub>${j+1}</sub></div>`;
    }
    htmlEl+=`<div class="xn">c</div>`;

    htmlEl += "</div></br>";*/
    htmlEl="";
    for (i = 0; i < rows; i++) {
        htmlEl+="<div class=\"row-container\">";
        for (j = 0; j < columns; j++) {
            val = 0;
            if (i < mx.length && j < mx[i].length) {
                val = mx[i][j];
            }
            htmlEl += `<div class="single-input">${generateInputEl(val, i, j)}`
            if(j<columns-2)
                htmlEl+=`<div>x<sub>${j+1}</sub> +</div>`;
            else if(j==columns-2){
                htmlEl+=`<div>x<sub>${j+1}</sub> =</div>`;
            }
            htmlEl+="</div>";
        }
        htmlEl += "</div>";
    }
    return htmlEl;
}
function fixGauss(mx) {
    r = mx.length;
    c = mx[0].length;
    i = r - 1;
    while (i >= 0) {
      j = 0;
      while (j < c - 1 && mx[i][j] == 0) j += 1;
      if (j != c - 1) {
        i1 = i - 1;
        while (i1 >= 0) {
          if (mx[i1][j] != 0) {
            ratio = mx[i1][j] / mx[i][j];
            mx[i1][j] = 0;
            mx[i1][c - 1] -= ratio * mx[i][c - 1];
          }
          i1 -= 1;
        }
        for (e = j + 1; e < c; e += 1) {
          mx[i][e] /= mx[i][j];
        }
        mx[i][j] = 1;
      }
      i -= 1;
    }
  } 
  function gauss(mx, cr, j) {
    r = mx.length;
    c = mx[0].length;
    i = cr;
    while (j < c - 1 && mx[i][j] == 0) {
      if (i < r - 1) {
        i += 1;
      } else {
        i = 0;
        j += 1;
      }
    }
    if (j == c - 1) {
      fixGauss(mx);
      return;
    }
  
    if (i != cr && j < c - 1) {
      temp = mx[i];
      mx[i] = mx[cr];
      mx[cr] = temp;
    }
    i = cr + 1;
    while (i < r) {
      if (mx[i][j] != 0) {
        ratio = mx[i][j] / mx[cr][j];
        for (e = j; e < c; e++) mx[i][e] -= ratio * mx[cr][e];
      }
      i += 1;
    }
    gauss(mx, cr + 1, j + 1);
  }
function updateMatrixSizes(){
    rows=rowIn.value;
    columns=colIn.value;
    generateMatrix(mx);
    document.getElementById("main-container").innerHTML = generateHtml(mx);
}
function changeInput(i, j, val){
    mx[i][j]=parseInt(val);
}
function updateValues(){
    for (i = 0; i < rows; i++) {
        for (j = 0; j < columns; j++) {
            document.getElementById(`input-${i}-${j}`).value=mx[i][j];
        }
    }
}
function solve(){
    gauss(mx, 0, 0);
    updateValues();
}

content = document.getElementById("main-container");
mx = generateMatrix([]);
content.innerHTML = generateHtml(mx);