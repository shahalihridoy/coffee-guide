import Firebase from "./FirebaseConfig";

export const getBrandList = () => {
  return Firebase.firestore()
    .collection("brands")
    .get();
};

export const getMethodListForBrand = brandId => {
  return Firebase.firestore()
    .collection("brands")
    .doc(brandId)
    .collection("methods")
    .get();
};

export const getBrandWithId = brandId => {
  return Firebase.firestore()
    .collection("brands")
    .doc(brandId)
    .get();
};

export const getMethodDetailsWithId = methodId => {
  return Firebase.firestore()
    .collection("methodDetails")
    .doc(methodId)
    .get();
};
