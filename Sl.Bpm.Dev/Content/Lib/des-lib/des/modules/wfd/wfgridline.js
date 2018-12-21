define("wfd/wfgridline", function(require, exports, module) {
	exports.WFGridline = function(svg_pen, len, gapNumber) {
		this.PathElementLight = null;
		this.PathElementDeep = null;
		this.GridLineLength = len;
		this.gapNumber = gapNumber;
		var pen = svg_pen;
        this.initial = function() {
            
            
        }
		this.drawGridLine = function() {
			var pWidth = pen.width;
			var pHeight = pen.height;
			var pointsPathLight = [];
			var pointsPathDeep = [];
			//columns
			for (var x = 0; x < pWidth / this.GridLineLength; x++) {
				var curX = x * this.GridLineLength;
				if (x % this.gapNumber === 0) {
					pointsPathDeep.push("M");
					pointsPathDeep.push(curX);
					pointsPathDeep.push(0);
					pointsPathDeep.push("L");
					pointsPathDeep.push(curX);
					pointsPathDeep.push(pHeight);
				} else {
					pointsPathLight.push("M");
					pointsPathLight.push(curX);
					pointsPathLight.push(0);
					pointsPathLight.push("L");
					pointsPathLight.push(curX);
					pointsPathLight.push(pHeight);
				}
			}
			//rows
			for (var y = 0; y < pHeight / this.GridLineLength; y++) {
				var curY = y * this.GridLineLength;
				if (y % this.gapNumber === 0) {
					pointsPathDeep.push("M");
					pointsPathDeep.push(0);
					pointsPathDeep.push(curY);
					pointsPathDeep.push("L");
					pointsPathDeep.push(pWidth);
					pointsPathDeep.push(curY);
				} else {
					pointsPathLight.push("M");
					pointsPathLight.push(0);
					pointsPathLight.push(curY);
					pointsPathLight.push("L");
					pointsPathLight.push(pWidth);
					pointsPathLight.push(curY);
				}
			}


		    this.PathElementDeep = pen.path(pointsPathDeep);
		    this.PathElementLight = pen.path(pointsPathLight);

			this.PathElementDeep.attr({
				"stroke-width": 0.1,
				"stroke": "#000"
			});
			this.PathElementLight.attr({
				"stroke-width": 0.1,
				"stroke": "#CCC"
			});
			this.PathElementLight.toBack();
		    this.PathElementDeep.toBack();
		}

		this.resize = function (multipiler) {
		    this.GridLineLength *= multipiler;
		    this.gapNumber *= multipiler;
            this.PathElementLight && this.PathElementLight.remove();
            this.PathElementDeep && this.PathElementDeep.remove();
            this.drawGridLine();
        }
	    this.drawGridLine();
	}
});