export class Adjoin {
  constructor(vertex) {
    this.vertex = vertex;
    this.quantity = vertex.length;
    this.init();
  }

  init() {
    // 把 鄰接矩陣 => 變成 單行陣列 ， 每一個 this.quantity = vertex.length; 一循環
    this.adjoinArray = Array.from({ length: this.quantity * this.quantity });
  }

  getVertexRow(id) {
    const index = this.vertex.indexOf(id);
    const col = [];

    this.vertex.forEach((item, pIndex) => {
      // 找出與 id 有關的 鄰接 data => 0+5*0 / 0+5*1 / 0+5*2 / 0+5*3 / 0+5*4
      col.push(this.adjoinArray[index + this.quantity * pIndex]);
    });
    return col;
  }

  getAdjoinVertexs(id) {
    // 如果 不是 undefined 就顯示原資料
    return (
      this.getVertexRow(id)
        // index 已經同步 ， 故可以用 this.vertex[index]
        .map((item, index) => (item ? this.vertex[index] : ""))
        // 找出不是 "" 的 data ， 即為設置相鄰的 data
        .filter(Boolean)
    );
  }

  // 設置相鄰的 data
  setAdjoinVertexs(id, sides) {
    const pIndex = this.vertex.indexOf(id);
    sides.forEach(item => {
      const index = this.vertex.indexOf(item);
      // 如果有連接 ， 設置為 1 => 0*5+2 / 0*5+3
      this.adjoinArray[pIndex * this.quantity + index] = 1;
    });
  }
}
