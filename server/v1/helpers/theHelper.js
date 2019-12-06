class theHelper {
  static currentDate() {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  static getFileName(file) {
    const newFileArray = [];
    file.forEach((item) => newFileArray.push(item.filename));

    return newFileArray;
  }
}

export default theHelper;
