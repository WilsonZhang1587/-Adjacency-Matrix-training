class Adjoin {
  constructor(vertex) {
    this.vertex = vertex;
    this.quantity = vertex.length;
    this.init();
  }

  init() {
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

  // 清單的各種結果合併成 數字 ，並組合成陣列
  getRowTotal(params) {
    // 把所有的 commoditySpecs list 清單 製作成 鄰接矩陣(雙重陣列) ，且判定有無 交集(牽線)
    params = params.map(id => this.getVertexRow(id));
    const adjoinNames = [];

    // this.vertex => 從 commoditySpecs list 製作 鄰接矩陣的圓圈(點)
    this.vertex.forEach((item, index) => {
      const rowtotal = params
        .map(value => value[index])
        // 清單的各種結果合併成 數字 ，並組合成陣列
        .reduce((total, current) => {
          total += current || 0;
          return total;
        }, 0);
      adjoinNames.push(rowtotal);
    });
    return adjoinNames;
  }

  // 交集
  getUnions(params) {
    const row = this.getRowTotal(params);
    return row
      .map((item, index) => item >= params.length && this.vertex[index])
      .filter(Boolean);
  }

  // 并集 => 從 結果陣列(this.vertex) 挑選出 不為 0 的結果
  getCollection(params) {
    params = this.getRowTotal(params);
    return params
      .map((item, index) => item && this.vertex[index])
      .filter(Boolean);
  }
}

export class ShopAdjoin extends Adjoin {
  constructor(commoditySpecs, data) {
    // 透過 super 把 commoditySpecs list 做成 清單陣列
    super(
      commoditySpecs.reduce((total, current) => [...total, ...current.list], [])
    );
    this.commoditySpecs = commoditySpecs;
    this.data = data;
    // 单规格矩阵创建
    this.initCommodity();
    // 同类顶点创建
    this.initSimilar();
  }

  // 設置相鄰的 data
  setAdjoinVertexs(id, sides) {
    // 頁碼概念
    const pIndex = this.vertex.indexOf(id);
    sides.forEach(item => {
      const index = this.vertex.indexOf(item);
      // 如果有連接 ， 設置為 1 => 0*5+2 && 0*5+3
      this.adjoinArray[pIndex * this.quantity + index] = 1;
    });
  }

  applyCommodity(params) {
    // 從訂製的 data[] 去設置相鄰的 data
    params.forEach(param => {
      this.setAdjoinVertexs(param, params);
    });
  }

  initCommodity() {
    this.data.forEach(item => {
      this.applyCommodity(item.specs);
    });
  }

  // 同層之間可以互換(同層之間的連接)
  initSimilar() {
    // 獲得所有可選項目
    const specsOption = this.getCollection(this.vertex);
    this.commoditySpecs.forEach(item => {
      const params = [];
      item.list.forEach(value => {
        if (specsOption.indexOf(value) > -1) params.push(value);
      });
      // 同级点位创建
      this.applyCommodity(params);
    });
  }

  querySpecsOptions(params) {
    // 判断是否存在选项填一个
    if (params.some(Boolean)) {
      // 过滤一下选项
      params = this.getUnions(params.filter(Boolean));
    } else {
      // 兜底选一个
      params = this.getCollection(this.vertex);
    }
    return params;
  }
}
