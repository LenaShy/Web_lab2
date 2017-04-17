
function Triangle(a, corner) {
	
	this.corner = corner === undefined ? 0.0 : corner;
	this.a = a === undefined ? 0.0 : a;
	this.b = Math.tan(this.corner*Math.PI/180)*this.a;
	this.c = Math.sqrt(Math.pow(this.a,2) + Math.pow(this.b,2));
	
	this.insideRadius = (this.a + this.b - this.c)/2;
	
	this.insideOutsideDifference = Math.sqrt(Math.pow(this.insideRadius,2) + Math.pow(this.a - this.c - this.insideRadius,2));
 
}

function TriangleView( a, corner) {
	Triangle.call(this, a, corner);


	this.createSideView = function(rowIndex){
		var view = document.createDocumentFragment();
		
		var input = document.createElement("input");
		input.value = this.a;
		input.id = "cathet_" + rowIndex;
		view.appendChild(input);
		return view;
	}
	
	this.createCornerView = function(rowIndex){
		var view = document.createDocumentFragment();
		
		var input = document.createElement("input");
		input.value = this.corner;
		input.id = "corner_" + rowIndex;
		view.appendChild(input);
		return view;
	}
	
	this.createOperationView = function(rowIndex) {
		var view = document.createDocumentFragment();
		
		var deleteButton = document.createElement("button");
		deleteButton.appendChild(document.createTextNode("Удалить"));
		deleteButton.addEventListener("click", function() {
			data.deleteTriangle(rowIndex);
		});
		view.appendChild(deleteButton);

		return view;
	}
	this.createConfirmButton = function(rowIndex) {
		
		var view = document.createDocumentFragment();
		
		var confirmButton = document.createElement("button");
		confirmButton.appendChild(document.createTextNode("Подтвердить"));
		confirmButton.addEventListener("click", function() {
			data.triangles[rowIndex].corner = document.getElementById("corner_" + rowIndex).value;
			data.triangles[rowIndex].a = + document.getElementById("cathet_" + rowIndex).value + document.getElementById("change_" + rowIndex).value * document.getElementById("cathet_" + rowIndex).value/100;
			data.triangles[rowIndex].b = (Math.tan(data.triangles[rowIndex].corner*Math.PI/180)*data.triangles[rowIndex].a).toFixed(2);
			data.triangles[rowIndex].c = (Math.sqrt(Math.pow(data.triangles[rowIndex].a,2) + Math.pow(data.triangles[rowIndex].b,2))).toFixed(2);

			data.triangles[rowIndex].insideRadius = (data.triangles[rowIndex].a/2 + data.triangles[rowIndex].b/2 - data.triangles[rowIndex].c/2).toFixed(2);
			data.triangles[rowIndex].insideOutsideDifference = (Math.sqrt(Math.pow(data.triangles[rowIndex].c/2,2) - 2*data.triangles[rowIndex].c/2*data.triangles[rowIndex].insideRadius)).toFixed(2);
			data.refreshTable();
		});
		view.appendChild(confirmButton);
		return view;
	}
	this.change = function(rowIndex){
		var view = document.createDocumentFragment();
		
		var input = document.createElement("input");
		input.value = 0;
		input.id = "change_" + rowIndex;
		view.appendChild(input);
		return view;
	}

	this.createRow = function(rowIndex) {
	    var tr = document.createElement('tr');

	    var td1 = document.createElement('td');
	    td1.appendChild(document.createTextNode('#' + rowIndex));
		tr.appendChild(td1);

	    var td2 = document.createElement('td');
	    td2.appendChild(this.createSideView(rowIndex));
	    tr.appendChild(td2);
	    
	    var td3 = document.createElement('td');
	    td3.appendChild(document.createTextNode(this.b));
		tr.appendChild(td3);

		var td4 = document.createElement('td');
	    td4.appendChild(document.createTextNode(this.c));
		tr.appendChild(td4);

		var td5 = document.createElement('td');
	    td5.appendChild(this.createCornerView(rowIndex));
		tr.appendChild(td5);
		
		var td6 = document.createElement('td');
		td6.appendChild(document.createTextNode(this.insideRadius));
		tr.appendChild(td6);
		
		var td7 = document.createElement('td');
		td7.appendChild(document.createTextNode(this.insideOutsideDifference));
		tr.appendChild(td7);
		
		var td8 = document.createElement('td');
		td8.appendChild(this.change(rowIndex));
		tr.appendChild(td8);
		
		var td9 = document.createElement('td');
		td9.appendChild(this.createConfirmButton(rowIndex));
		tr.appendChild(td9);
		
		var td10 = document.createElement('td');
	    td10.appendChild(this.createOperationView(rowIndex));
		tr.appendChild(td10);

		return tr;
	}
}


var data = {
	triangles : [],
	
	refreshTable : function() {
		var tableBody = document.getElementById('triangles');
		tableBody.innerHTML = '';
		for(var i = 0; i < this.triangles.length; ++i) {
			tableBody.appendChild(this.triangles[i].createRow(i));
		}
	},

	add : function(a, corner) {
		this.triangles.push(new TriangleView(a, corner));
		this.refreshTable();
	},

	deleteTriangle : function(index) {
		this.triangles.splice(index, 1);
		this.refreshTable();
	},

	clear : function() {
		this.triangles = [];
		this.refreshTable();
	}
}








