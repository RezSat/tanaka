function RightTriangle(a, b, angle) {
    this.a = a;
    if (!angle) {
        this.b = b;
    } else {
        this.b = a * Math.tan(toRadians(angle));
    }
    this.cSquared = this.a * this.a + this.b * this.b;
    this.cSurd = simplifySurd(this.cSquared);
    this.cDec = Math.sqrt(this.cSquared);
    this.area = this.a * this.b / 2;
    this.perimeter = this.a + this.b + this.cDec;
    var c = this.cDec;
    this.A = Math.acos((c * c + this.b * this.b - this.a * this.a) / (2 * c * this.b)) * 180 / Math.PI;
    this.B = Math.acos((this.a * this.a + c * c - this.b * this.b) / (2 * this.a * c)) * 180 / Math.PI;
    this.C = Math.acos((this.a * this.a + this.b * this.b - c * c) / (2 * this.a * this.b)) * 180 / Math.PI;
    this.display = function (a, b, c, A, B, C) {
        var size = 200;
        var scale = size * 0.75 / (1.2 * Math.max(this.a, this.b));
        var gap = 12;
        var x1 = size * 0.05;
        var y1 = size * 0.8;
        var x2 = size * 0.05 + this.a * scale;
        var y2 = size * 0.8 - this.b * scale;
        var svgData = "<svg width='" + size + "' height='" + size + "'>";
        svgData += "<line x1='" + x1 + "' y1='" + y1 + "' x2='" + x2 + "' y2='" + y1 + "' stroke='black' />";
        svgData += "<line x1='" + x1 + "' y1='" + y1 + "' x2='" + x2 + "' y2='" + y2 + "' stroke='black' />";
        svgData += "<line x1='" + x2 + "' y1='" + y2 + "' x2='" + x2 + "' y2='" + y1 + "' stroke='black' />";
        svgData += "<line x1='" + (x2 - gap) + "' y1='" + y1 + "' x2='" + (x2 - gap) + "' y2='" + (y1 - gap) + "' stroke='black' />";
        svgData += "<line x1='" + (x2 - gap) + "' y1='" + (y1 - gap) + "' x2='" + x2 + "' y2='" + (y1 - gap) + "' stroke='black' />";
        svgData += "<text x='" + (x2 - (x2 - x1) / 2 - gap / 2) + "' y='" + (y1 + 1.8 * gap) + "' font-size='0.7em' fill='#000000'>" + a + "</text>";
        svgData += "<text x='" + (x2 + 0.5 * gap) + "' y='" + (y1 - (y1 - y2) / 2 + gap / 1.2) + "' font-size='0.7em' fill='#000000'>" + b + "</text>";
        svgData += "<text x='" + ((x2 - x1) / 2 - gap) + "' y='" + (y1 - (y1 - y2) / 2 - gap) + "' font-size='0.7em' fill='#000000'>" + c + "</text>";
        if (A) {
            svgData += "<text x='" + (x1 + gap / 1.2) + "' y='" + (y1 - gap / 4) + "' font-size='0.6em' fill='#000000'>" + A + "</text>";
        }
        svgData += "</svg>";
        return svgData;
    };
}