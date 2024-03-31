export const replaceStringForUrlFormat = (myString) => {
  myString = myString.replace(/ /g, "-");
  myString = myString.replace(/'/g, "");
  myString = myString.replace(/"/g, "");
  myString = myString.replace(/\//g, "");
  myString = myString.replace(/&/g, "");
  myString = myString.replace("(", "");
  myString = myString.replace(")", "");
  myString = myString.replace(/ó/g, "o");
  myString = myString.replace(/,/g, "");
  myString = myString.replace(/:/g, "");
  myString = myString.replace("?", "");
  myString = myString.toLowerCase();
  return myString;
};

export const capitalizeFirstChar = (myString) => {
  return myString.charAt(0).toUpperCase() + myString.slice(1);
};

export const getStringWithCommaSeperatedFromList = (myStringList) => {
  let result = "";
  for (let index = 0; index < myStringList.length; index++) {
    const activeName = myStringList[index].name;
    if (index == 0) {
      result = activeName;
    } else {
      result = result + "," + activeName;
    }
  }
  return ","+result+",";
};
