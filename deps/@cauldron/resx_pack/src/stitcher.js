class Stitcher {
  constructor() {
    this.entries = [];
  }

  addEntry(entry) {
    this.entries.push(entry);
  }

  build() {
    // build to zip file and give to server
  }
}

const globalStitcher = new Stitcher();

export default globalStitcher;
