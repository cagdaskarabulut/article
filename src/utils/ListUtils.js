export const isListContainsObjectByChampion = (list, champion) => {
  const item = list.find((element) => element.champion == champion);
  return item ? true : false;
};

export const findObjectByChampion = (list, champion) => {
  if (isListContainsObjectByChampion(list, champion)) {
    return list.find((element) => element.champion == champion);
  } else {
    return "";
  }
};

export const isEmailInList = (email, emailListString) => {
  const emailArray = emailListString.split(",");
  return emailArray.includes(email);
};
